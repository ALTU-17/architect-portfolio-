import { NextResponse } from "next/server";

// Next route handlers run on the Node.js runtime by default.
// `cacheComponents` in Next 16 does not allow an explicit route runtime export.
const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getClientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanForLog(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 500);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is a little too long." }, { status: 413 });
  }

  const key = getClientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Too many notes sent. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "We couldn't read that note." }, { status: 400 });
  }

  // Honeypot: a real person never sees or fills this field.
  if (text(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 180);
  const phone = text(body.phone, 60);
  const projectType = text(body.projectType, 80);
  const location = text(body.location, 120);
  const budget = text(body.budget, 80);
  const message = text(body.message, 3000);

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please share your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Please use a valid email address.";
  }
  if (message.length < 12) {
    errors.message = "Tell us a little more about the space or project.";
  }
  if (projectType.length > 80 || location.length > 120 || budget.length > 80) {
    errors.form = "One of the fields is too long.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const enquiry = {
    receivedAt: new Date().toISOString(),
    name: cleanForLog(name),
    email: cleanForLog(email),
    phone: cleanForLog(phone),
    projectType: cleanForLog(projectType),
    location: cleanForLog(location),
    budget: cleanForLog(budget),
    message: cleanForLog(message),
  };

  // Demo endpoint: no database or email provider is connected yet.
  console.info("[atelier-vance] new enquiry", enquiry);

  return NextResponse.json({
    ok: true,
    message: "Your note has reached the studio.",
  });
}

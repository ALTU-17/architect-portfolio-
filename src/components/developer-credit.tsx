import { Code2, Mail, Phone } from "lucide-react";

const developer = {
  name: "ALTAMASH SHAIKH",
  portfolio: "https://altamash-shaikh-portfolio.vercel.app",
  phone: "+91 9766220055",
  phoneHref: "tel:+919766220055",
  email: "skaltamsh789@gmail.com",
};

export function DeveloperCredit({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`developer-credit ${className}`.trim()}
      role="group"
      aria-label="Developer contact"
    >
      <a
        href={developer.portfolio}
        target="_blank"
        rel="noreferrer"
        className="developer-credit__item"
        aria-label="Visit developer portfolio"
      >
        <Code2 size={14} strokeWidth={1.6} aria-hidden="true" />
        <span>Developed by: {developer.name}</span>
      </a>

      {!compact ? (
        <>
          <span className="developer-credit__divider" aria-hidden="true" />

          <a
            href={developer.phoneHref}
            className="developer-credit__item"
            aria-label="Call developer"
          >
            <Phone size={12} strokeWidth={1.6} aria-hidden="true" />
            <span>{developer.phone}</span>
          </a>

          <span className="developer-credit__divider" aria-hidden="true" />

          <a
            href={`mailto:${developer.email}`}
            className="developer-credit__item"
            aria-label="Email developer"
          >
            <Mail size={12} strokeWidth={1.6} aria-hidden="true" />
            <span>{developer.email}</span>
          </a>
        </>
      ) : null}
    </div>
  );
}

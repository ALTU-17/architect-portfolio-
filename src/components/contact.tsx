"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { LocalTime } from "@/components/local-time";
import { Reveal } from "@/components/reveal";
import { budgets, projectTypes, studio } from "@/data/studio";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  company: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  message: "",
  company: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; errors?: Record<string, string> };

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      if (status.kind === "error") setStatus({ kind: "idle" });
    };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok) {
        setStatus({
          kind: "error",
          message: data.error || "Something went wrong. Please try again.",
          errors: data.errors,
        });
        return;
      }

      setStatus({ kind: "success" });
      setForm(emptyForm);
    } catch {
      setStatus({
        kind: "error",
        message: "The studio could not be reached. Please email us directly.",
      });
    }
  };

  const fieldError =
    status.kind === "error" ? status.errors : undefined;

  return (
    <section className="contact section" id="contact">
      <div className="shell">
        <div className="contact__head">
          <div>
            <p className="eyebrow" style={{ color: "rgba(248,245,239,0.65)" }}>
              06 — Enquiries
            </p>
            <h2 className="contact__title display" style={{ marginTop: "1.4rem" }}>
              Let&rsquo;s make
              <br />
              <em className="serif-italic">room.</em>
            </h2>
          </div>
          <div className="contact__intro">
            <p>
              Tell us about the space, the people who will use it and what you
              hope it might become. We reply to every serious enquiry within
              three working days.
            </p>
            <span className="contact__availability">
              <i />
              {studio.availability}
            </span>
          </div>
        </div>

        <div className="contact__grid">
          <div className="contact__form">
            {status.kind === "success" ? (
              <div className="form-success" role="status">
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "2.4rem",
                    height: "2.4rem",
                    border: "1px solid rgba(241,237,229,0.35)",
                    borderRadius: "50%",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Check size={14} />
                </span>
                <h3 className="form-success__title display">
                  Your note is on
                  <br />
                  the studio table.
                </h3>
                <p>
                  Thank you for writing. In this concept portfolio the enquiry
                  is logged by the Node route rather than emailed, but the full
                  flow is working.
                </p>
                <button
                  type="button"
                  className="link-line"
                  onClick={() => setStatus({ kind: "idle" })}
                  style={{ color: "var(--paper)" }}
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-row">
                  <div className={`field ${fieldError?.name ? "is-error" : ""}`}>
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Sofia Rinaldi"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(fieldError?.name)}
                    />
                    {fieldError?.name ? (
                      <span className="field__error">{fieldError.name}</span>
                    ) : null}
                  </div>

                  <div className={`field ${fieldError?.email ? "is-error" : ""}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(fieldError?.email)}
                    />
                    {fieldError?.email ? (
                      <span className="field__error">{fieldError.email}</span>
                    ) : null}
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="projectType">Project type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={update("projectType")}
                      required
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={update("location")}
                      placeholder="City / country"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="budget">Indicative budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={update("budget")}
                    >
                      <option value="">Prefer not to say</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+39"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className={`field ${fieldError?.message ? "is-error" : ""}`}>
                  <label htmlFor="message">What are you imagining?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="A few lines about the space, the scope and the feeling you are after…"
                    required
                    aria-invalid={Boolean(fieldError?.message)}
                  />
                  {fieldError?.message ? (
                    <span className="field__error">{fieldError.message}</span>
                  ) : null}
                </div>

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={update("company")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn"
                    disabled={status.kind === "sending"}
                    data-cursor="hover"
                  >
                    {status.kind === "sending" ? "Sending…" : "Send enquiry"}
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </button>
                  <span className="form-note">
                    Concept form — logged by the
                    <br />
                    Node route, no email is sent.
                  </span>
                </div>

                {status.kind === "error" ? (
                  <p className="form-status form-status--error" role="alert">
                    {status.message}
                  </p>
                ) : null}
              </form>
            )}
          </div>

          <Reveal className="contact__details" delay={0.1} y={22}>
            <div className="contact-card">
              <span className="contact-card__label">Write to the studio</span>
              <a href={`mailto:${studio.email}`}>{studio.email}</a>
              <a href={`tel:${studio.phone.replace(/\s/g, "")}`} style={{ fontSize: "0.88rem", fontFamily: "var(--font-manrope), sans-serif" }}>
                {studio.phone}
              </a>
            </div>

            <div className="contact-card contact-card__inline">
              <div>
                <span className="contact-card__label">Milano</span>
                <p>
                  {studio.contact.milan[0]}
                  <br />
                  {studio.contact.milan[1]}
                </p>
              </div>
              <div>
                <span className="contact-card__label">København</span>
                <p>
                  {studio.contact.copenhagen[0]}
                  <br />
                  {studio.contact.copenhagen[1]}
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__inline">
                <div>
                  <span className="contact-card__label">Studio time</span>
                  <div style={{ marginTop: "0.45rem" }}>
                    <LocalTime />
                  </div>
                </div>
                <div>
                  <span className="contact-card__label">Follow</span>
                  <div className="socials">
                    {studio.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                      >
                        {social.label}
                        <ArrowUpRight size={9} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

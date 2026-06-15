"use client";

import { useState } from "react";

const serviceOptions = [
  "AI Agent Development",
  "Voice AI Agents",
  "Geospatial Intelligence",
  "AI Solutions Development",
  "Mobile App Development",
  "Web Application Development",
  "XR / Game / 3D",
  "A ready-to-use Solution",
  "Other / not sure",
];
const timelines = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const fieldClass =
  "mt-2 w-full rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-accent focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-widest text-muted";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="card text-center" role="status" aria-live="polite">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-2xl text-ink-950">✓</div>
        <h3 className="mt-5 font-serif text-2xl">Thanks — we&apos;ve got it.</h3>
        <p className="mt-3 text-muted">
          An engineer (not a sales rep) will reply within one business day with next steps toward your
          fixed-price proposal.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        // v1: front-end only. Wire to your CRM / Cal.com routing on integration.
        setSubmitted(true);
      }}
    >
      <div>
        <label htmlFor="cf-build" className={labelClass}>What are you building?</label>
        <textarea
          id="cf-build"
          name="building"
          required
          rows={3}
          placeholder="A voice agent for support, an AI MVP, a geospatial tool…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelClass}>Work email</label>
          <input id="cf-email" name="email" required type="email" placeholder="you@company.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input id="cf-name" name="name" required type="text" placeholder="Your name" className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className={labelClass}>Service</label>
          <select id="cf-service" name="service" className={fieldClass}>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-timeline" className={labelClass}>Timeline</label>
          <select id="cf-timeline" name="timeline" className={fieldClass}>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full">
        Get my fixed-price proposal →
      </button>
      <p className="text-center text-xs text-muted">
        You&apos;ll talk to an engineer, not a sales rep. Same-day fixed-price proposal.
      </p>
    </form>
  );
}

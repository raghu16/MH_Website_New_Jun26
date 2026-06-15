import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Get a Same-Day Fixed-Price Proposal",
  description:
    "Tell us what you're building. You'll talk to an engineer, not a sales rep — and get a same-day fixed-price proposal.",
  alternates: { canonical: `${site.url}/contact-us` },
};

export default function Contact() {
  return (
    <>
    <section className="grid-texture">
      <div className="container-page grid gap-14 py-24 md:grid-cols-2">
        <div>
          <p className="eyebrow">Get started</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-6xl">
            Get a same-day fixed-price proposal.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Tell us the outcome you need. We&apos;ll scope it, and you&apos;ll leave with a clear read on
            feasibility, timeline and a fixed price — from an engineer, not a sales rep.
          </p>

          <div className="mt-10 space-y-4">
            {[
              ["Fixed scope, fixed price", "Know the number before we start."],
              ["Milestone payments", "Never everything up front."],
              ["100% code ownership", "No lock-in, ever."],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div>
                  <div className="font-medium">{k}</div>
                  <div className="text-sm text-muted">{v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-2 font-mono text-sm text-muted">
            <a href={`mailto:${site.email}`} className="block hover:text-accent">{site.email}</a>
            <a href={`tel:${site.phoneUS.replace(/\s/g, "")}`} className="block hover:text-accent">US {site.phoneUS}</a>
            <a href={`tel:${site.phoneIN.replace(/\s/g, "")}`} className="block hover:text-accent">IN {site.phoneIN}</a>
            <p className="pt-2 text-muted/70">{site.address}</p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>

    {/* what happens next */}
    <section className="border-t border-ink-700">
      <div className="container-page py-20">
        <p className="eyebrow">What happens next</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-3">
          {[
            ["01", "We reply within a day", "An engineer reviews your note and gets back within one business day — no sales gauntlet."],
            ["02", "A scoping call", "A short call to understand the outcome, data and constraints."],
            ["03", "A fixed-price proposal", "Same day: scope, timeline and a fixed price you can plan around."],
          ].map(([n, t, d]) => (
            <div key={n} className="bg-ink-950 p-7">
              <div className="font-mono text-sm text-accent">{n}</div>
              <h3 className="mt-3 text-lg font-medium">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* quick faq */}
    <section className="grid-texture border-t border-ink-700">
      <div className="container-page py-20">
        <p className="eyebrow">Quick answers</p>
        <div className="mt-8 divide-y divide-ink-700 border-y border-ink-700">
          {[
            ["Do I need a fully-spec'd brief?", "No. A few lines about the outcome you want is enough to start — we'll shape the scope with you."],
            ["How soon can you start?", "Typically within 1–2 weeks. We'll confirm timing in the first call."],
            ["Do you sign NDAs?", "Yes — happy to sign your NDA before we discuss specifics."],
            ["Who owns the code?", "You do — 100%, with no lock-in."],
          ].map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {q}
                <span className="font-mono text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

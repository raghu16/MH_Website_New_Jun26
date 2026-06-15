import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import ProcessBand from "@/components/ProcessBand";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Services — AI Agents, Voice AI, Geospatial, Mobile & XR",
  description:
    "Monkhub's services: AI agent development, voice AI, geospatial intelligence, AI MVP, mobile and XR — production-grade software, shipped fast.",
};

const groups = ["AI & Agents", "Applications", "Immersive"] as const;

export default function ServicesHub() {
  return (
    <>
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-24">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] md:text-6xl">
            One AI-native studio. Everything you need to ship.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            AI is the engine across everything we build — but the headline is always the outcome:
            production-grade software, shipped fast, that you own.
          </p>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g} className="border-b border-ink-700">
          <div className="container-page py-16">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent">{g}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.group === g)
                .map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={`card flex flex-col ${s.flag ? "ring-1 ring-accent/40" : ""}`}>
                    {s.flag && (
                      <span className="mb-3 w-fit rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                        Flagship
                      </span>
                    )}
                    <h3 className="text-xl font-medium">{s.eyebrow}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{s.subhead}</p>
                    <span className="mt-4 font-mono text-xs text-accent">Explore →</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      ))}

      <ProcessBand />
      <Testimonials />

      <section className="container-page py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl md:text-5xl">Not sure which fits?</h2>
        <p className="mx-auto mt-5 max-w-lg text-muted">Tell us the outcome you need. We&apos;ll scope it and send a same-day fixed price.</p>
        <Link href="/contact-us" className="btn-primary mt-8">Get a fixed-price proposal →</Link>
      </section>
    </>
  );
}

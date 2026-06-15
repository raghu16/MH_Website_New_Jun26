import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/site";
import { animOf } from "@/lib/anim";
import SectionCanvas from "@/components/SectionCanvas";
import ProcessBand from "@/components/ProcessBand";

const solutionSteps = [
  { n: "01", t: "Pick", d: "Choose the solution that fits — or tell us your use case." },
  { n: "02", t: "Configure", d: "We tailor it to your data, brand and workflows." },
  { n: "03", t: "Integrate", d: "Connect it to your existing stack and tools." },
  { n: "04", t: "Launch", d: "Go live in weeks, with monitoring and tuning built in." },
];

export const metadata: Metadata = {
  title: "Solutions — Ready-to-Deploy AI, Voice, Satellite & VR",
  description:
    "Productized, ready-to-deploy solutions from Monkhub: ready-to-use AI agents, voice agents, satellite intelligence, VR training, VR real estate demos and a real estate broker platform.",
  alternates: { canonical: `${site.url}/solutions` },
};

export default function SolutionsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-60">
          <SectionCanvas variant="blocks" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24">
          <p className="eyebrow">Solutions</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">
            Battle-tested building blocks. <span className="italic text-accent">Live in weeks.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Where Services are custom builds, Solutions are productized and white-label — configured to
            your data and shipped fast. Start from a proven foundation, not a blank page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us" className="btn-primary">Book a demo →</Link>
            <Link href="/services" className="btn-ghost">Need something custom?</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((s) => {
              const t =
                s.accent === "cyan"
                  ? { text: "text-cyan", border: "border-cyan/40" }
                  : { text: "text-accent", border: "border-accent/40" };
              return (
                <Link
                  key={s.slug}
                  id={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="hover-glow group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/60 hover:-translate-y-1 hover:border-accent/50"
                >
                  {/* hover-animated visual band */}
                  <div className="relative h-36 overflow-hidden border-b border-ink-700 bg-ink-950">
                    <SectionCanvas variant={animOf(s.slug)} hover className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                    <span className={`absolute right-4 top-4 rounded-full border bg-ink-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur ${t.border} ${t.text}`}>
                      {s.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <span className="mono-label">{s.category}</span>
                    <h2 className="mt-3 font-serif text-3xl md:text-4xl">{s.name}</h2>
                    <p className={`mt-2 font-serif text-lg italic ${t.text}`}>{s.blurb}</p>
                    <p className="mt-5 flex-1 text-muted">{s.detail}</p>
                    <span className={`mt-7 font-mono text-xs uppercase tracking-widest ${t.text}`}>Explore solution →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessBand eyebrow="How it works" title="From pick to production — in weeks." steps={solutionSteps} />

      <section className="container-page py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl md:text-5xl">
          Don&apos;t see your use case?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-muted">
          We adapt these foundations to your domain — or build custom. Tell us what you need.
        </p>
        <Link href="/contact-us" className="btn-primary mt-8">Get a fixed-price proposal →</Link>
      </section>
    </>
  );
}

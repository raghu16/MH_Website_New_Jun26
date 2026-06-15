import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/site";
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
                  ? { text: "text-cyan", border: "border-cyan/40", grad: "from-cyan/25 via-cyan/5 to-transparent" }
                  : { text: "text-accent", border: "border-accent/40", grad: "from-accent/25 via-accent/5 to-transparent" };
              return (
                <article
                  key={s.slug}
                  id={s.slug}
                  className="reg relative scroll-mt-24 overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/50 p-8 md:p-10"
                >
                  <div className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${t.grad} blur-2xl`} />
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="mono-label">{s.category}</span>
                    <span className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${t.border} ${t.text}`}>
                      {s.tag}
                    </span>
                  </div>
                  <h2 className="relative mt-5 font-serif text-3xl md:text-4xl">{s.name}</h2>
                  <p className={`relative mt-2 font-serif text-lg italic ${t.text}`}>{s.blurb}</p>
                  <p className="relative mt-5 max-w-md text-muted">{s.detail}</p>
                  <Link href={`/solutions/${s.slug}`} className={`relative mt-7 inline-block font-mono text-xs uppercase tracking-widest ${t.text} hover:underline`}>
                    Explore solution →
                  </Link>
                </article>
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

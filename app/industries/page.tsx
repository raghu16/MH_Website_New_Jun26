import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/industries";
import { animOf } from "@/lib/anim";
import SectionCanvas from "@/components/SectionCanvas";
import LeadCTA from "@/components/LeadCTA";

export const metadata: Metadata = {
  title: "Industries — Power, Real Estate, Education & E-commerce",
  description:
    "Monkhub builds AI-native software for the power sector, real estate, education and e-commerce — agents, voice, satellite intelligence and VR, tuned to each domain.",
};

export default function Industries() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-60">
          <SectionCanvas variant="sectors" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24">
          <p className="eyebrow">Industries</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">We speak your domain.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            AI is the engine; the outcome is always industry-specific. We&apos;re focused on four sectors
            where our agents, voice, satellite and VR work land hardest.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {industries.map((ind) => {
              const t =
                ind.accent === "cyan"
                  ? { text: "text-cyan", grad: "from-cyan/25 via-cyan/5 to-transparent", dot: "bg-cyan" }
                  : { text: "text-accent", grad: "from-accent/25 via-accent/5 to-transparent", dot: "bg-accent" };
              return (
                <Link key={ind.slug} href={`/industries/${ind.slug}`} className="reg group relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/50 p-8 transition-colors hover:border-ink-600 md:p-10">
                  <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${t.grad} blur-2xl`} />
                  <h2 className="relative font-serif text-3xl md:text-4xl">{ind.name}</h2>
                  <p className={`relative mt-2 font-serif text-lg italic ${t.text}`}>{ind.blurb}</p>
                  <ul className="relative mt-6 space-y-3">
                    {ind.points.slice(0, 3).map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-paper/90">
                        <span className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className={`relative mt-7 inline-block font-mono text-xs uppercase tracking-widest ${t.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                    Explore {ind.name} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <LeadCTA title="Build for your sector." secondary={{ label: "Browse solutions", href: "/solutions" }} />
    </>
  );
}

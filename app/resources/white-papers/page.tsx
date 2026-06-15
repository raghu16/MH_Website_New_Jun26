import type { Metadata } from "next";
import Link from "next/link";
import { whitepapers } from "@/lib/whitepapers";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";

export const metadata: Metadata = {
  title: "White Papers — AI Playbooks & Benchmarks",
  description:
    "In-depth Monkhub white papers: production-grade AI agents, voice AI ROI, GeoAI for enterprise, and AI-era engagement models.",
  alternates: { canonical: `${site.url}/resources/white-papers` },
};

export default function WhitePapersHub() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-60">
          <SectionCanvas variant="chart" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24">
          <nav className="font-mono text-xs text-muted">
            <Link href="/resources" className="hover:text-accent">Resources</Link>
            <span className="px-2">/</span>
            <span className="text-paper/70">White Papers</span>
          </nav>
          <h1 className="mt-8 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">White Papers</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Deeper research, playbooks and benchmarks for teams making real decisions about AI.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {whitepapers.map((wp) => {
              const t = wp.accent === "cyan" ? { text: "text-cyan", border: "border-cyan/40" } : { text: "text-accent", border: "border-accent/40" };
              return (
                <Link key={wp.slug} href={`/resources/white-papers/${wp.slug}`} className="card flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] uppercase tracking-widest ${t.text}`}>{wp.category}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${t.border} ${t.text}`}>{wp.pages}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-snug">{wp.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted">{wp.summary}</p>
                  <span className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">Read &amp; download →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

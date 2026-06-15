import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { whitepapers } from "@/lib/whitepapers";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";

export const metadata: Metadata = {
  title: "Resources — Blog & White Papers",
  description:
    "Monkhub resources: practical writing on AI agents, voice AI, geospatial and engineering, plus in-depth white papers and playbooks.",
  alternates: { canonical: `${site.url}/resources` },
};

export default function ResourcesHub() {
  const recentPosts = posts.slice(0, 3);
  const recentWPs = whitepapers.slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-60">
          <SectionCanvas variant="library" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24">
          <p className="eyebrow">Resources</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">
            Field notes from shipping AI.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Practical writing and in-depth research on building production-grade AI — agents, voice,
            geospatial, and how to ship it fast.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page grid gap-6 py-16 md:grid-cols-2">
          {/* Blog card */}
          <div className="reg relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/50 p-8 md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-accent/25 via-accent/5 to-transparent blur-2xl" />
            <p className="mono-label text-accent">Blog</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Short, practical reads.</h2>
            <p className="mt-3 text-muted">Lessons from building and shipping AI in production.</p>
            <ul className="mt-6 space-y-3">
              {recentPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/resources/blog/${p.slug}`} className="group block">
                    <span className="text-sm text-paper/90 group-hover:text-accent">{p.title}</span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-widest text-muted">{p.category} · {p.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/resources/blog" className="btn-ghost mt-7 text-xs">All articles →</Link>
          </div>

          {/* White papers card */}
          <div className="reg relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/50 p-8 md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-cyan/25 via-cyan/5 to-transparent blur-2xl" />
            <p className="mono-label text-cyan">White Papers</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Deep, downloadable research.</h2>
            <p className="mt-3 text-muted">Playbooks and benchmarks for teams making real decisions.</p>
            <ul className="mt-6 space-y-3">
              {recentWPs.map((wp) => (
                <li key={wp.slug}>
                  <Link href={`/resources/white-papers/${wp.slug}`} className="group block">
                    <span className="text-sm text-paper/90 group-hover:text-cyan">{wp.title}</span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-widest text-muted">{wp.category} · {wp.pages}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/resources/white-papers" className="btn-ghost mt-7 text-xs">All white papers →</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <p className="mx-auto max-w-lg text-muted">Prefer to talk it through? We&apos;re happy to.</p>
        <Link href="/contact-us" className="btn-primary mt-6">Get a fixed-price proposal →</Link>
      </section>
    </>
  );
}

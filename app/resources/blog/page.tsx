import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { fmtDate } from "@/lib/format";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";

export const metadata: Metadata = {
  title: "Blog — Building & Shipping Production-Grade AI",
  description:
    "The Monkhub blog: practical writing on AI agents, voice AI, geospatial intelligence and AI-accelerated engineering.",
  alternates: { canonical: `${site.url}/resources/blog` },
};

export default function BlogHub() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-60">
          <SectionCanvas variant="blog" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24">
          <nav className="font-mono text-xs text-muted">
            <Link href="/resources" className="hover:text-accent">Resources</Link>
            <span className="px-2">/</span>
            <span className="text-paper/70">Blog</span>
          </nav>
          <h1 className="mt-8 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">Blog</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Short, practical reads on building production-grade AI — and shipping it fast.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const t = p.accent === "cyan" ? "text-cyan" : "text-accent";
              return (
                <Link key={p.slug} href={`/resources/blog/${p.slug}`} className="card flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] uppercase tracking-widest ${t}`}>{p.category}</span>
                    <span className="font-mono text-[11px] text-muted">{p.readTime}</span>
                  </div>
                  <h2 className="mt-4 flex-1 font-serif text-2xl leading-snug">{p.title}</h2>
                  <p className="mt-3 text-sm text-muted">{p.excerpt}</p>
                  <span className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">{fmtDate(p.date)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

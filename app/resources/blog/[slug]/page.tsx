import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import { fmtDate } from "@/lib/format";
import { site } from "@/lib/site";
import LeadCTA from "@/components/LeadCTA";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `${site.url}/resources/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const t = p.accent === "cyan" ? "text-cyan" : "text-accent";
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { "@type": "Organization", name: "Monkhub" },
    publisher: { "@type": "Organization", name: "Monkhub" },
    mainEntityOfPage: `${site.url}/resources/blog/${p.slug}`,
  };

  return (
    <>
      <article className="border-b border-ink-700">
        <div className="container-page max-w-3xl py-20">
          <nav className="font-mono text-xs text-muted">
            <Link href="/resources/blog" className="hover:text-accent">Blog</Link>
            <span className="px-2">/</span>
            <span className={t}>{p.category}</span>
          </nav>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">{p.title}</h1>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
            {fmtDate(p.date)} · {p.readTime}
          </div>
          <p className="mt-8 border-l-2 border-ink-700 pl-5 text-xl text-paper/90">{p.excerpt}</p>

          <div className="mt-10 space-y-7">
            {p.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2 className="font-serif text-2xl text-paper">{b.h}</h2>}
                <p className={`${b.h ? "mt-3" : ""} leading-relaxed text-muted`}>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-b border-ink-700">
          <div className="container-page py-16">
            <p className="eyebrow">Keep reading</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {more.map((m) => (
                <Link key={m.slug} href={`/resources/blog/${m.slug}`} className="card">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{m.category}</span>
                  <h3 className="mt-2 font-serif text-xl">{m.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LeadCTA
        title="Want this, built for you?"
        sub="Tell us what you're building. You'll talk to an engineer — same-day fixed-price proposal."
        secondary={{ label: "More resources", href: "/resources" }}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

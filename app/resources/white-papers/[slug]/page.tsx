import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { whitepapers, getWhitePaper } from "@/lib/whitepapers";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return whitepapers.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wp = getWhitePaper(slug);
  if (!wp) return {};
  return {
    title: wp.title,
    description: wp.summary,
    alternates: { canonical: `${site.url}/resources/white-papers/${wp.slug}` },
    openGraph: { title: wp.title, description: wp.summary },
  };
}

export default async function WhitePaperDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wp = getWhitePaper(slug);
  if (!wp) notFound();

  const t =
    wp.accent === "cyan"
      ? { text: "text-cyan", dot: "bg-cyan", border: "border-cyan/40" }
      : { text: "text-accent", dot: "bg-accent", border: "border-accent/40" };
  const more = whitepapers.filter((x) => x.slug !== wp.slug).slice(0, 2);

  return (
    <>
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1.3fr_1fr]">
          <div>
            <nav className="font-mono text-xs text-muted">
              <Link href="/resources/white-papers" className="hover:text-accent">White Papers</Link>
              <span className="px-2">/</span>
              <span className={t.text}>{wp.category}</span>
            </nav>
            <h1 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">{wp.title}</h1>
            <p className="mt-5 text-lg text-muted">{wp.summary}</p>
            <p className="mt-8 eyebrow">Inside this paper</p>
            <ul className="mt-5 space-y-3">
              {wp.highlights.map((hl) => (
                <li key={hl} className="flex items-start gap-3 text-paper/90">
                  <span className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
                  {hl}
                </li>
              ))}
            </ul>
          </div>

          {/* gated download — lead capture */}
          <div className="reg relative h-fit overflow-hidden rounded-2xl border border-ink-700 bg-ink-900/60 p-7">
            <div className="mono-label">{wp.pages} · PDF</div>
            <h2 className="mt-3 font-serif text-2xl">Get the white paper.</h2>
            <p className="mt-2 text-sm text-muted">
              Tell us where to send it and we&apos;ll email you the PDF — no spam, just the paper.
            </p>
            <form className="mt-5 space-y-3" action="/contact-us">
              <div>
                <label htmlFor="wp-email" className="sr-only">Work email</label>
                <input
                  id="wp-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-accent focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">Email me the PDF →</button>
            </form>
            <p className="mt-3 text-center text-[11px] text-muted">
              We&apos;ll also share how we&apos;d apply this to your project — only if you want.
            </p>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-b border-ink-700">
          <div className="container-page py-16">
            <p className="eyebrow">More white papers</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {more.map((m) => (
                <Link key={m.slug} href={`/resources/white-papers/${m.slug}`} className="card">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{m.category}</span>
                  <h3 className="mt-2 font-serif text-xl">{m.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

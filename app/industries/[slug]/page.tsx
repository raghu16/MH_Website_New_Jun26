import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/industries";
import { animOf } from "@/lib/anim";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";
import LeadCTA from "@/components/LeadCTA";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: `${ind.name} — AI, Geospatial, Voice & VR Solutions`,
    description: ind.intro,
    alternates: { canonical: `${site.url}/industries/${ind.slug}` },
    openGraph: { title: `${ind.name} | Monkhub`, description: ind.intro },
  };
}

export default async function IndustryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const t =
    ind.accent === "cyan"
      ? { text: "text-cyan", dot: "bg-cyan" }
      : { text: "text-accent", dot: "bg-accent" };
  const others = industries.filter((x) => x.slug !== ind.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-70">
          <SectionCanvas variant={animOf(ind.slug)} />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24 md:py-28">
          <nav className="font-mono text-xs text-muted">
            <Link href="/industries" className="hover:text-accent">Industries</Link>
            <span className="px-2">/</span>
            <span className="text-paper/70">{ind.name}</span>
          </nav>
          <p className="eyebrow mt-8">Industry</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">{ind.name}</h1>
          <p className={`mt-4 max-w-2xl font-serif text-xl italic ${t.text}`}>{ind.blurb}</p>
          <p className="mt-6 max-w-2xl text-lg text-muted">{ind.intro}</p>
          <Link href="/contact-us" className="btn-primary mt-8">Get a proposal →</Link>
        </div>
      </section>

      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">How we help</p>
            <ul className="mt-8 space-y-4">
              {ind.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-paper/90">
                  <span className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {ind.outcomes.map((o) => (
                <div key={o.l} className="card">
                  <div className="font-serif text-3xl">{o.v}</div>
                  <div className="mt-1 mono-label">{o.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Solutions for {ind.name.toLowerCase()}</p>
            <div className="mt-8 space-y-4">
              {ind.solutions.map((s) => (
                <Link key={s.href} href={s.href} className="card flex items-center justify-between">
                  <span className="font-medium">{s.label}</span>
                  <span className="font-mono text-xs text-accent">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <p className="eyebrow">Other industries</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="rounded-full border border-ink-700 px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent">
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadCTA
        title={`Build for ${ind.name.toLowerCase()}.`}
        sub="Tell us your domain and the outcome you need. Same-day fixed-price proposal."
        secondary={{ label: "Browse solutions", href: "/solutions" }}
      />
    </>
  );
}

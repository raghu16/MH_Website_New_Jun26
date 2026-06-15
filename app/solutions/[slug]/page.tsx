import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/lib/solutions";
import { solutionExtras } from "@/lib/pageExtras";
import { animOf } from "@/lib/anim";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";
import LeadCTA from "@/components/LeadCTA";
import ProcessBand from "@/components/ProcessBand";
import StatBand from "@/components/StatBand";
import FeatureGrid from "@/components/FeatureGrid";
import TechMarquee from "@/components/TechMarquee";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import ConsultantButton from "@/components/ConsultantButton";

const deploySteps = [
  { n: "01", t: "Scope", d: "We map your use case and data, and confirm fit in a short discovery call." },
  { n: "02", t: "Configure", d: "We tailor the solution to your data, brand and workflows." },
  { n: "03", t: "Integrate", d: "We connect it to your stack — CRM, telephony, GIS, or APIs." },
  { n: "04", t: "Launch & tune", d: "Go live in weeks, then monitor and improve in production." },
];

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.name} — Ready-to-Deploy Solution`,
    description: s.detail,
    alternates: { canonical: `${site.url}/solutions/${s.slug}` },
    openGraph: { title: `${s.name} | Monkhub`, description: s.detail },
  };
}

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const x = solutionExtras[s.slug];
  const t = s.accent === "cyan"
    ? { text: "text-cyan", border: "border-cyan/40", dot: "bg-cyan" }
    : { text: "text-accent", border: "border-accent/40", dot: "bg-accent" };
  const accent = s.accent === "cyan" ? "cyan" : "magenta";
  const features = x?.features ?? s.features.map((f) => ({ t: f, d: "" }));
  const related = solutions.filter((r) => r.slug !== s.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: s.name,
    description: s.detail,
    brand: { "@type": "Organization", name: "Monkhub" },
    category: s.category,
    url: `${site.url}/solutions/${s.slug}`,
  };

  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-70">
          <SectionCanvas variant={animOf(s.slug)} />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24 md:py-28">
          <nav className="font-mono text-xs text-muted">
            <Link href="/solutions" className="hover:text-accent">Solutions</Link>
            <span className="px-2">/</span>
            <span className="text-paper/70">{s.name}</span>
          </nav>
          <div className="mt-8 flex items-center gap-3">
            <span className="mono-label">{s.category}</span>
            <span className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${t.border} ${t.text}`}>{s.tag}</span>
          </div>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">{s.name}</h1>
          <p className={`mt-4 max-w-2xl font-serif text-xl italic ${t.text}`}>{s.blurb}</p>
          <p className="mt-6 max-w-2xl text-lg text-muted">{s.detail}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us" className="btn-primary">Book a demo →</Link>
            <Link href="/solutions" className="btn-ghost">All solutions</Link>
          </div>
        </div>
      </section>

      <StatBand stats={x?.stats} />

      {/* what's inside */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">What&apos;s inside</p>
          <Reveal className="mt-10"><FeatureGrid items={features} accent={accent} /></Reveal>
        </div>
      </section>

      {/* outcomes + best for */}
      <section className="border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Outcomes</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {s.outcomes.map((o) => (
                <div key={o.l} className="card">
                  <div className="font-serif text-3xl text-paper">{o.v}</div>
                  <div className="mt-1 mono-label">{o.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="mono-label text-accent">Best for</div>
            <p className="mt-2 text-paper/90">{s.bestFor}</p>
          </div>
        </div>
      </section>

      {/* how it works */}
      <ProcessBand eyebrow="How it works" title={`${s.name}, live in weeks.`} steps={deploySteps} />

      {/* integrations */}
      <TechMarquee items={x?.integrations} label="Integrates with" />

      {/* use cases */}
      {x?.useCases?.length ? (
        <section className="border-b border-ink-700">
          <div className="container-page py-20">
            <p className="eyebrow">Where it fits</p>
            <Reveal className="mt-10 grid gap-5 md:grid-cols-3">
              {x.useCases.map((u) => (
                <div key={u.t} className="card">
                  <h3 className="text-lg font-medium">{u.t}</h3>
                  <p className="mt-2 text-sm text-muted">{u.d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <FeaturedCaseStudy slug={x?.caseStudy} category={s.category} />

      {/* deploy & pricing */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">Deploy &amp; pricing</p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl">{x?.timeline ?? "Live in weeks"}.</h2>
            <p className="mt-4 max-w-md text-muted">
              Fixed-price deployment, configured to your data and stack. No hourly meter — you know the
              number before we start, and you own everything we ship.
            </p>
            <Link href="/contact-us" className="btn-primary mt-7">Get a fixed-price plan →</Link>
          </div>
          <div>
            <p className="eyebrow">What&apos;s included</p>
            <ul className="mt-8 space-y-4">
              {(x?.includes ?? []).map((i) => (
                <li key={i} className="flex items-start gap-3 text-paper/90">
                  <span className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* interactive demo */}
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-50">
          <SectionCanvas variant={animOf(s.slug)} />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-20 text-center">
          <p className="eyebrow">See it live</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl md:text-4xl">Want to see {s.name} in action?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Talk to our AI consultant for an instant walkthrough and a same-day plan — or book a live demo with an engineer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ConsultantButton className="btn-primary">Try the AI consultant →</ConsultantButton>
            <Link href="/contact-us" className="btn-ghost">Book a live demo</Link>
          </div>
        </div>
      </section>

      <FaqAccordion faqs={x?.faq} />

      {/* related */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Related solutions</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/solutions/${r.slug}`} className="card">
                <h3 className="text-lg font-medium">{r.name}</h3>
                <p className="mt-2 text-sm text-muted">{r.blurb}</p>
                <span className="mt-4 inline-block font-mono text-xs text-accent">Explore →</span>
              </Link>
            ))}
          </div>
          <Link href="/services" className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-cyan hover:underline">
            Need something custom-built? See Services →
          </Link>
        </div>
      </section>

      <LeadCTA
        title={`Deploy ${s.name} for your team.`}
        sub="Tell us your use case. We'll show you a live demo and a fixed-price plan to get it running."
        primary="Book a demo →"
        secondary={{ label: "Need something custom?", href: "/services" }}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

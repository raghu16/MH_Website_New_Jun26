import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { animOf } from "@/lib/anim";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";
import LeadCTA from "@/components/LeadCTA";
import ProcessBand from "@/components/ProcessBand";

const deliverables = [
  "A working prototype in weeks — evaluated against real success criteria",
  "Production-grade, documented code that you own 100%",
  "Security, testing and (for AI) evals built in",
  "Deployment, handover and knowledge transfer",
  "Optional post-launch support and iteration",
];

const engagement = [
  { t: "Product sprint", d: "For startups & product teams — a senior squad, fixed scope, shipped in focused sprints." },
  { t: "Enterprise engagement", d: "For larger orgs — embedded teams, governance, security and SLAs." },
];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `${site.url}/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.eyebrow,
    description: s.metaDescription,
    provider: { "@type": "Organization", name: "Monkhub", url: site.url },
    areaServed: "Worldwide",
    url: `${site.url}/services/${s.slug}`,
  };

  return (
    <>
      {/* hero with context animation */}
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-70">
          <SectionCanvas variant={animOf(s.slug)} />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24 md:py-28">
          <nav className="font-mono text-xs text-muted">
            <Link href="/services" className="hover:text-accent">Services</Link>
            <span className="px-2">/</span>
            <span className="text-paper/70">{s.eyebrow}</span>
          </nav>
          <div className="mt-8 flex items-center gap-3">
            <span className="eyebrow">{s.eyebrow}</span>
            {s.flag && (
              <span className="rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                Flagship
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.02] md:text-6xl">{s.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{s.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us" className="btn-primary">Get a fixed-price proposal →</Link>
            <Link href="/our-work" className="btn-ghost">See related work</Link>
          </div>
        </div>
      </section>

      {/* problem */}
      <section className="border-b border-ink-700">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[0.5fr_1fr]">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent">The problem</h2>
          <p className="max-w-2xl text-2xl leading-snug text-paper/90">{s.problem}</p>
        </div>
      </section>

      {/* what we build */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">What we build</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.build.map((b) => (
              <div key={b.t} className="card">
                <h3 className="text-lg font-medium">{b.t}</h3>
                <p className="mt-2 text-sm text-muted">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why + tech */}
      <section className="border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">Why Monkhub</p>
            <ul className="mt-8 space-y-4">
              {s.why.map((w) => (
                <li key={w} className="flex items-start gap-3 text-paper/90">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Tech & integrations</p>
            <p className="mt-8 font-mono text-sm leading-7 text-muted">{s.tech}</p>
          </div>
        </div>
      </section>

      {/* what you get */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">What you get</p>
            <ul className="mt-8 space-y-4">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-paper/90">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">How we engage</p>
            <div className="mt-8 grid gap-4">
              {engagement.map((e) => (
                <div key={e.t} className="card">
                  <h3 className="text-lg font-medium">{e.t}</h3>
                  <p className="mt-2 text-sm text-muted">{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* process */}
      <ProcessBand title={`How we deliver ${s.eyebrow.toLowerCase()}.`} />

      {/* faq */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">FAQ</p>
          <div className="mt-10 divide-y divide-ink-700 border-y border-ink-700">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {f.q}
                  <span className="font-mono text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* related */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Related services</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="card">
                <h3 className="text-lg font-medium">{r.eyebrow}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{r.subhead}</p>
                <span className="mt-4 inline-block font-mono text-xs text-accent">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadCTA
        title={`Have a ${s.eyebrow.toLowerCase()} project?`}
        sub="Tell us what you're building. You'll talk to an engineer, not a sales rep — same-day fixed-price proposal."
        secondary={{ label: "See our work", href: "/our-work" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

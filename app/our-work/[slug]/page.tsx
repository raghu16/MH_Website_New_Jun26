import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/work";
import { site } from "@/lib/site";
import LeadCTA from "@/components/LeadCTA";
import CaseMedia from "@/components/CaseMedia";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.result}`,
    description: `${p.name} for ${p.client}: ${p.result}.`,
    alternates: { canonical: `${site.url}/our-work/${p.slug}` },
    openGraph: { title: `${p.name} | Monkhub`, description: p.result },
  };
}

// Per-category services + tech so every case study carries rich, relevant detail.
const categoryMeta: Record<string, { services: string[]; tech: string[] }> = {
  Geospatial: { services: ["GeoAI", "Computer Vision", "Data Engineering"], tech: ["PyTorch", "GDAL / rasterio", "ArcGIS", "deck.gl"] },
  Web: { services: ["Web Engineering", "Backend & APIs", "Integrations"], tech: ["Next.js", "Node", "PostgreSQL", "Cloud"] },
  XR: { services: ["XR / 3D", "Real-time", "UX & Design"], tech: ["Unity", "Unreal", "WebXR", "Blender"] },
  Mobile: { services: ["Mobile", "Product", "Backend"], tech: ["Swift", "Kotlin", "Flutter", "Firebase"] },
  AI: { services: ["AI / ML", "RAG & Retrieval", "Data"], tech: ["Python", "PyTorch", "Vector DB", "OpenAI / Anthropic"] },
  Voice: { services: ["Voice AI", "Telephony", "CRM Integration"], tech: ["Vapi", "Twilio", "ElevenLabs", "Node"] },
  Web3: { services: ["Smart Contracts", "dApp", "Security & Audits"], tech: ["Solidity", "Hardhat", "ethers.js", "The Graph"] },
  Game: { services: ["Game Development", "LiveOps", "Backend"], tech: ["Unity", "C#", "Multiplayer", "Cloud"] },
};

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const t = p.accent === "cyan"
    ? { text: "text-cyan", grad: "from-cyan/30 via-cyan/[0.06] to-transparent", dot: "bg-cyan", chip: "bg-cyan/15 text-cyan" }
    : { text: "text-accent", grad: "from-accent/30 via-accent/[0.06] to-transparent", dot: "bg-accent", chip: "bg-accent/15 text-accent" };
  const meta = categoryMeta[p.category] ?? { services: p.tags, tech: ["Custom stack"] };
  const related = projects.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const fallback = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  const more = (related.length ? related : fallback).slice(0, 3);

  const glance: [string, string][] = [
    ["Client", p.client],
    ["Industry", p.category],
    ["Services", meta.services.join(" · ")],
    ["Year", p.year],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    about: p.result,
    creator: { "@type": "Organization", name: "Monkhub" },
    url: `${site.url}/our-work/${p.slug}`,
  };

  return (
    <>
      {/* hero */}
      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <nav className="font-mono text-xs text-muted">
            <Link href="/our-work" className="hover:text-accent">Our work</Link>
            <span className="px-2">/</span>
            <span className="text-paper/70">{p.name}</span>
          </nav>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted">{p.category} · {p.year}</div>
              <h1 className="mt-3 font-serif text-5xl leading-[1.0] md:text-6xl">{p.name}</h1>
              <p className="mt-2 text-muted">{p.client}</p>
              <p className={`mt-5 max-w-md text-xl ${t.text}`}>{p.result}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-ink-800 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{tag}</span>
                ))}
              </div>
              <Link href="/contact-us" className="btn-primary mt-8">Start a similar project →</Link>
            </div>
            <CaseMedia item={p.hero} accent={p.accent} char={p.name.charAt(0)} priority />
          </div>
        </div>
      </section>

      {/* at a glance */}
      <section className="border-b border-ink-700 bg-ink-950">
        <div className="container-page grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {glance.map(([k, v]) => (
            <div key={k} className="px-2 py-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{k}</div>
              <div className="mt-1.5 text-sm text-paper/90">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* overview */}
      <section className="border-b border-ink-700">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[0.4fr_1fr]">
          <p className="eyebrow">Overview</p>
          <p className="max-w-2xl text-2xl leading-snug text-paper/90">
            We partnered with {p.client} to deliver {p.result.toLowerCase()}. Below: the challenge, our
            approach, what we built, and the outcomes.
          </p>
        </div>
      </section>

      {/* challenge */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[0.4fr_1fr]">
          <p className="eyebrow">The challenge</p>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{p.challenge}</p>
        </div>
      </section>

      {/* approach steps */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Our approach</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-3">
            {p.approach.map((a, i) => (
              <div key={a} className="bg-ink-950 p-7">
                <div className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</div>
                <p className="mt-3 text-paper/90">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery / what we built — images & videos */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">What we built</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(p.gallery && p.gallery.length ? p.gallery : [undefined, undefined, undefined]).map((m, i) => (
              <CaseMedia key={i} item={m} accent={i % 2 ? "cyan" : p.accent} char={p.name.charAt(0)} />
            ))}
          </div>
          {!p.gallery?.length && (
            <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
              Add images &amp; videos in <span className="text-paper/70">lib/work.ts → gallery</span> (local /public or CDN URLs).
            </p>
          )}
        </div>
      </section>

      {/* results */}
      <section className="border-b border-ink-700">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">The results</p>
            <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight md:text-4xl">{p.result}.</h2>
            <p className="mt-5 max-w-md text-muted">
              Shipped to production and built to last — secure, maintainable and owned by {p.client}.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {p.outcomes.map((o) => (
              <div key={o.l} className="card">
                <div className="font-serif text-4xl">{o.v}</div>
                <div className="mt-1 mono-label">{o.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tech */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[0.4fr_1fr]">
          <p className="eyebrow">Tech &amp; services</p>
          <div>
            <div className="flex flex-wrap gap-2">
              {meta.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-ink-700 px-3 py-1.5 font-mono text-xs text-paper/80">{tech}</span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.services.map((s) => (
                <span key={s} className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${t.chip}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <p className="eyebrow">More work</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/our-work/${m.slug}`} className="card">
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{m.category}</span>
                <h3 className="mt-2 font-serif text-xl">{m.name}</h3>
                <p className="mt-1 text-sm text-muted">{m.result}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadCTA
        title="Have a project like this?"
        sub="Tell us what you're building. You'll talk to an engineer — same-day fixed-price proposal."
        secondary={{ label: "See more work", href: "/our-work" }}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

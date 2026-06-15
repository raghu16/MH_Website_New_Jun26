import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import WorkShowcase from "@/components/WorkShowcase";
import Testimonials from "@/components/Testimonials";
import ConsultantButton from "@/components/ConsultantButton";
import SectionCanvas from "@/components/SectionCanvas";
import { animOf } from "@/lib/anim";

const stats = [
  { v: "250+", l: "products shipped" },
  { v: "100%", l: "code ownership" },
  { v: "Senior", l: "engineers only" },
  { v: "Same-day", l: "fixed-price proposal" },
];

const pillars = [
  // AI & Agents
  {
    title: "AI Agent Development",
    flag: true,
    desc: "Custom agents that act — RAG, multi-agent orchestration, copilots — with the evals and guardrails to keep them reliable in production.",
    href: "/services/ai-agent-development",
    tags: ["Custom agents", "Multi-agent", "Evals & guardrails"],
  },
  {
    title: "Voice AI Agents",
    desc: "Natural, sub-500ms voice agents that resolve calls, book appointments and qualify leads 24/7 — and escalate to a human when they should.",
    href: "/services/voice-ai-agents",
    tags: ["Deflection", "Booking & intake", "Telephony"],
  },
  {
    title: "Geospatial Intelligence",
    desc: "Turn satellite, drone and location data into decisions. GeoAI engineered for the field — detection, change monitoring, digital twins.",
    href: "/services/geospatial-intelligence",
    tags: ["Imagery analysis", "Change detection", "GIS"],
  },
  // Applications
  {
    title: "AI Solutions Development",
    desc: "Custom AI/ML solutions and MVPs on your data — production-grade and fast. Fixed scope, fixed price, you own the code.",
    href: "/services/ai-solutions-development",
    tags: ["AI MVPs", "Custom AI/ML", "Fixed price"],
  },
  {
    title: "Mobile App Development",
    desc: "AI-native mobile products people keep on their home screen — built around retention and revenue, not just a build.",
    href: "/services/mobile-app-development",
    tags: ["iOS & Android", "Cross-platform", "On-device ML"],
  },
  {
    title: "Web 3 Development",
    desc: "Smart contracts, dApps, tokens and wallets — secure, audit-ready and production-grade, with mainstream UX on decentralized rails.",
    href: "/services/web3-development",
    tags: ["Smart contracts", "dApps", "DeFi & NFTs"],
  },
  // Immersive
  {
    title: "XR Development",
    desc: "Immersive AR/VR experiences that train, simulate and engage — measurably. Enterprise XR, AR, Unity & Unreal.",
    href: "/services/xr-development",
    tags: ["XR training", "AR", "Unity & Unreal"],
  },
  {
    title: "Game Development",
    desc: "Mobile, PC and applied games on Unity & Unreal — full-cycle, engineered for engagement and measurable outcomes.",
    href: "/services/game-development",
    tags: ["Unity & Unreal", "Full-cycle", "LiveOps"],
  },
  {
    title: "3D Art",
    desc: "3D modelling, animation and visualization for games, XR, product and marketing — crafted, optimized and pipeline-ready.",
    href: "/services/3d-art",
    tags: ["Modelling", "Animation", "Product viz"],
  },
];

const steps = [
  { n: "01", t: "Discover", d: "We pressure-test the use case, data and ROI before writing code — and send a same-day fixed-price proposal." },
  { n: "02", t: "Build", d: "AI-accelerated delivery with senior engineers. You see a working demo every week — speed you can watch happen." },
  { n: "03", t: "Harden", d: "Code review, security and test gates, evals — the engineering that decides whether it survives real users." },
  { n: "04", t: "Ship & scale", d: "Deploy to production, measure the outcome, and keep improving. You own all the code, no lock-in." },
];

const faqs = [
  {
    q: "If AI does part of this, why am I paying agency rates?",
    a: "Because production-grade software is far more than generated code. The hard part — architecture, security, auth, payments, scale — is senior engineering, and it's what decides whether something survives real users. You're paying for software that works in the real world and that you own, at a fixed price — not for hours.",
  },
  {
    q: "How exactly do you use AI to go faster?",
    a: "AI is in our entire delivery process — scaffolding, boilerplate, tests, and research. That compresses the build. Senior engineers stay in the loop for architecture and review, so speed never costs you reliability.",
  },
  {
    q: "Is the AI-generated code secure and maintainable?",
    a: "Every line passes human code review, security and test gates, and (for AI features) evals before it ships. We don't deliver black-box output — you get clean, documented, maintainable code with no copy-paste sprawl.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do — 100%. No lock-in, no proprietary wrappers you can't leave.",
  },
  {
    q: "We built a prototype in Lovable/Bolt that won't launch. Can you help?",
    a: "Yes. We take prototypes to production — a readiness assessment, then we keep what works, refactor what's salvageable, and rebuild what isn't, on a real foundation.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <HeroBackground />
        <div className="hero-scrim absolute inset-0" />

        <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-28">
          <p className="eyebrow animate-fade-up text-sm font-bold tracking-[0.28em] text-accent md:text-base">AI-native product engineering studio</p>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[1.04] tracking-tight sm:text-7xl md:text-8xl">
            <span className="animate-blur-in inline-block pb-[0.12em]">Ship at</span>{" "}
            <span className="animate-blur-in inline-block bg-gradient-to-r from-accent via-accent-soft to-cyan bg-clip-text pb-[0.14em] italic text-transparent [animation-delay:120ms]">
              hyperspeed.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-paper/85 animate-fade-up [animation-delay:200ms]">
            AI runs through our entire delivery process, so your product ships sooner — and senior
            engineers own the architecture, security and scale, so it lasts. Fixed price. You own all
            the code.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:300ms]">
            <Link href="/contact-us" className="btn-primary">
              Get a fixed-price proposal →
            </Link>
            <Link href="/our-work" className="btn-ghost">
              See what we&apos;ve shipped
            </Link>
          </div>

          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-4 animate-fade-up [animation-delay:400ms]">
            {stats.map((s) => (
              <div key={s.l} className="bg-ink-950/80 p-4 backdrop-blur-sm">
                <div className="font-serif text-3xl text-paper">{s.v}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted/70">tip: press & hold anywhere to accelerate ↑</p>
        </div>
      </section>

      {/* ───────────────── LOGO PROOF BAR ───────────────── */}
      <section className="border-y border-ink-700 bg-ink-950">
        <div className="container-page flex flex-wrap items-center gap-x-10 gap-y-4 py-8">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Teams that ship with us</span>
          {["PwC", "Honda", "Airmeet", "Skillmatics", "Ronnie Coleman"].map((b) => (
            <span key={b} className="text-lg font-semibold text-paper/40">{b}</span>
          ))}
        </div>
      </section>

      {/* ───────────────── SELECTED WORK (showcase slider) ───────────────── */}
      <section className="border-b border-ink-700">
        <div className="container-page py-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Shipped, not slideware.</h2>
            </div>
            <Link href="/our-work" className="hidden font-mono text-xs text-accent hover:underline md:block">
              See all work →
            </Link>
          </div>
          <div className="mt-14">
            <WorkShowcase />
          </div>
        </div>
      </section>

      {/* ───────────────── INSTANT SCOPING — AI CONSULTANT ───────────────── */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Instant scoping &amp; quotes</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Scope your project in minutes. <span className="italic text-accent">Talk to our AI consultant.</span>
            </h2>
            <p className="mt-6 text-muted">
              Describe what you&apos;re building and our AI consultant gathers your requirements, gives you
              instant scoping and a quote — then connects you to an engineer for a same-day fixed price.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                "Describe your idea in plain words",
                "Get instant scope, timeline and a ballpark quote",
                "Book a call for a same-day fixed price",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-paper/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs text-accent">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <ConsultantButton className="btn-primary mt-9" />
          </div>

          {/* voice avatar preview */}
          <div className="reg relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/60 p-8 text-center">
            <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span className="live-dot" /> AI Consultant · Voice
            </div>
            <div className="relative mx-auto mt-8 flex h-44 w-44 items-center justify-center">
              <span className="absolute inset-0 animate-pulse rounded-full bg-accent/20 blur-2xl" />
              <span className="absolute inset-3 rounded-full border border-accent/50" />
              <span className="absolute inset-8 rounded-full border border-cyan/40" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ink-950">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" /></svg>
              </span>
            </div>
            <p className="mx-auto mt-8 max-w-xs font-serif text-lg text-paper/90">
              &ldquo;What are you building? I&apos;ll scope it instantly.&rdquo;
            </p>
            <ConsultantButton className="btn-primary mt-6 w-full">Start voice call →</ConsultantButton>
          </div>
        </div>
      </section>

      {/* ───────────────── AI + EXPERTISE = PRODUCTION-GRADE, FAST ───────────────── */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">AI speed, human expertise</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              AI makes us fast. <span className="italic text-accent">Expertise makes it real.</span>
            </h2>
            <p className="mt-6 text-muted">
              We use AI across our delivery to move at a pace traditional teams can&apos;t. But software
              that survives real users — secure, scalable, maintainable — takes senior engineering
              judgment. That&apos;s what we bring, and it&apos;s the difference between an impressive demo and
              a product people depend on.
            </p>
            <p className="mt-4 text-muted">
              The result: the speed of AI with the reliability of a senior team — production-grade
              software that works in the real world, shipped in weeks.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { k: "Fast by design", v: "AI woven through our delivery, so you ship in weeks — not quarters." },
              { k: "Built to last", v: "Senior engineers own architecture, security, scale and the hard last mile." },
              { k: "Production-grade & yours", v: "Secure, maintainable, documented code that works in the real world. You own 100%." },
            ].map((row) => (
              <div key={row.k} className="card">
                <div className="font-mono text-xs uppercase tracking-widest text-accent">{row.k}</div>
                <div className="mt-2 text-paper/90">{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── HOW WE SHIP FAST ───────────────── */}
      <section className="border-b border-ink-700">
        <div className="container-page py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">How we ship fast</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
                Speed you can watch happen — a working demo every week.
              </h2>
            </div>
            <p className="max-w-sm text-muted">
              Speed isn&apos;t a promise here, it&apos;s a process. Fixed scope, senior-only squads, and a
              weekly demo cadence so you see momentum, not status reports.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="bg-ink-950 p-7">
                <div className="font-mono text-sm text-accent">{s.n}</div>
                <h3 className="mt-3 text-xl font-medium">{s.t}</h3>
                <p className="mt-3 text-sm text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── WHAT WE BUILD ───────────────── */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-24">
          <p className="eyebrow">What we build</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            One AI-native studio. Everything we build.
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`hover-glow group flex flex-col overflow-hidden rounded-2xl border bg-ink-900/60 hover:-translate-y-1 ${p.flag ? "border-accent/40" : "border-ink-700 hover:border-accent/50"}`}
              >
                {/* animated visual — static at rest, animates on hover */}
                <div className="relative h-28 overflow-hidden border-b border-ink-700 bg-ink-950">
                  <SectionCanvas variant={animOf(p.href.replace("/services/", ""))} hover className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                  {p.flag && (
                    <span className="absolute left-4 top-4 rounded-full border border-accent/40 bg-ink-950/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
                      Flagship
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-medium text-paper">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-ink-800 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── TESTIMONIALS ───────────────── */}
      <Testimonials />

      {/* ───────────────── HOW WE PRICE ───────────────── */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">How we price</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Fixed price. <span className="italic text-accent">No surprise invoices.</span>
            </h2>
            <p className="mt-6 text-muted">
              Tell us what you&apos;re building and you&apos;ll have a same-day fixed-price proposal —
              scoped, transparent, and planned around your timeline. No hourly meter, no scope-creep tax.
            </p>
            <Link href="/contact-us" className="btn-primary mt-8">
              Get a fixed-price proposal →
            </Link>
          </div>
          <div className="grid gap-4">
            {[
              ["Fixed scope, fixed price", "You know the number before we start. We absorb the scope-creep risk, not you."],
              ["Milestone payments", "Split across milestones — never everything up front."],
              ["100% code ownership", "Everything we build is yours. No lock-in, no proprietary cage."],
            ].map(([k, v]) => (
              <div key={k} className="card flex items-start gap-4">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <div className="font-medium text-paper">{k}</div>
                  <div className="mt-1 text-sm text-muted">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── LOVABLE RESCUE WEDGE ───────────────── */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-ink-900 to-ink-950 p-10 md:p-14">
            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <p className="eyebrow">Stuck at the technical cliff?</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                  Built a demo in Lovable, Bolt or Cursor that won&apos;t launch? We take prototypes to production.
                </h2>
                <p className="mt-5 max-w-xl text-muted">
                  A beautiful UI with no foundation — no auth, no security, no scale. We assess what you have,
                  keep what works, refactor what&apos;s salvageable, and rebuild the rest on a real foundation.
                </p>
              </div>
              <div>
                <Link href="/contact-us" className="btn-primary w-full md:w-auto">
                  Get a production-readiness review →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── TRUST & GOVERNANCE ───────────────── */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20 text-center">
          <p className="eyebrow">Built to pass procurement</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            AI speed, enterprise-grade trust.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Human code review", "Security & test gates", "Evals & guardrails", "SOC 2-ready", "GDPR", "100% IP ownership"].map((b) => (
              <span key={b} className="rounded-full border border-ink-700 bg-ink-900 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-24">
          <p className="eyebrow">Questions buyers ask us</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">The honest answers.</h2>
          <div className="mt-12 divide-y divide-ink-700 border-y border-ink-700">
            {faqs.map((f) => (
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

      {/* ───────────────── FINAL CTA ───────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-page py-28 text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-5xl leading-[1.02] md:text-6xl">
            Let&apos;s ship something that works.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Tell us what you&apos;re building. You&apos;ll talk to an engineer, not a sales rep — and leave with a
            clear read on feasibility, timeline and a fixed price.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us" className="btn-primary">Get a fixed-price proposal →</Link>
            <a href="mailto:hello@monkhub.com" className="btn-ghost">hello@monkhub.com</a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

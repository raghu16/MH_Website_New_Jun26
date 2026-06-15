import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import SectionCanvas from "@/components/SectionCanvas";

export const metadata: Metadata = {
  title: "Careers — Build AI That Ships",
  description:
    "Join Monkhub, an AI-native product engineering studio. Senior, AI-first, shipping real products. See open roles, culture and benefits.",
};

const roles = [
  ["Senior AI Engineer", "Engineering", "Remote / Gurugram", "Full-time"],
  ["Full-Stack Product Engineer", "Engineering", "Remote / Gurugram", "Full-time"],
  ["Voice AI Engineer", "Engineering", "Remote", "Full-time"],
  ["Geospatial / ML Engineer", "Engineering", "Remote / Gurugram", "Full-time"],
  ["Product Designer", "Design", "Remote / Gurugram", "Full-time"],
];

const culture = [
  ["Senior-led, no busywork", "Small teams of senior people who own real outcomes — not a layer of juniors learning on the client's budget."],
  ["AI-first, by default", "We use the best AI tools across our work, and you'll help define how we build with them."],
  ["Ship real things", "Production software for real users and real clients — not endless prototypes or slideware."],
  ["Craft + speed", "We move fast without shipping slop. Quality is the point; speed is how we get there."],
];

const benefits = [
  "Remote-friendly, flexible hours",
  "Competitive pay + real ownership",
  "Latest AI tooling, on us",
  "Learning & conference budget",
  "Work across AI, voice, geospatial & XR",
  "Senior mentorship, fast growth",
];

const hiring = [
  { n: "01", t: "Apply", d: "Send your CV and a link to work you're proud of." },
  { n: "02", t: "Intro call", d: "A short conversation about you, us and the role." },
  { n: "03", t: "Technical conversation", d: "A practical discussion or work sample — no whiteboard puzzles." },
  { n: "04", t: "Offer", d: "Move fast to a decision and an offer." },
];

export default function Careers() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0 opacity-60">
          <SectionCanvas variant="careers" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="container-page relative py-24 md:py-28">
          <p className="eyebrow">Careers</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">
            Build AI that ships — with people who care how it&apos;s built.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            We&apos;re a senior, AI-first team that ships real products. If you want to move fast without
            cutting corners — and own real work — we should talk.
          </p>
          <a href="#roles" className="btn-primary mt-8">See open roles →</a>
        </div>
      </section>

      {/* culture */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Life at Monkhub</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            How we work, and why people stay.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {culture.map(([t, d]) => (
              <div key={t} className="card">
                <h3 className="text-xl font-medium">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* benefits */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Benefits</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b} className="card flex items-start gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-paper/90">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* hiring process */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">How we hire</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            Fast, respectful, no whiteboard puzzles.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-4">
            {hiring.map((s) => (
              <div key={s.n} className="bg-ink-950 p-7">
                <div className="font-mono text-sm text-accent">{s.n}</div>
                <h3 className="mt-3 text-lg font-medium">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* open roles */}
      <section id="roles" className="scroll-mt-24 border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Open roles</p>
          <div className="mt-8 divide-y divide-ink-700 border-y border-ink-700">
            {roles.map(([title, team, loc, type]) => (
              <div key={title} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">{team} · {loc} · {type}</p>
                </div>
                <a href={`mailto:${site.email}?subject=Application: ${title}`} className="btn-ghost shrink-0">Apply →</a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Don&apos;t see your role? Send us your work at{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a>.
          </p>
        </div>
      </section>

      <section className="container-page py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl md:text-5xl">Let&apos;s build together.</h2>
        <a href={`mailto:${site.email}`} className="btn-primary mt-8">Get in touch →</a>
      </section>
    </>
  );
}

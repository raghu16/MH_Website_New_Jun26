import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — AI-Native Product Engineering Studio",
  description:
    "Monkhub is an AI-native product engineering studio founded in 2017. We ship production-grade software fast — AI agents, voice, geospatial, mobile and XR.",
};

const beliefs = [
  ["Outcomes over output", "We measure ourselves on what ships and what it does — not hours billed."],
  ["Reliability is a feature", "AI speed means nothing if it breaks in production. We engineer for the 30% that lasts."],
  ["Senior-led craft", "The people you meet on the call are the people who write your code."],
  ["AI where your users are", "Agents don't live in a sandbox — they live in your app, your call, your map."],
];

const stats = [
  ["2017", "founded"],
  ["250+", "products shipped"],
  ["150+", "clients"],
  ["8+", "years"],
];

export default function About() {
  return (
    <>
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-24">
          <p className="eyebrow">About Monkhub</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] md:text-6xl">
            We ship AI that works.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Founded in 2017, Monkhub is an AI-native product engineering studio. We&apos;ve shipped 250+
            products across AI agents, voice, geospatial, mobile and immersive — for funded startups and
            enterprises on four continents. AI makes us fast; senior engineering makes it last.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-4">
            {stats.map(([v, l]) => (
              <div key={l} className="bg-ink-950 p-6">
                <div className="font-serif text-3xl">{v}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">What we believe</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {beliefs.map(([t, d]) => (
              <div key={t} className="card">
                <h3 className="text-xl font-medium">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* leadership */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            Senior people who write the code.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            The people you meet on the call are the people who build your product. (Replace with real
            leadership — name, role, photo and a one-line bio.)
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["[Founder Name]", "Founder & CEO"],
              ["[Name]", "Head of AI"],
              ["[Name]", "Head of Engineering"],
              ["[Name]", "Head of Design"],
            ].map(([name, role], i) => (
              <div key={role} className="card">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full font-mono text-lg ${i % 2 ? "bg-cyan/15 text-cyan" : "bg-accent/15 text-accent"}`}>
                  {name.charAt(1)}
                </div>
                <h3 className="mt-5 text-lg font-medium">{name}</h3>
                <p className="mt-1 text-sm text-muted">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-20">
          <p className="eyebrow">Our journey</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-4">
            {[
              ["2017", "Founded", "Started as a product studio building mobile and web."],
              ["2020", "Web3 & XR", "Shipped blockchain, NFT and immersive products at scale."],
              ["2023", "AI-first", "Reoriented the studio around AI agents and applied ML."],
              ["2026", "250+ shipped", "Agents, voice, geospatial and VR across four continents."],
            ].map(([y, t, d]) => (
              <div key={y} className="bg-ink-950 p-7">
                <div className="font-mono text-sm text-accent">{y}</div>
                <h3 className="mt-3 text-lg font-medium">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* recognition */}
      <section className="border-b border-ink-700">
        <div className="container-page py-20 text-center">
          <p className="eyebrow">Recognition &amp; clients</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Clutch ★ 4.9", "GoodFirms", "DesignRush", "SOC 2-ready"].map((b) => (
              <span key={b} className="rounded-full border border-ink-700 bg-ink-900 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted">{b}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["PwC", "Honda", "Airmeet", "Skillmatics", "Ronnie Coleman"].map((c) => (
              <span key={c} className="text-lg font-semibold text-paper/40">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-texture">
        <div className="container-page py-24 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl md:text-5xl">Build with a studio that ships.</h2>
          <p className="mx-auto mt-5 max-w-md text-muted">Gurugram HQ · serving clients globally.</p>
          <Link href="/contact-us" className="btn-primary mt-8">Get a fixed-price proposal →</Link>
        </div>
      </section>
    </>
  );
}

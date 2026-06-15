import type { Metadata } from "next";
import Link from "next/link";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Our Work — Production Software, Shipped",
  description:
    "Selected Monkhub case studies across AI, voice, geospatial, mobile, Web3, XR and gaming. Production software, shipped — not slideware.",
};

export default function OurWork() {
  return (
    <>
      <section className="grid-texture border-b border-ink-700">
        <div className="container-page py-24">
          <p className="eyebrow">Our work</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.0] md:text-6xl">
            Production software, shipped.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            A selection of case studies across AI, voice, geospatial, mobile, Web3 and immersive —
            real products, real users, not slideware.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-4">
            {[
              ["250+", "products shipped"],
              ["150+", "clients"],
              ["4", "continents"],
              ["8+", "years"],
            ].map(([v, l]) => (
              <div key={l} className="bg-ink-950 p-6">
                <div className="font-serif text-3xl">{v}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-700">
        <div className="container-page py-16">
          <WorkGrid />
        </div>
      </section>

      <section className="container-page py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl md:text-5xl">Your project, shipped next.</h2>
        <p className="mx-auto mt-5 max-w-lg text-muted">Tell us what you&apos;re building — same-day fixed-price proposal.</p>
        <Link href="/contact-us" className="btn-primary mt-8">Start your project →</Link>
      </section>
    </>
  );
}

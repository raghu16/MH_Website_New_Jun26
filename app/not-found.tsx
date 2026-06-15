import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid-texture">
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">
          Lost in <span className="italic text-accent">hyperspace.</span>
        </h1>
        <p className="mt-6 max-w-md text-muted">
          This page doesn&apos;t exist — or it shipped somewhere else. Let&apos;s get you back on course.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back home →</Link>
          <Link href="/services" className="btn-ghost">Explore services</Link>
        </div>
      </div>
    </section>
  );
}

const defaultSteps = [
  { n: "01", t: "Discover", d: "We pressure-test the use case, data and ROI — and send a same-day fixed-price proposal." },
  { n: "02", t: "Prototype", d: "A working proof in weeks, evaluated against real success criteria, not a slide deck." },
  { n: "03", t: "Engineer", d: "Production build: architecture, security, integration, evals and observability." },
  { n: "04", t: "Ship & scale", d: "Deploy, measure the outcome, and keep improving. You own 100% of the code." },
];

export default function ProcessBand({
  eyebrow = "How we work",
  title = "From idea to in-production — without the science project.",
  steps = defaultSteps,
}: {
  eyebrow?: string;
  title?: string;
  steps?: { n: string; t: string; d: string }[];
}) {
  return (
    <section className="border-b border-ink-700">
      <div className="container-page py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-4">
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
  );
}

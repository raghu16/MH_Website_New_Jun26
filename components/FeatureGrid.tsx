/** Richer "what we build / what's inside" cards — numbered, hover-lift + glow. */
export default function FeatureGrid({
  items,
  accent = "magenta",
}: {
  items: { t: string; d: string }[];
  accent?: "magenta" | "cyan";
}) {
  const text = accent === "cyan" ? "text-cyan" : "text-accent";
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <div
          key={f.t}
          className="hover-glow group rounded-2xl border border-ink-700 bg-ink-900/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
        >
          <div className={`font-mono text-sm ${text}`}>{String(i + 1).padStart(2, "0")}</div>
          <h3 className="mt-3 text-lg font-medium text-paper">{f.t}</h3>
          <p className="mt-2 text-sm text-muted">{f.d}</p>
        </div>
      ))}
    </div>
  );
}

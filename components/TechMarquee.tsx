/** Animated marquee for tech stacks / integrations (wires the .marquee CSS). */
export default function TechMarquee({ items, label }: { items?: string[]; label?: string }) {
  if (!items?.length) return null;
  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="marquee__track" aria-hidden={hidden}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-3 whitespace-nowrap font-mono text-sm uppercase tracking-[0.15em] text-muted">
          {it} <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div>
      {label && <p className="mono-label container-page mb-5">{label}</p>}
      <div className="marquee border-y border-ink-700 py-5">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}

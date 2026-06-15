import CountUp from "./CountUp";

/** Impact-metrics strip with count-up animation. */
export default function StatBand({ stats }: { stats?: { v: string; l: string }[] }) {
  if (!stats?.length) return null;
  return (
    <section className="border-b border-ink-700 bg-ink-950">
      <div className="container-page grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="px-2 py-9">
            <div className="font-serif text-4xl text-paper md:text-5xl">
              <CountUp value={s.v} />
            </div>
            <div className="mt-2 mono-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

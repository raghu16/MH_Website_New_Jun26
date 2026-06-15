// NOTE: illustrative testimonials — replace quotes/names with real, approved
// attributions before launch (name, title, company, ideally a headshot).
const items = [
  {
    quote:
      "They shipped our voice agent to production in nine weeks. It now handles the majority of our inbound calls — and the code is ours.",
    name: "[Name]",
    role: "Head of Customer Experience",
    company: "Airmeet",
    accent: "cyan",
  },
  {
    quote:
      "Monkhub didn't just build an app — they owned the outcome. Retention is up, the experience is polished, and they moved fast without cutting corners.",
    name: "[Name]",
    role: "Product Lead",
    company: "Skillmatics",
    accent: "magenta",
  },
  {
    quote:
      "Senior engineers who move at startup speed but build like an enterprise team. Exactly what we needed to get to market.",
    name: "[Name]",
    role: "CTO",
    company: "Garantie",
    accent: "cyan",
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-ink-700">
      <div className="container-page py-24">
        <p className="eyebrow">What clients say</p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          Built with teams who ship.
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.company} className="card flex flex-col">
              <blockquote className="flex-1 font-serif text-xl leading-snug text-paper/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm ${t.accent === "cyan" ? "bg-cyan/15 text-cyan" : "bg-accent/15 text-accent"}`}>
                  {t.company.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block text-paper">{t.name}</span>
                  <span className="block text-muted">{t.role}, {t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

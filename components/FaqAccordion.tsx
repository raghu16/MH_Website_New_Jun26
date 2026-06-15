/** FAQ accordion + FAQPage JSON-LD. */
export default function FaqAccordion({ faqs, title = "FAQ" }: { faqs?: { q: string; a: string }[]; title?: string }) {
  if (!faqs?.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="grid-texture border-b border-ink-700">
      <div className="container-page py-20">
        <p className="eyebrow">{title}</p>
        <div className="mt-10 divide-y divide-ink-700 border-y border-ink-700">
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </section>
  );
}

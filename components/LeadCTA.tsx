import Link from "next/link";

/**
 * Lead-gen CTA band — single primary action, proof reassurance, fast-proposal
 * promise. Applies the conversion research: one focused CTA, outcome-framed,
 * with trust microcopy.
 */
export default function LeadCTA({
  title = "Let's ship something that works.",
  sub = "Tell us what you're building. You'll talk to an engineer, not a sales rep — and get a same-day fixed-price proposal.",
  primary = "Get a fixed-price proposal →",
  secondary,
}: {
  title?: string;
  sub?: string;
  primary?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-ink-700">
      <div className="container-page py-20 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">{sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact-us" className="btn-primary">{primary}</Link>
          {secondary && <Link href={secondary.href} className="btn-ghost">{secondary.label}</Link>}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>Fixed price</span><span>·</span><span>Milestone payments</span><span>·</span><span>100% code ownership</span>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { projects } from "@/lib/work";
import CaseMedia from "./CaseMedia";

/** Pulls a matching project (by slug, then category) and renders a rich,
 *  clickable featured case study with media. */
export default function FeaturedCaseStudy({ category, slug }: { category?: string; slug?: string }) {
  const p =
    (slug && projects.find((x) => x.slug === slug)) ||
    projects.find((x) => x.category === category) ||
    projects[0];
  if (!p) return null;
  const text = p.accent === "cyan" ? "text-cyan" : "text-accent";

  return (
    <section className="border-b border-ink-700">
      <div className="container-page py-20">
        <p className="eyebrow">Featured work</p>
        <Link href={`/our-work/${p.slug}`} className="group mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <CaseMedia item={p.hero} accent={p.accent} char={p.name.charAt(0)} />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">{p.category} · {p.year}</div>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">{p.name}</h3>
            <p className="mt-2 text-muted">{p.client}</p>
            <p className={`mt-4 text-lg ${text}`}>{p.result}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-ink-800 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{tag}</span>
              ))}
            </div>
            <span className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-accent group-hover:underline">Read the case study →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

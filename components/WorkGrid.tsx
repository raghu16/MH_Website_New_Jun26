"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, workCategories, type Project } from "@/lib/work";

const PER_PAGE = 6;

const theme = (a: "magenta" | "cyan") =>
  a === "cyan"
    ? { text: "text-cyan", grad: "from-cyan/30 via-cyan/[0.06] to-transparent", chip: "bg-cyan/15 text-cyan" }
    : { text: "text-accent", grad: "from-accent/30 via-accent/[0.06] to-transparent", chip: "bg-accent/15 text-accent" };

function Media({ p, tall = false }: { p: Project; tall?: boolean }) {
  const t = theme(p.accent);
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-ink-700 ${tall ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${t.grad}`} />
      <div className="absolute inset-0 blueprint-dense opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-serif text-[34vw] leading-none opacity-[0.08] md:text-[12rem] ${t.text}`}>{p.name.charAt(0)}</span>
      </div>
      <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink-950/80 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-mono text-xs uppercase tracking-widest text-paper">View case study</span>
        <span className={`font-mono ${t.text}`}>→</span>
      </div>
    </div>
  );
}

function Meta({ p, big = false }: { p: Project; big?: boolean }) {
  const t = theme(p.accent);
  return (
    <div className={big ? "" : "mt-5"}>
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted">{p.category} · {p.year}</div>
      <h3 className={`mt-2 font-serif leading-tight ${big ? "text-4xl md:text-5xl" : "text-2xl"}`}>{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.client}</p>
      <p className={`mt-3 ${big ? "text-lg" : "text-sm"} ${t.text}`}>{p.result}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-ink-800 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function WorkGrid() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(PER_PAGE + 1);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const shown = filtered.slice(0, visible);
  const featured = shown[0];
  const rest = shown.slice(1);
  const hasMore = shown.length < filtered.length;

  const changeFilter = (f: string) => { setFilter(f); setVisible(PER_PAGE + 1); };

  return (
    <div>
      {/* filters */}
      <div className="flex flex-wrap gap-2">
        {workCategories.map((c) => (
          <button
            key={c}
            onClick={() => changeFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              filter === c ? "border-accent text-accent" : "border-ink-700 text-muted hover:border-ink-600 hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured ? (
        <>
          {/* featured */}
          <Link href={`/our-work/${featured.slug}`} className="group mt-12 grid gap-8 md:grid-cols-2 md:items-center">
            <Media p={featured} tall />
            <Meta p={featured} big />
          </Link>

          {/* showcase grid */}
          {rest.length > 0 && (
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {rest.map((p) => (
                <Link key={p.slug} href={`/our-work/${p.slug}`} className="group">
                  <Media p={p} />
                  <Meta p={p} />
                </Link>
              ))}
            </div>
          )}

          {/* load more */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Showing {shown.length} of {filtered.length}
            </span>
            {hasMore && (
              <button onClick={() => setVisible((v) => v + PER_PAGE)} className="btn-ghost">
                Load more work
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="mt-12 text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}

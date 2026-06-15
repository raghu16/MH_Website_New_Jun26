"use client";

import { useEffect, useRef, useState } from "react";

type Accent = "magenta" | "cyan";
type Project = {
  n: string;
  name: string;
  client: string;
  category: string;
  blurb: string;
  detail: string;
  metrics: { v: string; l: string }[];
  services: string;
  accent: Accent;
};

const projects: Project[] = [
  {
    n: "01",
    name: "eNetra",
    client: "Geospatial Intelligence",
    category: "GeoAI · Remote sensing",
    blurb: "Tree intelligence, from space.",
    detail:
      "A GeoAI platform that detects every tree crown from Cartosat-3 satellite imagery, estimates per-tree height from shadow geometry, and classifies species — turning raw 0.28 m imagery into field-ready forest intelligence.",
    metrics: [
      { v: "0.28 m", l: "imagery resolution" },
      { v: "per-tree", l: "detection + height" },
    ],
    services: "Computer vision · Remote sensing",
    accent: "cyan",
  },
  {
    n: "02",
    name: "Consumer Indexing",
    client: "AI · Data Platform",
    category: "RAG · Data engineering",
    blurb: "Millions of records, instantly queryable.",
    detail:
      "An AI indexing engine that ingests, structures and semantically indexes large-scale consumer data — making millions of records instantly searchable and queryable by AI agents, in real time.",
    metrics: [
      { v: "millions", l: "records indexed" },
      { v: "real-time", l: "semantic search" },
    ],
    services: "RAG · Vector search · Pipelines",
    accent: "magenta",
  },
  {
    n: "03",
    name: "Super Neuron",
    client: "Mobile · Game",
    category: "Game · Mobile",
    blurb: "Train your brain, one round at a time.",
    detail:
      "A brain-training mobile game with adaptive difficulty — cognitive challenges that sharpen memory, attention and problem-solving, wrapped in a habit loop that keeps players coming back.",
    metrics: [
      { v: "adaptive", l: "difficulty engine" },
      { v: "iOS + Android", l: "shipped" },
    ],
    services: "Game dev · Mobile",
    accent: "cyan",
  },
  {
    n: "04",
    name: "Voice AI Agent",
    client: "Voice AI",
    category: "Voice · Conversational AI",
    blurb: "Every call answered, 24/7.",
    detail:
      "A sub-500ms voice agent that handles inbound calls end-to-end — answering, qualifying and booking around the clock, with clean human escalation and live CRM sync.",
    metrics: [
      { v: "<500ms", l: "response latency" },
      { v: "24/7", l: "call handling" },
    ],
    services: "Voice AI · Telephony · CRM",
    accent: "magenta",
  },
  {
    n: "05",
    name: "Yeah Buddy",
    client: "Ronnie Coleman · Fitness",
    category: "Mobile · Fitness",
    blurb: "The 8× Mr. Olympia, in your pocket.",
    detail:
      "The official fitness app for Ronnie Coleman — workouts, nutrition and mental wellness in one coaching experience, engineered for a global fan base across iOS and Android.",
    metrics: [
      { v: "8× Mr. O", l: "brand partner" },
      { v: "global", l: "fan base" },
    ],
    services: "Mobile · Product",
    accent: "cyan",
  },
  {
    n: "06",
    name: "Garantie",
    client: "Honda · Automotive",
    category: "Web · Workflow automation",
    blurb: "Honda warranties, on autopilot.",
    detail:
      "Automated two-wheeler warranty management for Honda — instant policy validation and order management that gives dealers real-time access to warranty data and cuts processing time.",
    metrics: [
      { v: "Honda", l: "enterprise client" },
      { v: "automated", l: "warranty ops" },
    ],
    services: "Web · Workflow · Integrations",
    accent: "magenta",
  },
];

const themeOf = (a: Accent) =>
  a === "cyan"
    ? { text: "text-cyan", dot: "bg-cyan", ring: "ring-cyan/40", grad: "from-cyan/30 via-cyan/5 to-transparent", border: "border-cyan/40" }
    : { text: "text-accent", dot: "bg-accent", ring: "ring-accent/40", grad: "from-accent/30 via-accent/5 to-transparent", border: "border-accent/40" };

const AUTOPLAY_MS = 6500;

export default function WorkShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = projects.length;
  const dragX = useRef<number | null>(null);

  const go = (next: number) => setI((next + count) % count);

  // autoplay (respects reduced motion + pause on hover/interaction)
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((v) => (v + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused, count]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (dragX.current = e.clientX)}
      onPointerUp={(e) => {
        if (dragX.current == null) return;
        const dx = e.clientX - dragX.current;
        if (dx > 60) go(i - 1);
        else if (dx < -60) go(i + 1);
        dragX.current = null;
      }}
    >
      {/* big framed card */}
      <div className="reg relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/50">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {projects.map((p) => {
            const t = themeOf(p.accent);
            return (
              <article key={p.n} className="grid w-full shrink-0 md:grid-cols-2">
                {/* text side */}
                <div className="flex flex-col justify-between gap-10 p-8 md:p-14">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-sm ${t.text}`}>{p.n}</span>
                      <span className="h-px w-8 bg-ink-600" />
                      <span className="mono-label">{p.category}</span>
                    </div>
                    <h3 className="mt-7 font-serif text-5xl leading-[0.98] md:text-6xl">{p.name}</h3>
                    <p className={`mt-3 font-serif text-xl italic ${t.text}`}>{p.blurb}</p>
                    <p className="mt-6 max-w-md text-muted">{p.detail}</p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-8">
                      {p.metrics.map((m) => (
                        <div key={m.l}>
                          <div className="font-serif text-3xl text-paper">{m.v}</div>
                          <div className="mt-1 mono-label">{m.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
                      {p.client} · {p.services}
                    </div>
                  </div>
                </div>

                {/* visual side */}
                <div className="relative min-h-[280px] overflow-hidden border-t border-ink-700 md:min-h-full md:border-l md:border-t-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.grad}`} />
                  <div className="absolute inset-0 blueprint-dense opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-serif text-[28vw] leading-none opacity-15 md:text-[12rem] ${t.text}`}>
                      {p.name.charAt(0)}
                    </span>
                  </div>
                  <div className={`absolute bottom-6 left-6 rounded-full border ${t.border} px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${t.text}`}>
                    {p.client}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* project tabs */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {projects.map((p, idx) => (
            <button
              key={p.n}
              onClick={() => go(idx)}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                idx === i ? themeOf(p.accent).text : "text-muted hover:text-paper"
              }`}
            >
              {p.n} {p.name}
            </button>
          ))}
        </div>

        {/* counter + arrows */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted">
            {projects[i].n} <span className="text-ink-600">/ {String(count).padStart(2, "0")}</span>
          </span>
          <div className="flex gap-2">
            <button
              aria-label="Previous project"
              onClick={() => go(i - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-paper transition-colors hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <button
              aria-label="Next project"
              onClick={() => go(i + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-paper transition-colors hover:border-accent hover:text-accent"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-5 h-px w-full bg-ink-700">
        <div
          className={`h-px transition-all duration-500 ${themeOf(projects[i].accent).dot}`}
          style={{ width: `${((i + 1) / count) * 100}%` }}
        />
      </div>
    </div>
  );
}

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  accent: "magenta" | "cyan";
  body: { h?: string; p: string }[];
};

// Illustrative posts — replace with real editorial before launch.
export const posts: Post[] = [
  {
    slug: "ship-ai-agents-past-the-pilot",
    title: "Why most AI agents die in the pilot — and how to ship past it",
    category: "AI Agents",
    excerpt: "Two in three AI initiatives never reach production. The gap isn't the model — it's the engineering around it. Here's what closes it.",
    date: "2026-05-28",
    readTime: "6 min read",
    accent: "magenta",
    body: [
      { p: "The demo always impresses. Then production breaks — on reliability, integration, guardrails and cost. The result is a graveyard of pilots that never shipped." },
      { h: "Reliability is engineering, not luck", p: "Agents fail in production because nothing validated them before launch. Evals, guardrails and human-in-the-loop turn a hopeful prototype into a system you can trust." },
      { h: "Integration is where value lives", p: "An agent that can't reach your systems is a toy. Real value comes from connecting it — via MCP, APIs and your data — so it can actually take action." },
      { h: "Ship small, measure, expand", p: "Production-grade AI is iterative. Start with one bounded, measurable use case, prove the outcome, then widen scope." },
    ],
  },
  {
    slug: "evals-are-the-new-tests",
    title: "Evals are the new tests: proving AI reliability before you ship",
    category: "AI Agents",
    excerpt: "Most teams have observability but no evals. That's backwards. Here's how to make reliability a deliverable, not a hope.",
    date: "2026-05-14",
    readTime: "5 min read",
    accent: "cyan",
    body: [
      { p: "You wouldn't ship software without tests. AI is no different — except the 'tests' are evals that measure whether the system behaves correctly across the cases that matter." },
      { h: "What an eval suite covers", p: "Accuracy on real tasks, refusal and safety behavior, regression on past failures, and adversarial / red-team cases." },
      { h: "Make it a gate", p: "Evals should run before anything reaches a user — a quality gate, not an afterthought." },
    ],
  },
  {
    slug: "voice-ai-sub-500ms",
    title: "Voice AI customers don't hang up on: designing for sub-500ms",
    category: "Voice AI",
    excerpt: "Latency, escalation and persona design are what separate a voice agent people trust from a frustrating phone tree.",
    date: "2026-04-30",
    readTime: "5 min read",
    accent: "cyan",
    body: [
      { p: "Above ~500ms, callers start talking over the agent and the illusion breaks. Latency is the first design constraint, not the last." },
      { h: "Design the escape hatch", p: "The best voice agents know when to hand off. Clean, fast human escalation is a feature, not a failure." },
      { h: "Persona is craft", p: "Tone, pacing and turn-taking are what make an agent feel human. This is design work, not a config toggle." },
    ],
  },
  {
    slug: "satellite-pixels-to-decisions",
    title: "From satellite pixels to decisions: a practical guide to GeoAI",
    category: "Geospatial",
    excerpt: "Imagery is abundant; decisions are scarce. How to turn satellite and drone data into something a team can act on.",
    date: "2026-04-16",
    readTime: "7 min read",
    accent: "magenta",
    body: [
      { p: "The hard part of geospatial intelligence isn't getting the data — it's turning it into a timely, trustworthy decision about a real asset or territory." },
      { h: "Detection, change, decision", p: "Most value comes from detecting objects, monitoring change, and surfacing only what needs a human's attention." },
      { h: "Be explicit about the data", p: "Source, resolution and freshness determine what you can claim. Conservative buyers check — so state it." },
    ],
  },
  {
    slug: "ai-speed-production-quality",
    title: "AI speed, production quality: how we avoid 'AI slop'",
    category: "Engineering",
    excerpt: "AI accelerates delivery — but software that survives real users takes senior engineering judgment. Here's how we balance both.",
    date: "2026-04-02",
    readTime: "4 min read",
    accent: "cyan",
    body: [
      { p: "AI lets us move at a pace traditional teams can't. But speed without judgment ships fragile, insecure software. The discipline is in the review." },
      { h: "Humans own the hard last mile", p: "Architecture, security, auth, payments and scale are where senior engineers earn their place — and where prompts fall short." },
      { h: "Quality gates, every time", p: "Code review, security and test gates, and evals on AI features — before anything reaches a user." },
    ],
  },
  {
    slug: "fixed-price-software-ai-era",
    title: "Fixed-price software in the AI era: why we don't bill by the hour",
    category: "Business",
    excerpt: "When AI compresses timelines, hourly billing punishes speed. Fixed price aligns everyone on the outcome.",
    date: "2026-03-19",
    readTime: "4 min read",
    accent: "magenta",
    body: [
      { p: "If AI makes delivery faster, why would you pay for hours? Fixed price aligns the incentive where it belongs: on shipping the outcome." },
      { h: "You plan around a number", p: "Fixed scope and fixed price mean no scope-creep tax and no surprise invoices. We absorb the estimation risk." },
      { h: "Speed becomes your advantage", p: "We're rewarded for shipping well and fast — not for dragging out a timesheet." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

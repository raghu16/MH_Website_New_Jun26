"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { industries } from "@/lib/industries";
import { posts } from "@/lib/posts";
import { whitepapers } from "@/lib/whitepapers";

const short = (t: string) => {
  const first = t.split(/[.—]/)[0].trim();
  return first.length > 66 ? first.slice(0, 64).trim() + "…" : first;
};

const groups = ["AI & Agents", "Applications", "Immersive"] as const;

function ServicesMega({ close }: { close: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
      <div>
        <p className="mono-label">Custom builds — AI woven through every layer</p>
        <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent">{g}</div>
              <ul className="mt-4 space-y-4">
                {services
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} onClick={close} className="group block">
                        <span className="flex items-center gap-2 font-medium text-paper group-hover:text-accent">
                          {s.eyebrow}
                          {s.flag && <span className="font-mono text-[9px] uppercase tracking-widest text-accent">★</span>}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">{short(s.subhead)}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="reg relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-700 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/5 to-transparent" />
        <div className="absolute inset-0 blueprint-dense opacity-30" />
        <div className="relative">
          <span className="mono-label text-accent">Flagship</span>
          <h4 className="mt-3 font-serif text-3xl leading-tight">AI Agent Development</h4>
          <p className="mt-2 text-sm text-muted">
            Custom agents that act — with the evals and guardrails to keep them reliable in production.
          </p>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-2">
          <Link href="/services/ai-agent-development" onClick={close} className="btn-primary text-xs">Explore →</Link>
          <Link href="/contact-us" onClick={close} className="btn-ghost text-xs">Get a proposal</Link>
        </div>
      </div>
    </div>
  );
}

function SolutionsMega({ close }: { close: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
      <div>
        <p className="mono-label">Productized &amp; white-label — deploy fast</p>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} onClick={close} className="group block">
              <span className="flex items-center justify-between gap-2">
                <span className="font-medium text-paper group-hover:text-accent">{s.name}</span>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${s.accent === "cyan" ? "border-cyan/40 text-cyan" : "border-accent/40 text-accent"}`}>
                  {s.tag}
                </span>
              </span>
              <span className="mt-0.5 block text-xs text-muted">{short(s.blurb)}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="reg relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-700 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/25 via-cyan/5 to-transparent" />
        <div className="absolute inset-0 blueprint-dense opacity-30" />
        <div className="relative">
          <span className="mono-label text-cyan">Ready to deploy</span>
          <h4 className="mt-3 font-serif text-3xl leading-tight">Live in weeks, not quarters.</h4>
          <p className="mt-2 text-sm text-muted">
            Battle-tested building blocks — agents, voice, satellite, VR — configured to your data and shipped fast.
          </p>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-2">
          <Link href="/solutions" onClick={close} className="btn-primary text-xs">All solutions →</Link>
          <Link href="/contact-us" onClick={close} className="btn-ghost text-xs">Book a demo</Link>
        </div>
      </div>
    </div>
  );
}

function IndustriesMega({ close }: { close: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
      <div>
        <p className="mono-label">Focused on the sectors where our work lands hardest</p>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {industries.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} onClick={close} className="group block">
              <span className="flex items-center gap-2 font-medium text-paper group-hover:text-accent">
                {ind.name}
                <span className={`h-1.5 w-1.5 rounded-full ${ind.accent === "cyan" ? "bg-cyan" : "bg-accent"}`} />
              </span>
              <span className="mt-0.5 block text-xs text-muted">{short(ind.blurb)}</span>
              <span className="mt-2 flex flex-wrap gap-1.5">
                {ind.solutions.slice(0, 2).map((s) => (
                  <span key={s.href} className="rounded-full bg-ink-800 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {s.label}
                  </span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="reg relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-700 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/25 via-cyan/5 to-transparent" />
        <div className="absolute inset-0 blueprint-dense opacity-30" />
        <div className="relative">
          <span className="mono-label text-cyan">Your sector</span>
          <h4 className="mt-3 font-serif text-3xl leading-tight">Built around your domain.</h4>
          <p className="mt-2 text-sm text-muted">
            AI is the engine; the outcome is always industry-specific. Don&apos;t see yours? We adapt fast.
          </p>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-2">
          <Link href="/industries" onClick={close} className="btn-primary text-xs">All industries →</Link>
          <Link href="/contact-us" onClick={close} className="btn-ghost text-xs">Talk to us</Link>
        </div>
      </div>
    </div>
  );
}

function ResourcesMega({ close }: { close: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent">Blog</div>
          <ul className="mt-4 space-y-3.5">
            {posts.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link href={`/resources/blog/${p.slug}`} onClick={close} className="group block">
                  <span className="block text-sm font-medium text-paper group-hover:text-accent">{p.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-muted">{p.category} · {p.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/resources/blog" onClick={close} className="mt-4 inline-block font-mono text-[11px] uppercase tracking-widest text-accent hover:underline">All articles →</Link>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-cyan">White Papers</div>
          <ul className="mt-4 space-y-3.5">
            {whitepapers.slice(0, 4).map((wp) => (
              <li key={wp.slug}>
                <Link href={`/resources/white-papers/${wp.slug}`} onClick={close} className="group block">
                  <span className="block text-sm font-medium text-paper group-hover:text-cyan">{wp.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-muted">{wp.category} · {wp.pages}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/resources/white-papers" onClick={close} className="mt-4 inline-block font-mono text-[11px] uppercase tracking-widest text-cyan hover:underline">All white papers →</Link>
        </div>
      </div>

      <div className="reg relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-700 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-cyan/5 to-transparent" />
        <div className="absolute inset-0 blueprint-dense opacity-30" />
        <div className="relative">
          <span className="mono-label text-accent">Resources</span>
          <h4 className="mt-3 font-serif text-3xl leading-tight">Field notes from shipping AI.</h4>
          <p className="mt-2 text-sm text-muted">Practical writing and deep research on building production-grade AI.</p>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-2">
          <Link href="/resources" onClick={close} className="btn-primary text-xs">Browse all →</Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState<"services" | "solutions" | "industries" | "resources" | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  const closeAll = () => { setOpen(null); setMobile(false); };

  // Close everything whenever the route changes (persistent-layout fix).
  useEffect(() => { closeAll(); }, [pathname]);

  // Escape closes; click outside the header closes the mega panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-ink-700/70 bg-ink-950/85 backdrop-blur-md"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="glow-accent inline-block h-2 w-2 rounded-full bg-accent" />
          monkhub
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            item.mega ? (
              <Link
                key={item.href}
                href={item.href}
                aria-haspopup="true"
                aria-expanded={open === item.mega}
                aria-current={isActive(item.href) ? "page" : undefined}
                onMouseEnter={() => setOpen(item.mega!)}
                onFocus={() => setOpen(item.mega!)}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  open === item.mega || isActive(item.href) ? "text-paper" : "text-muted hover:text-paper"
                }`}
              >
                {item.label}
                <span className={`text-[10px] transition-transform ${open === item.mega ? "rotate-180" : ""}`}>▾</span>
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onMouseEnter={() => setOpen(null)}
                className={`text-sm transition-colors ${isActive(item.href) ? "text-paper" : "text-muted hover:text-paper"}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact-us" className="btn-primary">Get a proposal</Link>
        </div>

        <button className="md:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile((v) => !v)}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-paper transition ${mobile ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-paper transition ${mobile ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-paper transition ${mobile ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full hidden border-b border-ink-700 bg-ink-950 shadow-2xl shadow-black/60 md:block">
          <div className="container-page py-10">
            {open === "services" ? (
              <ServicesMega close={() => setOpen(null)} />
            ) : open === "solutions" ? (
              <SolutionsMega close={() => setOpen(null)} />
            ) : open === "industries" ? (
              <IndustriesMega close={() => setOpen(null)} />
            ) : (
              <ResourcesMega close={() => setOpen(null)} />
            )}
            <div className="mt-8 flex items-center justify-between border-t border-ink-700 pt-5">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Trusted by PwC · Honda · Airmeet · Skillmatics
              </span>
              <Link href="/contact-us" onClick={() => setOpen(null)} className="font-mono text-[11px] uppercase tracking-widest text-accent hover:underline">
                Get a fixed-price proposal →
              </Link>
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div className="max-h-[80vh] overflow-y-auto overscroll-contain border-t border-ink-700 bg-ink-950 md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            <span className="px-1 pt-2 font-mono text-[11px] uppercase tracking-widest text-accent">Services</span>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeAll} className="rounded-lg px-1 py-2 text-paper">
                {s.eyebrow}
              </Link>
            ))}
            <span className="px-1 pt-4 font-mono text-[11px] uppercase tracking-widest text-cyan">Solutions</span>
            {solutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} onClick={closeAll} className="rounded-lg px-1 py-2 text-paper">
                {s.name}
              </Link>
            ))}
            <span className="px-1 pt-4 font-mono text-[11px] uppercase tracking-widest text-muted">Resources</span>
            {[
              { label: "Blog", href: "/resources/blog" },
              { label: "White Papers", href: "/resources/white-papers" },
            ].map((l) => (
              <Link key={l.href} href={l.href} onClick={closeAll} className="rounded-lg px-1 py-2 text-paper">
                {l.label}
              </Link>
            ))}
            <span className="px-1 pt-4 font-mono text-[11px] uppercase tracking-widest text-muted">Company</span>
            {[
              { label: "Work", href: "/our-work" },
              { label: "Industries", href: "/industries" },
              { label: "About", href: "/about-us" },
              { label: "Careers", href: "/careers" },
            ].map((l) => (
              <Link key={l.href} href={l.href} onClick={closeAll} className="rounded-lg px-1 py-2 text-paper">
                {l.label}
              </Link>
            ))}
            <Link href="/contact-us" onClick={closeAll} className="btn-primary mt-3">
              Get a proposal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Services",
    links: [
      { label: "AI Agent Development", href: "/services/ai-agent-development" },
      { label: "Voice AI Agents", href: "/services/voice-ai-agents" },
      { label: "AI Solutions Development", href: "/services/ai-solutions-development" },
      { label: "Web 3 Development", href: "/services/web3-development" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Work", href: "/our-work" },
      { label: "About", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "White Papers", href: "/resources/white-papers" },
      { label: "All resources", href: "/resources" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            monkhub
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            AI-native product engineering studio. We ship production-grade software, fast.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            <span className="rounded-full border border-ink-700 px-3 py-1">Clutch ★ 4.9</span>
            <span className="rounded-full border border-ink-700 px-3 py-1">GoodFirms</span>
            <span className="rounded-full border border-ink-700 px-3 py-1">SOC 2-ready</span>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-xs uppercase tracking-widest text-muted">{col.title}</div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/80 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">Get started</div>
          <div className="mt-4 space-y-2.5 text-sm">
            <Link href="/contact-us" className="block font-medium text-accent hover:underline">
              Get a fixed-price proposal →
            </Link>
            <a href={`mailto:${site.email}`} className="block text-paper/80 hover:text-accent">
              {site.email}
            </a>
            <a href={`tel:${site.phoneUS.replace(/\s/g, "")}`} className="block text-paper/80 hover:text-accent">
              {site.phoneUS}
            </a>
            <a href={`tel:${site.phoneIN.replace(/\s/g, "")}`} className="block text-paper/80 hover:text-accent">
              {site.phoneIN}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-700">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} Monkhub. All rights reserved.</span>
          <span className="font-mono">{site.address}</span>
        </div>
      </div>
    </footer>
  );
}

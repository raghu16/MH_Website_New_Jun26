"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Floating "Talk to our AI consultant" launcher — present on every page.
 * Navigates to the full-page consultant experience (/consultant). Hidden while
 * already on that page.
 */
export default function AIConsultant() {
  const pathname = usePathname();
  if (pathname === "/consultant") return null;

  return (
    <Link
      href="/consultant"
      aria-label="Talk to our AI consultant"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-accent/40 bg-ink-900/90 py-3 pl-3 pr-5 shadow-2xl shadow-black/50 backdrop-blur-md transition-colors hover:border-accent"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent text-ink-950">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" /></svg>
      </span>
      <span className="text-sm font-medium text-paper">Talk to our AI consultant</span>
    </Link>
  );
}

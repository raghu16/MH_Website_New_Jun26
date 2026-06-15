const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Deterministic date formatter (no Date object — safe for SSG/hydration).
export function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[(m || 1) - 1]} ${d}, ${y}`;
}

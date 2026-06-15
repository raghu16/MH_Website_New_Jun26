// Imports the marketing site's static content (lib/*.ts) into the admin DB
// THROUGH THE ADMIN API. Idempotent: clears each collection first, then POSTs.
//
// Usage:  node admin/import-content.mjs
// Requires the backend API to be running (default http://localhost:4100).

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const API = process.env.ADMIN_API || "http://localhost:4100";
const EMAIL = process.env.ADMIN_EMAIL || "admin@monkhub.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

// Pull a top-level array literal out of a TS source file by bracket-matching,
// then evaluate it (the arrays are pure data — no identifiers/types inside).
function extractArray(src, marker) {
  const i = src.indexOf(marker);
  if (i < 0) throw new Error(`marker not found: ${marker}`);
  const eq = src.indexOf("=", i); // skip the `: Type[]` annotation
  const start = src.indexOf("[", eq);
  let depth = 0, inStr = null, j = start;
  for (; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (c === "\\") { j++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) { j++; break; } }
  }
  // eslint-disable-next-line no-eval
  return eval(src.slice(start, j));
}

const read = (file, marker) => extractArray(fs.readFileSync(path.join(ROOT, file), "utf8"), marker);

async function login() {
  const r = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!r.ok) throw new Error(`login failed (${r.status}) — is the backend running on ${API}?`);
  return (await r.json()).token;
}

async function clearAndImport(token, resource, items, toPayload) {
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const existing = await (await fetch(`${API}/api/${resource}`)).json();
  for (const e of existing) await fetch(`${API}/api/${resource}/${e.id}`, { method: "DELETE", headers });
  let n = 0;
  for (const it of items) {
    const res = await fetch(`${API}/api/${resource}`, { method: "POST", headers, body: JSON.stringify(toPayload(it)) });
    if (res.ok) n++;
    else console.warn(`  ! ${resource}/${it.slug}: ${res.status} ${(await res.text()).slice(0, 140)}`);
  }
  console.log(`✓ ${resource}: imported ${n}/${items.length} (cleared ${existing.length})`);
}

const posts = read("lib/posts.ts", "export const posts");
const projects = read("lib/work.ts", "export const projects");
const whitepapers = read("lib/whitepapers.ts", "export const whitepapers");

console.log(`Read: ${posts.length} posts · ${projects.length} projects · ${whitepapers.length} white papers`);
const token = await login();

await clearAndImport(token, "posts", posts, (p) => ({
  slug: p.slug, title: p.title, category: p.category, excerpt: p.excerpt,
  read_time: p.readTime, accent: p.accent, body: p.body, status: "published",
}));

await clearAndImport(token, "projects", projects, (p) => ({
  slug: p.slug, name: p.name, client: p.client, category: p.category, year: p.year,
  result: p.result, tags: p.tags, accent: p.accent, challenge: p.challenge,
  approach: p.approach, outcomes: p.outcomes, status: "published",
}));

await clearAndImport(token, "whitepapers", whitepapers, (w) => ({
  slug: w.slug, title: w.title, category: w.category, summary: w.summary,
  pages: w.pages, highlights: w.highlights, accent: w.accent, status: "published",
}));

console.log("\nDone — content is now in the admin DB and served via the API.");

import { Router } from "express";
import { query } from "../db.js";
import { auth } from "../middleware/auth.js";

const r = Router();

// list (public read so the marketing site can consume it; lock down if needed)
r.get("/", async (_req, res) => {
  const { rows } = await query("SELECT * FROM posts ORDER BY created_at DESC");
  res.json(rows);
});

r.get("/:id", async (req, res) => {
  const { rows } = await query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
  rows[0] ? res.json(rows[0]) : res.status(404).json({ error: "Not found" });
});

r.post("/", auth, async (req, res) => {
  const b = req.body;
  const { rows } = await query(
    `INSERT INTO posts (slug, title, category, excerpt, body, cover_image, read_time, accent, status, published_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, CASE WHEN $9 = 'published' THEN now() ELSE NULL END)
     RETURNING *`,
    [b.slug, b.title, b.category, b.excerpt, JSON.stringify(b.body || []), b.cover_image, b.read_time, b.accent || "magenta", b.status || "draft"]
  );
  res.status(201).json(rows[0]);
});

r.put("/:id", auth, async (req, res) => {
  const b = req.body;
  const { rows } = await query(
    `UPDATE posts SET slug=$1, title=$2, category=$3, excerpt=$4, body=$5, cover_image=$6, read_time=$7,
       accent=$8, status=$9, published_at = COALESCE(published_at, CASE WHEN $9='published' THEN now() END),
       updated_at=now()
     WHERE id=$10 RETURNING *`,
    [b.slug, b.title, b.category, b.excerpt, JSON.stringify(b.body || []), b.cover_image, b.read_time, b.accent, b.status, req.params.id]
  );
  rows[0] ? res.json(rows[0]) : res.status(404).json({ error: "Not found" });
});

r.delete("/:id", auth, async (req, res) => {
  await query("DELETE FROM posts WHERE id = $1", [req.params.id]);
  res.json({ ok: true });
});

export default r;

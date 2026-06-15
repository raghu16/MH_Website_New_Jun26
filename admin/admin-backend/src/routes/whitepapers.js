import { Router } from "express";
import { query } from "../db.js";
import { auth } from "../middleware/auth.js";

const r = Router();

r.get("/", async (_req, res) => {
  const { rows } = await query("SELECT * FROM whitepapers ORDER BY created_at DESC");
  res.json(rows);
});

r.get("/:id", async (req, res) => {
  const { rows } = await query("SELECT * FROM whitepapers WHERE id = $1", [req.params.id]);
  rows[0] ? res.json(rows[0]) : res.status(404).json({ error: "Not found" });
});

r.post("/", auth, async (req, res) => {
  const b = req.body;
  const { rows } = await query(
    `INSERT INTO whitepapers (slug, title, category, summary, pages, file_url, highlights, accent, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [b.slug, b.title, b.category, b.summary, b.pages, b.file_url, b.highlights || [], b.accent || "magenta", b.status || "draft"]
  );
  res.status(201).json(rows[0]);
});

r.put("/:id", auth, async (req, res) => {
  const b = req.body;
  const { rows } = await query(
    `UPDATE whitepapers SET slug=$1, title=$2, category=$3, summary=$4, pages=$5, file_url=$6,
       highlights=$7, accent=$8, status=$9, updated_at=now()
     WHERE id=$10 RETURNING *`,
    [b.slug, b.title, b.category, b.summary, b.pages, b.file_url, b.highlights || [], b.accent, b.status, req.params.id]
  );
  rows[0] ? res.json(rows[0]) : res.status(404).json({ error: "Not found" });
});

r.delete("/:id", auth, async (req, res) => {
  await query("DELETE FROM whitepapers WHERE id = $1", [req.params.id]);
  res.json({ ok: true });
});

export default r;

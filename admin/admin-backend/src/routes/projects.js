import { Router } from "express";
import { query } from "../db.js";
import { auth } from "../middleware/auth.js";

const r = Router();

r.get("/", async (_req, res) => {
  const { rows } = await query("SELECT * FROM projects ORDER BY created_at DESC");
  res.json(rows);
});

r.get("/:id", async (req, res) => {
  const { rows } = await query("SELECT * FROM projects WHERE id = $1", [req.params.id]);
  rows[0] ? res.json(rows[0]) : res.status(404).json({ error: "Not found" });
});

r.post("/", auth, async (req, res) => {
  const b = req.body;
  const { rows } = await query(
    `INSERT INTO projects (slug, name, client, category, year, result, tags, accent, challenge, approach, outcomes, hero, gallery, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [
      b.slug, b.name, b.client, b.category, b.year, b.result, b.tags || [], b.accent || "magenta",
      b.challenge, b.approach || [], JSON.stringify(b.outcomes || []),
      b.hero ? JSON.stringify(b.hero) : null, JSON.stringify(b.gallery || []), b.status || "draft",
    ]
  );
  res.status(201).json(rows[0]);
});

r.put("/:id", auth, async (req, res) => {
  const b = req.body;
  const { rows } = await query(
    `UPDATE projects SET slug=$1, name=$2, client=$3, category=$4, year=$5, result=$6, tags=$7, accent=$8,
       challenge=$9, approach=$10, outcomes=$11, hero=$12, gallery=$13, status=$14, updated_at=now()
     WHERE id=$15 RETURNING *`,
    [
      b.slug, b.name, b.client, b.category, b.year, b.result, b.tags || [], b.accent,
      b.challenge, b.approach || [], JSON.stringify(b.outcomes || []),
      b.hero ? JSON.stringify(b.hero) : null, JSON.stringify(b.gallery || []), b.status, req.params.id,
    ]
  );
  rows[0] ? res.json(rows[0]) : res.status(404).json({ error: "Not found" });
});

r.delete("/:id", auth, async (req, res) => {
  await query("DELETE FROM projects WHERE id = $1", [req.params.id]);
  res.json({ ok: true });
});

export default r;

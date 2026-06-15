import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { query } from "../db.js";
import { auth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../../uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]+/gi, "-").slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100 MB

const r = Router();

r.get("/", auth, async (_req, res) => {
  const { rows } = await query("SELECT * FROM media ORDER BY created_at DESC");
  res.json(rows);
});

r.post("/", auth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const f = req.file;
  const url = `/uploads/${f.filename}`;
  const { rows } = await query(
    "INSERT INTO media (filename, url, mime, size) VALUES ($1,$2,$3,$4) RETURNING *",
    [f.filename, url, f.mimetype, f.size]
  );
  res.status(201).json(rows[0]);
});

r.delete("/:id", auth, async (req, res) => {
  const { rows } = await query("SELECT * FROM media WHERE id = $1", [req.params.id]);
  if (rows[0]) {
    const fp = path.join(uploadDir, rows[0].filename);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    await query("DELETE FROM media WHERE id = $1", [req.params.id]);
  }
  res.json({ ok: true });
});

export default r;

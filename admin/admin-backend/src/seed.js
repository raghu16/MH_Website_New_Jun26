import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
  process.exit(1);
}

try {
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [email, hash, "Admin"]
  );
  console.log(`✓ Admin user ready: ${email}`);
  process.exit(0);
} catch (err) {
  console.error("✗ Seed failed:", err.message);
  process.exit(1);
}

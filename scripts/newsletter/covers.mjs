// Runs before `next build` (npm "prebuild"): makes a small JPEG of every
// explainer cover in public/email/covers/, so newsletter emails can link to it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureEmailCover } from "./email.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const slugs = fs
  .readdirSync(path.join(ROOT, "content", "explainers"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .filter((s) => fs.existsSync(path.join(ROOT, "public", "explainers", s, "cover.png")));

for (const s of slugs) await ensureEmailCover(s);
console.log(`Email covers ready: ${slugs.length}`);

import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeSurfaceLinks } from "./generate-surface-links.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public");

const STATIC_PATHS = [
  "arquivista",
  "config",
  "docs",
  "landing",
  "vendor",
  "index.html",
];

writeSurfaceLinks(ROOT);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const rel of STATIC_PATHS) {
  cpSync(join(ROOT, rel), join(OUT, rel), { recursive: true });
}

console.log("[vercel] public/ gerado com sucesso");

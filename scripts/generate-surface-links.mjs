import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONFIG_PATH = join(ROOT, "config", "surface-links.json");

const DEFAULTS = {
  centro: "/centro/",
  landing: "/landing/",
  "arquivo-morto": "/arquivo-morto/",
};

let base = { ...DEFAULTS };

try {
  base = { ...base, ...JSON.parse(readFileSync(CONFIG_PATH, "utf8")) };
} catch {
  /* usa defaults se o arquivo ainda nao existir */
}

const ENV_KEYS = {
  centro: "SURFACE_LINK_CENTRO",
  landing: "SURFACE_LINK_LANDING",
  "arquivo-morto": "SURFACE_LINK_ARQUIVO_MORTO",
};

const output = { ...base };

for (const [key, envName] of Object.entries(ENV_KEYS)) {
  const value = process.env[envName];
  if (value) output[key] = value;
}

writeFileSync(CONFIG_PATH, `${JSON.stringify(output, null, 2)}\n`);
console.log("[vercel] surface-links.json gerado:", output);

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = join(__dirname, "..");

const DEFAULTS = {
  centro: "/centro/",
  landing: "/landing/",
  "arquivo-morto": "/arquivo-morto/",
};

/**
 * @param {string} [root]
 * @returns {Record<string, string>}
 */
export function writeSurfaceLinks(root = DEFAULT_ROOT) {
  const configPath = join(root, "config", "surface-links.json");

  let base = { ...DEFAULTS };

  try {
    base = { ...base, ...JSON.parse(readFileSync(configPath, "utf8")) };
  } catch {
    /* usa defaults se o arquivo ainda nao existir */
  }

  const envKeys = {
    centro: "SURFACE_LINK_CENTRO",
    landing: "SURFACE_LINK_LANDING",
    "arquivo-morto": "SURFACE_LINK_ARQUIVO_MORTO",
  };

  const output = { ...base };

  for (const [key, envName] of Object.entries(envKeys)) {
    const value = process.env[envName];
    if (value) output[key] = value;
  }

  writeFileSync(configPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log("[vercel] surface-links.json gerado:", output);
  return output;
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  writeSurfaceLinks();
}

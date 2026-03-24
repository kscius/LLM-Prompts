#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const FORMATTERS = [
  { config: "prettier.config.js", cmd: "npx prettier --write" },
  { config: ".prettierrc", cmd: "npx prettier --write" },
  { config: ".prettierrc.json", cmd: "npx prettier --write" },
  { config: ".prettierrc.js", cmd: "npx prettier --write" },
  { config: ".prettierrc.yaml", cmd: "npx prettier --write" },
  { config: "biome.json", cmd: "npx @biomejs/biome format --write" },
  { config: "biome.jsonc", cmd: "npx @biomejs/biome format --write" },
];

const FORMATTABLE = /\.(ts|tsx|js|jsx|mjs|cjs|json|css|scss|md|html|vue|svelte)$/;

async function main() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.stdout.write("{}\n");
    return;
  }

  const filePath = payload.file_path || "";
  if (!FORMATTABLE.test(filePath)) {
    process.stdout.write("{}\n");
    return;
  }

  const projectDir =
    process.env.CURSOR_PROJECT_DIR ||
    (payload.workspace_roots && payload.workspace_roots[0]) ||
    ".";

  let formatter = null;
  for (const f of FORMATTERS) {
    if (fs.existsSync(path.join(projectDir, f.config))) {
      formatter = f;
      break;
    }
  }

  if (!formatter) {
    process.stdout.write("{}\n");
    return;
  }

  try {
    execSync(`${formatter.cmd} "${filePath}"`, {
      cwd: projectDir,
      timeout: 15000,
      stdio: "pipe",
    });
  } catch {}

  process.stdout.write("{}\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});

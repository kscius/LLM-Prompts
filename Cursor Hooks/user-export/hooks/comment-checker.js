#!/usr/bin/env node
/**
 * afterFileEdit: flag noisy AI-style comments (additional_context).
 */
const fs = require("fs");

const PATTERNS = [
  { re: /\/\/\s*import\s+the\s+/i, label: "narrating import" },
  { re: /\/\/\s*define\s+the\s+function/i, label: "narrating function definition" },
  { re: /here'?s\s+what\s+this\s+does/i, label: '"here is what this does" block' },
  { re: /\/\*\*?\s*this\s+function\s+/i, label: "obvious JSDoc filler" },
  { re: /\/\/\s*TODO:\s*implement/i, label: "placeholder TODO" },
];

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

  const filePath = payload.file_path || payload.filePath || "";
  if (!filePath || !fs.existsSync(filePath)) {
    process.stdout.write("{}\n");
    return;
  }

  let text;
  try {
    text = fs.readFileSync(filePath, "utf8");
  } catch {
    process.stdout.write("{}\n");
    return;
  }

  const hits = [];
  for (const { re, label } of PATTERNS) {
    if (re.test(text)) hits.push(label);
  }

  if (hits.length === 0) {
    process.stdout.write("{}\n");
    return;
  }

  process.stdout.write(
    JSON.stringify({
      additional_context: `[comment-checker] ${filePath}: possible low-value or AI-narration comments (${[...new Set(hits)].join(", ")}). Remove narration; keep comments that explain *why*.`,
    }) + "\n"
  );
}

main().catch(() => process.stdout.write("{}\n"));

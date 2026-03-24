#!/usr/bin/env node
const fs = require("fs");

const DEBUG_PATTERNS = [
  { pattern: /console\.log\s*\(/, label: "console.log" },
  { pattern: /\bdebugger\b/, label: "debugger statement" },
  { pattern: /\bTODO\b.*hack/i, label: "TODO hack" },
  { pattern: /\bFIXME\b/i, label: "FIXME" },
];

const SECRET_PATTERNS = [
  { pattern: /['"]sk[-_][a-zA-Z0-9]{20,}['"]/, label: "API key (sk-*)" },
  {
    pattern: /['"]ghp_[a-zA-Z0-9]{36,}['"]/,
    label: "GitHub personal access token",
  },
  {
    pattern: /password\s*[:=]\s*['"][^'"]{8,}['"]/i,
    label: "Hardcoded password",
  },
  {
    pattern: /['"]AKIA[A-Z0-9]{16}['"]/,
    label: "AWS access key",
  },
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

  const filePath = payload.file_path || "";
  const edits = payload.edits || [];
  const warnings = [];

  for (const edit of edits) {
    const newCode = edit.new_string || "";

    for (const { pattern, label } of SECRET_PATTERNS) {
      if (pattern.test(newCode)) {
        warnings.push(`SECRET DETECTED: ${label} in ${filePath}`);
      }
    }

    for (const { pattern, label } of DEBUG_PATTERNS) {
      if (pattern.test(newCode)) {
        warnings.push(`Debug code: ${label} in ${filePath}`);
      }
    }
  }

  if (warnings.length > 0) {
    const secretWarnings = warnings.filter((w) => w.startsWith("SECRET"));
    if (secretWarnings.length > 0) {
      process.stdout.write(
        JSON.stringify({
          additional_context: `⚠️ SECURITY WARNING: ${secretWarnings.join("; ")}. Remove secrets immediately before committing.`,
        }) + "\n"
      );
      return;
    }

    process.stdout.write(
      JSON.stringify({
        additional_context: `Note: ${warnings.join("; ")}. Consider cleaning up before finalizing.`,
      }) + "\n"
    );
    return;
  }

  process.stdout.write("{}\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});

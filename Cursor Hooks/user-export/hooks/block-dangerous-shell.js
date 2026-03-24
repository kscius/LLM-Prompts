#!/usr/bin/env node

const BLOCKED_PATTERNS = [
  /rm\s+(-rf?|--recursive)\s+[\/\\]/,
  /rm\s+(-rf?|--recursive)\s+\.\s/,
  /rm\s+(-rf?|--recursive)\s+\*/,
  /del\s+\/[sS]\s+\/[qQ]/,
  /rmdir\s+\/[sS]\s+\/[qQ]/,
  /format\s+[a-zA-Z]:/,
  />\s*\/dev\/null\s+2>&1.*rm/,
  /DROP\s+DATABASE/i,
  /DROP\s+TABLE/i,
  /TRUNCATE\s+TABLE/i,
  /DELETE\s+FROM\s+\w+\s*;?\s*$/i,
  /git\s+push\s+.*--force\s+.*main/,
  /git\s+push\s+.*--force\s+.*master/,
  /git\s+reset\s+--hard\s+.*HEAD~?\d*/,
];

const ASK_PATTERNS = [
  /npm\s+publish/,
  /npx\s+.*deploy/,
  /git\s+push/,
  /docker\s+push/,
  /kubectl\s+apply/,
  /kubectl\s+delete/,
  /terraform\s+apply/,
  /terraform\s+destroy/,
];

async function main() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.stdout.write(JSON.stringify({ permission: "allow" }) + "\n");
    return;
  }

  const command = payload.command || "";

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      process.stdout.write(
        JSON.stringify({
          permission: "deny",
          user_message: `Blocked dangerous command: ${command}`,
          agent_message: `The command "${command}" was blocked by a safety hook because it matches a destructive pattern. Choose a safer alternative.`,
        }) + "\n"
      );
      return;
    }
  }

  for (const pattern of ASK_PATTERNS) {
    if (pattern.test(command)) {
      process.stdout.write(
        JSON.stringify({
          permission: "ask",
          user_message: `Deployment/publish command requires approval: ${command}`,
        }) + "\n"
      );
      return;
    }
  }

  process.stdout.write(JSON.stringify({ permission: "allow" }) + "\n");
}

main().catch(() => {
  process.stdout.write(JSON.stringify({ permission: "allow" }) + "\n");
});

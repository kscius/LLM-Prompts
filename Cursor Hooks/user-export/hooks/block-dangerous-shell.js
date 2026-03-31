#!/usr/bin/env node

const BLOCKED_PATTERNS = [
  // Unix/Linux destructive remove
  /rm\s+(-rf?|--recursive)\s+[\/\\]/,
  /rm\s+(-rf?|--recursive)\s+\.\s/,
  /rm\s+(-rf?|--recursive)\s+\*/,
  // Windows CMD destructive remove
  /del\s+\/[sS]\s+\/[qQ]/,
  /rmdir\s+\/[sS]\s+\/[qQ]/,
  /format\s+[a-zA-Z]:/,
  // PowerShell destructive remove on root/system paths
  /Remove-Item\s+.*-Recurse\s+.*-Force\s+[CcDdEe]:[\/\\]/i,
  /Remove-Item\s+.*-Force\s+.*-Recurse\s+[CcDdEe]:[\/\\]/i,
  // Git clean (removes all untracked files including .gitignored)
  /git\s+clean\s+.*-[a-z]*f[a-z]*d[a-z]*x/i,
  /git\s+clean\s+.*-[a-z]*x[a-z]*f/i,
  // Git force push to protected branches
  /git\s+push\s+.*--force\s+.*main/,
  /git\s+push\s+.*--force\s+.*master/,
  /git\s+push\s+.*-f\s+.*main/,
  /git\s+push\s+.*-f\s+.*master/,
  // Git hard reset
  /git\s+reset\s+--hard/,
  // Destructive SQL
  /DROP\s+DATABASE/i,
  /DROP\s+TABLE/i,
  /TRUNCATE\s+TABLE/i,
  /DELETE\s+FROM\s+\w+\s*;?\s*$/i,
  // Cloud storage mass delete
  /aws\s+s3\s+(rm|delete)\s+.*--recursive/i,
  /gsutil\s+rm\s+.*-r/i,
  /az\s+storage\s+(blob|container)\s+delete/i,
  // Miscellaneous
  />\s*\/dev\/null\s+2>&1.*rm/,
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
  // Additional cloud/infra deploy patterns
  /fly\s+deploy/,
  /vercel\s+.*--prod/,
  /heroku\s+push/,
  /ansible-playbook/,
  /aws\s+s3\s+(rm|delete)/i,
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

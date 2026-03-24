#!/usr/bin/env node

const PROTECTED_BRANCHES = /^(main|master|develop|release\/.+|production)$/;

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

  const pushMatch = command.match(
    /git\s+push\s+(?:.*?\s+)?(?:origin\s+)?(\S+)/
  );
  if (pushMatch) {
    const branch = pushMatch[1];
    if (PROTECTED_BRANCHES.test(branch)) {
      process.stdout.write(
        JSON.stringify({
          permission: "ask",
          user_message: `Push to protected branch "${branch}" requires manual approval.`,
          agent_message: `The branch "${branch}" is protected. Direct pushes require explicit user approval.`,
        }) + "\n"
      );
      return;
    }
  }

  const checkoutMatch = command.match(/git\s+checkout\s+(-[bB]\s+)?(\S+)/);
  if (
    checkoutMatch &&
    !checkoutMatch[1] &&
    PROTECTED_BRANCHES.test(checkoutMatch[2])
  ) {
    const forceOps = /git\s+(reset|rebase|merge|cherry-pick)/.test(command);
    if (forceOps) {
      process.stdout.write(
        JSON.stringify({
          permission: "ask",
          user_message: `Destructive operation on protected branch "${checkoutMatch[2]}" requires approval.`,
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

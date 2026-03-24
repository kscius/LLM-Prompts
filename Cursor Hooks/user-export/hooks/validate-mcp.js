#!/usr/bin/env node

const SENSITIVE_MCP_PATTERNS = [
  { pattern: /delete/i, label: "delete operation" },
  { pattern: /drop/i, label: "drop operation" },
  { pattern: /truncate/i, label: "truncate operation" },
  { pattern: /destroy/i, label: "destroy operation" },
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

  const toolName = (payload.tool_name || "").toLowerCase();
  const toolInput = JSON.stringify(payload.tool_input || "").toLowerCase();
  const combined = `${toolName} ${toolInput}`;

  for (const { pattern, label } of SENSITIVE_MCP_PATTERNS) {
    if (pattern.test(combined)) {
      process.stdout.write(
        JSON.stringify({
          permission: "ask",
          user_message: `MCP tool "${payload.tool_name}" involves a ${label}. Approve?`,
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

#!/usr/bin/env node

/**
 * Tool-name prefixes that are inherently destructive (word-boundary match).
 * Example: "delete_record" matches; "undelete" or "deleteMode: false" do NOT match tool-name prefix.
 */
const DESTRUCTIVE_TOOL_NAME_RE = /^(delete|drop|truncate|destroy|remove|purge|wipe)\b/i;

/**
 * SQL-level destructive statements inside the tool input JSON.
 * Only fires when the input text looks like raw SQL commands.
 */
const DESTRUCTIVE_SQL_RE = /\b(DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE\s+TABLE|DELETE\s+FROM\s+\w+\s*;|TRUNCATE\s+\w+)\b/i;

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

  const toolName = payload.tool_name || "";
  const toolInput = JSON.stringify(payload.tool_input || "");

  if (DESTRUCTIVE_TOOL_NAME_RE.test(toolName)) {
    process.stdout.write(
      JSON.stringify({
        permission: "ask",
        user_message: `MCP tool "${toolName}" has a destructive name. Approve?`,
        agent_message: `The MCP tool "${toolName}" appears destructive by name. Confirm with user before proceeding.`,
      }) + "\n"
    );
    return;
  }

  if (DESTRUCTIVE_SQL_RE.test(toolInput)) {
    process.stdout.write(
      JSON.stringify({
        permission: "ask",
        user_message: `MCP tool "${toolName}" contains a destructive SQL statement. Approve?`,
        agent_message: `Destructive SQL detected in MCP tool input for "${toolName}". Confirm with user before proceeding.`,
      }) + "\n"
    );
    return;
  }

  process.stdout.write(JSON.stringify({ permission: "allow" }) + "\n");
}

main().catch(() => {
  process.stdout.write(JSON.stringify({ permission: "allow" }) + "\n");
});

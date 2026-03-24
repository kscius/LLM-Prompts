#!/usr/bin/env node

const BLOCKED_FILE_PATTERNS = [
  /\.env$/,
  /\.env\.\w+$/,
  /credentials\.json$/,
  /service[_-]?account.*\.json$/,
  /\.pem$/,
  /\.key$/,
  /id_rsa$/,
  /id_ed25519$/,
  /\.p12$/,
  /\.pfx$/,
  /secret[s]?\.ya?ml$/,
  /vault\.ya?ml$/,
];

const ALLOWED_PATTERNS = [/\.env\.example$/, /\.env\.template$/, /\.env\.sample$/];

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

  const filePath = (payload.file_path || "").replace(/\\/g, "/").toLowerCase();

  for (const allowed of ALLOWED_PATTERNS) {
    if (allowed.test(filePath)) {
      process.stdout.write(JSON.stringify({ permission: "allow" }) + "\n");
      return;
    }
  }

  for (const blocked of BLOCKED_FILE_PATTERNS) {
    if (blocked.test(filePath)) {
      process.stdout.write(
        JSON.stringify({
          permission: "deny",
          user_message: `Blocked: reading sensitive file ${payload.file_path}`,
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

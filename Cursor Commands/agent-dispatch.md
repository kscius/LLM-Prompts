# /agent-dispatch — run Cursor CLI via Node runner (autonomous)

Use the **Node** runner `hooks/agent-dispatch.js` to invoke **`agent -p`** with retries, JSON logs under `hooks/logs/agent-runs/`, and optional globs. No PowerShell script required.

## Runner path (portable)

Prefer one of these (same file on every machine with a standard Cursor user dir):

- **Windows (cmd):** `"%USERPROFILE%\.cursor\hooks\agent-dispatch.js"`
- **Windows (PowerShell):** `"$env:USERPROFILE\.cursor\hooks\agent-dispatch.js"`
- **macOS / Linux:** `"$HOME/.cursor/hooks/agent-dispatch.js"`

If your config lives elsewhere, set a **convention-only** env var for your own scripts/docs: **`CURSOR_AGENT_DISPATCH_JS`** = absolute path to `agent-dispatch.js` (the runner does not read this variable today; use it in your invocation or wrapper).

Example (Windows, workspace = repo root):

```bash
node "%USERPROFILE%\.cursor\hooks\agent-dispatch.js" --prompt "YOUR_PROMPT" --cwd "C:\path\to\repo" --mode ask
```

## When to use

- One-shot or batched headless passes when the user wants **`agent -p`** from the IDE via Shell tool.
- **Orchestrated runs:** When **`/orquestador`** or **`/scout`** indicates **Cursor CLI (condicional)** — see **`commands/orquestador.md`**.
- Same entry point as **git pre-commit** (optional) after `git config core.hooksPath` → see **`commands/cli-batch.md`**.

## Build invocation

From **workspace root** (or set `--cwd`), run:

```bash
node "%USERPROFILE%\.cursor\hooks\agent-dispatch.js" --prompt "YOUR_PROMPT" --files "glob/pattern/**" --mode ask
```

(Unix: replace the path with `"$HOME/.cursor/hooks/agent-dispatch.js"`.)

- **`--prompt`**: plain text or `@relative/or/absolute/path/to/prompt.txt`
- **`--files`**: glob (repeatable); files are appended to the prompt list
- **`--model`**: optional model ID; omit to use the agent's default
- **`--mode`**: `ask` | `plan` | omit for full agent mode (writes code)
- **`--force`**: auto-approve all tool confirmations (yolo mode)
- **`--trust`**: skip workspace trust prompt (headless-safe)
- **`--stream`**: streaming JSON output (`--output-format stream-json --stream-partial-output`)
- **`--resume <chatId>`**: resume a specific chat session (stateful multi-step runs)
- **`--continue`**: continue the most recent session (alias for `--resume=-1`)
- **`--max-retries`**: default `2` (backoff 1s, 2s, 4s)
- **`--config`**: JSON array of tasks (see `hooks/dispatch-config.example.json`)
- **`--cwd`**: working directory for globs and agent
- **`--workspace <dir>`**: workspace directory passed to the agent (`--workspace` flag); differs from `--cwd` in that it sets the IDE workspace context rather than the glob/shell cwd
- **`--sandbox <enabled|disabled>`**: enable agent sandboxing — sandboxed agents request approval only when stepping outside the controlled environment, reducing interruptions ~40% vs unsandboxed runs (see [Cursor blog](https://www.cursor.com/blog/agent-sandboxing)); recommended for unattended batch runs
- **`--approve-mcps`**: automatically approve all configured MCP servers without prompting (`--approve-mcps` CLI flag)
- **`--cloud`**: start in cloud agent mode (`-c` / `--cloud`); push the conversation to a Cloud Agent and let it run while offline; resume at [cursor.com/agents](https://cursor.com/agents)

**Bypass / skip:** `SKIP_AGENT=1` → exits 0 without calling the CLI (for hooks).

**Timeout:** `CURSOR_AGENT_DISPATCH_TIMEOUT_MS` (default `300000`).

## Stateful multi-step pattern

Use `--resume` + `agent create-chat` for multi-step headless pipelines that preserve context across runs:

```bash
# Step 1 — create session and capture ID
CHAT_ID=$(agent create-chat --output-format json | jq -r '.chatId')

# Step 2 — first pass (plan), sandboxed to reduce interruptions
node "%USERPROFILE%\.cursor\hooks\agent-dispatch.js" --prompt "Analyze the codebase" --resume $CHAT_ID --mode plan --sandbox enabled

# Step 3 — second pass (implement), same session, MCPs pre-approved
node "%USERPROFILE%\.cursor\hooks\agent-dispatch.js" --prompt "Implement the plan from the previous step" --resume $CHAT_ID --sandbox enabled --approve-mcps
```

Or use `--continue` to append to the most recent session without managing a chat ID.

## Cloud handoff pattern

Offload long-running tasks to a Cloud Agent that keeps running while you close your terminal:

```bash
# Start directly in cloud mode
node "%USERPROFILE%\.cursor\hooks\agent-dispatch.js" --prompt "Refactor the auth module" --cloud --sandbox enabled

# Or resume a local session and hand off to cloud (mid-conversation `&` prefix via CLI)
# agent "& refactor the auth module"  ← the `&` prefix in interactive mode triggers cloud handoff
```

## Sandbox best practice

Prefer `--sandbox enabled` for unattended batch runs. Sandboxed agents run freely inside a controlled environment and only request approval when they need to step outside it (e.g., network access). This cuts interruptions ~40% vs unsandboxed runs and reduces approval fatigue.

## Agent instructions

1. Resolve the user’s **prompt** and optional **globs** from the conversation.
2. **Run** **`node …/agent-dispatch.js`** yourself via the **Shell** tool (portable path or `CURSOR_AGENT_DISPATCH_JS`). Do not output “run this in your terminal” as the primary handoff when Shell is available.
3. Summarize **exit code**, **stdout/stderr** highlights, and the **log paths** printed by the runner (`hooks/logs/agent-runs/*.json`).

## Rules

- Do not pass secrets in prompts; do not log API keys.
- If `agent` is not on PATH, the runner prints a clear failure — report **Blocked** and suggest installing Cursor CLI or fixing PATH.

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
node "%USERPROFILE%\.cursor\hooks\agent-dispatch.js" --prompt "YOUR_PROMPT" --files "glob/pattern/**" --model gemini-3-flash --mode ask
```

(Unix: replace the path with `"$HOME/.cursor/hooks/agent-dispatch.js"`.)

- **`--prompt`**: plain text or `@relative/or/absolute/path/to/prompt.txt`
- **`--files`**: glob (repeatable); files are appended to the prompt list
- **`--model`**: default `gemini-3-flash`
- **`--mode`**: `ask` | `plan` | omit for default agent behavior
- **`--force`**: forwarded to `agent`
- **`--max-retries`**: default `2` (backoff 1s, 2s, 4s)
- **`--config`**: JSON array of tasks (see `hooks/dispatch-config.example.json`)
- **`--cwd`**: working directory for globs and agent

**Bypass / skip:** `SKIP_AGENT=1` → exits 0 without calling the CLI (for hooks).

**Timeout:** `CURSOR_AGENT_DISPATCH_TIMEOUT_MS` (default `300000`).

## Agent instructions

1. Resolve the user’s **prompt** and optional **globs** from the conversation.
2. **Run** **`node …/agent-dispatch.js`** yourself via the **Shell** tool (portable path or `CURSOR_AGENT_DISPATCH_JS`). Do not output “run this in your terminal” as the primary handoff when Shell is available.
3. Summarize **exit code**, **stdout/stderr** highlights, and the **log paths** printed by the runner (`hooks/logs/agent-runs/*.json`).

## Rules

- Do not pass secrets in prompts; do not log API keys.
- If `agent` is not on PATH, the runner prints a clear failure — report **Blocked** and suggest installing Cursor CLI or fixing PATH.

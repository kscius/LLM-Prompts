# CLI batch: headless Cursor agent over many files

Use **Cursor CLI** (`cursor agent` / `agent`) for **non-interactive** batch passes when the IDE orchestrator is the wrong tool (bulk JSDoc, mechanical refactors across globs, scripted hygiene).

**Prereqs:** Cursor CLI installed and on `PATH`; optional **`CURSOR_API_KEY`** (see `docs/mcp-profiles.md`).

TASK (required: glob or file list + intent):
{{args}}

MISSION
1. Confirm **`cursor agent -p`** (or `agent -p`) is available: `cursor agent --help` or `agent --help`.
2. Resolve the **file set** from TASK (glob or explicit paths) relative to **workspace root**.
3. Build a **single prompt** that applies the same transformation to each file (or one prompt that lists files and rules).
4. Run from PowerShell (user OS: Windows), non-interactive:

```powershell
# Example — adjust model/flags per your Cursor CLI version
$files = Get-ChildItem -Path .\src -Recurse -Filter *.ts | ForEach-Object { $_.FullName }
$prompt = @"
For each file below: <YOUR TASK from TASK section>. Only touch listed files.
Files:
$($files -join "`n")
"@
cursor agent -p $prompt --force --output-format text
# If your install uses `agent` instead of `cursor agent`, substitute accordingly.
```

5. Capture exit code; paste **stdout/stderr** summary in chat.
6. **Do not** use CLI for multi-phase SDLC, security-sensitive work, or anything requiring hooks/MCPs/memory (use `/orquestador` in-IDE instead).

OPERATING RULES
- Never pass secrets in prompts; never commit API keys.
- If CLI is missing, state **Blocked: Cursor CLI not installed** and suggest manual batch or in-IDE agent.
- Prefer **`--output-format json`** only when the user needs machine-parseable output.

## Quality bar

- TASK must define **scope** and **done-when**; no open-ended “improve everything.”

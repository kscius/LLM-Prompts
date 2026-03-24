# Cursor Hooks

**Hooks** run external commands on lifecycle events (agent session, tool use, shell, MCP, file read/edit, etc.). They let you log, gate, or enrich the agent loop without changing Cursor’s core UI.

## Where to put configuration

Per [Cursor Hooks documentation](https://cursor.com/docs/hooks):

- **Project:** `.cursor/hooks.json` — applies to that repository
- **Global:** `~/.cursor/hooks.json` — applies across projects

Cursor watches these files and reloads when they change.

## Shape

```json
{
  "version": 1,
  "hooks": {
    "hookName": [{ "command": "path/to/script" }]
  }
}
```

- **Exit code `0`** — success; optional JSON on stdout may be interpreted by Cursor (see docs).
- **Exit code `2`** — block the action (see docs for supported hooks).
- **Other** — hook failed; action may proceed depending on hook type.

## Common hook names (agent / chat)

Examples from Cursor’s hook surface (verify against current docs for your version):

- Session: `sessionStart`, `sessionEnd`
- Tools: `preToolUse`, `postToolUse`, `postToolUseFailure`
- Subagents: `subagentStart`, `subagentStop`
- Shell: `beforeShellExecution`, `afterShellExecution`
- MCP: `beforeMCPExecution`, `afterMCPExecution`
- Files: `beforeReadFile`, `afterFileEdit`
- Prompt: `beforeSubmitPrompt`
- Other: `preCompact`, `stop`, `afterAgentResponse`, `afterAgentThought`

Tab / inline completion hooks may include `beforeTabFileRead`, `afterTabFileEdit`.

## Exported environment (this repo)

A snapshot of the maintainer’s global hooks lives under **[user-export/](./user-export/)**:

- [user-export/hooks.json](./user-export/hooks.json)
- [user-export/hooks/](./user-export/hooks/) — scripts (`session-context`, `audit-log`, `block-dangerous-shell`, etc.)
- [user-export/README.md](./user-export/README.md) — how to restore on another PC

## Minimal example

See [hooks.example.json](./hooks.example.json) for a tiny template.

**Important:** Make scripts executable on Unix (`chmod +x`). On Windows, use commands Cursor can launch (e.g. `pwsh`, `node`, full paths).

## Third-party hooks

Cursor can integrate additional hook sources (e.g. Claude Code–style settings) when enabled in settings. Native `.cursor/hooks.json` usually takes precedence — confirm in current docs.

## Related resources

- [Cursor Commands](../Cursor%20Commands/) — Slash-command prompts
- [Cursor Subagents](../Cursor%20Subagents/) — Subagent lifecycle hooks
- [Cursor Skills](../Cursor%20Skills/) — Agent Skills

---

**Last updated:** March 2026

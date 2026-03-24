# Cursor MCPs (export from environment)

This folder documents **your MCP server layout** as reflected in `%USERPROFILE%\.cursor\mcp.json`, **without secrets**.

## Files

| File | Purpose |
|------|---------|
| [mcp.config.example.json](./mcp.config.example.json) | **Template only.** Same server *names* and shapes as a typical setup; replace placeholders and env vars. **Do not commit a real `mcp.json` with tokens.** |
| [servers-inventory.md](./servers-inventory.md) | Human-readable list of configured servers and transport type. |

## Install

1. Copy `mcp.config.example.json` to `%USERPROFILE%\.cursor\mcp.json` (or merge entries).
2. Fill in env vars / headers locally; never push real keys to git.
3. Extension-provided MCPs (e.g. browser, GitLens) appear under the project’s `mcps` cache in Cursor; they are **not** always listed in `mcp.json`.

## Security

- If a real `mcp.json` with PATs/API keys was ever pasted into chat or committed, **rotate those credentials**.
- Prefer environment variables for `Authorization`, API keys, and Turso tokens.

---

**Last updated:** March 2026

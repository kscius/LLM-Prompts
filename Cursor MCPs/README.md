# Cursor MCPs (export from environment)

This folder documents **your MCP server layout** as reflected in `%USERPROFILE%\.cursor\mcp.json`, **without secrets**.

## Full MCP inventory (this workspace)

Cursor exposes each enabled server under the **project MCP cache**:  
`.cursor\projects\<workspace-folder-name>\mcps\<server-id>\`  
(IDs often look like `user-Memory` or `user-context7`; built-ins may use other prefixes.)

**Authoritative list for LLM-Prompts** (verified from the project `mcps` folder, March 2026):

| Cursor / agent id (`mcps` folder) | Typical source |
|-----------------------------------|----------------|
| `cursor-ide-browser` | Cursor (IDE browser MCP; not in `mcp.json` by default) |
| `user-Memory` | `mcp.json` → `Memory` |
| `user-Sequential_Thinking` (on disk; UI may show `user-Sequential Thinking`) | `mcp.json` → `Sequential Thinking` |
| `user-Interactive` | `mcp.json` → `Interactive` |
| `user-duckduckgo` | `mcp.json` → `duckduckgo` |
| `user-time` | `mcp.json` → `time` |
| `user-mtg-commander-analyzer` | `mcp.json` → `mtg-commander-analyzer` |
| `user-context7` | `mcp.json` → `context7` |
| `user-semgrep` | `mcp.json` → `semgrep` |
| `user-github` | `mcp.json` → `github` |
| `user-cursor10x-mcp` | `mcp.json` → `cursor10x-mcp` |
| `user-devcontext` | `mcp.json` → `devcontext` |
| `user-stitch` | `mcp.json` → `stitch` |
| `user-playwright` | `mcp.json` → `playwright` |
| `user-firecrawl` | `mcp.json` → `firecrawl` |
| `user-notion` | `mcp.json` → `notion` |
| `user-fetch` | `mcp.json` → `fetch` |
| `user-filesystem` | `mcp.json` → `filesystem` |
| `user-exa` | `mcp.json` → `exa` |
| `user-eamodio.gitlens-extension-GitKraken` | GitLens / GitKraken extension (not in `mcp.json`) |

**Count (Mar 2026, this workspace):** **20** carpetas bajo `mcps/`. Si tu máquina difiere, revisa el directorio `mcps` del proyecto en Cursor o **Settings → MCP**.

Cross-references: [Cursor Rules / ai-tools.md](../Cursor%20Rules/ai-tools.md), [tools-inventory-es.md](../Cursor%20Rules/tools-inventory-es.md) (broader tooling inventory).

## Files

| File | Purpose |
|------|---------|
| [mcp.config.example.json](./mcp.config.example.json) | **Template only.** Same server *names* and shapes as a typical setup; replace placeholders and env vars. **Do not commit a real `mcp.json` with tokens.** |
| [servers-inventory.md](./servers-inventory.md) | Human-readable list of configured servers, transport type, and id mapping. |

## Install

1. Copy `mcp.config.example.json` to `%USERPROFILE%\.cursor\mcp.json` (or merge entries).
2. Fill in env vars / headers locally; never push real keys to git.
3. Extension-provided MCPs (e.g. IDE browser, GitLens) appear under the project’s `mcps` cache in Cursor; they are **not** always listed in `mcp.json`.

## Security

- If a real `mcp.json` with PATs/API keys was ever pasted into chat or committed, **rotate those credentials**.
- Prefer environment variables for `Authorization`, API keys, and Turso tokens.

---

**Last updated:** 2026-03-29

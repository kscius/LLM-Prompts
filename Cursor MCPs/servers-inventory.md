# MCP servers — inventory (from user `mcp.json`)

Servers defined in **`%USERPROFILE%\.cursor\mcp.json`** (logical names → transport). Cursor may also attach **additional MCPs** from extensions (IDE browser, GitLens, etc.); those show up under the project `mcps` folder.

## Cursor project folder ids ↔ `mcp.json` (LLM-Prompts)

| Folder under `…/mcps/` | `mcp.json` key (if any) | Origin |
|------------------------|-------------------------|--------|
| `cursor-ide-browser` | — | Cursor IDE |
| `user-Memory` | Memory | User config |
| `user-Sequential_Thinking` | Sequential Thinking | User config (space in key → underscore in folder) |
| `user-Interactive` | Interactive | User config |
| `user-duckduckgo` | duckduckgo | User config |
| `user-time` | time | User config |
| `user-mtg-commander-analyzer` | mtg-commander-analyzer | User config |
| `user-context7` | context7 | User config |
| `user-semgrep` | semgrep | User config |
| `user-github` | github | User config |
| `user-cursor10x-mcp` | cursor10x-mcp | User config |
| `user-devcontext` | devcontext | User config |
| `user-stitch` | stitch | User config |
| `user-playwright` | playwright | User config |
| `user-firecrawl` | firecrawl | User config |
| `user-notion` | notion | User config |
| `user-fetch` | fetch | User config |
| `user-filesystem` | filesystem | User config |
| `user-exa` | exa | User config |
| `user-eamodio.gitlens-extension-GitKraken` | — | GitLens / GitKraken extension |

**Snapshot (2026-03-30):** **20** carpetas bajo `…/mcps/` en el workspace del proyecto (incl. `cursor-ide-browser` y extensiones).

## Transport and notes (`mcp.json` entries)

Snapshot reflects keys present in the maintainer’s `mcp.json` (**values omitted**; use env vars locally). **`enabled`** is noted when the field exists in config.

| Server key (mcp.json) | Notes |
|------------------------|--------|
| Memory | Docker `mcp/memory` or equivalent; host volume for persistence. |
| Sequential Thinking | Docker / npx variant; stepwise reasoning. |
| Interactive | `npx interactive-mcp`; long timeouts possible. |
| duckduckgo | Web search MCP. |
| time | Often `enabled: false`; timezone via env. |
| mtg-commander-analyzer | Local `npm run mcp`; path-specific cwd. |
| context7 | HTTPS + API key header (`CONTEXT7_API_KEY`). |
| semgrep | Docker or CLI-wrapped Semgrep MCP. |
| github | HTTPS GitHub MCP + Bearer; scoped token; never commit. |
| cursor10x-mcp | `node` / `npx`; Turso-related env when applicable. |
| devcontext | `npx devcontext@latest` or pinned; Turso env when applicable. |
| stitch | HTTPS Stitch + API key; often disabled by default. |
| playwright | Browser automation MCP (project tooling). |
| firecrawl | Crawl / scrape APIs; API key. |
| notion | Notion API integration; secrets via env. |
| fetch | HTTP fetch MCP. |
| filesystem | Constrained filesystem access per server config. |
| exa | Neural / web search API; API key. |

**Security:** do not commit real **`%USERPROFILE%\.cursor\mcp.json`**. Use **[mcp.config.example.json](./mcp.config.example.json)** with placeholders / env vars only.

---

**Last updated:** 2026-03-30 — alineado con claves de `mcp.json` (18 servidores de usuario + extensiones) y carpetas `mcps/` del proyecto (**20** entradas de carpeta).

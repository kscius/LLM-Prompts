# MCP servers — inventory (from user `mcp.json`)

Servers defined in **`%USERPROFILE%\.cursor\mcp.json`** (logical names → transport). Cursor may also attach **additional MCPs** from extensions (IDE browser, GitLens, etc.); those show up under the project `mcps` folder.

## Cursor project folder ids ↔ `mcp.json` (LLM-Prompts)

| Folder under `…/mcps/` | `mcp.json` key (if any) | Origin |
|------------------------|-------------------------|--------|
| `cursor-ide-browser` | — | Cursor IDE |
| `user-Memory` | Memory | User config |
| `user-Sequential_Thinking` | Sequential Thinking | User config (note: space in key → underscore in folder) |
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
| `user-eamodio.gitlens-extension-GitKraken` | — | GitLens / GitKraken extension |

## Transport and notes (`mcp.json` entries)

Snapshot reflects a typical maintainer setup (keys **omitted**; use env vars locally). **`enabled`** is the default in that `mcp.json` when the field is present.

| Server key (mcp.json) | Transport | Default `enabled` | Notes |
|------------------------|-----------|-------------------|--------|
| Memory | Docker `mcp/memory` | (on) | Host volume for `memory.json` |
| Sequential Thinking | Docker `mcp/sequentialthinking` | `true` | Can be turned off if unused |
| Interactive | `npx interactive-mcp` | (on) | `timeout` 300s |
| duckduckgo | `npx duckduckgo-mcp-server` | (on) | |
| time | Docker `mcp/time` | `false` | Timezone via `-e` |
| mtg-commander-analyzer | local `npm run mcp` | `false` | Path-specific cwd |
| context7 | HTTPS + `CONTEXT7_API_KEY` header | (on) | Prefer env substitution in real config |
| semgrep | Docker `semgrep/semgrep … mcp` | (on) | |
| github | HTTPS GitHub Copilot MCP + Bearer | (on) | Scoped token; never commit |
| cursor10x-mcp | `node` + path to installed package **or** `npx cursor10x-mcp` | `true` | Turso env vars |
| devcontext | `npx devcontext@latest` | `true` | Turso env vars |
| stitch | HTTPS Stitch + API key header | `false` | |

**Security:** do not commit real `%USERPROFILE%\.cursor\mcp.json`. Use **[mcp.config.example.json](./mcp.config.example.json)** with placeholders / env vars only.

---

**Last updated:** 2026-03-30 (carpetas bajo `…/mcps/` del proyecto verificadas; sin cambios de lista respecto a 2026-03-29; no secretos)

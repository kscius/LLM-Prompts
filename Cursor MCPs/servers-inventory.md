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

| Server key (mcp.json) | Transport | Notes |
|------------------------|-----------|--------|
| Memory | Docker `mcp/memory` | Host volume for `memory.json` |
| Sequential Thinking | Docker `mcp/sequentialthinking` | |
| Interactive | `npx interactive-mcp` | timeout 300s |
| duckduckgo | `npx duckduckgo-mcp-server` | |
| time | Docker `mcp/time` | timezone via `-e` |
| mtg-commander-analyzer | local `npm run mcp` | path-specific |
| context7 | HTTPS + `CONTEXT7_API_KEY` header | |
| semgrep | Docker `semgrep/semgrep … mcp` | |
| github | HTTPS GitHub Copilot MCP + Bearer | use scoped token |
| cursor10x-mcp | `npx cursor10x-mcp` | Turso env vars |
| devcontext | `npx devcontext@latest` | Turso env vars |
| stitch | HTTPS Stitch + API key header | |

---

**Last updated:** March 2026

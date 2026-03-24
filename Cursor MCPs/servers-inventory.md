# MCP servers — inventory (from user `mcp.json`)

Servers defined in **`%USERPROFILE%\.cursor\mcp.json`** (logical names → transport). Cursor may also attach **additional MCPs** from extensions (e.g. IDE browser, GitLens); those show up under the project `mcps` folder with `user-*` ids.

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

**Typical extension / project `mcps` ids (example):** `cursor-ide-browser`, `user-Memory`, `user-Sequential_Thinking`, `user-github`, `user-context7`, `user-semgrep`, `user-duckduckgo`, `user-Interactive`, `user-time`, `user-cursor10x-mcp`, `user-devcontext`, `user-stitch`, `user-mtg-commander-analyzer`, `user-eamodio.gitlens-extension-GitKraken`.

---

**Last updated:** March 2026

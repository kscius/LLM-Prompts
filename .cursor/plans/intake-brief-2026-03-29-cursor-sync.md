# Intake brief — Cursor ecosystem sync

- **Date:** 2026-03-29
- **Task:** Actualizar el repo LLM-Prompts con la información actual del entorno Cursor (skills, commands, hooks, MCPs, rules, inventarios).
- **Acceptance criteria:** Comandos y skills reflejan `%USERPROFILE%\.cursor\commands` y `%USERPROFILE%\.cursor\skills`; hooks `user-export` alineados con `hooks.json` global (forma, sin rutas absolutas en el repo); inventario MCP y docs (`ai-tools`, `tools-inventory-es`, READMEs) coherentes; sin secretos en git.
- **Scope excluded:** No commitear `mcp.json` real ni tokens; no volcar User Rules completas si no hay export controlado (ver `Cursor User Rules/README.md`).
- **Open questions:** Ninguna para este sync.
- **devcontext conversationId:** `70bfc177-150a-4792-bd8e-68d280bebbc8`
- **Brainstorming / requirements:** No (pedido de ingeniería acotado).

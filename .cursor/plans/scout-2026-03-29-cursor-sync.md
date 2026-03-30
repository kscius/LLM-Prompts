# Scout — Cursor ecosystem sync

## Classification

**STANDARD** — Muchos archivos tocados (copias + docs), sin cambios de código ejecutable ni CI.

## VALIDATION MANIFEST

```
VALIDATION MANIFEST
- lint_cmd: N/A (repo de prompts/markdown sin linter configurado en raíz)
- typecheck_cmd: N/A
- test_cmd: N/A
- build_cmd: N/A
- browser_check: no
- migration_check: no
```

## warm_up_hints

- Skills: `ship-feature`, `self-validate`
- Subagents: none (trabajo directo en repo)
- MCPs: `user-cursor10x-mcp`, `user-devcontext` para continuidad

## Evidence

- Origen comandos: `C:\Users\mitza\.cursor\commands\` → `Cursor Commands/` (30 `.md`).
- Origen skills: `C:\Users\mitza\.cursor\skills\` → `Cursor Skills/exported-cursor-skills/` (30 `SKILL.md`).
- Hooks JS: `C:\Users\mitza\.cursor\hooks\*.js` → `Cursor Hooks/user-export/hooks/`.
- `hooks.json` global: rutas absolutas; en repo se mantienen rutas relativas `./hooks/…` y misma semántica que el global del mantenedor.
- `mcp.json`: solo metadatos reflejados en `servers-inventory.md` (sin valores secretos).
- Regla solicitable `cursor10x-mcp.mdc`: alineada con `c:\.cursor\rules\cursor10x-mcp.mdc` (`alwaysApply: false`).

## EARLY BAILOUT

Ninguno — se requería sincronización real.

---

**Last updated:** 2026-03-29

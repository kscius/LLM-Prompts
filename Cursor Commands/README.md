# Cursor Commands (slash commands)

This folder documents **Cursor slash commands**: reusable prompts stored as Markdown, typically under **`.cursor/commands/`** in a project (or the path Cursor is configured to use).

## How they work

1. Create a file such as `.cursor/commands/orquestador.md` in your project.
2. The file name (without extension) becomes the command name (e.g. `/orquestador`).
3. Put the full instruction text in the body of the Markdown file.
4. In chat, type `/` and select the command to inject that prompt.

Exact UI and paths may vary slightly by Cursor version; prefer **Cursor Settings → Commands** (or docs) for the latest location.

## Files in this folder

These mirror **`%USERPROFILE%\.cursor\commands\`** (slash commands). Copy into a project’s **`.cursor/commands/`** as needed. **33** command files (plus this `README.md`).

| File | Typical use |
|------|----------------|
| [orquestador.md](./orquestador.md) | Orquestador end-to-end (scout → plan → build → validate). |
| [scout.md](./scout.md) | Fase de descubrimiento / reconocimiento. |
| [intake.md](./intake.md) | Fase 0 de intake (continuidad MCP, devcontext, brainstorming condicional). |
| [plan.md](./plan.md) | Planificación antes de implementar. |
| [build-full.md](./build-full.md) | Implementación completa según plan. |
| [fix-loop.md](./fix-loop.md) | Reparar fallos de validación de forma iterativa. |
| [verify.md](./verify.md) | Comprobaciones finales. |
| [commit-changes.md](./commit-changes.md) | Preparar commit coherente. |
| [pr-ready.md](./pr-ready.md) | Checklist antes de abrir PR. |
| [code-review.md](./code-review.md) | Revisión de código. |
| [audit-quality.md](./audit-quality.md) | Auditoría de calidad (código, tests, seguridad, docs). |
| [tech-lead.md](./tech-lead.md) | Rol tech lead / staff (arquitectura, riesgos, plan de ejecución). |
| [feature-team.md](./feature-team.md) | Equipo feature (PM + TL + implementación). |
| [review-team.md](./review-team.md) | Equipo revisión (CR + seguridad + docs). |
| [debug-team.md](./debug-team.md) | Equipo depuración (debugger + repro + fix). |
| [retrospective.md](./retrospective.md) | Retrospectiva estructurada post‑entrega o post‑incidente. |
| [retro-to-rule.md](./retro-to-rule.md) | Convertir aprendizajes de retrospectiva en reglas `.mdc` o skills. |
| [security-review.md](./security-review.md) | Revisión orientada a seguridad. |
| [write-unit-tests.md](./write-unit-tests.md) | Añadir o ampliar tests unitarios. |
| [run-all-tests-and-fix.md](./run-all-tests-and-fix.md) | Suite de tests + corrección. |
| [lint-suite.md](./lint-suite.md) | Lint / calidad estática. |
| [refactor.md](./refactor.md) | Refactor guiado. |
| [debug-issue.md](./debug-issue.md) | Depuración estructurada. |
| [performance-check.md](./performance-check.md) | Rendimiento y cuellos de botella. |
| [database-migration.md](./database-migration.md) | Migraciones de base de datos. |
| [harness-audit.md](./harness-audit.md) | Auditoría de harness / tooling de pruebas. |
| [cli-batch.md](./cli-batch.md) | Cursor CLI en modo batch / headless sobre muchos archivos (`cursor agent -p`, globs). |
| [agent-dispatch.md](./agent-dispatch.md) | Runner Node `agent-dispatch.js` para `agent -p` con reintentos, logs JSON y globs (ver también `/orquestador` → Cursor CLI condicional). |
| [ci-watch.md](./ci-watch.md) | Vigilar CI / pipelines y fallos recurrentes. |
| [department-report.md](./department-report.md) | Informe tipo “departamento” (roles SDLC / estado). |
| [knowledge-consolidate.md](./knowledge-consolidate.md) | Consolidar conocimiento / memoria de proyecto. |
| [stats.md](./stats.md) | Métricas o resúmenes de actividad (según tu plantilla). |
| [project-init.md](./project-init.md) | Inicialización de proyecto / bootstrap en Cursor. |

## Related resources

- [Cursor Skills](../Cursor%20Skills/) — Agent Skills (`SKILL.md`)
- [Cursor Subagents / agents](../Cursor%20Subagents/agents/README.md) — Task `subagent_type` prompt files (`*.md`)
- [Cursor Hooks](../Cursor%20Hooks/) — Lifecycle automation
- [Cursor Rules](../Cursor%20Rules/) — Global and project rules (`.mdc`)

---

**Last updated:** 2026-03-30 (sync: `robocopy /XO` `*.md` excepto `README.md`; `orquestador.md` = copia byte-a-byte del perfil usuario — reglas **13–14** ejecución autónoma + paralelismo Task/CLI; 33 comandos)

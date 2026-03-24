# Cursor Commands (slash commands)

This folder documents **Cursor slash commands**: reusable prompts stored as Markdown, typically under **`.cursor/commands/`** in a project (or the path Cursor is configured to use).

## How they work

1. Create a file such as `.cursor/commands/orquestador.md` in your project.
2. The file name (without extension) becomes the command name (e.g. `/orquestador`).
3. Put the full instruction text in the body of the Markdown file.
4. In chat, type `/` and select the command to inject that prompt.

Exact UI and paths may vary slightly by Cursor version; prefer **Cursor Settings → Commands** (or docs) for the latest location.

## Files in this folder

These mirror **`%USERPROFILE%\.cursor\commands\`** (slash commands). Copy into a project’s **`.cursor/commands/`** as needed.

| File | Typical use |
|------|----------------|
| [orquestador.md](./orquestador.md) | Orquestador end-to-end (scout → plan → build → validate). |
| [scout.md](./scout.md) | Fase de descubrimiento / reconocimiento. |
| [plan.md](./plan.md) | Planificación antes de implementar. |
| [build-full.md](./build-full.md) | Implementación completa según plan. |
| [fix-loop.md](./fix-loop.md) | Reparar fallos de validación de forma iterativa. |
| [verify.md](./verify.md) | Comprobaciones finales. |
| [commit-changes.md](./commit-changes.md) | Preparar commit coherente. |
| [pr-ready.md](./pr-ready.md) | Checklist antes de abrir PR. |
| [code-review.md](./code-review.md) | Revisión de código. |
| [security-review.md](./security-review.md) | Revisión orientada a seguridad. |
| [write-unit-tests.md](./write-unit-tests.md) | Añadir o ampliar tests unitarios. |
| [run-all-tests-and-fix.md](./run-all-tests-and-fix.md) | Suite de tests + corrección. |
| [lint-suite.md](./lint-suite.md) | Lint / calidad estática. |
| [refactor.md](./refactor.md) | Refactor guiado. |
| [debug-issue.md](./debug-issue.md) | Depuración estructurada. |
| [performance-check.md](./performance-check.md) | Rendimiento y cuellos de botella. |
| [database-migration.md](./database-migration.md) | Migraciones de base de datos. |
| [harness-audit.md](./harness-audit.md) | Auditoría de harness / tooling de pruebas. |

## Related resources

- [Cursor Skills](../Cursor%20Skills/) — Agent Skills (`SKILL.md`)
- [Cursor Hooks](../Cursor%20Hooks/) — Lifecycle automation
- [Cursor Rules](../Cursor%20Rules/) — Global and project rules (`.mdc`)

---

**Last updated:** March 2026

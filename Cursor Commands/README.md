# Cursor Commands (slash commands)

This folder documents **Cursor slash commands**: reusable prompts stored as Markdown, typically under **`.cursor/commands/`** in a project (or the path Cursor is configured to use).

## How they work

1. Create a file such as `.cursor/commands/orquestador.md` in your project.
2. The file name (without extension) becomes the command name (e.g. `/orquestador`).
3. Put the full instruction text in the body of the Markdown file.
4. In chat, type `/` and select the command to inject that prompt.

Exact UI and paths may vary slightly by Cursor version; prefer **Cursor Settings → Commands** (or docs) for the latest location.

## Files in this folder

| File | Purpose |
|------|---------|
| [orquestador.md](./orquestador.md) | End-to-end workflow orchestrator (scout → plan → build → validate) |

Copy or adapt these into your project’s `.cursor/commands/` as needed.

## Related resources

- [Cursor Skills](../Cursor%20Skills/) — Agent Skills (`SKILL.md`)
- [Cursor Hooks](../Cursor%20Hooks/) — Lifecycle automation
- [Cursor Rules](../Cursor%20Rules/) — Global and project rules (`.mdc`)

---

**Last updated:** March 2025

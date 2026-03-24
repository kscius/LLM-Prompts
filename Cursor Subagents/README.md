# Cursor Subagents

**Subagents** are specialized worker contexts invoked via the **Task** tool (or equivalent delegation) with a `subagent_type` and a prompt. Use them to parallelize exploration, isolate risk, or bring domain-specific depth.

## Canonical list

This repository maintains the full categorized list in:

- **English:** [Cursor Rules / ai-tools.md](../Cursor%20Rules/ai-tools.md) — section “Subagents”
- **Spanish:** [Cursor Rules / tools-inventory-es.md](../Cursor%20Rules/tools-inventory-es.md) — section “Subagents”
- **Task tool dump (long):** [task-subagent-types.md](./task-subagent-types.md) — tipos tal como aparecen en la herramienta Task (incluye `best-of-n-runner`, etc.)

Update **ai-tools.md** and **tools-inventory-es.md** when añadas valores nuevos de `subagent_type`; opcionalmente alinea **task-subagent-types.md** si quieres paridad literal con Cursor.

## When to delegate

Align with [Cursor Rules / tooling-delegation.md](../Cursor%20Rules/tooling-delegation.md):

- Delegate when expertise, risk, or parallelism clearly helps.
- Prefer **explore** for fast codebase reconnaissance.
- Use **backend-developer**, **frontend-developer**, **fullstack-developer** for layered work.
- Use **debugger** for failure analysis; **code-reviewer** for pre-merge quality.
- Do not delegate trivial single-file edits unless it reduces uncertainty.

## Handoff pattern (recommended)

When spawning a subagent, include:

1. **Task** — Outcome, constraints, scope boundaries  
2. **Repo context** — Stack, patterns, key paths  
3. **Prior findings** — What you already verified  
4. **Deliverables** — Artifacts + acceptance criteria  
5. **Open questions** — Only what blocks execution  

## Hooks integration

Subagent lifecycle may be observable via hooks such as `subagentStart` / `subagentStop` (see [Cursor Hooks](../Cursor%20Hooks/README.md)).

## Related resources

- [Cursor Skills](../Cursor%20Skills/) — In-process skills (`SKILL.md`)
- [Cursor Commands](../Cursor%20Commands/) — Orchestration prompts (e.g. `/orquestador`)
- [tools-inventory-es.md](../Cursor%20Rules/tools-inventory-es.md) — inventario MCP + Skills + Subagents (ES)

---

**Last updated:** March 2026

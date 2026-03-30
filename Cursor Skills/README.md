# Cursor Skills (Agent Skills)

Reference and setup guide for **Agent Skills** in Cursor: reusable `SKILL.md` packages the agent discovers and follows when a task matches their description.

## What they are

- Skills live as folders containing **`SKILL.md`** (required) plus optional scripts or assets.
- Cursor loads available skills from configured paths (commonly under the user skills directory or project-level skills).
- Each skill declares **when to use it** in its description; the agent should read the file and follow it for that task.

## Repository layout

### Exported copies (from this Cursor environment)

| Path | Contents |
|------|-----------|
| [exported-cursor-skills/](./exported-cursor-skills/) | Copy of `%USERPROFILE%\.cursor\skills\` (each skill folder with `SKILL.md`, etc.). |
| [exported-agents-skills/](./exported-agents-skills/) | Copy of `%USERPROFILE%\.agents\skills\` (additional skills). |
| [cursor-managed-skills-manifest.json](./cursor-managed-skills-manifest.json) | Copia de `%USERPROFILE%\.cursor\skills-cursor\.cursor-managed-skills-manifest.json` (`builtinSkillIds` + `managedSkillIds`, p. ej. **canvas**, **cursor-blame**). |

### Reference tables (keep in sync when you add skills)

The repo also documents skills at a high level in:

- **English:** [Cursor Rules / ai-tools.md](../Cursor%20Rules/ai-tools.md) (Skills table)
- **Spanish:** [Cursor Rules / tools-inventory-es.md](../Cursor%20Rules/tools-inventory-es.md) (tabla Skills)

Keep **ai-tools.md** and **tools-inventory-es.md** in sync when you add or rename skills in your environment. After big changes, re-copy `exported-cursor-skills/` and `exported-agents-skills/` from your machine if you want the repo to stay a faithful mirror.

## Skill anatomy (typical)

```
my-skill/
├── SKILL.md          # Metadata + instructions (frontmatter + body)
└── (optional) scripts, examples, references
```

`SKILL.md` usually includes:

- **Description** — Triggers (“Use when…”) so the agent knows when to activate the skill.
- **Procedures** — Steps, checklists, or patterns to follow.
- **Constraints** — What not to do, stack boundaries, validation expectations.

## Creating new skills

Use the **create-skill** skill in Cursor (see `create-skill` in [tools-inventory-es.md](../Cursor%20Rules/tools-inventory-es.md) or [ai-tools.md](../Cursor%20Rules/ai-tools.md)) or follow Cursor’s current documentation for Agent Skills.

## Related resources in this repo

| Resource | Purpose |
|----------|---------|
| [Cursor Rules Maker](../Cursor%20Rules%20Maker/) | Generate project `.mdc` rules from the codebase |
| [Cursor Rules / ai-tools.md](../Cursor%20Rules/ai-tools.md) | MCP + Skills + Subagents reference |
| [Cursor Subagents](../Cursor%20Subagents/) | Delegation via Task / subagent types |
| [Cursor Commands](../Cursor%20Commands/) | Slash commands and orchestration prompts |

---

**Last updated:** 2026-03-30 (`exported-cursor-skills`: **30** skills desde `%USERPROFILE%\.cursor\skills\` [robocopy /XO]; `exported-agents-skills`: **15** carpetas desde `%USERPROFILE%\.agents\skills\`; manifest igual que `%USERPROFILE%\.cursor\skills-cursor\.cursor-managed-skills-manifest.json`)

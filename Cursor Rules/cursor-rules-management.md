# Cursor Rules Management & Rule Improvement

This document reflects the **User Rule: Rule Improvement & Cursor Rules Management**. It describes when to add, modify, or deprecate rules, and how to structure Cursor rules in a project.

## Rule Improvement Triggers

Update or create rules when:

- **New code patterns** not covered by existing rules appear.
- **Repeated similar implementations** across files suggest a standard pattern.
- **Common error patterns** could be prevented by a rule.
- **New libraries or tools** are used consistently.
- **Emerging best practices** in the codebase should be captured.

### Analysis process

- Compare new code with existing rules.
- Identify patterns that should be standardized.
- Look for references to external documentation.
- Check for consistent error-handling patterns.
- Monitor test patterns and coverage.

### When to add new rules

- A new technology or pattern is used in **3+ files**.
- Common bugs could be prevented by a rule.
- Code reviews repeatedly mention the same feedback.
- New security or performance patterns emerge.

### When to modify existing rules

- Better examples exist in the codebase.
- Additional edge cases are discovered.
- Related rules have been updated.
- Implementation details have changed.

### Rule deprecation

- Mark outdated patterns as deprecated.
- Remove rules that no longer apply.
- Update references to deprecated rules.
- Document migration paths for old patterns.

## Cursor Rules structure (project-level)

Rules that apply to a specific project should live under:

```
PROJECT_ROOT/.cursor/rules/
```

### File organization

- All cursor rule files **must** be in `.cursor/rules/`.
- Use **kebab-case** for filenames and the **.mdc** extension.
- One rule or concern per file; keep names descriptive (e.g. `typescript-style.mdc`, `tailwind-styling.mdc`).

### Rule file format

Every cursor rule file should include:

1. **Metadata (frontmatter):** `description`, optional `globs`, `alwaysApply: false`.
2. **Title:** Clear rule title.
3. **Content:** Step-by-step instructions, code examples, guidelines (good vs bad).
4. **References:** Use project file references where relevant (e.g. `[file.tsx](path/to/file.tsx)`).

### Categories

Organize rules by purpose, for example:

- **Code style:** typescript-style, css-conventions
- **Architecture:** component-patterns, folder-structure
- **Documentation:** mdx-documentation, readme-format
- **Tools:** testing-patterns, build-config
- **Meta:** cursor-rules, self-improve

## Documentation rule (cross-reference)

**Do not create documentation files (.md) unless explicitly requested.** Only create .md files when the user explicitly asks (e.g. “documenta esto”, “crea un README”, “genera documentación”). For code changes, add inline comments only when necessary for complex logic. Summaries belong in chat responses, not in new files. **Exception:** Update existing .md files if they become outdated due to code changes.

See **documentation.md** for the full Documentation Rules.

## Best practices

- Review rules regularly and keep them aligned with the codebase.
- Update examples so they reflect current patterns.
- Cross-reference related rules.
- Document changes when patterns evolve.
- Ensure each rule is actionable and specific; prefer examples from actual code.

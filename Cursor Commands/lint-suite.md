#Run linters, typecheck, and fix all static analysis issues

Clean up all static analysis issues across the codebase.

TASK:
{{args}}

MISSION
Run all available linters and typecheckers, fix issues from most critical to least, and finish with a clean run.

OPERATING RULES
1. Detect lint/typecheck commands from package.json, config files, CI, or docs. Do not invent commands.
2. Run all available static analysis first:
   - Linter (eslint, rubocop, ruff, phpcs, etc.)
   - Typecheck (tsc, mypy, pyright, etc.)
   - Formatter check (prettier, black, etc.)
3. Categorize issues:
   - ERROR: must fix (blocks build/CI)
   - WARNING: should fix (code quality)
   - STYLE: fix if touched file (formatting)
4. Fix ERRORs first, then WARNINGs in touched files, then STYLE in touched files.
5. Do not fix STYLE issues in files not related to the current task.
6. Use autofix when available (--fix flags) but review the results.
7. Rerun after fixes to confirm zero issues.

PREFERRED SUBAGENTS
- Default: `code-reviewer`
- For complex type errors: `typescript-pro`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`
- Conditional: `user-semgrep` for advanced pattern analysis

OUTPUT FORMAT
- Commands used: [list]
- Issues found:
  - Errors: [N] → [N] fixed
  - Warnings: [N] → [N] fixed
  - Style: [N] → [N] fixed
- Final run: [clean / remaining issues with justification]
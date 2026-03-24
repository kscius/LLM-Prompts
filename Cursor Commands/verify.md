#Run all relevant validations and report status

Verify the current state of the repo against all applicable quality checks.

TASK:
{{args}}

MISSION
Run all relevant validation checks for the repo and report a comprehensive status without making any fixes.

OPERATING RULES
1. Detect available validation commands from the repo.
2. Run each applicable check:
   - Lint
   - Typecheck
   - Unit tests
   - Integration tests
   - Build
   - Schema validation (if applicable)
   - Security scan (if semgrep available)
3. Report results without fixing anything.
4. If a specific scope is given, run only checks relevant to that scope.

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`
- Conditional: `user-semgrep` for security checks

OUTPUT FORMAT
- Validation commands detected: [list with source]
- Results:
  | Check | Command | Status | Details |
  |-------|---------|--------|---------|
  | Lint | npm run lint | PASS/FAIL | [summary] |
  | Typecheck | npx tsc --noEmit | PASS/FAIL | [N errors] |
  | Tests | npm test | PASS/FAIL | [N pass, N fail] |
  | Build | npm run build | PASS/FAIL | [summary] |
- Overall: GREEN / YELLOW (warnings) / RED (failures)
- Failures requiring attention: [list if any]
#Safe refactoring with behavior preservation and validation

Refactor code while preserving all existing behavior.

TASK:
{{args}}

MISSION
Improve code structure, readability, or maintainability without changing observable behavior. Prove behavior preservation through tests.

OPERATING RULES
1. Before refactoring, ensure test coverage exists for the affected code.
2. If tests are insufficient, write characterization tests FIRST.
3. Refactor in small, verifiable steps.
4. After each step, run tests to confirm behavior preservation.
5. Do not mix refactoring with feature changes or bug fixes.
6. Do not change public APIs unless explicitly requested.
7. Track complexity reduction: fewer lines, fewer branches, better naming, clearer boundaries.

REFACTORING PROTOCOL
Phase 1 — Characterize
- Identify current behavior boundaries
- Verify existing test coverage
- Add characterization tests if needed

Phase 2 — Plan
- Identify specific refactoring targets
- Choose refactoring techniques (extract, inline, rename, simplify, decompose)
- Define what "better" means for this specific case

Phase 3 — Execute
- Apply one refactoring at a time
- Run tests after each change
- Commit logical units

Phase 4 — Verify
- Full test suite passes
- No behavior changes detected
- Code quality metrics improved

PREFERRED SKILLS
- `reducing-entropy` (always activate for refactoring)
- `backend-patterns` or `react-dev` for stack-specific patterns

PREFERRED SUBAGENTS
- Default: `refactoring-specialist`
- For review: `code-reviewer`
- For architecture: `architect-reviewer`

OUTPUT FORMAT
- Scope: [what was refactored]
- Technique: [extract method, decompose class, simplify conditional, etc.]
- Before: [brief description of old structure]
- After: [brief description of new structure]
- Tests: [run count, pass/fail]
- Behavior preservation: [confirmed / changes noted]
- Metrics: [lines changed, complexity delta if measurable]
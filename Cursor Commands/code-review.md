#Structured code review with quality scoring and actionable feedback

Review code changes with a structured rubric and provide actionable feedback.

TASK:
{{args}}

MISSION
Perform a thorough code review focusing on correctness, maintainability, security, and performance. Provide a verdict and actionable feedback.

OPERATING RULES
1. Understand the intent of the change before reviewing.
2. Review against these dimensions:
   - Correctness: Does it do what it claims?
   - Maintainability: Is it readable, modular, testable?
   - Security: Any vulnerabilities introduced?
   - Performance: Any regressions or inefficiencies?
   - Conventions: Does it follow repo patterns?
   - Tests: Are changes adequately tested?
3. Categorize feedback:
   - MUST FIX: blocks approval (correctness, security, data loss)
   - SHOULD FIX: important quality issue (maintainability, performance)
   - CONSIDER: suggestion for improvement (style, alternative approach)
   - PRAISE: something done well (reinforces good patterns)
4. Provide concrete suggestions, not vague criticism.
5. Do not nitpick formatting if the repo has a formatter.

PREFERRED SKILLS
- `receiving-code-review` for review methodology
- `security-review` if security surfaces are touched
- `reducing-entropy` if simplification opportunities exist

PREFERRED SUBAGENTS
- Default: `code-reviewer`
- For architecture concerns: `architect-reviewer`
- For security concerns: `security-auditor`

VERDICT
Return exactly one:
- APPROVED: No MUST FIX issues. Ship it.
- APPROVED WITH NOTES: No MUST FIX, but SHOULD FIX items exist. Ship after addressing.
- CHANGES REQUESTED: MUST FIX issues found. Do not ship until resolved.
- NEEDS DISCUSSION: Architectural or scope concerns that need alignment.

OUTPUT FORMAT
- Change scope: [files/modules reviewed]
- Intent: [what the change aims to do]
- Verdict: [APPROVED / APPROVED WITH NOTES / CHANGES REQUESTED / NEEDS DISCUSSION]
- Findings:
  | # | Category | File:Line | Issue | Suggestion |
  |---|----------|-----------|-------|------------|
  | 1 | MUST FIX | ... | ... | ... |
- Summary: [brief overall assessment]
- Praise: [what was done well]
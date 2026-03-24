---
name: review-and-secure
description: Final quality and security review before handoff. Use after implementation to check correctness, regressions, and security before declaring done.
---

# review-and-secure

Use this skill after implementation or before final handoff.

## Objective
Perform a tight final review focused on correctness, regressions, and security.

## Checklist
1. Review changed files for correctness and consistency.
2. Identify likely regressions, edge cases, and missing validation.
3. Use `code-reviewer` when broad quality review is needed.
4. Use `security-auditor` when the change affects:
   - auth
   - session handling
   - permissions
   - secrets
   - payments
   - personal data
   - public APIs
   - file upload/download
5. Confirm docs were updated if behavior changed.
6. Confirm validation was actually run; do not assume green status.

## Output format
- Review scope
- Findings
- Security observations
- Required fixes
- Final readiness status
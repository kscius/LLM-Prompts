#Prepare changes for pull request with full validation

Validate, document, and prepare the current branch for a pull request.

TASK:
{{args}}

MISSION
Ensure the current branch is PR-ready: all checks pass, changes are documented, and a PR description is drafted.

OPERATING RULES
1. Run full validation suite (lint, typecheck, tests, build).
2. Review all changes on the branch (git diff against base).
3. Check for:
   - Uncommitted changes that should be included
   - Debug code left behind (console.log, debugger, TODO)
   - Missing test coverage for new code
   - Missing documentation updates
   - Secrets or sensitive data in changes
4. Draft a PR description following repo conventions.

PR DESCRIPTION FORMAT
## Summary
[1-3 bullet points describing what changed and why]

## Changes
- [file/module]: [what changed]

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] Manual testing performed (describe)

## Screenshots
[if UI changes]

## Risks
[any risks or rollback considerations]

PREFERRED SKILLS
- `humanizer` for PR description quality
- `security-review` for sensitive changes

PREFERRED SUBAGENTS
- Default: `code-reviewer` (pre-submit review)
- Conditional: `security-auditor` for sensitive changes

PREFERRED MCPS
- `user-github` for PR creation
- `user-eamodio.gitlens-extension-GitKraken` for git context

OUTPUT FORMAT
- Validation results: [all checks with status]
- Changes summary: [files changed, insertions, deletions]
- Issues found: [debug code, missing tests, etc.]
- PR description: [ready to paste]
- PR readiness: READY / NEEDS WORK [with items]
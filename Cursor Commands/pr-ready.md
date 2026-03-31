#Validate, review, and draft a PR description — without opening the PR

Deep quality gate before a pull request: run all checks, audit the diff for issues, and produce a ready-to-paste PR description. This command does NOT commit or push.

> **Want to create the PR directly?** Use `/pr` instead — it validates, commits, pushes, and opens the PR in one shot.
> Use `/pr-ready` when you want a human review of the description and validation results before deciding to open the PR.

TASK:
{{args}}

MISSION
Ensure the current branch is PR-ready: all checks pass, the diff is clean, test coverage is adequate, and a PR description is drafted. Produces a READY / NEEDS WORK verdict — the user decides when to open the PR.

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
- `user-eamodio.gitlens-extension-GitKraken` for git context and branch diff
- `user-github` for repo conventions and existing PR patterns

OUTPUT FORMAT
- Validation results: [all checks with status]
- Changes summary: [files changed, insertions, deletions]
- Issues found: [debug code, missing tests, secrets, etc.]
- PR description: [ready to paste or pass to `/pr`]
- PR readiness: READY / NEEDS WORK [with items]
- Next step: `/pr` to commit, push, and open the PR
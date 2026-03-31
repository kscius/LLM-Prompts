#Fetch a GitHub issue, implement a fix, and open a pull request

Given an issue number (or URL), read the issue, locate relevant code, implement the fix, and submit a PR.

TASK:
{{args}}

MISSION
End-to-end GitHub issue resolution: fetch issue details → understand the problem → scout the codebase → implement the minimal fix → validate → commit → open PR with a reference to the issue.

OPERATING RULES
1. **Parse the issue reference** from TASK: `#123`, `123`, or a full `https://github.com/owner/repo/issues/123` URL. If missing, ask once.
2. **Read the issue fully** before touching code. Use `gh issue view <number>` or the GitHub MCP.
3. **Do not over-engineer.** Fix only what the issue describes. No scope creep.
4. **Verify root cause** before implementing. A wrong fix is worse than no fix.
5. **Branch naming.** Create or switch to `fix/<issue-number>-<short-slug>` unless the user specifies a different branch or the repo convention differs (check recent branches with `git branch -a`).
6. **Reference the issue** in the commit message: `fix(scope): short description (#123)`.
7. **Link the issue** in the PR body with `Closes #123` so GitHub auto-closes on merge.
8. **Run validation** (lint + typecheck + relevant tests) before opening the PR.

STEPS
1. Fetch issue: `gh issue view <number> --json title,body,labels,assignees,comments`
2. Understand the problem: read title, body, and comments; identify acceptance criteria
3. **Scout** — find relevant files:
   - Search for symbols, error messages, or paths mentioned in the issue
   - Read the relevant code and understand the current behavior
4. **Plan** the minimal fix (state it briefly before editing)
5. **Implement** the fix across all affected files
6. **Validate** — run lint / typecheck / relevant tests
7. If validation fails, **fix-loop** within this command (max 3 iterations)
8. **Commit** with issue reference in the message
9. **Push** the branch (`git push -u origin <branch>`)
10. **Open PR** with `gh pr create` — title from issue, body references the issue

BRANCH CONVENTION (detect first, then apply)
- Check `git branch -a | head -20` for repo pattern
- Default: `fix/<issue-number>-<short-kebab-slug-from-title>`

COMMIT MESSAGE FORMAT
```
fix(scope): <short description> (#<issue-number>)

Resolves #<issue-number>: <brief explanation of what was wrong and why this fixes it>
```

PR BODY FORMAT
```markdown
## Summary
Closes #<issue-number>

**Problem:** [what the issue described]
**Fix:** [what was changed and why it works]

## Changes
| File | What changed |
|------|-------------|
| ...  | ...         |

## Testing
- [ ] Lint / typecheck passed
- [ ] Relevant tests pass
- [ ] Manual verification: [steps taken]

## Notes
[Any follow-up work or edge cases discovered]
```

PREFERRED SKILLS
- `requirements-gathering` if the issue description is vague and acceptance criteria need clarification
- `security-review` if the issue involves auth, validation, or data exposure
- `error-handling-patterns` if the issue is about unhandled errors or crashes
- `self-validate` before declaring the fix complete

PREFERRED SUBAGENTS
- `debugger` for issues requiring root-cause investigation
- `code-reviewer` for a final pre-PR quality check on the fix
- `security-auditor` if the issue has a CVE or security label

PREFERRED MCPS
- `user-github` for issue fetching and PR creation
- `user-Sequentialthinking` if root cause is ambiguous after reading the issue

ESCALATION TRIGGERS
Stop and surface to user if:
- Issue number cannot be resolved or the repo is not accessible
- The issue describes behavior that cannot be reproduced from the codebase alone (environment-dependent)
- Fix requires architectural change significantly larger than the issue scope
- Validation fails after 3 fix iterations
- `gh` CLI is not installed or not authenticated

OUTPUT FORMAT
- Issue: [#number — title]
- Root cause: [brief description]
- Branch: [name]
- Files changed: [list]
- Fix applied: [what was done]
- Validation: [lint / typecheck / tests — results]
- PR URL: [https://github.com/...]
- Status: RESOLVED / BLOCKED — [reason]

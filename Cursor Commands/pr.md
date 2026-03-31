#Create and push a pull request for the current changes

Stage, commit, push the current branch, and open a pull request with a clear title and description.

TASK:
{{args}}

MISSION
Turn the current working-tree changes into a merged-ready pull request: write a good commit message, commit, push, open the PR with `gh pr create`, and return the PR URL. Validate before committing to catch issues early.

OPERATING RULES
1. **Read the diff first.** Run `git diff` (staged + unstaged) and `git status`. Do not commit until you understand what changed.
2. **Do not commit:** `.env` files, secrets, build artifacts, debug code (`console.log`, `debugger`, `binding.pry`), or files in `.gitignore`.
3. **Check the branch.** Do not push directly to `main` or `master` unless the user explicitly asked.
4. **Commit convention.** Detect from `git log --oneline -10` and `.commitlintrc*`; default to conventional commits (`feat|fix|refactor|docs|test|chore(scope): description`).
5. **Single logical commit.** If changes span multiple unrelated concerns, suggest splitting — but do not block; follow the user's intent from TASK.
6. **Push with `--set-upstream`** if the branch has no tracking remote yet.
7. **PR description.** Use the format below. Fill from the diff; do not invent features not in the changes.
8. **Labels, reviewers, draft.** Set only what the user mentioned in TASK. Do not add labels or reviewers by default.
9. **Return the PR URL** as the final output line.

SAFETY CHECKS (run before commit)
- [ ] No secrets or tokens in changed files (`rg -n 'sk-|AKIA|ghp_|token.*=\s*"[^"]'` or similar)
- [ ] No debug code left behind
- [ ] No unresolved merge conflict markers (`<<<<<<`)
- [ ] Branch is NOT main/master (unless TASK explicitly says so)

COMMIT MESSAGE FORMAT (conventional commits default)
```
type(scope): short description under 72 chars

Why: [optional body explaining motivation]
BREAKING CHANGE: [if applicable]
```

PR DESCRIPTION FORMAT (passed to `gh pr create --body`)
```markdown
## Summary
- [bullet: what changed and why — from the diff, not invented]

## Changes
| File/Module | What changed |
|-------------|-------------|
| ...         | ...         |

## Testing
- [ ] Lint/typecheck passed
- [ ] Tests passed
- [ ] Manual verification (describe if UI change)

## Risks
[Optional: rollback notes, feature flags, migration steps]
```

STEPS
1. `git status` + `git diff` — read all changes
2. Safety checks (secrets scan, debug code, conflict markers, branch guard)
3. `git add .` or targeted `git add <files>` based on what should be committed
4. Commit with a conventional message matching repo style
5. `git push [-u origin <branch>]` — push to remote
6. `gh pr create --title "..." --body "..."` — open the PR
7. Return the PR URL

PREFERRED SKILLS
- `humanizer` for PR description polish when TASK mentions "good description" or "clean PR"
- `security-review` when changes touch auth, payments, secrets, or sensitive data
- `git-workflow` for conflict resolution or branching concerns

PREFERRED SUBAGENTS
- `code-reviewer` if user wants a pre-submit review before opening the PR

PREFERRED MCPS
- `user-eamodio.gitlens-extension-GitKraken` for git context and branch info
- `user-github` for PR creation and repo info

ESCALATION TRIGGERS
Stop and ask the user if:
- Branch is `main` or `master` and the user did not explicitly confirm
- Safety checks find secrets or tokens in the diff
- `gh` CLI is not installed or not authenticated (advise: `gh auth login`)
- The diff is empty (nothing to commit)

OUTPUT FORMAT
- Safety check results: [PASS / items found]
- Files staged: [list]
- Commit message: [full message]
- Push result: [branch → remote]
- PR URL: [https://github.com/...]
- PR ready: YES / BLOCKED — [reason]

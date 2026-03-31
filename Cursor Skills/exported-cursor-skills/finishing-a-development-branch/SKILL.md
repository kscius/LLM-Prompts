---
name: finishing-a-development-branch
description: Pre-PR and branch completion checklist — verify tests, present merge/PR/discard options, clean up worktrees. Use when implementation is complete and the user wants to close out work, create a PR, or merge a branch. Distinct from ship-feature (lifecycle) and git-workflow (patterns).
---

# Finishing a Development Branch

Guide completion of a development branch by verifying quality and presenting structured next-step options.

**Announce at start:** "Using finishing-a-development-branch skill to complete this work."

## Step 1: Verify Tests Pass

Before anything else:

```bash
# Use the repo's actual test command (check package.json, Makefile, etc.)
npm test
# OR: pytest / go test ./... / cargo test / bundle exec rspec
```

**If tests fail:**
```
Tests failing (N failures). Must fix before completing:
[Show failures]
Cannot merge/PR until tests pass.
```
Stop. Do not proceed to Step 2.

## Step 2: Self-Review the Diff

Run a quick diff review before offering options:

```bash
git diff main...HEAD --stat
git log main..HEAD --oneline
```

Check:
- [ ] No debug code, console.logs, or TODO comments left in
- [ ] No accidental large files or secrets committed
- [ ] Commit messages are clear and coherent
- [ ] Scope matches what was requested (no unrelated changes)

## Step 3: Determine Base Branch

```bash
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
git branch --show-current
```

If unclear, ask: "This branch splits from main — is that correct?"

## Step 4: Present Options

Present exactly these 4 options:

```
Implementation complete. Tests pass. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)
4. Discard this work

Which option?
```

Do not add explanation or recommendations unprompted.

## Step 5: Execute Choice

### Option 1: Merge Locally

```bash
git checkout <base-branch>
git pull
git merge <feature-branch>
<test-command>          # Verify merged result
git branch -d <feature-branch>
```

Then clean up worktree (Step 6).

### Option 2: Push and Create PR

```bash
git push -u origin <feature-branch>
gh pr create --title "<descriptive title>" --body "$(cat <<'EOF'
## Summary
- <bullet: what changed>
- <bullet: why>

## Test Plan
- [ ] <how to verify manually>
- [ ] Tests pass in CI

## Notes
<any edge cases, follow-ups, or risks>
EOF
)"
```

Show PR URL. Keep worktree if one exists.

### Option 3: Keep As-Is

Report: "Keeping branch as-is. Worktree preserved."  
Do not clean up worktree.

### Option 4: Discard

**Require typed confirmation:**

```
This will permanently delete:
- Branch: <name>
- Commits: <log --oneline output>
- Worktree at: <path> (if applicable)

Type 'discard' to confirm, or anything else to cancel.
```

Wait for exact `discard` input. Then:

```bash
git checkout <base-branch>
git branch -D <feature-branch>
```

Then clean up worktree (Step 6).

## Step 6: Worktree Cleanup (Options 1 & 4 only)

```bash
git worktree list | grep <branch-name>
git worktree remove <worktree-path>
```

Skip for Options 2 and 3.

## Quick Reference

| Option | Merge | Push | Keep Worktree | Delete Branch |
|--------|-------|------|---------------|---------------|
| 1. Merge locally | ✓ | — | — | ✓ (soft) |
| 2. Create PR | — | ✓ | ✓ | — |
| 3. Keep as-is | — | — | ✓ | — |
| 4. Discard | — | — | — | ✓ (force) |

## Pre-PR Quality Checklist

Before Option 2, also verify:

- [ ] Branch name is descriptive (`feature/...`, `fix/...`, `refactor/...`)
- [ ] Commits are squashed or logically organized (no WIP/fixup noise)
- [ ] CHANGELOG or release notes updated if required by repo
- [ ] Docs updated if behavior, API, or ops changed

## Red Flags — Never Do

- Proceed to merge/PR with failing tests
- Delete work without typed `discard` confirmation
- Force-push without explicit user request
- Merge without re-running tests on the merged result

## Integration with this Setup

- Called after `ship-feature` or `executing-plans` complete all tasks
- Pairs with `git-workflow` for branch naming and commit conventions
- Pairs with `using-git-worktrees` if parallel worktrees were created
- `self-validate` should run before this skill is invoked

## References

Adapted from [obra/superpowers finishing-a-development-branch](https://github.com/obra/superpowers).

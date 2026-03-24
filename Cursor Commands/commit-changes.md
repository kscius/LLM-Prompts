#Create a well-structured git commit with conventional message

Stage and commit changes with a properly formatted commit message.

TASK:
{{args}}

MISSION
Create a clean, well-described git commit following the repo's commit conventions.

OPERATING RULES
1. Detect commit convention from the repo:
   - Check recent git log for patterns
   - Check for commitlint config, .commitlintrc, etc.
   - Default to conventional commits if no convention found
2. Review all staged and unstaged changes before committing.
3. Do not commit:
   - .env files or secrets
   - Build artifacts
   - Files that should be gitignored
4. Group related changes into one logical commit.
5. If changes span multiple concerns, suggest splitting into multiple commits.

COMMIT MESSAGE FORMAT (conventional commits default)
type(scope): description

Types: feat, fix, refactor, docs, test, chore, style, perf, ci, build
Scope: module or area affected
Description: imperative mood, lowercase, no period, under 72 chars

Body (if needed):
- Why the change was made
- What the change does (briefly)
- Breaking changes noted with BREAKING CHANGE:

PREFERRED SUBAGENTS
- Default: none (direct execution)

PREFERRED MCPS
- `user-eamodio.gitlens-extension-GitKraken` for git context

OUTPUT FORMAT
- Files staged: [list]
- Files excluded: [list with reason]
- Commit message: [full message]
- Commit hash: [if committed]
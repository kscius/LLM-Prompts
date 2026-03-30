# CI watch: react to failing checks on a GitHub repo (conditional)

Use when you are working on a **project that has GitHub Actions or other CI checks** and want a **repeatable agent workflow** after pushes or PR updates. The **department config** does not need its own repo; the **target repo** is the app/library you are fixing.

This command is **manual or semi-automated**: Cursor does not run a daemon. You invoke `/ci-watch` after you know a run failed (or to poll once).

TARGET from `{{args}}` (required pieces):
- **owner/repo** (e.g. `acme/webapp`) **or** “use `git remote` from current workspace”
- Optional: **branch** name (default: current branch from `git` if available)
- Optional: **PR number** if diagnosing a specific PR’s checks

---

## Preconditions

1. **GitHub MCP** configured and authorized for the org/repo.
2. Workspace is a **git clone** of that repo (for branch/SHA context)—or user pasted `owner/repo` + `sha`.
3. User understands this is **advisory**: the agent summarizes CI and proposes fixes; merging/deploy still follows team process.

If preconditions fail: output **short abort** with what’s missing—do not pretend CI was queried.

---

## STEP 1 — Resolve revision (mandatory)

1. If in a git repo: run `git rev-parse HEAD` and `git branch --show-current` (or equivalent) **only if** allowed and repo exists—do not invent SHAs.
2. Otherwise use owner/repo + branch from TASK; if SHA unknown, use GitHub API via MCP to resolve **default branch** HEAD (if MCP supports it) or ask user once for **commit SHA** or **PR number**.

---

## STEP 2 — Fetch CI status (mandatory)

Use **GitHub MCP** tools appropriate to the situation (names may vary by server version):

- For a **PR**: `pull_request_read` with `method: get_check_runs` or `get_status` as available for the PR’s head SHA.
- List **failed** / **cancelled** checks with names and conclusion.

If the MCP returns nothing useful: state **MCP limitation** and suggest checking the Actions tab URL pattern: `https://github.com/{owner}/{repo}/actions`

---

## STEP 3 — Summarize failures (mandatory)

Produce:

| Check | Conclusion | Log hint / annotation |
|-------|------------|------------------------|
| … | failure | e.g. test file, lint rule, build step |

Extract **actionable** strings (test name, file:line) from any summary text returned—do not hallucinate log lines you did not receive.

---

## STEP 4 — Route to department workflows (mandatory)

Recommend **one** primary path:

- **Test / lint / type errors** → `/fix-loop` with the error summary, or `/debug-team` for cross-cutting failures.
- **Flaky CI** → `/scout` on CI config (`.github/workflows/*`) + test isolation.
- **Auth / secrets in CI** → `/security-review` + rotate credentials (no secret values in chat).

Paste a **ready-to-run** next prompt template for the user:

```text
/fix-loop Fix CI failure on <repo> @ <sha>:
<paste check name + error excerpt>
```

---

## STEP 5 — Optional polling note (optional)

True polling (every N minutes) is **outside** Cursor. Document for the user:

- GitHub **webhooks** → internal automation, or
- Re-run `/ci-watch` after pushing a fix, or
- Use GitHub **merge queue** / branch protection as appropriate.

---

## OUTPUT

- **CI snapshot** table
- **Root cause hypothesis** (labeled hypothesis if not proven)
- **Next command** (`/fix-loop`, `/scout`, etc.)
- **Links** (repo actions, PR) as plain URLs—no secret query params

---

## Security

- Never echo **secrets** from workflow logs.
- If logs suggest exposed tokens, advise **rotation** without repeating the token.

#Check for outdated dependencies and update them safely one by one

Audit dependencies for outdated versions, security issues, and breaking changes, then update incrementally with test validation after each batch.

TASK:
{{args}}

MISSION
Systematically identify outdated and vulnerable dependencies, update them in safe batches (patch → minor → major), run the test suite after each batch, and stop before introducing regressions. Do not blindly upgrade everything at once.

OPERATING RULES
1. **Detect the package manager** from `package.json`, `Gemfile`, `requirements.txt`, `pyproject.toml`, `go.mod`, etc. Do not invent commands.
2. **Never upgrade all at once.** Group by risk: patch → minor → major. Each group gets its own install + test cycle.
3. **Read changelogs and breaking changes** for any minor or major upgrade before applying it, especially for framework/core dependencies.
4. **Test after each batch.** If tests fail, revert that batch and document the blocker. Do not skip to the next batch.
5. **Security vulnerabilities** (`npm audit`, `pip-audit`, `bundle audit`, etc.) are priority — fix these first regardless of semver.
6. **Lock files must be committed** when they change. Do not leave lockfile out of sync.
7. **Do not upgrade** dependencies that the user explicitly excluded in TASK (e.g. "skip React", "keep Postgres at 15").

STEPS
1. **Audit security first:**
   - `npm audit` / `pip-audit` / `bundle audit` / `go mod tidy`
   - List vulnerabilities by severity (CRITICAL, HIGH, MEDIUM, LOW)
   - Fix CRITICAL and HIGH vulnerabilities in the first batch

2. **Check for outdated packages:**
   - `npm outdated` / `pip list --outdated` / `bundle outdated` / `go list -m -u all`
   - Group results:
     - **PATCH** (`1.2.3` → `1.2.4`): safe — apply in bulk
     - **MINOR** (`1.2.3` → `1.3.0`): usually safe — check release notes, apply in small groups
     - **MAJOR** (`1.x` → `2.x`): risky — apply one at a time, read migration guide

3. **Update Batch 1 — Security fixes + patches:**
   - Apply security fixes
   - Apply all patch updates in one command
   - Run: install → lint → typecheck → test suite
   - If GREEN: commit this batch before continuing

4. **Update Batch 2 — Minor updates (grouped by ecosystem area):**
   - Update 3–5 related minors at a time
   - Run: install → typecheck → test suite
   - If GREEN: commit; if RED: revert batch, document blocker, continue with remaining

5. **Update Batch 3 — Major updates (one at a time):**
   - Read migration guide before updating
   - Update ONE major dependency
   - Apply code changes required by breaking changes (API renames, config changes)
   - Run: install → lint → typecheck → test suite
   - If GREEN: commit; if RED: revert, document blocker

6. **Final audit:**
   - Re-run security audit — confirm no remaining vulnerabilities
   - Run full test suite
   - Report final dependency health

UPGRADE PRIORITY ORDER
1. Security vulnerabilities (CRITICAL/HIGH)
2. Security vulnerabilities (MEDIUM/LOW)
3. Patch updates
4. Minor updates for core runtime/framework
5. Minor updates for tooling/dev dependencies
6. Major updates (explicit user request or security-driven)

COMMIT FORMAT PER BATCH
```
chore(deps): update <ecosystem> dependencies (<date>)

- Patch: <package>@<new>, ...
- Security: <CVE-ID> in <package> → <new>
- Breaking: <package> <old>→<new> — [what changed]
```

PREFERRED SKILLS
- `security-review` when vulnerabilities are CRITICAL or touch auth/payments libraries
- `reducing-entropy` if the audit reveals unused or duplicate dependencies to remove

PREFERRED SUBAGENTS
- `dependency-manager` for complex transitive conflicts or monorepo dependency graphs

PREFERRED MCPS
- `user-cursor10x-mcp` to persist a milestone after successful update run
- `user-duckduckgo` to search for migration guides for major upgrades

ESCALATION TRIGGERS
Stop and ask the user if:
- A major upgrade has breaking changes that require significant code changes beyond a few files
- Two dependencies have a peer dependency conflict that cannot be resolved without downgrading
- Tests fail after a patch update (unexpected regression — warrants investigation, not a skip)
- `npm audit fix --force` would install breaking changes — ask before running

OUTPUT FORMAT
- Package manager detected: [npm/pip/bundler/go/etc.]
- Security vulnerabilities found: [N critical, N high, N medium, N low]
- Outdated packages: [N patch, N minor, N major]
- Updates applied:
  | Package | Old | New | Type | Test result |
  |---------|-----|-----|------|-------------|
  | ...     | ... | ... | ...  | PASS/FAIL   |
- Skipped / blocked: [list with reason]
- Final audit: [CLEAN / remaining issues]
- Commits created: [N]
- Overall status: COMPLETE / PARTIAL — [what remains]

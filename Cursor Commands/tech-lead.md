# Tech lead review — architecture, code, security, and merge posture

Deliver a single consolidated staff-engineer-style review before merge or major handoff.

TASK:
{{args}}

MISSION
Review the current changes, plan, or specified scope from a **tech lead** perspective: architecture fit, implementation quality, security-sensitive surfaces, and performance implications. Produce one clear verdict and ordered actions—no duplicate parallel review documents unless you delegate slices and then **synthesize** here.

WHEN TO USE
- Pre-merge or pre-PR final check on a branch or diff.
- After a plan or scout output exists and you need **APPROVED / CAUTION / REWORK**.
- When the user asks for a tech lead, staff review, or “should we ship this”.

OPERATING RULES
1. **Clarify scope first**: files/commits/PR, intent, constraints (deadlines, rollout, breaking changes). If TASK is empty, default to **current working tree / branch diff** against the merge base; state what you assumed.
2. **Gather evidence**: read the actual diff and key files; note which tests or checks ran (or explicitly “not run”). Do not invent commands or claim runs without evidence.
3. **Four lenses** (brief but substantive):
   - **Architecture**: layer fit, coupling, contracts/API/schema evolution, migration safety, scale and ops (N+1, unbounded work).
   - **Code**: correctness, boundaries, maintainability, tests (happy path + critical failures), consistency with repo patterns.
   - **Security**: authz/authn, secrets, injection, user-controlled I/O, PII/payments if relevant—explicit **none** if no sensitive surface.
   - **Performance**: obvious regressions, hot paths, unnecessary work; skip micro-optimization nits unless material.
4. **Verdict** (exactly one): **APPROVED** | **CAUTION** | **REWORK** (definitions below).
5. **Severity** for findings: Blocker | Major | Minor. Blockers → REWORK unless user has explicitly accepted risk in writing.
6. Prefer the **smallest** fixes that address blockers; avoid review-driven scope creep.

VERDICT DEFINITIONS
- **APPROVED** — Safe to merge/build; at most minor or follow-up nits.
- **CAUTION** — Can proceed with **documented** risks, owners, and follow-ups; no silent debt.
- **REWORK** — Blocking correctness, security, or architecture; do not merge as-is.

MANDATORY SKILL
- Read and follow **`tech-lead-review`** for the full sequence (code → architecture → security), synthesis rules, and required output sections.

PREFERRED SKILLS
- `self-validate` before stating that tests or commands passed.
- `review-and-secure` as a lightweight final pass after substantive fixes.
- `receiving-code-review` if feedback from another reviewer needs rigorous triage.

PREFERRED SUBAGENTS (delegate when diff is large or risk is high; then synthesize)
- `code-reviewer` — broad or cross-cutting implementation review.
- `architect-reviewer` — boundaries, ownership, contracts, multi-service impact.
- `security-auditor` — broad or unfamiliar sensitive surfaces.

PREFERRED MCPS
- `user-Sequentialthinking` when classification of risk or approach is ambiguous after initial read.

OUTPUT FORMAT (required — match `tech-lead-review` skill)
1. **Scope summary** — reviewed vs. out of scope.
2. **Verdict** — **APPROVED** | **CAUTION** | **REWORK** (one line).
3. **Executive summary** — 3–6 bullets for PM/exec level.
4. **Code findings** — by severity; cite paths/lines when known.
5. **Architecture findings** — boundaries, contracts, scale/debt.
6. **Security flags** — explicit “none” if applicable.
7. **Recommended actions** — must-fix before merge, should-fix, nice-to-have.
8. **Validation gap** — what was not verified and residual risk.

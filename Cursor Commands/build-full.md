#Execute a task end-to-end with validation and final review

Implement the requested task end-to-end.

TASK:
{{args}}

MISSION
Complete the task across all affected layers with the smallest complete change set, validate it properly, and finish only when the repo is in a verified good state or a real blocker is demonstrated.

PRE-BUILD VALIDATION
Before writing any code, verify these prerequisites:

1. Branch check: confirm you are NOT on main/master unless explicitly instructed
2. Repo state: verify the working directory is clean or changes are intentional
3. Dependency sync: if touching package files, verify lockfile is in sync
4. Schema state: if touching DB, verify migration state is current
5. Test baseline: run the test suite on affected areas to confirm green BEFORE changes

If any check fails, fix it first. If fixing is out of scope, document and proceed with caution.

EXECUTION CONTRACT
1. Inspect the relevant code, rules, docs, schemas, and tests first.
2. Reconstruct the plan from the conversation and repo state.
3. Use the best matching skill and subagent combination:
   - `ship-feature` for general end-to-end work
   - `react-full-build` for React/Next tasks
   - `explore` for reconnaissance
   - `backend-developer`, `frontend-developer`, or `fullstack-developer` for implementation
   - `backend-patterns`, `nodejs-backend-patterns`, and other relevant skills only when clearly justified by the task surface
4. Use only the MCPs that materially improve execution.
5. Implement across all affected layers.
6. Reuse existing logic and keep changes aligned with current project conventions and rules.
7. Update docs when behavior, APIs, architecture, setup, or operations changed.
8. Add or update tests when behavior changed or coverage is insufficient.
9. Run the relevant validation set:
   - lint
   - typecheck
   - tests
   - build
   - migrations/schema validation if relevant
   - browser/UI checks if relevant
10. If anything fails, fix it before stopping.
11. Finish with final review:
   - `code-reviewer` for STANDARD or COMPLEX work
   - `security-review` and/or `review-and-secure` when the change touches auth, permissions, sessions, tokens, validation, uploads, secrets, sensitive data, or exposed APIs
   - `database-schema-designer` when the change touches schema, migrations, indexes, constraints, or data transformations
   - `humanizer` when the task changes user-visible text, UX copy, docs tone, onboarding text, release notes, PR notes, or error messages
   - `reducing-entropy` when the implementation can be safely simplified, deduplicated, or reduced in complexity without changing required behavior

PREFERRED SKILL ROUTING
- General implementation: `ship-feature`
- React/Next implementation: `react-full-build`, `react-dev`
- Backend/API/contracts: `backend-patterns`, `nodejs-backend-patterns`
- Security-sensitive work: `security-review`, `review-and-secure`
- Schema/migrations: `database-schema-designer`
- Browser-verifiable UI: `webapp-testing`
- Next.js/React performance or rendering concerns: `vercel-react-best-practices`
- Accessibility/UI quality: `web-design-guidelines`
- Visual/UI-heavy tasks: `frontend-design`, `ui-ux-pro-max`
- React effect correctness: `react-useeffect`
- Cursor rules/settings changes: `create-rule`, `update-cursor-settings`
- Human-facing copy/tone: `humanizer`
- Simplification/deduplication: `reducing-entropy`
- Pre-completion verification: `self-validate`

PREFERRED SUBAGENTS
- Default implementation: `frontend-developer`, `backend-developer`, `fullstack-developer`
- Debugging: `debugger`
- Final review: `code-reviewer`
- Conditional specialists: `nextjs-developer`, `api-designer`, `architect-reviewer`, `build-engineer`, `qa-expert`, `documentation-engineer`, `database-administrator`, `database-optimizer`, `performance-engineer`, `refactoring-specialist`, `security-engineer`, `security-auditor`, `legacy-modernizer`, `dependency-manager`, `deployment-engineer`, `tooling-engineer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`, `user-Sequentialthinking`, `user-context7`, `user-github`
- Conditional: `cursor-ide-browser`, `user-semgrep`, `user-eamodio.gitlens-extension-GitKraken`, `user-duckduckgo`, `user-time`, `user-memory`

CONDITIONAL SUBROUTINES
- Use `write-unit-tests` when tests are missing or should be expanded.
- Use `lint-suite` when linting/formatting/static issues are part of the validation surface.
- Use `run-all-tests-and-fix` when the task requires full-suite stabilization or when multiple test failures appear.
- Use `debug-issue` only when direct validation fails and root-cause diagnosis is needed.
- Use `humanizer` when the output includes human-facing wording that should sound clearer, more natural, or more polished.
- Use `reducing-entropy` when a smaller, clearer, lower-complexity implementation is the safest complete solution.

CONSTRAINTS
- Do not stop after producing a plan.
- Do not ask for confirmation between obvious implementation steps.
- Do not claim checks were run if they were not run.
- Do not claim something is fixed unless the relevant validation was rerun.
- Do not over-edit unrelated areas.
- Preserve architectural consistency.
- Before declaring done, run `self-validate` to verify all claims are evidence-based.

OUTPUT FORMAT
- What I inspected
- Skills/subagents used
- Conditional commands used
- What I changed
- Checks run and results
- Review/security notes
- Risks/assumptions
- Remaining blockers

CHECKPOINT SYSTEM
For STANDARD and COMPLEX tasks, create checkpoints:

After each major implementation phase:
CHECKPOINT [N]: [description]
- Files touched: [list]
- Validations passed: [list]
- Status: completed

If a later phase breaks something:
- Report which checkpoint was the last green state
- Focus repair on changes after that checkpoint

ARTIFACT TRACKING
Track all artifacts produced during build:

- Files created: [list]
- Files modified: [list]
- Files deleted: [list]
- Tests added: [list]
- Docs updated: [list]
- Dependencies added/removed: [list]

Report this in the output for traceability.

SCOPE TRACKING
Track files touched vs files planned:

- If an EXECUTION PACK exists, only the listed files should be modified
- If implementation requires touching a file NOT in the plan:
  - Assess if the plan missed a real dependency (legitimate, document it)
  - Or if it is scope creep (reject it)
- No opportunistic refactoring of unrelated code during focused tasks
- No dependency additions unless required by the task
- At completion, report: files planned vs files actually touched, with justification for any deviations

POST-BUILD VALIDATION
After implementation, run the post-build validation sequence:

1. Lint changed files
2. Typecheck changed files
3. Run tests related to changes
4. Search for debug code in changed files
5. Search for secrets in changed files
6. Review diff for unintended changes
7. Build (if available and relevant)

Only declare BUILD complete when all post-build checks pass.
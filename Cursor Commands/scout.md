#Fast repo reconnaissance with routing recommendation

Perform repo reconnaissance before planning or implementation.

TASK:
{{args}}

MISSION
Discover the real implementation surface quickly and accurately so later phases can route correctly.
Do not edit files. Do not redesign the solution. Do not over-speculate.

OPERATING RULES
1. Inspect the repo before making any recommendation.
2. Use the minimum effective set of Rules, Skills, Subagents, and MCPs.
3. Use only the MCPs that materially improve reconnaissance.
4. Verify commands from package files, scripts, config, docs, CI, and repo conventions when possible.
5. Reuse repo evidence, not assumptions.
6. Keep the result concise, operational, and evidence-based.
7. Do not edit files unless explicitly asked.
8. Prefer routing based on the affected change surface, not only the detected stack.

PREFERRED SKILLS FOR RECONNAISSANCE
- `backend-patterns`, `nodejs-backend-patterns`, `react-dev`, `react-full-build`
- `database-schema-designer` when schema or migrations are involved
- `security-review` only to flag sensitive surfaces
- `vercel-react-best-practices` for Next.js repos
- `create-rule` when `.cursor/rules` materially affect routing
- `humanizer` only if the requested task is mainly about user-visible copy, docs tone, or UX wording
- `reducing-entropy` only if the task is explicitly about simplification, deduplication, or reducing implementation surface

PREFERRED SUBAGENTS
- Default: `explore`
- Secondary: `generalPurpose`
- Conditional: `nextjs-developer`, `api-designer`, `architect-reviewer`, `database-administrator`, `database-optimizer`, `security-auditor`, `documentation-engineer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`, `user-Sequentialthinking`, `user-context7`, `user-github`
- Conditional: `user-semgrep`, `user-duckduckgo`, `user-memory`

GOALS
1. Detect stack, package manager, framework, app boundaries, and entry points.
2. Detect likely commands for:
   - install/bootstrap
   - lint
   - typecheck
   - test
   - build
   - dev/run
3. Find files and folders most relevant to the current task.
4. Check:
   - .cursor/rules
   - docs/
   - PLANNING.md
   - DB schema / migrations
   - env/config files
   - existing tests
5. Recommend:
   - best skill to activate
   - best subagent to delegate to
   - likely validation path
   - main risks
6. Detect whether later phases should require:
   - `security-review`
   - `database-schema-designer`
   - `write-unit-tests`
   - `humanizer`
   - `reducing-entropy`

CLASSIFICATION SUPPORT
Based on repo evidence, provide a routing recommendation:
- SIMPLE
- STANDARD
- COMPLEX

Use this logic:
- SIMPLE:
  isolated change, low blast radius, strong existing pattern, little or no contract impact
- STANDARD:
  multiple files or layers, moderate contract/validation impact, but established patterns exist
- COMPLEX:
  ambiguous scope, architectural impact, cross-cutting contracts, risky refactor, or unclear ownership

WHAT TO LOOK FOR
- Monorepo vs single app structure
- UI/backend/shared package boundaries
- Existing patterns similar to the requested task
- Validation boundaries: form/schema/API/database/domain
- Test strategy: unit/integration/e2e
- Build and CI expectations
- Security-sensitive surfaces
- Migration-sensitive surfaces
- Duplication, over-complexity, or opportunities to reduce entropy safely
- User-visible text surfaces where tone/clarity matters

OUTPUT FORMAT
- Stack summary
- Relevant files
- Validation commands
- Recommended skill/subagent routing
- Recommended classification
- Conditional review flags:
  - security-review → yes/no + why
  - database-schema-designer → yes/no + why
  - write-unit-tests → yes/no + why
  - humanizer → yes/no + why
  - reducing-entropy → yes/no + why
- Risks/constraints

WORKFLOW TYPE DETECTION
In addition to classification, detect the workflow type:

Based on task language and repo evidence:
- "add", "create", "implement", "new" → feature
- "fix", "bug", "broken", "error" → bugfix
- "refactor", "clean", "simplify" → refactor
- "security", "vulnerability", "audit" → security
- "migrate", "migration", "schema" → migration
- "docs", "documentation", "readme" → docs
- "slow", "performance", "optimize" → performance

Include workflow type in the output.

MEMORY LOOKUP
At the start of reconnaissance:
- Query `user-cursor10x-mcp` for previous findings about this repo
- Include relevant past decisions, patterns, and known issues in the output
- Flag any known blockers from previous sessions

DEPENDENCY MAPPING
For each file identified as relevant, also identify:
- What imports it (who depends on this file)
- What it imports (what this file depends on)
- Shared types/interfaces used across boundaries

This helps BUILD phase understand blast radius accurately.

OUTPUT FORMAT (updated)
- Stack summary
- Workflow type detected: [feature/bugfix/refactor/security/migration/docs/performance]
- Relevant files (with dependency direction: imports/imported-by)
- Validation commands (verified from repo)
- Memory findings: [previous session context if any]
- Recommended skill/subagent routing
- Recommended classification: SIMPLE / STANDARD / COMPLEX
- Confidence: HIGH / MEDIUM / LOW
- Conditional review flags:
  - security-review → yes/no + why
  - database-schema-designer → yes/no + why
  - write-unit-tests → yes/no + why
  - humanizer → yes/no + why
  - reducing-entropy → yes/no + why
- Risks/constraints
- Suggested parallelization: [what can run in parallel]
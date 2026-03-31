# AI Reasoning Tools & Knowledge Management

This document reflects **User Rules** for MCP tools, knowledge management, and tool usage. The **English** inventory of MCPs, Skills, and Subagents is below. The **Spanish** mirror is **[tools-inventory-es.md](./tools-inventory-es.md)**. For delegation policy and when to use subagents, see **tooling-delegation.md**.

---

## MCP Servers (Model Context Protocol)

| Server | Description |
|--------|-------------|
| **cursor-ide-browser** | Navigate and interact with web pages; frontend testing, snapshots, CPU profiling. |
| **user-Memory** | Knowledge graph operations (entities, relations, observations). |
| **user-Sequential Thinking** | Step-by-step reasoning (sequentialthinking). |
| **user-time** | Current time and time conversion. |
| **user-github** | GitHub integration (repos, PRs, etc.). |
| **user-duckduckgo** | Web search and `fetch_content`. |
| **user-Interactive** | `request_user_input`, `message_complete_notification`, intensive chat. |
| **user-semgrep** | Static analysis / security with Semgrep. |
| **user-context7** | Up-to-date documentation and code examples for libraries. |
| **user-cursor10x-mcp** | Project memory, context, and episodic continuity across sessions. |
| **user-devcontext** | Initialize conversation context for multi-step work. |
| **user-stitch** | Stitch integration (design/UI per your setup). |
| **user-mtg-commander-analyzer** | MTG Commander analysis (specialized). |
| **user-playwright** | Browser automation and testing (Playwright MCP). |
| **user-firecrawl** | Web crawl / scrape workflows (API key). |
| **user-notion** | Notion workspace integration. |
| **user-fetch** | HTTP fetch helper MCP. |
| **user-filesystem** | Filesystem access within configured roots. |
| **user-exa** | Exa search / retrieval (API key). |
| **user-eamodio.gitlens-extension-GitKraken** | GitLens / GitKraken IDE integration. |

Additional MCPs may be present in your environment. List available MCPs in the Context Packet when using the Execution Pack.

---

## Skills (Agent Skills)

| Skill | Primary use |
|-------|-------------|
| **backend-patterns** | Backend patterns, API design, DB optimization (Node, Express, Next.js). |
| **brainstorming** | Before creative work: explore intent, requirements, and design. |
| **database-schema-designer** | SQL/NoSQL schema design, normalization, indexes, migrations. |
| **frontend-design** | Distinctive, production-ready web interfaces. |
| **game-changing-features** | 10x product opportunities and high-impact improvements. |
| **humanizer** | Make text sound more natural and less AI-generated. |
| **nodejs-backend-patterns** | Node.js services with Express/Fastify, APIs, middleware, auth. |
| **react-dev** | React components with TypeScript, hooks, React 18–19, Server Components. |
| **react-useeffect** | Best practices for `useEffect` and alternatives. |
| **receiving-code-review** | Before implementing code review feedback; technical verification. |
| **requirements-gathering** | Structured requirements, acceptance criteria, and scope from vague asks. |
| **reducing-entropy** | Manual only: reduce total code size (activate on request). |
| **security-review** | Security review and codebase auditing. |
| **sdlc-checkpoint** | Phase gates between SDLC steps; PASS / CONDITIONAL / BLOCK verdicts. |
| **senior-backend** | Scalable backends (Node, Express, Go, Python, Postgres, GraphQL, REST). |
| **ui-ux-pro-max** | UI/UX: styles, palettes, typography, components, stacks (React, Next, Vue, etc.). |
| **vercel-react-best-practices** | React/Next.js performance optimization (Vercel). |
| **web-design-guidelines** | Review UI against accessibility and best-practice guidelines. |
| **webapp-testing** | Testing web applications with Playwright (browser, screenshots, logs). |
| **find-skills** | Discover and install skills when asking “how do I do X” or “is there a skill for…?”. |
| **create-rule** | Create Cursor rules (`.cursor/rules/`, standards, conventions). |
| **create-skill** | Create and write new Agent Skills. |
| **update-cursor-settings** | Modify Cursor/VSCode `settings.json`. |
| **api-contract-design** | REST/GraphQL contracts and service boundaries. |
| **error-handling-patterns** | try/catch, HTTP errors, validation, graceful degradation. |
| **git-workflow** | Branching, commits, PRs, conflict resolution. |
| **react-full-build** | React/Next end-to-end with UI verification. |
| **ship-feature** | End-to-end feature implementation with validation. |
| **testing-strategy** | Unit, integration, e2e, and test quality. |
| **tech-lead-review** | Staff-level review: quality, architecture fit, security-sensitive surfaces. |
| **review-and-secure** | Final quality and security review before handoff. |
| **self-validate** | Anti-hallucination gate before declaring done. |
| **phase-handoff** | Normalized artifacts and checklists between SDLC phases (orquestador, execution packs, resume). |
| **repo-discovery** | Read-only repo recon: stack, files, validation commands, risks (scout / pre-plan). |
| **auth-best-practices** | Auth and session patterns (JWT, OAuth2/OIDC, cookies, CSRF, etc.). |
| **debugging** | Structured debugging workflow before patching. |
| **finishing-a-development-branch** | Pre-PR / branch completion checklist. |
| **memory-bank** | Scaffold `/memory_bank/` for durable human-readable project context. |
| **prd** | Structured PRD / spec before implementation. |
| **project-bootstrap** | Cursor-ready project init (AGENTS.md, rules, memory scaffold). |
| **test-driven-development** | Red → green → refactor TDD discipline. |
| **web-accessibility** | WCAG-oriented accessibility for web UI. |
| **workflow-state** | `.cursor/plans/workflow_state.md` for orchestrator phase tracking. |

---

## Subagents (types for `mcp_task`)

Use the **subagent_type** parameter when delegating. See **tooling-delegation.md** for when to delegate.

### Agent prompt files (this repository)

The folder **[Cursor Subagents/agents/](../Cursor%20Subagents/agents/README.md)** contains **87** Markdown definitions: each file is named `<subagent_type>.md` and holds YAML frontmatter (`name`, `description`, optional `tools` / `model`) plus the full agent instructions. Use that directory when you need the complete prompt text; the subsections below are abbreviated routing summaries.

Task-tool types that **do not** have a matching file there (built-in / generic): `generalPurpose`, `explore`, `shell`, `best-of-n-runner`.

### General & exploration

- `generalPurpose` — General tasks, research, code search.
- `explore` — Fast codebase exploration (quick / medium / very thorough).
- `shell` — Bash commands, git, terminal.
- `best-of-n-runner` — Run a task in isolated git worktrees for parallel attempts or experiments.

### Agents & organization

- `agent-installer` — Discover/install agents from awesome-claude-code-subagents.
- `agent-organizer` — Assemble and coordinate multi-agent teams.

### AI & ML

- `ai-engineer` — End-to-end AI systems, models, pipelines, deployment.
- `llm-architect` — LLM systems in production, RAG, fine-tuning, serving.
- `ml-engineer` — ML pipelines, serving, retraining.
- `mlops-engineer` — ML infra, CI/CD for models, versioning, monitoring.
- `machine-learning-engineer` — Deploy and optimize models in production.
- `data-scientist` — Analysis, predictive models, experiments.
- `nlp-engineer` — NLP pipelines, NER, translation, production systems.
- `prompt-engineer` — Design and optimize prompts for LLMs.

### Backend & APIs

- `backend-developer` — APIs, microservices, persistence, auth, cache.
- `api-designer` — REST/GraphQL API design, OpenAPI, versioning.
- `api-documenter` — API documentation, OpenAPI, interactive portals.
- `graphql-architect` — GraphQL schemas, federation, query optimization.
- `django-developer` — Django 4+, DRF, async, multi-tenant.
- `rails-expert` — Rails 8+, Hotwire, performance.
- `php-pro` — PHP 8.3+, Laravel/Symfony, strict types.
- `python-pro` — Type-safe Python, FastAPI, async.

### Frontend & mobile

- `frontend-developer` — Full apps in React, Vue, Angular.
- `react-specialist` — React 18+ optimization, hooks, migrations.
- `nextjs-developer` — Next.js 14+, App Router, Server Components, SEO.
- `angular-architect` — Angular 15+, RxJS, micro-frontends.
- `vue-expert` — Vue 3, Composition API, Nuxt 3.
- `mobile-developer` — React Native, Flutter, cross-platform.
- `mobile-app-developer` — Native or cross-platform iOS/Android.
- `electron-pro` — Desktop apps with Electron.

### Full stack & DevOps

- `fullstack-developer` — Features spanning DB, API, and frontend.
- `devops-engineer` — IaC, CI/CD, containers, observability.
- `deployment-engineer` — Deployment pipelines, blue-green, canary.
- `build-engineer` — Build optimization, compile times, bundles.
- `platform-engineer` — IDPs, self-service, golden paths.
- `terraform-engineer` — Terraform, modules, state.
- `terragrunt-expert` — Terragrunt, DRY, multi-environment.
- `kubernetes-specialist` — Kubernetes in production.
- `azure-infra-engineer` — Azure infra, Bicep, PowerShell.
- `cloud-architect` — Cloud architecture design and optimization.
- `network-engineer` — Cloud/hybrid networks, security, performance.

### Data & DB

- `data-engineer` — Pipelines, ETL/ELT, data quality.
- `data-analyst` — Dashboards, reports, business analysis.
- `database-administrator` — HA, backups, DB migrations.
- `database-optimizer` — Slow queries, indexes, partitioning.
- `postgres-pro` — PostgreSQL: performance, replication, tuning.
- `sql-pro` — Complex SQL, data warehouse, concurrency.

### Security, compliance & risk

- `security-auditor` — Security and compliance audits.
- `security-engineer` — Security controls, zero-trust, DevSecOps.
- `penetration-tester` — Authorized penetration testing.
- `compliance-auditor` — GDPR, HIPAA, PCI DSS, SOC 2, ISO.
- `risk-manager` — Enterprise risk and controls.

### Quality, testing & docs

- `code-reviewer` — Code review (quality, security, best practices).
- `debugger` — Bug diagnosis, memory leaks, race conditions.
- `qa-expert` — QA strategy, test plan, metrics.
- `refactoring-specialist` — Safe refactors, technical debt.
- `documentation-engineer` — Documentation systems, API docs.
- `dependency-manager` — Vulnerabilities, version conflicts, bundles.

### Product, project & UX

- `product-manager` — Product strategy, prioritization, roadmap.
- `project-manager` — Project plans, risks, stakeholders.
- `ux-researcher` — User research, usability, interviews.
- `ui-designer` — Design systems, components, accessibility.
- `dx-optimizer` — DX: builds, feedback loops, onboarding.

### Specialized domains

- `fintech-engineer` — Payments, financial compliance.
- `payment-integration` — Payment gateways, PCI, fraud.
- `mcp-developer` — MCP servers and clients.
- `m365-admin` — Microsoft 365 automation, Graph API.
- `powershell-5.1-expert` — PowerShell 5.1 scripts, AD, DNS, DHCP.
- `powershell-module-architect` — PowerShell modules, profiles.
- `powershell-ui-architect` — WinForms/WPF/TUI UIs for PowerShell.
- `cli-developer` — Command-line tools.
- `tooling-engineer` — CLIs, code generators, IDE extensions.
- `seo-specialist` — Technical SEO, keywords, content.
- `research-analyst` — Research and synthesis from multiple sources.
- `search-specialist` — Advanced search and information retrieval.

### Architecture & coordination

- `architect-reviewer` — Review architecture decisions.
- `microservices-architect` — Decompose into microservices.
- `legacy-modernizer` — Incremental modernization of legacy systems.
- `multi-agent-coordinator` — Coordinate between agents.
- `context-manager` — Shared state between agents.
- `error-coordinator` — Error handling in distributed systems.
- `error-detective` — Diagnose and correlate errors.
- `workflow-orchestrator` — Business flows with states and compensation.
- `task-distributor` — Distribute tasks across workers/agents.
- `knowledge-synthesizer` — Synthesize patterns from interactions.

### Performance & SRE

- `performance-engineer` — Bottlenecks, load, scalability.
- `sre-engineer` — SLOs, error budgets, resilience.
- `websocket-engineer` — WebSockets, Socket.IO at scale.

### Languages & types

- `javascript-pro` — Modern JavaScript (ES2023+), async, performance.
- `typescript-pro` — Advanced types, TS migrations, full-stack type safety.

---

## Cursor CLI (headless `agent`)

| Resource | Purpose |
|----------|---------|
| Slash **`/cli-batch`** | [cli-batch.md](../Cursor%20Commands/cli-batch.md) — non-interactive batch work with `cursor agent` / `agent -p` and globs. |
| Slash **`/agent-dispatch`** | [agent-dispatch.md](../Cursor%20Commands/agent-dispatch.md) — Node runner for `agent -p` with retries and JSON logs under `hooks/logs/agent-runs/`. |
| Runner script | [agent-dispatch.js](../Cursor%20Hooks/user-export/hooks/agent-dispatch.js) in **`Cursor Hooks/user-export/hooks/`** (copy to `%USERPROFILE%\.cursor\hooks\` when restoring). |
| Example task config | [dispatch-config.example.json](../Cursor%20Hooks/user-export/hooks/dispatch-config.example.json) — optional multi-task JSON for the runner. |

**Orchestration:** [orquestador.md](../Cursor%20Commands/orquestador.md) defines when headless CLI is appropriate vs default in-IDE execution.

---

## Usage guidelines

- **Use tools proactively** to enrich understanding.
- **Build contextual knowledge** using semantic graphs or related entities.
- **Use search tools** to maintain fresh context.
- **Never ignore available tools** — they should enhance comprehension.
- Use MCP when not 100% confident; do not guess when a tool can confirm.
- Continuously refine both ideas and the process used to build them.

## Knowledge management

- Add observations to memory MCP (tagged per project/domain).
- Update documentation after execution.
- Maintain knowledge graph for project context.
- Use entities and relations to track project knowledge.

## Legacy / generic tool references

For backward compatibility, these tool groups remain valid:

- **Sequential Thinking:** Use for complex problem-solving; break down into steps; maintain context; filter irrelevant information.
- **Memory & Knowledge Graph:** `create_entities`, `create_relations`, `add_observations`, `delete_entities`, `delete_observations`, `delete_relations`, `read_graph`, `search_nodes`, `open_nodes`.
- **Interactive:** `request_user_input`, `message_complete_notification`, `start_intensive_chat`, `ask_intensive_chat`, `stop_intensive_chat`.
- **Search & Time:** `duckduckgo_web_search` (or DuckDuckGo MCP), `get_current_time`, `convert_time`.

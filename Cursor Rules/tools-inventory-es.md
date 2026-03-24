# Inventario de herramientas (español)

Referencia en **español** de servidores MCP, Agent Skills y tipos de subagente para Cursor. La versión en inglés y las guías de uso están en **[ai-tools.md](./ai-tools.md)**. La política de delegación está en **[tooling-delegation.md](./tooling-delegation.md)**.

---

## Servidores MCP (Model Context Protocol)

| Servidor | Descripción |
|----------|-------------|
| **cursor-ide-browser** | Navegar e interactuar con páginas web; testing de frontend, snapshots, perfiles de CPU. |
| **user-Memory** | Operaciones sobre el grafo de conocimiento (entidades, relaciones, observaciones). |
| **user-Sequential Thinking** | Razonamiento paso a paso (sequentialthinking). |
| **user-time** | Hora actual y conversión de tiempo. |
| **user-github** | Integración con GitHub (repos, PRs, etc.). |
| **user-duckduckgo** | Búsqueda web y `fetch_content`. |
| **user-Interactive** | `request_user_input`, `message_complete_notification`, chat intensivo. |
| **user-semgrep** | Análisis estático / seguridad con Semgrep. |
| **user-context7** | Documentación y ejemplos de código actualizados de librerías. |
| **user-cursor10x-mcp** | Memoria de proyecto, contexto y episodios (continuidad entre sesiones). |
| **user-devcontext** | Inicializar contexto de conversación para trabajo multi-paso. |
| **user-stitch** | Integración Stitch (diseño/UI según tu configuración). |
| **user-mtg-commander-analyzer** | Análisis Commander MTG (especializado). |
| **user-eamodio.gitlens-extension-GitKraken** | GitLens / GitKraken (historial y contexto Git en el IDE). |

Puede haber MCPs adicionales en tu entorno; lista los disponibles en el Context Packet cuando uses el Execution Pack.

---

## Skills (Agent Skills)

| Skill | Uso principal |
|-------|----------------|
| **backend-patterns** | Patrones de backend, diseño de API, optimización de BD (Node, Express, Next.js). |
| **brainstorming** | Antes de trabajo creativo: explorar intención, requisitos y diseño. |
| **database-schema-designer** | Diseño de esquemas SQL/NoSQL, normalización, índices, migraciones. |
| **frontend-design** | Interfaces web distintivas y listas para producción. |
| **game-changing-features** | Oportunidades de producto 10x y mejoras de alto impacto. |
| **humanizer** | Hacer que el texto suene más natural y menos generado por IA. |
| **nodejs-backend-patterns** | Servicios Node.js con Express/Fastify, APIs, middleware, auth. |
| **react-dev** | Componentes React con TypeScript, hooks, React 18–19, Server Components. |
| **react-useeffect** | Buenas prácticas de `useEffect` y alternativas. |
| **receiving-code-review** | Antes de implementar feedback de code review; verificación técnica. |
| **reducing-entropy** | Solo manual: reducir tamaño total del código (activar bajo petición). |
| **security-review** | Revisión de seguridad y auditoría de código. |
| **senior-backend** | Backends escalables (Node, Express, Go, Python, Postgres, GraphQL, REST). |
| **ui-ux-pro-max** | UI/UX: estilos, paletas, tipografía, componentes, stacks (React, Next, Vue, etc.). |
| **vercel-react-best-practices** | Optimización de rendimiento en React/Next.js (Vercel). |
| **web-design-guidelines** | Revisión de UI contra guías de accesibilidad y mejores prácticas. |
| **webapp-testing** | Testing de aplicaciones web con Playwright (navegador, screenshots, logs). |
| **find-skills** | Descubrir e instalar skills cuando preguntas “cómo hago X” o “¿hay un skill para…?”. |
| **create-rule** | Crear reglas de Cursor (`.cursor/rules/`, estándares, convenciones). |
| **create-skill** | Crear y escribir nuevos Agent Skills. |
| **update-cursor-settings** | Modificar `settings.json` de Cursor/VSCode. |
| **api-contract-design** | Contratos REST/GraphQL y límites entre servicios. |
| **error-handling-patterns** | try/catch, HTTP, validación, degradación controlada. |
| **git-workflow** | Ramas, commits, PRs, resolución de conflictos. |
| **react-full-build** | React/Next end-to-end con verificación de UI. |
| **ship-feature** | Implementación de feature completa con validación. |
| **testing-strategy** | Unit, integración, e2e y calidad de pruebas. |
| **review-and-secure** | Revisión final de calidad y seguridad antes de entregar. |
| **self-validate** | Comprobación anti-alucinación antes de declarar hecho. |

---

## Subagents (tipos para `mcp_task`)

**General & exploration**  
- `generalPurpose` – Tareas generales, investigación, búsqueda de código.  
- `explore` – Exploración rápida del codebase (quick / medium / very thorough).  
- `shell` – Comandos bash, git, terminal.  
- `best-of-n-runner` – Ejecutar una tarea en worktrees git aislados (intentos paralelos o experimentos).

**Agents & organization**  
- `agent-installer` – Descubrir/instalar agentes desde awesome-claude-code-subagents.  
- `agent-organizer` – Montar y coordinar equipos multi-agente.

**AI & ML**  
- `ai-engineer` – Sistemas AI de extremo a extremo, modelos, pipelines, despliegue.  
- `llm-architect` – Sistemas LLM en producción, RAG, fine-tuning, serving.  
- `ml-engineer` – Pipelines ML, serving, retraining.  
- `mlops-engineer` – Infra ML, CI/CD para modelos, versionado, monitoreo.  
- `machine-learning-engineer` – Despliegue y optimización de modelos en producción.  
- `data-scientist` – Análisis, modelos predictivos, experimentos.  
- `nlp-engineer` – Pipelines NLP, NER, traducción, sistemas en producción.  
- `prompt-engineer` – Diseño y optimización de prompts para LLMs.

**Backend & APIs**  
- `backend-developer` – APIs, microservicios, persistencia, auth, caché.  
- `api-designer` – Diseño de APIs REST/GraphQL, OpenAPI, versionado.  
- `api-documenter` – Documentación de APIs, OpenAPI, portales interactivos.  
- `graphql-architect` – Esquemas GraphQL, federación, optimización de queries.  
- `django-developer` – Django 4+, DRF, async, multi-tenant.  
- `rails-expert` – Rails 8+, Hotwire, rendimiento.  
- `php-pro` – PHP 8.3+, Laravel/Symfony, tipos estrictos.  
- `python-pro` – Python type-safe, FastAPI, async.  
- `nodejs-developer` – (si está en tu lista local) Node/TS backends.

**Frontend & mobile**  
- `frontend-developer` – Apps completas en React, Vue, Angular.  
- `react-specialist` – Optimización React 18+, hooks, migraciones.  
- `nextjs-developer` – Next.js 14+, App Router, Server Components, SEO.  
- `angular-architect` – Angular 15+, RxJS, micro-frontends.  
- `vue-expert` – Vue 3, Composition API, Nuxt 3.  
- `mobile-developer` – React Native, Flutter, cross-platform.  
- `mobile-app-developer` – iOS/Android nativos o cross-platform.  
- `electron-pro` – Apps de escritorio con Electron.

**Full stack & DevOps**  
- `fullstack-developer` – Features que cruzan BD, API y frontend.  
- `devops-engineer` – IaC, CI/CD, contenedores, observabilidad.  
- `deployment-engineer` – Pipelines de despliegue, blue-green, canary.  
- `build-engineer` – Optimización de builds, tiempos de compilación, bundles.  
- `platform-engineer` – IDPs, self-service, golden paths.  
- `terraform-engineer` – Terraform, módulos, estado.  
- `terragrunt-expert` – Terragrunt, DRY, multi-ambiente.  
- `kubernetes-specialist` – Kubernetes en producción.  
- `azure-infra-engineer` – Infra en Azure, Bicep, PowerShell.  
- `cloud-architect` – Diseño y optimización de arquitectura en la nube.  
- `network-engineer` – Redes cloud/híbridas, seguridad, rendimiento.

**Data & DB**  
- `data-engineer` – Pipelines, ETL/ELT, calidad de datos.  
- `data-analyst` – Dashboards, reportes, análisis de negocio.  
- `database-administrator` – HA, backups, migraciones de BD.  
- `database-optimizer` – Consultas lentas, índices, particionado.  
- `postgres-pro` – PostgreSQL: rendimiento, replicación, tuning.  
- `sql-pro` – SQL complejo, data warehouse, concurrencia.

**Security, compliance & risk**  
- `security-auditor` – Auditorías de seguridad y cumplimiento.  
- `security-engineer` – Controles de seguridad, zero-trust, DevSecOps.  
- `penetration-tester` – Pruebas de penetración autorizadas.  
- `compliance-auditor` – GDPR, HIPAA, PCI DSS, SOC 2, ISO.  
- `risk-manager` – Riesgos empresariales y controles.

**Quality, testing & docs**  
- `code-reviewer` – Revisión de código (calidad, seguridad, buenas prácticas).  
- `debugger` – Diagnóstico de bugs, memory leaks, race conditions.  
- `qa-expert` – Estrategia QA, plan de pruebas, métricas.  
- `refactoring-specialist` – Refactors seguros, deuda técnica.  
- `documentation-engineer` – Sistemas de documentación, API docs.  
- `dependency-manager` – Vulnerabilidades, conflictos de versiones, bundles.

**Product, project & UX**  
- `product-manager` – Estrategia de producto, priorización, roadmap.  
- `project-manager` – Planes de proyecto, riesgos, stakeholders.  
- `ux-researcher` – Investigación de usuarios, usabilidad, entrevistas.  
- `ui-designer` – Sistemas de diseño, componentes, accesibilidad.  
- `dx-optimizer` – DX: builds, feedback loops, onboarding.

**Specialized domains**  
- `fintech-engineer` – Pagos, cumplimiento financiero.  
- `payment-integration` – Pasarelas de pago, PCI, fraude.  
- `mcp-developer` – Servidores y clientes MCP.  
- `m365-admin` – Automatización Microsoft 365, Graph API.  
- `powershell-5.1-expert` – Scripts PowerShell 5.1, AD, DNS, DHCP.  
- `powershell-module-architect` – Módulos PowerShell, perfiles.  
- `powershell-ui-architect` – UIs WinForms/WPF/TUI para PowerShell.  
- `cli-developer` – Herramientas de línea de comandos.  
- `tooling-engineer` – CLIs, generadores de código, extensiones IDE.  
- `seo-specialist` – SEO técnico, keywords, contenido.  
- `research-analyst` – Investigación y síntesis de múltiples fuentes.  
- `search-specialist` – Búsqueda avanzada y recuperación de información.

**Architecture & coordination**  
- `architect-reviewer` – Revisión de decisiones de arquitectura.  
- `microservices-architect` – Descomposición en microservicios.  
- `legacy-modernizer` – Modernización incremental de sistemas legacy.  
- `multi-agent-coordinator` – Coordinación entre agentes.  
- `context-manager` – Estado compartido entre agentes.  
- `error-coordinator` – Manejo de errores en sistemas distribuidos.  
- `error-detective` – Diagnóstico y correlación de errores.  
- `workflow-orchestrator` – Flujos de negocio con estados y compensaciones.  
- `task-distributor` – Distribución de tareas entre workers/agentes.  
- `knowledge-synthesizer` – Sintetizar patrones a partir de interacciones.  

**Performance & SRE**  
- `performance-engineer` – Cuellos de botella, carga, escalabilidad.  
- `sre-engineer` – SLOs, error budgets, resiliencia.  
- `websocket-engineer` – WebSockets, Socket.IO a escala.

**Lenguajes y tipos**  
- `javascript-pro` – JavaScript moderno (ES2023+), async, rendimiento.  
- `typescript-pro` – Tipos avanzados, migraciones TS, type-safety full-stack.

---

**Nota:** Si mantienes un borrador local fuera del repo (por ejemplo notas o listas experimentales), no lo enlaces desde la documentación versionada; actualiza **tools-inventory-es.md** y **ai-tools.md** cuando quieras publicar cambios.

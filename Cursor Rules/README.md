# Cursor Rules - Global Configuration

This folder contains global rules and best practices for Cursor AI that can be shared across projects and teams. These rules are designed to enforce best practices, standardize patterns, and improve code quality across all development work.

**Source of truth:** The **User Rules** (configured in Cursor, e.g. in the `user_rules` block) are the source of truth. The files in this folder **document and reflect** those User Rules so they can be shared, versioned, or used as reference. In case of conflict, the User Rules prevail.

## Sibling folders (Cursor ecosystem in this repo)

These live next to `Cursor Rules/` at the repository root:

| Folder | Purpose |
|--------|---------|
| [Cursor Skills](../Cursor%20Skills/) | Agent Skills — referencia + copias exportadas (`exported-*-skills`, manifest) |
| [Cursor Commands](../Cursor%20Commands/) | Comandos slash exportados desde `.cursor/commands` |
| [Cursor Hooks](../Cursor%20Hooks/) | Documentación + ejemplo + **`user-export/`** (copia de hooks globales) |
| [Cursor Subagents](../Cursor%20Subagents/) | Delegación Task / subagentes; definiciones largas en **[agents/](../Cursor%20Subagents/agents/README.md)** |
| [Cursor MCPs](../Cursor%20MCPs/) | Inventario MCP sin secretos + `mcp.config.example.json` |
| [Cursor User Rules](../Cursor%20User%20Rules/) | Cómo respaldar User Rules de Cursor (no versionar el JSON real con secretos) |
| [Cursor Requestable Rules](../Cursor%20Requestable%20Rules/) | Reglas solicitables del entorno (p. ej. `cursor10x-mcp.mdc`) |
| [Cursor Project Analyzer](../Cursor%20Project%20Analyzer/) | Custom Mode para knowledge graph del repo |
| [Cursor Rules Maker](../Cursor%20Rules%20Maker/) | Custom Mode para generar `.mdc` de proyecto |
| [tools-inventory-es.md](./tools-inventory-es.md) | MCP + Skills + Subagents (español) |

## Overview

These rules are designed to be used as global configuration in Cursor AI. They cover:

- **Plan Mode First** - Mandatory plan-before-acting flow, investigate before editing, verify and report
- **Execution Pack for Executor** - Context Packet, Task Contracts, Agent Routing, Escalation, Model Assignment
- **Tooling & Delegation** - MCP/Skills/Subagents availability, risk triage, SUBAGENTS POLICY
- **Cursor Rules Management** - When to add/modify/deprecate rules; `.cursor/rules/` structure
- **Ultrathink Philosophy** - Vision and mindset for crafting elegant, intuitive solutions
- **Code Craftsmanship** - Principles for creating beautiful, well-designed code
- **Tool Mastery** - Guidelines for using tools like a virtuoso
- **Critical Thinking & Intellectual Rigor** - Framework for analyzing assumptions and maintaining rigorous standards
- **Development Workflow** - Best practices for monitoring, dependencies, releases, and PR governance
- **Security & Compliance** - Standards aligned with PCI, GDPR, and OWASP requirements
- **Code Quality** - Principles for modular, maintainable, and well-structured code
- **Testing & Reliability** - Requirements for comprehensive testing (≥90% coverage) and error handling
- **Documentation** - Standards for code documentation and communication (including the rule: do not create .md unless requested)
- **AI Tools** - Full list of MCPs, Skills, and Subagents (English); usage guidelines; Spanish: **tools-inventory-es.md**
- **Stack-Specific Rules** - Framework-specific conventions (React, Next.js, NestJS, etc.)
- **Workflow Process** - Checklists and execution workflows
- **UI/UX Standards** - Design system guidelines and accessibility requirements

## How to Use

### Option 1: Use All Rules (Recommended)
1. Copy the contents of all `.md` files in this folder
2. Combine them into a single configuration
3. Add them to your Cursor AI global rules configuration
4. Customize as needed for your specific needs

### Option 2: Selective Use
1. Review the file descriptions below
2. Copy only the relevant `.md` files for your needs
3. Add them to your Cursor AI configuration
4. Mix and match as appropriate

### Option 3: Project-Specific Rules
1. Use these as a base for project-specific rules
2. Adapt them to your project's conventions
3. Store project-specific rules in `.cursor/rules/` directory

## File Structure & Descriptions

### Plan Mode & Execution (User Rules 1, 2, 4)

- **`plan-mode.md`** - Plan Mode First (User Rule): Restate task and success, plan (3–7 bullets), investigate before editing, tooling discipline, execute only after investigation, verify and report. Required output headers (Plan Mode / Execution). The plan is not replaced by the Execution Pack.

- **`execution-pack.md`** - Execution Pack for Executor (User Rules 2, 4): Context Packet (0), Tooling & Delegation Policy (0.1), Task Normalization (1), Task Contracts (2), Agent Routing (3), Dependency & Parallelism (4), Execution Order & Checkpoints (5), Escalation Triggers (6). Optional: Model Assignment per task.

- **`tooling-delegation.md`** - Tooling-First Planning and SUBAGENTS POLICY (User Rules 3, 17): Availability check (MCP/Skills/Subagents), risk & domain triage, verification ladder, conditional tool selection, Skills routing, Subagent routing. When to delegate; 1–2 subagents; explain if not delegating. Integrity: do not claim tool use unless actually used.

- **`cursor-rules-management.md`** - Rule Improvement and Cursor Rules Management (User Rule 6): Triggers to add/modify/deprecate rules; structure of rules (`.cursor/rules/`, .mdc format, naming kebab-case, categories). Reference to “do not create .md unless requested” (see documentation.md).

### Philosophy & Craftsmanship (Ultrathink)

- **`ultrathink-philosophy.md`** - The vision and mindset for exceptional development:
  - Think Different: Question assumptions, seek elegant solutions
  - Reality Distortion Field: Push beyond perceived limitations
  - The Integration: Technology married with humanities
  - Making a dent in the universe

- **`craftsmanship.md`** - Principles for code as craft:
  - Craft, Don't Code: Every function name should sing
  - Obsess Over Details: Understand the soul of the code
  - Plan Like Da Vinci: Sketch before implementing
  - Simplify Ruthlessly: Elegance through subtraction
  - Iterate Relentlessly: Never settle for "good enough"

- **`tool-mastery.md`** - Using tools like instruments:
  - Command line and automation mastery
  - MCP servers and custom commands
  - Git history as storytelling
  - Visual resources as inspiration

### Core Rules

- **`critical-thinking.md`** - Framework for critical analysis, assumption testing, and intellectual rigor. Ensures ideas are challenged and validated before implementation.

- **`development-workflow.md`** - Complete development workflow including:
  - Monitoring & Observability (logs, metrics, APM)
  - Dependency Management (lock files, validation)
  - Release Strategy (environments, semantic versioning, feature flags)
  - PR Governance (checklists, reviews, CI validation)

- **`security-compliance.md`** - Security and compliance standards:
  - Never expose secrets or sensitive data
  - PCI, GDPR, and OWASP compliance
  - Secure coding patterns
  - Data protection best practices

- **`code-quality.md`** - Code quality and structure standards:
  - Modular organization by feature/responsibility
  - SOLID principles
  - Project convention respect
  - Style guidelines and documentation

### Testing & Documentation

- **`testing-reliability.md`** - Testing and reliability requirements:
  - ≥90% test coverage mandate
  - Unit, integration, load, and accessibility testing
  - Error recovery patterns
  - Definition of Done checklist

- **`documentation.md`** - Documentation and communication standards:
  - **Regla de creación de documentación:** Do not create .md files unless the user explicitly requests it; exception: update existing .md when outdated
  - Code documentation (docstrings, comments)
  - Project documentation (README, architecture docs)
  - Communication guidelines
  - Deliverable requirements

### Tools & Process

- **`ai-tools.md`** - AI reasoning tools and knowledge management (English tables):
  - **Full list of MCP servers** (cursor-ide-browser, user-Memory, user-Sequential Thinking, user-time, user-github, user-duckduckgo, user-Interactive, user-semgrep, user-context7, etc.)
  - **Full list of Skills** (Agent Skills) with primary use
  - **Full list of Subagents** by category (generalPurpose, explore, shell, backend-developer, etc.) for `mcp_task`
  - Spanish mirror: **`tools-inventory-es.md`**
  - Usage guidelines and knowledge management
  - Link to `tooling-delegation.md` for delegation policy

- **`workflow-process.md`** - Complete workflow process:
  - Pre-execution checklist
  - Execution workflow (research → analyze → plan → implement → test → validate → document)
  - Post-execution checklist
  - Initialization process
  - Auto-run capability

### Stack & Design

- **`stack-specific.md`** - Stack-specific rules and conventions:
  - Frontend (React, Next.js, component patterns)
  - Backend (NestJS, async patterns, validation)
  - Mobile (Ionic, platform-specific)
  - Database (migrations, parameterized queries)
  - Language-specific (TypeScript, Python, PHP)

- **`ui-ux-standards.md`** - UI/UX design standards:
  - Design systems (Material Design, Tailwind, etc.)
  - Current trends (2024-2025)
  - WCAG 2.1 AA accessibility compliance
  - Performance optimization
  - Continuous improvement practices

## Quick Start

1. **For Craftsmen**: Start with the Ultrathink rules (`ultrathink-philosophy.md`, `craftsmanship.md`, `tool-mastery.md`) to set the mindset
2. **For New Projects**: Add core rules (`critical-thinking.md`, `development-workflow.md`, `code-quality.md`, `security-compliance.md`)
3. **For Existing Projects**: Add rules incrementally, starting with `code-quality.md` and `testing-reliability.md`
4. **For Teams**: Share this folder and let each team member customize as needed

## Best Practices

- **Start Small**: Don't overwhelm yourself. Add rules gradually as you understand their impact.
- **Customize**: These are templates. Adapt them to your team's specific needs and conventions.
- **Review Regularly**: Update rules as your project evolves and new patterns emerge.
- **Share Improvements**: If you find better ways to express these rules, share them back.

## Contributing

These rules are meant to be shared and improved. Feel free to:
- Adapt them to your needs
- Contribute improvements
- Share your customizations
- Report issues or suggest enhancements

## License

These rules are provided as-is for use in Cursor AI. Feel free to modify and distribute as needed.


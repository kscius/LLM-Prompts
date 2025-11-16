# Cursor Rules - Global Configuration

This folder contains global rules and best practices for Cursor AI that can be shared across projects and teams. These rules are designed to enforce best practices, standardize patterns, and improve code quality across all development work.

## Overview

These rules are designed to be used as global configuration in Cursor AI. They cover:

- **Critical Thinking & Intellectual Rigor** - Framework for analyzing assumptions and maintaining rigorous standards
- **Development Workflow** - Best practices for monitoring, dependencies, releases, and PR governance
- **Security & Compliance** - Standards aligned with PCI, GDPR, and OWASP requirements
- **Code Quality** - Principles for modular, maintainable, and well-structured code
- **Testing & Reliability** - Requirements for comprehensive testing (≥90% coverage) and error handling
- **Documentation** - Standards for code documentation and communication
- **AI Tools** - Guidelines for using MCP tools and knowledge management
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
  - Code documentation (docstrings, comments)
  - Project documentation (README, architecture docs)
  - Communication guidelines
  - Deliverable requirements

### Tools & Process

- **`ai-tools.md`** - AI reasoning tools and knowledge management:
  - MCP tools usage (sequential thinking, memory, interactive)
  - Knowledge graph management
  - Search and time tools
  - Usage guidelines

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

1. **For New Projects**: Start with all core rules (`critical-thinking.md`, `development-workflow.md`, `code-quality.md`, `security-compliance.md`)
2. **For Existing Projects**: Add rules incrementally, starting with `code-quality.md` and `testing-reliability.md`
3. **For Teams**: Share this folder and let each team member customize as needed

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


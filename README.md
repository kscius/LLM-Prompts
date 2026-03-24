# LLM-Prompts

A curated collection of high-quality AI prompts designed to enhance your workflow with Large Language Models (LLMs). These prompts can be used with ChatGPT, Claude, Gemini, Cursor AI, and other LLM platforms.

## 📚 Table of Contents

- [Overview](#overview)
- [Available Prompts](#available-prompts)
- [Cursor IDE ecosystem](#cursor-ide-ecosystem)
- [Quick Start](#quick-start)
- [Repository Structure](#repository-structure)
- [Usage Guidelines](#usage-guidelines)
- [Contributing](#contributing)

## Overview

This repository contains carefully crafted prompts that transform AI assistants into specialized tools for specific tasks. Each prompt is:

- **Well-tested**: Designed and refined for optimal performance
- **Universal**: Compatible with most LLM platforms
- **Documented**: Includes comprehensive README files with usage instructions
- **Ready to use**: Copy-paste ready with minimal setup required

## Available Prompts

### 🎯 [Resume Analyzer](./Resume%20Analyzer/)

A specialized AI assistant for optimizing CVs/resumes for software engineering roles. Transforms any LLM into a senior technical recruiter and career coach.

**Features:**
- Multi-language support with automatic detection
- ATS (Applicant Tracking System) optimization
- Job description alignment
- Impact-focused rewriting with quantified achievements
- Structured diagnosis and actionable recommendations

**Best for:** Software engineers, backend developers, full-stack developers looking to improve their CVs for technical roles.

**Platforms:** Works with ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms.

[📖 Read More](./Resume%20Analyzer/README.md)

---

### ⚙️ [Cursor Rules](./Cursor%20Rules/)

A comprehensive collection of global rules and best practices for Cursor AI. These rules enforce coding standards, development workflows, and quality assurance across projects.

**Features:**
- Plan Mode, Execution Pack, tooling delegation, and Cursor rules management
- Critical thinking and intellectual rigor framework
- Development workflow, security/compliance (PCI, GDPR, OWASP), code quality
- Testing and reliability requirements (≥90% coverage where applicable)
- Stack-specific rules (React, Next.js, NestJS, etc.) and UI/UX standards
- **ai-tools.md** (English) and **tools-inventory-es.md** (Spanish) for MCPs, Skills, and Subagents

**Companion folders:** [Cursor Skills](./Cursor%20Skills/) (incl. skills exportados), [Cursor Commands](./Cursor%20Commands/) (comandos slash), [Cursor Hooks](./Cursor%20Hooks/) (incl. `user-export/`), [Cursor Subagents](./Cursor%20Subagents/), [Cursor MCPs](./Cursor%20MCPs/), [Cursor User Rules](./Cursor%20User%20Rules/), [Cursor Requestable Rules](./Cursor%20Requestable%20Rules/).

**Best for:** Development teams using Cursor AI who want to standardize practices and improve code quality.

**Platforms:** Primarily designed for Cursor AI, but can be adapted for other platforms.

[📖 Read More](./Cursor%20Rules/README.md)

---

### 🔧 [Cursor Rules Maker](./Cursor%20Rules%20Maker/)

An AI-powered workflow engineer that analyzes your codebase and automatically generates project-specific Cursor Rules (`.mdc` files). Follows a structured 5-phase approach to create comprehensive rule sets.

**Features:**
- Forensic analysis of codebase and dependencies
- Automatic pattern detection and standardization
- Project-specific rule generation
- Knowledge framework creation
- Phased approach with approval checkpoints
- Uses 5 MCP tools: sequentialthinking, memory, duckduckgo, interactive, time

**Best for:** Teams starting with Cursor AI or projects needing custom rule sets based on their specific architecture and patterns.

**Platforms:** Designed for Cursor AI Custom Modes with Agent Mode.

[📖 Read More](./Cursor%20Rules%20Maker/README.md)

---

### 🧠 [Cursor Project Analyzer](./Cursor%20Project%20Analyzer/)

An intelligent codebase analyst that builds and maintains a persistent, queryable knowledge base of your project. Transforms Cursor AI into a senior software engineer with deep project understanding.

**Features:**
- Automatic repository scanning and indexing
- Persistent knowledge graph with entities and relations
- Answers architecture and implementation questions
- Maintains up-to-date context as code evolves
- Spanish-first interface with structured responses
- Uses 5 MCP tools: memory, sequentialthinking, duckduckgo, interactive, time

**Best for:** Development teams wanting deep, persistent codebase understanding, architectural guidance, and intelligent code navigation.

**Platforms:** Designed for Cursor AI Agent Mode with Memory MCP.

[📖 Read More](./Cursor%20Project%20Analyzer/README.md)

---

### Cursor IDE ecosystem

Shared reference and templates for Cursor beyond single prompts:

| Folder | Description |
|--------|-------------|
| [Cursor Skills](./Cursor%20Skills/) | Skills: guía + carpetas **exported-cursor-skills** / **exported-agents-skills** + manifest |
| [Cursor Commands](./Cursor%20Commands/) | Comandos slash (18 prompts), p. ej. **orquestador**, scout, plan, build-full |
| [Cursor Hooks](./Cursor%20Hooks/) | Documentación + ejemplo + **user-export/** (copia de hooks globales) |
| [Cursor Subagents](./Cursor%20Subagents/) | Delegación Task; lista de tipos en **task-subagent-types.md** |
| [Cursor MCPs](./Cursor%20MCPs/) | Inventario de servidores MCP sin secretos + plantilla **mcp.config.example.json** |
| [Cursor User Rules](./Cursor%20User%20Rules/) | Cómo respaldar User Rules (no subir JSON con datos sensibles) |
| [Cursor Requestable Rules](./Cursor%20Requestable%20Rules/) | Reglas solicitables del entorno (p. ej. cursor10x-mcp) |
| [Cursor Rules / tools-inventory-es](./Cursor%20Rules/tools-inventory-es.md) | MCP, Skills, Subagents (español); par con **ai-tools.md** |

---

### 📊 [Log Analyzer](./Log%20Analyzer/)

An expert system and application log analyzer that transforms any LLM into a specialized diagnostic tool. Provides comprehensive, structured analysis of logs in JSON and plain-text formats.

**Features:**
- Multi-format support (JSON and plain-text logs)
- Automatic structure detection and parsing
- Error detection and pattern recognition
- Cross-service event correlation
- 6-section structured output (Executive Summary, Errors, Traceability, Patterns, Recommendations, Statistics)
- Evidence-based analysis with actionable insights

**Best for:** Developers and DevOps teams debugging production issues, investigating incidents, analyzing performance, and monitoring distributed systems.

**Platforms:** Works with ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms.

[📖 Read More](./Log%20Analyzer/README.md)

---

### 🃏 [MTG Judge](./MTG%20Judge/)

An expert Magic: The Gathering rules judge that provides accurate, comprehensive rulings based on official Comprehensive Rules and Oracle card text. Transforms any LLM into a highest-level MTG Judge.

**Features:**
- Expert knowledge of Comprehensive Rules and Oracle text
- Card interaction analysis with CR references
- 4-section structured responses (Summary, Interaction, Step-by-Step, Relevant Rules)
- All formats supported (Commander, Modern, Legacy, Vintage, Standard, etc.)
- Tournament policy guidance
- Covers layers, stack, priority, replacement effects, and complex interactions

**Best for:** Magic: The Gathering players (casual to competitive) needing rules clarifications, tournament judges in training, and players verifying complex card interactions.

**Platforms:** Works with ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms. Best with internet access for Oracle text lookup.

[📖 Read More](./MTG%20Judge/README.md)

---

### 🔎 [Search Engine (GPT-5 Thinking Expert Mode)](./Search%20Engine/)

A high-performance, expert-facing assistant that transforms LLMs with web search into adaptive reasoning engines. Delivers accurate, current, and decision-ready outputs with multi-tool integration.

**Features:**
- Web search intelligence with smart triggers and proper citations
- 4 modular output profiles (Executive, Deep Dive, Builder, Socratic)
- Multi-tool integration (Web Search, Code Interpreter, Image Generation, Canvas)
- Structured output (Summary, Context, Analysis, Recommendation, Risks, Next Steps)
- Confidence levels and transparent assumptions
- Numerical rigor with error bounds

**Best for:** Power users, technical professionals, researchers, and developers needing current information, validated analysis, and decision-ready outputs across analytical and technical work.

**Platforms:** Requires LLM with web search and tool access (ChatGPT Plus/Pro, Claude with tools). Best with Code Interpreter enabled.

[📖 Read More](./Search%20Engine/README.md)

---

### 👨‍💻 [Development Assistant](./Development%20Assistant/)

A high-performance Software Development Assistant that transforms LLMs into expert development partners for full-stack and system-level work. Provides adaptive reasoning, visual aids, and implementation-ready code.

**Features:**
- Full-stack expertise (Node.js, React, PHP, Python, Java, Go, databases, and more)
- 9 support types (debugging, optimization, testing, features, code review, API design, architecture, UI/UX, best practices)
- Multi-tool integration (Web Search, Code Interpreter, Canvas diagrams, DALL·E mockups)
- 6-section structured responses (Context, Code, Explanation, Alternatives, Best Practices, Visual Aid)
- Copy-paste-ready code blocks
- Task-specific guidelines for different development scenarios

**Best for:** Technically proficient developers needing expert guidance, code review, architecture design, performance optimization, and visual system diagrams across any stack.

**Platforms:** Requires LLM with multi-tool access (ChatGPT Plus/Pro with Canvas and DALL·E, Claude with tools). Best with all tools enabled.

[📖 Read More](./Development%20Assistant/README.md)

---

### ✨ [Prompt Master](./Prompt%20Master/)

An advanced Prompt Engineer specialized in designing detailed, multi-step prompts for OpenAI models and other LLMs. Assists experienced users in creating precise, efficient, and context-aware prompts.

**Features:**
- 6-phase structured process (Detect Domain, Understand, Define, Craft, Optimize, Iterate)
- Dual-format delivery (Readable + Copy-Paste versions)
- Domain-specific optimization (legal, coding, medical, marketing, etc.)
- Built-in evaluation checklist and quality assurance
- Safety & integrity guidelines (flags risks, proposes compliant alternatives)
- Temperature recommendations for different tasks
- Token efficiency optimization

**Best for:** Prompt engineers, power users, developers, and professionals creating sophisticated prompts for any domain or use case. Ideal for building reusable prompt templates and optimizing existing prompts.

**Platforms:** Works with ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms.

[📖 Read More](./Prompt%20Master/README.md)

---

## Quick Start

### Using a Prompt

1. **Choose a prompt** from the [Available Prompts](#available-prompts) section above
2. **Read the README** in the prompt's folder for detailed instructions
3. **Copy the prompt** from the `Prompt.md` file
4. **Use with your LLM**:
   - **Direct paste**: Paste into ChatGPT, Claude, or Gemini chat
   - **Custom Instructions**: Add to system prompts or custom instructions
   - **Cursor AI**: Create a Custom Mode (see individual READMEs for details)

### Example: Using Resume Analyzer

```bash
# 1. Navigate to the prompt folder
cd "Resume Analyzer"

# 2. Open Prompt.md and copy the content

# 3. Paste into your LLM chat interface

# 4. Follow the AI's instructions to provide your CV
```

## Repository Structure

```
LLM-Prompts/
├── README.md                    # This file
│
├── Resume Analyzer/             # CV optimization prompt
│   ├── README.md               # Usage instructions
│   └── Prompt.md               # The prompt content
│
├── Cursor Rules/                # Global Cursor AI rules (many .md topics; see README)
│   ├── README.md               # Index: plan-mode, execution-pack, ai-tools, etc.
│   ├── ai-tools.md             # MCP, Skills, Subagents (English)
│   └── tools-inventory-es.md   # Same inventory (Spanish)
│
├── Cursor Skills/               # Skills: README + exported-cursor-skills/, exported-agents-skills/
│   └── README.md
│
├── Cursor Commands/             # Slash commands (mirror of ~/.cursor/commands)
│   ├── README.md
│   └── *.md                     # orquestador, scout, plan, build-full, etc.
│
├── Cursor Hooks/                # hooks docs + user-export/ (global hooks snapshot)
│   ├── README.md
│   └── hooks.example.json
│
├── Cursor Subagents/            # Delegation + task-subagent-types.md
│   └── README.md
│
├── Cursor MCPs/                 # MCP inventory (no secrets) + mcp.config.example.json
│   └── README.md
│
├── Cursor User Rules/           # How to backup Cursor User Rules
│   └── README.md
│
├── Cursor Requestable Rules/    # Requestable .mdc rules from environment
│   └── README.md
│
├── Cursor Rules Maker/          # Automated rule generator
│   ├── README.md               # Setup and usage guide
│   └── Prompt.md               # The prompt for Custom Mode
│
├── Cursor Project Analyzer/     # Intelligent codebase analyst
│   ├── README.md               # Setup and usage guide
│   └── Prompt.md               # The prompt for Custom Mode
│
├── Log Analyzer/                # System and application log analyzer
│   ├── README.md               # Setup and usage guide
│   └── Prompt.md               # The prompt for any LLM
│
├── MTG Judge/                   # Magic: The Gathering rules judge
│   ├── README.md               # Setup and usage guide
│   └── Prompt.md               # The prompt for any LLM
│
├── Search Engine/               # GPT-5 Thinking Expert Mode with web search
│   ├── README.md               # Setup and usage guide
│   └── Prompt.md               # The prompt for LLMs with tools
│
├── Development Assistant/       # Software Development Assistant (full-stack)
│   ├── README.md               # Setup and usage guide
│   └── Prompt.md               # The prompt for LLMs with tools
│
└── Prompt Master/               # Advanced Prompt Engineering assistant
    ├── README.md               # Setup and usage guide
    └── Prompt.md               # The prompt for any LLM
```

## Usage Guidelines

### General Best Practices

1. **Read the README first**: Each prompt includes detailed instructions and best practices
2. **Start simple**: Begin with basic usage before customizing
3. **Test thoroughly**: Verify the prompt works as expected with your LLM
4. **Customize as needed**: Adapt prompts to your specific requirements
5. **Share improvements**: Contribute back if you enhance a prompt

### Platform-Specific Notes

- **ChatGPT**: Use Custom Instructions or paste in a new conversation
- **Claude**: Add to system prompt or use in Anthropic Console
- **Gemini**: Use in system instructions or conversation context
- **Cursor AI**: Create Custom Modes for persistent use (see individual READMEs)

### Model Recommendations

- **Advanced models recommended**: GPT-4, Claude 3.5+, Gemini Pro for best results
- **Basic models**: May work but with reduced quality and adherence to instructions
- **Model-specific features**: Some prompts may leverage model-specific capabilities

## Contributing

Contributions are welcome! Here's how you can help:

### Adding New Prompts

1. Create a new folder with a descriptive name
2. Include:
   - `Prompt.md` - The actual prompt content
   - `README.md` - Comprehensive documentation
3. Follow the existing structure and documentation style
4. Update this main README.md with your new prompt

### Improving Existing Prompts

1. Test your improvements thoroughly
2. Update the relevant README if behavior changes
3. Document any breaking changes or new features
4. Submit improvements via pull request or issue

### Reporting Issues

- Open an issue for bugs, unclear instructions, or improvement suggestions
- Include the LLM platform and model you're using
- Provide examples of unexpected behavior

## License

This repository and its prompts are provided as-is for educational and professional use. Feel free to:

- Use prompts in your projects
- Modify and adapt for your needs
- Share with your team
- Contribute improvements back

## Acknowledgments

These prompts are the result of extensive testing and refinement. Special thanks to the community for feedback and improvements.

---

**Last Updated**: March 24, 2026

**Maintained by**: Community contributions welcome

**Questions or Suggestions?** Open an issue or contribute a pull request!

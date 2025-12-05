# Cursor Project Analyzer - Custom Mode for Cursor AI

An intelligent codebase analyst that runs in Cursor's Agent Mode to build and maintain a comprehensive, queryable knowledge base of your project. This Custom Mode transforms Cursor AI into a senior software engineer that deeply understands your codebase and can answer questions, guide refactors, and maintain persistent project knowledge.

## Overview

Cursor Project Analyzer creates a living, persistent knowledge graph of your entire codebase using MCP tools. It:
- Scans and indexes your repository automatically
- Builds a structured knowledge base with entities and relations
- Answers questions leveraging deep project understanding
- Maintains up-to-date context as code evolves
- Provides architectural insights and guidance in Spanish

### MCP Tools Used

This prompt leverages the following MCP servers for enhanced capabilities:

- **`memory`** - Core knowledge graph for storing project structure, modules, endpoints, data models, and conventions
- **`sequentialthinking`** - Multi-step planning for analysis, design, refactors, and debugging
- **`duckduckgo`** - External research for unknown libraries, frameworks, and best practices
- **`interactive`** - User clarification and intensive debugging/refactoring sessions
- **`time`** - Timestamps for tracking indexing milestones and important changes

## How to Set Up

### Step 1: Install Required MCP Servers

Ensure the following MCP servers are installed and enabled in Cursor AI:

1. **Memory MCP** (required) - Knowledge graph management
2. **Sequential Thinking MCP** (required) - Multi-step reasoning
3. **DuckDuckGo MCP** (optional) - Web search
4. **Interactive MCP** (optional) - Enhanced user interaction
5. **Time MCP** (optional) - Timestamps

### Step 2: Create Custom Mode in Cursor AI

1. Open Cursor AI Settings (`Ctrl+,` or `Cmd+,`)
2. Navigate to **Custom Modes** or **Rules for AI**
3. Click **Add Custom Mode** or **Create New Mode**
4. **Name your mode**: "Project Analyzer" or similar
5. **Add the prompt**:
   - Open `Prompt.md` in this folder
   - Copy the entire contents
   - Paste into the **Prompt** or **Rules** field
6. **Configure Model Settings**:
   - Select **Sonnet 4.5** or similar advanced model
   - **Disable RUN option** if available (uncheck in Tool Permissions)
   - **Enable Agent Mode** (required for MCP access)
7. **Save** and activate the mode

## How to Use

### First Run: Initial Repository Indexing

1. **Select the Custom Mode**: Choose "Project Analyzer" from the mode dropdown

2. **Trigger initial scan**: Type one of these phrases:
   ```
   analiza el proyecto
   reindex
   reanalyze
   rebuild context
   ```

3. **Automatic Indexing Process**:
   The AI will:
   - Create a plan using `sequentialthinking`
   - Scan key files (package.json, requirements.txt, Dockerfile, etc.)
   - Identify:
     - Application entrypoints (servers, CLIs, workers)
     - Architectural layers (domain, API, UI, infrastructure)
     - Data models and persistence (DB schemas, ORMs)
     - External services and integrations
     - Test strategy and tooling
     - Important configs and environment variables
   - Build a knowledge graph in `memory` with entities and relations
   - Provide a high-level map in Spanish:
     - Tech stack & frameworks
     - Main services/modules and their purpose
     - Key workflows (e.g., user creation, payment processing)

### Daily Use: Querying and Maintaining Knowledge

Once indexed, you can:

#### Ask Architecture Questions
```
explícame la arquitectura
¿cómo se estructura el proyecto?
¿qué hace el módulo de pagos?
```

#### Find Specific Logic
```
¿dónde está la lógica de autenticación?
muéstrame cómo se procesa un pago
¿qué endpoints hay para usuarios?
```

#### Request Changes
```
añade un endpoint para crear productos
refactoriza el módulo de billing
arregla este bug en el login
```

#### Get Guidance
```
¿cómo debería implementar feature X?
¿qué convenciones usa este proyecto?
¿hay tech debt relacionado con Y?
```

The AI will:
1. Use `sequentialthinking` to plan the response
2. Query the knowledge graph with `memory.search_nodes`
3. Verify current code state
4. Provide structured answer in Spanish
5. Update knowledge graph with new findings

## Features

### Intelligent Knowledge Graph

The analyzer creates and maintains entities for:

- **Project** - Repository-level metadata
- **Module/Package/Service** - Key directories and services
- **Component** - UI components, domain services, background jobs
- **Endpoint/Route** - HTTP/GRPC endpoints, message handlers
- **DataModel** - Database tables, ORM models, schemas
- **Config** - Important configuration files
- **Convention** - Naming patterns, architectural rules
- **Workflow/UseCase** - User/system flows (login, checkout, etc.)
- **TechDebt/TODO** - Known issues and improvements
- **DevPreference** - Inferred developer preferences

### Relations Between Entities

The knowledge graph tracks relationships:
- Module → depends_on → Module
- Module → defines → DataModel
- Endpoint → uses → DataModel
- Endpoint → implemented_in → Module
- Workflow → touches → Endpoint
- TechDebt → related_to → Module

### Persistent Context

- **Survives restarts**: Knowledge persists across Cursor sessions
- **Incremental updates**: Updates entities as code changes
- **Queryable**: Search by keywords, entity types, or relations
- **Timestamped**: Tracks when major changes occurred

### Structured Responses

All responses in Spanish include:
- **Resumen** - Quick summary
- **Pasos** - Steps taken or recommended
- **Riesgos** - Potential risks or considerations
- **Siguiente acción** - Suggested next steps

## Use Cases

### 1. Onboarding New Developers
```
User: "Soy nuevo en el proyecto, explícame la arquitectura"
AI: [Provides structured overview from knowledge graph]
```

### 2. Finding Implementation Details
```
User: "¿Dónde está la lógica de autenticación JWT?"
AI: [Searches knowledge graph, locates modules/files, explains flow]
```

### 3. Planning Features
```
User: "Quiero añadir un endpoint para exportar reportes"
AI: [Uses sequentialthinking, checks conventions, proposes implementation]
```

### 4. Debugging Issues
```
User: "El endpoint de pagos falla con error 500"
AI: [Searches related modules, checks recent changes, debugs systematically]
```

### 5. Refactoring Guidance
```
User: "¿Cómo puedo refactorizar el módulo de notificaciones?"
AI: [Analyzes dependencies, proposes safe refactor steps, updates knowledge]
```

### 6. Understanding Workflows
```
User: "¿Cómo funciona el flujo de checkout?"
AI: [Reconstructs workflow from knowledge graph, shows all involved components]
```

## Knowledge Graph Maintenance

### Automatic Updates
The analyzer automatically updates the knowledge graph when:
- New files or modules are added
- Existing code is modified
- Endpoints or data models change
- Conventions or patterns emerge

### Manual Reindexing
Trigger full reindex after major changes:
```
reindex
reanalyze el proyecto
rebuild context
```

### Query Knowledge Graph
```
busca todos los endpoints de usuarios
muestra las relaciones del módulo de pagos
¿qué tech debt tenemos?
```

## Advanced Features

### Sequential Thinking
For complex tasks, the AI uses `sequentialthinking` to:
- Break down problems into steps
- Plan refactors systematically
- Debug issues methodically
- Design new features carefully

### External Research
Uses `duckduckgo` to:
- Look up unknown libraries/frameworks
- Find best practices for dependencies
- Clarify protocols or standards

### Interactive Sessions
For long debugging or refactoring sessions:
- `start_intensive_chat` - Begin focused session
- Multiple back-and-forth interactions
- `stop_intensive_chat` - Complete session

## Requirements

### MCP Servers
- ✅ **Memory MCP** (required)
- ✅ **Sequential Thinking MCP** (required)
- ⚠️ **DuckDuckGo MCP** (recommended)
- ⚠️ **Interactive MCP** (recommended)
- ⚠️ **Time MCP** (optional)

### Cursor Configuration
- **Agent Mode**: Must be enabled
- **Model**: Sonnet 4.5 or similar advanced model recommended
- **RUN option**: Should be disabled

### Language
- **Responses**: Spanish by default
- **Code/Comments**: Respects existing project style
- **Can be changed**: User can request English responses

## File Structure

```
Cursor Project Analizer/
├── README.md          # This file - setup and usage guide
└── Prompt.md          # The complete prompt for Cursor AI Custom Mode
```

## Best Practices

### Initial Setup
1. Start with a clean, up-to-date repository
2. Run initial indexing on the main branch
3. Let the full scan complete before asking questions
4. Review the generated knowledge map

### Daily Usage
1. Ask specific questions rather than broad ones
2. Provide context when requesting changes
3. Let the AI update knowledge after significant changes
4. Reindex after major refactors or merges

### Maintenance
1. Reindex weekly for active projects
2. Verify knowledge accuracy periodically
3. Clear outdated entities when code is removed
4. Trust the knowledge graph for architectural questions

## Troubleshooting

### MCP Issues
- **If Memory MCP fails**: Verify it's installed and enabled in Cursor settings
- **If knowledge is stale**: Run `reindex` to rebuild
- **If entities are missing**: Check that files were scanned during indexing

### Performance
- **Slow initial indexing**: Normal for large codebases (10-30 minutes)
- **Slow queries**: Knowledge graph may need optimization
- **Memory usage**: Large projects may require more RAM

### Accuracy
- **Outdated information**: Run `reanalyze` to refresh
- **Missing modules**: Verify they exist in `.cursor/rules` scanning paths
- **Wrong architecture**: Manually correct via chat and reindex

## Security & Privacy

- **No credential exposure**: Never exposes secrets, tokens, or credentials
- **Local knowledge**: Knowledge graph stored locally via Memory MCP
- **Clarification prompts**: Asks instead of guessing when unclear
- **Read-only by default**: Explicitly asks before making changes

## Contributing

This prompt can be customized for:
- Different languages (change default from Spanish)
- Specific frameworks (add framework-specific entities)
- Team conventions (add custom entity types)
- Domain-specific needs (healthcare, fintech, e-commerce, etc.)

## License

This prompt is provided as-is for use with Cursor AI. Feel free to modify and distribute as needed.

---

**Last Updated**: 2024

**Language**: Responses in Spanish, code in project style

**Questions or Issues?** Ask the AI directly using the Custom Mode!


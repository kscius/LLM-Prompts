# Cursor Rules Maker

An AI-powered workflow engineer that analyzes your codebase and automatically generates comprehensive, project-specific Cursor Rules (`.mdc` files) and documentation. This Custom Mode uses multiple MCP (Model Context Protocol) tools to perform deep analysis and intelligent rule creation.

## Overview

Cursor Rules Maker transforms Cursor AI into an expert workflow engineer that:
- Analyzes your codebase architecture and patterns
- Identifies keystone libraries and best practices
- Generates tailored `.mdc` rule files
- Creates knowledge framework documentation
- Uses a structured 5-phase approach with approval checkpoints

### MCP Tools Used

This prompt leverages the following MCP servers for enhanced capabilities:

- **`sequentialthinking`** - Multi-step planning and reasoning for complex analysis tasks
- **`memory`** - Knowledge graph for storing project entities, patterns, and conventions
- **`duckduckgo`** - Web research for library best practices and deprecation checks
- **`interactive`** - User clarification and intensive chat sessions
- **`time`** - Timestamps for recording important changes and decisions

## How to Create a Custom Mode in Cursor AI

Follow these steps to set up your custom mode:

### Step 1: Open Cursor Settings
1. Open Cursor AI
2. Click on the **Settings** icon (gear icon) in the bottom left corner, or press `Ctrl+,` (Windows/Linux) / `Cmd+,` (Mac)

### Step 2: Navigate to Custom Modes
1. In the Settings menu, navigate to **Features** or **AI** section
2. Look for **Custom Modes** or **Rules for AI** option
3. Click on **Add Custom Mode** or **Create New Mode**

### Step 3: Configure Your Custom Mode
1. **Name your mode**: Give it a descriptive name (e.g., "Custom Rules Mode")
2. **Add the prompt**: 
   - Open the `Prompt.md` file in this folder
   - Copy the entire contents of `Prompt.md`
   - Paste it into the **Prompt** or **Rules** field in the Custom Mode settings

### Step 4: Configure Model Settings
1. **Select the model**: Choose **Sonnet 4.5** from the model dropdown
2. **Disable RUN option**:
   - In the mode configuration, look for **Tool Permissions** or **Capabilities** section
   - Find the **RUN** option and **disable** it (uncheck or toggle off)
   - This prevents the AI from executing terminal commands automatically

### Step 5: Save and Activate
1. Click **Save** to save your custom mode configuration
2. The mode should now appear in your mode selector
3. Select it from the mode dropdown to activate it

### Step 6: Using the Custom Mode to Create Rules

1. **Select the Custom Mode**: Make sure your newly created custom mode is selected in the mode dropdown

2. **Initiate the rules creation**: In the chat interface, type the following phrase:
   ```
   create the rules
   ```

3. **Automatic Analysis (Phases 0-2)**: The AI will automatically:
   
   **Phase 0 - Context & Repo Overview:**
   - Detects repo structure (monorepo vs single app)
   - Locates existing `.cursor/rules` directories
   - Summarizes existing rules and documentation
   - Stores findings in knowledge graph using `memory` MCP
   
   **Phase 1 - Forensic Analysis & Discovery:**
   - Analyzes dependencies and tech stack
   - Uses `duckduckgo` to check for deprecated libraries
   - Identifies code patterns and conventions
   - Reviews testing and DevOps configurations
   - Records patterns and pain points in knowledge graph
   
   **Phase 2 - Plan & Propose:**
   - Designs the rules ecosystem
   - Proposes specific `.mdc` files with scope and activation strategy
   - Suggests knowledge framework (optional `/docs` structure)
   - **Asks for your explicit approval before generating files**

4. **Review and approve the plan**:
   - Review the proposed plan that Cursor AI presents
   - The plan includes:
     - Rule files to create/update
     - Activation strategy (Auto/Always/Manual)
     - Priority and risk assessment
     - Knowledge framework (if applicable)
   - **Explicitly approve** by responding "sí, genera reglas" or similar
   - Only after your approval will Cursor AI proceed to Phases 3-4

5. **File Generation (Phases 3-4, with approval)**:
   
   **Phase 3 - Execute & Save Rules:**
   - Generates complete `.mdc` files with strong constraints
   - Records each rule in knowledge graph
   - Provides checklist of files to apply
   
   **Phase 4 - Execute & Save Knowledge Framework (if approved):**
   - Creates documentation templates (`/docs` folder)
   - Generates `documentation-practices.mdc` rule
   - Completes the process

## Features

### Intelligent Analysis
- **Tech Stack Detection**: Automatically identifies frameworks, libraries, and dependencies
- **Pattern Recognition**: Detects naming conventions, code patterns, and architectural decisions
- **Pain Point Identification**: Flags duplicated patterns, complexity issues, and inconsistencies
- **Best Practices Validation**: Checks adherence to framework-specific best practices (React, Next.js, Django, etc.)

### Knowledge Management
- **Project Memory**: Uses knowledge graph to store conventions, patterns, and decisions
- **External Research**: Searches for library deprecations and best practices
- **Documentation Framework**: Proposes and generates `/docs` structure for complex projects

### Rule Generation
- **Scoped Rules**: Creates global and nested `.cursor/rules/` files
- **Activation Control**: Specifies Auto Attached, Always, or Manual activation
- **Risk Assessment**: Categorizes rules as Safe, Strict, or Experimental
- **Code Examples**: Includes correct vs incorrect examples in rules

### User Control
- **Automatic Phases 0-2**: Analysis and planning happen automatically
- **Approval Required**: Explicit user approval before creating/modifying any files
- **Spanish Interface**: Responds in Spanish (configurable)
- **Iterative Process**: Can refine and regenerate based on feedback

## File Structure

```
Cursor Rules Maker/
├── README.md          # This file - instructions and documentation
└── Prompt.md          # The complete prompt for Cursor AI Custom Mode
```

## Requirements

### MCP Servers
This Custom Mode requires the following MCP servers to be installed and configured in Cursor AI:

1. **Sequential Thinking MCP** - For multi-step reasoning
2. **Memory MCP** - For knowledge graph management
3. **DuckDuckGo MCP** - For web search capabilities
4. **Interactive MCP** - For user interactions
5. **Time MCP** - For timestamps

### Model Requirements
- **Recommended**: Sonnet 4.5 or similar advanced model
- **Agent Mode**: Must be enabled for MCP tool access

## Notes

- Make sure to copy the **entire content** from `Prompt.md` when setting up your custom mode
- The RUN option should be disabled to prevent automatic command execution
- **All required MCP servers must be installed and enabled** for full functionality
- Phases 0-2 run automatically; approval is required only before file generation
- You can edit `Prompt.md` and update your custom mode settings anytime
- The AI responds in Spanish by default but keeps code/filenames in English

## Troubleshooting

### MCP-Related Issues
- **If MCPs are not working**: Verify that all required MCP servers are installed and enabled in Cursor settings
- **If knowledge graph fails**: Check that Memory MCP is properly configured
- **If web search fails**: Verify DuckDuckGo MCP is installed and has internet access

### General Issues
- If you don't see the Custom Modes option, make sure you're using a version of Cursor that supports this feature
- If the prompt doesn't work as expected, verify that all content from `Prompt.md` was copied correctly
- Check that Sonnet 4.5 is available in your Cursor subscription plan
- Ensure Agent Mode is enabled in Cursor settings


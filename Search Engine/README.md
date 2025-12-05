# Search Engine - AI Prompt (GPT-5 Thinking Expert Mode)

A high-performance, expert-facing assistant prompt that transforms any LLM with web search capabilities into an adaptive reasoning engine. This prompt delivers accurate, current, and decision-ready outputs for technically proficient users across analytical, conceptual, technical, and creative work.

## Overview

Search Engine (GPT-5 Thinking Expert Mode) is designed for power users who need:
- Current, verified information from web sources
- Structured, decision-ready outputs
- Adaptive reasoning with confidence levels
- Multi-tool integration (Web Search, Code Interpreter, Image Generation, Canvas)
- Transparent assumptions and next steps

## Features

### 🎯 Core Capabilities

- **Always Attempts an Answer**: Makes explicit, bounded assumptions when information is incomplete
- **Confidence Levels**: States certainty and how assumptions affect conclusions
- **Tool Integration**: Seamlessly uses Web Search, Code Interpreter, Image Generation, and Canvas
- **Structured Output**: Executive summaries with clear sections (Context, Analysis, Recommendation, Risks, Next Steps)
- **Citation Standards**: Always includes publisher, title, date, and links for web sources

### 🔍 Web Search Intelligence

- **Smart Search Triggers**: Automatically searches for time-sensitive, niche, or high-stakes information
- **Source Prioritization**: Prefers primary and official sources
- **Proper Citations**: Includes publisher, date, and link for all web data
- **Freshness Tracking**: Uses absolute dates and clarifies time-relative terms

### 📊 Modular Output Profiles

Automatically selects the best format for your query:

1. **Executive** - Quick decisions (4-6 bullets + recommendation)
2. **Deep Dive** - Comprehensive analysis with detailed citations
3. **Builder** - Step-by-step instructions with code and diagrams
4. **Socratic** - Clarifying questions followed by targeted answers

### 🛠️ Tool Use Decision Rules

- **Web Search**: For time-sensitive info, news, prices, laws, APIs, specs, scientific facts
- **Code Interpreter**: For math, validation, data analysis, plotting, parsing
- **Image Generation**: For diagrams, UI mockups, visual explanations
- **Canvas/Document**: For flowcharts, system diagrams, structured docs, iterative artifacts

### ✅ Quality Assurance

- **Numerical Rigor**: Double-checks calculations, uses Code Interpreter when needed
- **Error Bounds**: Mentions approximate error ranges and sensitivity
- **Validation**: Performs basic validation on critical results
- **No Fabrication**: Never invents citations, quotes, data, or tool results

## How to Use

This prompt is designed for LLMs with web search and tool capabilities (ChatGPT Plus/Pro, Claude with tools, etc.).

### Option 1: Direct Copy-Paste (For LLMs with Tools)

1. Open `Prompt.md` in this folder
2. Copy the entire contents
3. Paste it into your LLM chat interface (ChatGPT, Claude, etc.)
4. **Important**: Only use with LLMs that have web search and tool access enabled
5. Ask your questions - the AI will automatically use tools as needed

### Option 2: Custom Instructions (ChatGPT)

1. Open ChatGPT Settings
2. Navigate to **Custom Instructions**
3. Paste the prompt in the **"How would you like ChatGPT to respond?"** section
4. Save settings
5. All future conversations will use this mode

### Option 3: System Prompt (Claude/API)

- **Claude**: Use in the system prompt field
- **API Usage**: Set as system message in API calls
- **Ensure tools are enabled**: Web search, code execution, etc.

### Requirements

This prompt requires an LLM platform with:
- ✅ **Web Search** capability (essential)
- ⚠️ **Code Interpreter** (recommended)
- ⚠️ **Image Generation** (optional)
- ⚠️ **Canvas/Document Workspace** (optional)

**Compatible Platforms:**
- ChatGPT Plus/Pro (GPT-4 with web search)
- Claude with tools enabled
- Custom LLM setups with tool integration

## Usage Examples

### Executive Profile - Quick Decision

```
User: "Should we migrate from PostgreSQL to MongoDB for our e-commerce platform?"

AI:
## Executive Summary
• PostgreSQL recommended for e-commerce (ACID compliance, complex queries)
• MongoDB better for unstructured data, not transactional systems
• Migration cost: 2-6 months, $50k-200k (typical)
• Risk: Data integrity during transition

## Recommendation
Stay with PostgreSQL unless you have specific document-oriented needs. 
E-commerce requires strong consistency and complex joins.

## Sources
[Citations with dates and links]
```

### Deep Dive - Comprehensive Analysis

```
User: "Analyze the latest React 19 features and migration considerations"

AI:
## Executive Summary
• React 19 stable release: October 2024
• Key features: Actions, use() hook, Web Components support
• Breaking changes in server components
• Migration: 2-4 weeks for medium apps

## Context
[Detailed background]

## Analysis
[Feature-by-feature breakdown with code examples]

## Recommendation
[Migration strategy]

## Risks / Limitations
[Compatibility concerns]

## Next Steps
[Concrete action items]

## Sources
[Recent citations from React docs, changelog, community]
```

### Builder Profile - Implementation Guide

```
User: "Build a rate limiter with Redis"

AI:
## Implementation Steps

1. Install dependencies
```bash
npm install redis ioredis
```

2. Create rate limiter class
[Code with explanations]

3. Add middleware
[Integration code]

## Diagram
[Architecture visualization if image generation available]

## Testing
[Test cases with Code Interpreter validation]

## Next Steps
- Deploy to staging
- Monitor rate limit metrics
- Tune window size based on traffic
```

### Socratic Profile - Clarification First

```
User: "Help me optimize my API"

AI:
Quick clarification:
1. What's the current bottleneck? (DB, network, CPU)
2. Current latency target vs actual? (e.g., p95)
3. Scale? (requests/sec, concurrent users)

Assuming DB queries are the issue (most common):

## Analysis
[Optimization strategies]

## Recommendation
[Specific techniques with metrics]
```

## Operating Principles

### 1. Always Attempt an Answer
- Makes explicit, bounded assumptions when information is incomplete
- States confidence level
- Proposes next steps to reduce uncertainty

### 2. Safe Reasoning Transparency
- Provides concise reasoning summary
- Shows key assumptions, main steps, trade-offs
- Does NOT reveal exhaustive internal deliberation

### 3. Tool Use Intelligence
- Automatically selects appropriate tools
- Retries with revised approach if tool fails
- Falls back to reasoned judgment with stated limitations

### 4. Citations & Freshness
- Always cites web sources (publisher, date, link)
- Uses absolute dates (e.g., "2025-12-05")
- Clarifies time-relative terms

### 5. Structured Output
Includes:
1. **Executive Summary** (2-4 bullets)
2. **Context** - User's goal or decision
3. **Analysis** - Key reasoning, options, trade-offs
4. **Recommendation** - Clear, actionable guidance
5. **Risks/Limitations** - Assumptions, uncertainties
6. **Next Steps** - Concrete follow-up actions

### 6. Tone Adaptation
- Assumes technically proficient user
- Professional, concise, information-dense
- Matches user's formality level

### 7. Safety & Ethics
- Refuses unsafe requests with clear reason
- Offers safer alternatives when possible
- Never fabricates citations or data
- Cautious language for medical/legal/financial topics

### 8. No Background Promises
- Cannot work asynchronously
- Delivers best answer immediately
- No time estimates or "wait" requests

### 9. Numerical Rigor
- Double-checks calculations
- Uses Code Interpreter for validation
- Mentions error bounds and sensitivity

### 10. Modular Profiles
Auto-selects best format:
- **Executive**: Quick decisions
- **Deep Dive**: Complex analysis
- **Builder**: Implementation guides
- **Socratic**: Clarification-based

## Process Per Query

### 1. Clarify Only When Necessary
- Asks questions only if ambiguity materially changes answer
- Otherwise proceeds with explicit assumptions

### 2. Plan Minimal Tool Use
- Decides web search, code, images, or canvas based on value
- Validates critical results

### 3. Answer Structure
Format: **Summary → Detail → Citations/Artifacts**

### 4. Close with Next Steps
Provides 2-5 concrete actions when uncertainty remains

## Output Profiles in Detail

### Executive Profile
**When to use**: Quick decisions, time-sensitive questions, stakeholder briefings

**Format**:
- 4-6 bullet executive summary
- One short recommendation paragraph
- Focus on decisions, trade-offs, implications
- Minimal citations (only key sources)

**Example topics**:
- "Should we use X or Y technology?"
- "What's the market trend for Z?"
- "Quick security assessment of approach A"

### Deep Dive Profile
**When to use**: Complex questions, high-stakes decisions, research

**Format**:
- Full analysis with detailed reasoning
- Multiple options with trade-offs
- Comprehensive citations
- Code examples when relevant
- Risk analysis

**Example topics**:
- "Complete analysis of microservices vs monolith"
- "Evaluate all options for authentication system"
- "Research current state of quantum computing"

### Builder Profile
**When to use**: Implementation tasks, coding, system design

**Format**:
- Step-by-step instructions
- Tested code snippets
- Architecture diagrams (if image generation available)
- Configuration examples
- Validation steps

**Example topics**:
- "Build a CI/CD pipeline"
- "Implement OAuth2 flow"
- "Create a load balancer with Nginx"

### Socratic Profile
**When to use**: Ambiguous requests, needs clarification, teaching moments

**Format**:
- 2-5 brief, targeted questions
- Immediate answer with assumptions
- Recommendations based on assumptions
- Invitation to refine

**Example topics**:
- "Optimize my database"
- "Help with architecture"
- "Improve performance"

## Use Cases

### 1. Research & Analysis
```
- Latest developments in [technology]
- Compare [options] for [use case]
- Analyze market trends for [product]
```

### 2. Technical Decisions
```
- Should we migrate to [technology]?
- Best practices for [implementation]
- Security implications of [approach]
```

### 3. Implementation Guidance
```
- Build [system] with [stack]
- Optimize [component] for [metric]
- Debug [issue] in [context]
```

### 4. Learning & Understanding
```
- Explain [concept] with examples
- How does [technology] work?
- What's new in [framework] version X?
```

### 5. Data Analysis
```
- Analyze these metrics: [data]
- Calculate [formula] for [scenario]
- Plot [visualization] from [dataset]
```

### 6. Creative & Visual
```
- Design UI mockup for [feature]
- Create diagram explaining [system]
- Visualize architecture of [solution]
```

## Best Practices

### For Best Results

1. **Be Specific**: Include context, constraints, and goals
2. **Mention Time Sensitivity**: If info needs to be current, say so
3. **State Preferences**: Request specific output profile if desired
4. **Provide Data**: Include metrics, numbers, technical details
5. **Indicate Stakes**: Mention if decision is high-stakes

### What to Include

- Current situation or baseline
- Goals or success criteria
- Constraints (budget, time, tech stack)
- Specific questions or decisions needed
- Relevant technical details

### When to Use This Prompt

- Research requiring current information
- Technical decisions needing validation
- Implementation tasks with best practices
- Analysis requiring multiple tools
- High-stakes decisions needing rigor

## Capabilities Enabled

This prompt leverages:

### Web Search ✅
- Time-sensitive information
- Current best practices
- API documentation
- News and updates
- Pricing and availability
- Scientific/medical facts

### Code Interpreter ✅
- Mathematical validation
- Data analysis
- Plotting and visualization
- File parsing
- Rapid prototyping
- Performance calculations

### Image Generation ⚠️
- Conceptual diagrams
- UI mockups
- Visual explanations
- Architecture diagrams
- Creative assets

### Canvas/Document Workspace ⚠️
- Flowcharts
- System diagrams
- Structured documents
- Iterative artifacts
- Multi-section outputs

## File Structure

```
Search Engine/
├── README.md          # This file - usage instructions
└── Prompt.md          # The complete prompt for LLMs with tools
```

## Notes

- **Requires**: LLM with web search capability (ChatGPT Plus/Pro, Claude with tools)
- **Model Recommendation**: GPT-4 with web search, Claude 3.5+ with tools
- **Tool Integration**: Best with platforms supporting multiple tools
- **Language**: Responds in user's language, technical terms as appropriate
- **Tone**: Professional, technical, information-dense

## Troubleshooting

- **If web search doesn't trigger**: Explicitly mention "search for current information on..."
- **If output too brief**: Request "Deep Dive" profile
- **If output too verbose**: Request "Executive" profile
- **If no code examples**: Request "Builder" profile
- **If unclear question**: Expect "Socratic" profile with clarifications

## Limitations

### What This Prompt Does NOT Do

- **Replace domain experts**: For critical decisions, consult professionals
- **Work asynchronously**: Cannot promise future delivery
- **Guarantee accuracy**: Always verify critical information
- **Execute in production**: Code examples need testing and adaptation

### Always Verify

For critical decisions:
- Cross-reference multiple sources
- Test code in safe environments
- Consult qualified professionals (medical, legal, financial)
- Validate assumptions with stakeholders

## Security & Privacy

- **Source Verification**: Always check cited sources
- **Code Safety**: Review and test all code before production
- **Data Privacy**: Don't share sensitive data in queries
- **Professional Consultation**: Required for medical/legal/financial advice

## Contributing

This prompt can be customized for:
- Specific domains (healthcare, finance, legal, etc.)
- Output preferences (always Executive, always Builder, etc.)
- Tool availability (if some tools not available)
- Team standards (citation format, structure preferences)

## License

This prompt is provided as-is for use with any LLM platform that supports web search and tools. Feel free to modify and distribute as needed.

---

**Last Updated**: 2024

**Designed for**: ChatGPT Plus/Pro, Claude with tools, similar platforms

**Best With**: Web search + Code Interpreter enabled

**Questions or Suggestions?** Adapt the prompt for your specific workflow and tool availability!


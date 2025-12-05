# Development Assistant - AI Prompt

A high-performance Software Development Assistant that transforms LLMs with multi-tool capabilities into expert development partners. This prompt provides accurate, complete, and insightful guidance for full-stack and system-level work with adaptive reasoning and visual aids.

## Overview

Development Assistant is designed for technically proficient developers who need:
- Expert guidance across full-stack development
- Visual system design and architecture diagrams
- Code review, debugging, and performance optimization
- Multi-tool integration (Web Search, Code Interpreter, Canvas, DALL·E)
- Implementation-ready code with alternatives and best practices

## Features

### 💻 Full-Stack Expertise

**Backend Development:**
- Node.js, PHP, Elixir, C#, NestJS, Java, Go
- Next.js (API routes), Express.js, Laravel, Phoenix
- Flask, FastAPI, Python, and more

**Frontend Development:**
- JavaScript, TypeScript, React, Next.js
- Ionic, Angular, HTML, CSS
- jQuery, Bootstrap, modern frameworks

**Data & Messaging:**
- MySQL, PostgreSQL, MS SQL Server, MongoDB
- Redis, Kafka, message queues
- Database optimization and design

**Adaptable:** Not limited to these stacks. Can provide expert assistance for any widely adopted or emerging technology.

### 🛠️ Types of Support

- **Debugging & Defect Isolation** - Hypothesis formation, minimal repros, logging strategies
- **Performance Optimization** - Bottleneck identification, profiling approaches, concrete improvements
- **Testing Strategy** - Test design, framework selection, example test cases
- **Feature Design & Implementation** - Step-by-step scaffolding and guidelines
- **Code Review & Refactoring** - Readability, security, maintainability improvements
- **API Design** - Resource modeling, versioning, error handling, REST/GraphQL/RPC
- **System Diagrams & Architecture** - Visual component boundaries, flows, dependencies
- **Visual Mockups & UI/UX** - Interface ideation and conceptual illustrations
- **Best Practices** - Patterns, anti-patterns, industry standards

### 🎨 Advanced Tools Integration

**Canvas** - Architecture & Visual Logic
- Architecture diagrams
- Flowcharts and state machines
- Component/system modeling
- Service boundaries and communication flows
- Event-driven processes

**DALL·E** - UI/UX Visualization
- UI/UX mockups
- Layout ideas
- Conceptual illustrations
- Interface design concepts

**Web Search** - Real-Time Information
- Up-to-date documentation
- Evolving APIs and libraries
- Compatibility issues
- Factual verification

**Code Interpreter** - Validation & Analysis
- Running code snippets
- Numerical reasoning
- Simulations and data analysis
- Visualizations and plots

### 📋 Structured Response Format

For non-trivial questions, responses include:

1. **Context Summary** - Problem and constraints restated
2. **Code Block** - Implementation with inline comments or diffs
3. **Step-by-Step Explanation** - How and why it works
4. **Alternative Solutions** - At least one viable alternative with trade-offs
5. **Best Practices** - Relevant patterns, anti-patterns, standards
6. **Visual Aid** (optional) - Canvas diagrams or DALL·E mockups when useful

Plus: **Copy-paste-ready code blocks** for immediate use

## How to Use

This prompt requires an LLM platform with multi-tool capabilities.

### Option 1: Direct Copy-Paste (For LLMs with Tools)

1. Open `Prompt.md` in this folder
2. Copy the entire contents
3. Paste into your LLM chat interface (ChatGPT Plus/Pro, Claude with tools)
4. **Important**: Only use with LLMs that have Web Search, Code Interpreter, Canvas, and DALL·E enabled
5. Ask your development questions

### Option 2: Custom Instructions (ChatGPT)

1. Open ChatGPT Settings
2. Navigate to **Custom Instructions**
3. Paste the prompt in **"How would you like ChatGPT to respond?"**
4. Save settings
5. All conversations will use this development assistant mode

### Option 3: System Prompt (API/Claude)

- **Claude**: Use in system prompt field
- **API Usage**: Set as system message
- **Ensure all tools are enabled**: Web Search, Code Execution, Image Generation, Canvas

### Requirements

This prompt requires:
- ✅ **Web Search** (recommended)
- ✅ **Code Interpreter** (recommended)
- ✅ **Canvas** (for diagrams - optional but highly recommended)
- ⚠️ **DALL·E / Image Generation** (optional)

**Compatible Platforms:**
- ChatGPT Plus/Pro (GPT-4 with all tools)
- Claude with tools enabled
- Custom LLM setups with multi-tool integration

## Usage Examples

### Debugging

```
User: "My Express API returns 500 on POST /users but only in production"

AI:
## Context Summary
500 error on POST /users endpoint, only in production environment.

## Hypothesis
Likely causes:
1. Environment variable mismatch
2. Database connection/permissions
3. Request validation failing on prod data

## Debugging Steps
1. Add detailed logging:
```js
app.post('/users', async (req, res) => {
  console.log('Request body:', req.body);
  console.log('ENV:', process.env.NODE_ENV);
  try {
    // ... your code
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

2. Check environment variables
3. Verify database connection

## Alternative Approaches
[Additional debugging strategies]

## Best Practices
[Error handling patterns]
```

### Architecture Design

```
User: "Design a microservices architecture for e-commerce"

AI:
## Context Summary
E-commerce platform requiring scalable microservices architecture.

## Proposed Architecture
[Creates Canvas diagram showing:]
- Service boundaries (User, Product, Order, Payment, Inventory)
- Communication patterns (REST, message queue)
- Data stores (PostgreSQL, Redis cache)
- Gateway and load balancer

## Implementation Steps
1. Service decomposition
2. API gateway setup
3. Inter-service communication
4. Data consistency strategy

## Alternative Solutions
[Monolith-first, Modular monolith options]

## Best Practices
[DDD, Circuit breakers, Saga pattern]
```

### Performance Optimization

```
User: "My React app is slow, especially on list rendering"

AI:
## Context Summary
Performance issues with list rendering in React application.

## Profiling Approach
1. Use React DevTools Profiler
2. Check render counts
3. Identify unnecessary re-renders

## Code Optimization
```jsx
// Before
function UserList({ users }) {
  return users.map(user => <UserCard user={user} />);
}

// After - with memo and virtualization
import { memo } from 'react';
import { FixedSizeList } from 'react-window';

const UserCard = memo(({ user }) => {
  // Component logic
});

function UserList({ users }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={users.length}
      itemSize={80}
    >
      {({ index, style }) => (
        <div style={style}>
          <UserCard user={users[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

## Explanation
[Why virtualization helps, memo benefits]

## Alternative Solutions
[Pagination, infinite scroll, data fetching strategies]

## Performance Metrics
[Expected improvements with Code Interpreter validation]
```

### API Design

```
User: "Design REST API for blog platform"

AI:
## Context Summary
RESTful API design for blog with posts, comments, users.

## Resource Modeling
```
GET    /api/v1/posts
GET    /api/v1/posts/:id
POST   /api/v1/posts
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id

GET    /api/v1/posts/:id/comments
POST   /api/v1/posts/:id/comments
```

## Response Format
```json
{
  "data": {
    "id": "123",
    "type": "post",
    "attributes": { ... },
    "relationships": { ... }
  },
  "meta": { "version": "1.0" }
}
```

## Alternative Solutions
[GraphQL, gRPC comparisons]

## Best Practices
[Versioning, HATEOAS, error codes, pagination]
```

### UI/UX Mockup

```
User: "Create a modern dashboard layout for analytics"

AI:
## Context Summary
Analytics dashboard requiring modern, data-dense layout.

## UI Concept
[Generates DALL·E mockup showing:]
- Sidebar navigation
- Top metrics cards
- Charts and graphs
- Data table
- Dark mode design

## Implementation Guidance
```jsx
<Dashboard>
  <Sidebar />
  <MainContent>
    <MetricsRow>
      <MetricCard icon="users" value="1,234" />
      <MetricCard icon="revenue" value="$45.6K" />
    </MetricsRow>
    <ChartsGrid>
      <LineChart data={revenueData} />
      <BarChart data={trafficData} />
    </ChartsGrid>
  </MainContent>
</Dashboard>
```

## Component Libraries
[Recommendations: Recharts, Chart.js, D3]

## Best Practices
[Responsive design, accessibility, data visualization]
```

## Task-Specific Guidelines

### 1. Code Explanation
- Clarifies intent and control flow
- Identifies complexity and pitfalls
- Provides examples and edge cases

### 2. Debugging
- Requests key context
- Forms testable hypotheses
- Proposes minimal reproductions
- Suggests logging and inspection strategies

### 3. Performance Optimization
- Identifies likely bottlenecks
- Proposes profiling approaches
- Recommends concrete, measurable changes
- Validates with Code Interpreter when possible

### 4. Testing Strategy
- Suggests relevant test types (unit, integration, e2e)
- Recommends frameworks
- Provides example test cases
- Covers edge cases and error scenarios

### 5. Feature Implementation
- Breaks work into clear steps
- Provides code scaffolding
- Includes implementation guidelines
- Offers architectural considerations

### 6. Code Review
- Comments on readability, correctness, maintainability
- Identifies security issues
- Suggests style improvements
- Provides refactored snippets

### 7. API Design
- Addresses resource modeling
- Covers versioning strategies
- Handles error cases
- Ensures consistency with standards (REST, GraphQL, RPC)

### 8. Visual System Design
- Creates Canvas diagrams for architecture
- Shows component boundaries
- Illustrates data flows
- Visualizes dependencies

### 9. UI/UX Ideation
- Generates DALL·E mockups
- Describes design concepts
- Reflects requirements and constraints
- Considers modern design patterns

## Core Behavior Principles

### 1. Always Attempt an Answer
- Provides reasoned speculation with incomplete info
- Explicitly states assumptions
- Indicates confidence level
- Mentions limitations

### 2. Tool Use Guidelines
- **Web Search**: Recent changes, official docs, compatibility
- **Code Interpreter**: Running code, validating logic, data analysis
- **Image Generation**: Conceptual UI/UX, architectural illustrations
- **Canvas**: Flowcharts, system diagrams, architecture maps
- Falls back to reasoned judgment if tools are inconclusive

### 3. Transparent Reasoning
- Breaks down logic clearly
- Highlights trade-offs
- Justifies recommendations
- Focuses explanations

### 4. Structured Output
- Uses headers, bullets, tables
- Begins with summaries for complex topics
- Prioritizes clarity and scan-ability

### 5. Tone Adaptation
- Mirrors user's technical level
- Matches formality and style
- Switches between terse and detailed as needed

### 6. Clarity Over Brevity
- Prioritizes correctness and clarity
- Offers alternatives when uncertain
- Provides trade-offs and next steps

### 7. Source Transparency
- Cites key sources when using web data
- References official docs, RFCs, guides
- Indicates when tools were used

## Use Cases

### Development & Implementation
```
- "Build authentication with JWT"
- "Implement rate limiting in Express"
- "Create a real-time chat with WebSockets"
```

### Architecture & Design
```
- "Design microservices for [system]"
- "Create database schema for [domain]"
- "Plan scalable architecture for [app]"
```

### Debugging & Troubleshooting
```
- "Why does [feature] fail in production?"
- "Debug memory leak in Node.js app"
- "Fix performance issue in React component"
```

### Optimization & Refactoring
```
- "Optimize slow database queries"
- "Refactor legacy code to use async/await"
- "Improve bundle size in Next.js"
```

### Learning & Understanding
```
- "Explain how [technology] works"
- "Compare [option A] vs [option B]"
- "Best practices for [pattern]"
```

### Visual Design
```
- "Create system diagram for [architecture]"
- "Design UI mockup for [feature]"
- "Visualize data flow in [system]"
```

## File Structure

```
Development Assistant/
├── README.md          # This file - usage instructions
└── Prompt.md          # The complete prompt for LLMs with tools
```

## Notes

- **Requires**: LLM with Web Search, Code Interpreter, Canvas, DALL·E
- **Best With**: ChatGPT Plus/Pro (GPT-4), Claude with full tools
- **Language**: Responds in user's language, code in project style
- **Tone**: Professional, precise, implementation-oriented
- **Output**: Always includes copy-paste-ready code blocks

## Best Practices

### For Best Results

1. **Be Specific**: Include tech stack, framework versions, constraints
2. **Provide Context**: Current implementation, goals, environment
3. **Mention Tools**: Request specific visualizations if needed
4. **Include Code**: Paste relevant code for debugging/review
5. **State Preferences**: Indicate desired response style

### What to Include

- Technology stack and versions
- Current implementation (code snippets)
- Error messages and logs
- Environment details (dev/staging/prod)
- Performance metrics or goals
- Security or compliance requirements

## Troubleshooting

- **If no diagrams generated**: Explicitly request "create Canvas diagram"
- **If no code examples**: Ask for "implementation example"
- **If response too brief**: Request "detailed explanation with alternatives"
- **If web search not triggered**: Mention "search for current best practices"

## Limitations

### What This Prompt Does NOT Do

- **Replace testing**: All code needs proper testing
- **Guarantee production-readiness**: Review and adapt for your use case
- **Make architectural decisions**: Provides options, you decide
- **Replace security audits**: Always perform security reviews

### Always

- Test all code in safe environments
- Review for security implications
- Adapt to your specific requirements
- Follow your team's standards
- Validate with stakeholders

## Security & Privacy

- **Code Safety**: Review all code before production
- **Secrets Management**: Never include credentials in examples
- **Dependencies**: Verify security of suggested packages
- **Best Practices**: Follow OWASP and security standards

## Contributing

This prompt can be customized for:
- Specific tech stacks (Python-only, .NET-focused, etc.)
- Team conventions (specific frameworks, patterns)
- Domain requirements (fintech, healthcare, e-commerce)
- Output preferences (always visual, always with tests, etc.)

## License

This prompt is provided as-is for use with any LLM platform that supports multiple tools. Feel free to modify and distribute as needed.

---

**Last Updated**: 2024

**Designed for**: ChatGPT Plus/Pro, Claude with tools, similar platforms

**Best With**: All tools enabled (Web Search + Code Interpreter + Canvas + DALL·E)

**Questions or Suggestions?** Adapt the prompt for your development workflow!


# Prompt Master - AI Prompt

An advanced Prompt Engineer specialized in designing detailed, multi-step prompts for OpenAI models and other LLMs. This prompt assists experienced users in creating precise, efficient, and context-aware prompts tailored to any domain or use case.

## Overview

Prompt Master transforms any LLM into an expert prompt engineering assistant that:
- Helps design sophisticated, multi-step prompts
- Optimizes for token efficiency and model comprehension
- Provides domain-specific prompt customization
- Delivers prompts in two formats (readable + copy-paste)
- Follows iterative refinement process
- Ensures safety, integrity, and best practices

## Features

### 🎯 Structured 6-Phase Process

**Phase 0: Detect/Request Domain**
- Infers user's domain (legal, coding, product, marketing, etc.)
- Requests confirmation if uncertain
- Proceeds with general structure if domain unclear

**Phase 1: Understand the Request**
- Asks targeted clarifying questions
- Pins down intended outcome
- Avoids assumptions, relies on explicit intent

**Phase 2: Define Key Elements**
- Identifies scope, tone, constraints
- Specifies domain-specific considerations
- Determines output format and style

**Phase 3: Craft the Initial Prompt**
- Builds multi-step, modular prompt
- Aligns to confirmed/inferred domain
- Ensures logical ordering and reusability

**Phase 4: Optimize for Performance**
- Refactors to reduce ambiguity
- Improves token efficiency
- Maximizes model comprehension

**Phase 5: Iterate with Feedback**
- Collects user feedback
- Refines until objectives met
- Adapts to constraints

### ✅ Quality Assurance

**Evaluation Checklist (Self-Check):**
- Exact requested format/structure
- Scope and constraints satisfied
- Numbers/units/dates consistent
- Tone and style match audience
- Next steps or revision hooks included

**Operating Guidelines:**
- Safety & Integrity: No fabricated citations or data
- Reasoning Discipline: Hidden unless requested
- Tooling: Proper code, JSON, quantitative outputs
- Sampling Hints: Temperature recommendations

### 📋 Dual-Format Delivery

Every prompt delivered in:
1. **Readable Version** - For clarity and understanding
2. **Copy-Paste Version** - Markdown ready for immediate use

### 🛡️ Safety & Best Practices

- Flags legal/medical/financial risks
- Proposes compliant alternatives
- Never fabricates sources or data
- Validates against best practices
- Includes temperature recommendations

## How to Use

This prompt can be used with any LLM platform.

### Option 1: Direct Copy-Paste (Universal)

1. Open `Prompt.md` in this folder
2. Copy the entire contents
3. Paste into your LLM chat interface (ChatGPT, Claude, Gemini, etc.)
4. Describe the prompt you want to create
5. Follow the structured process

### Option 2: Custom Instructions (ChatGPT)

1. Open ChatGPT Settings
2. Navigate to **Custom Instructions**
3. Paste the prompt in **"How would you like ChatGPT to respond?"**
4. Save settings
5. All conversations will use prompt engineering mode

### Option 3: System Prompt (Claude/API)

- **Claude**: Use in the system prompt field
- **API Usage**: Set as system message
- **Other platforms**: Add to system prompt section

## Usage Examples

### Creating a Domain-Specific Prompt

```
User: "I need a prompt for a legal contract analyzer"

Prompt Master:
## Domain Detected: Legal

Let me clarify a few points:
1. What type of contracts? (NDAs, employment, sales, etc.)
2. What should the analysis focus on? (risks, obligations, compliance)
3. Target audience? (lawyers, business users, compliance officers)
4. Output format? (summary, detailed analysis, risk scoring)

[After clarification, proceeds through phases 2-5]

## Final Delivery

### Readable Version
[Clear, annotated prompt with explanations]

### Copy-Paste Version
```markdown
[Clean, ready-to-use prompt]
```

## Notes
- Assumes US jurisdiction unless specified
- For binding legal advice, consult qualified attorney
```

### Optimizing an Existing Prompt

```
User: "Optimize this prompt: [existing prompt]"

Prompt Master:
## Analysis
Current prompt has:
- ✅ Clear objective
- ⚠️ Ambiguous constraints
- ❌ Missing output format
- ⚠️ Could be more token-efficient

## Optimized Version

### Readable Version
[Improved prompt with annotations]

### Copy-Paste Version
[Optimized, clean prompt]

## Changes Made
1. Added explicit output format
2. Reduced ambiguity in constraints
3. Improved token efficiency by 23%
4. Added self-check mechanism
```

### Creating a Multi-Step Workflow Prompt

```
User: "Create a prompt for code review that catches bugs and suggests improvements"

Prompt Master:
## Clarifying Questions
1. Languages/frameworks? (e.g., JavaScript, Python, React)
2. Review depth? (quick scan, comprehensive, security-focused)
3. Output structure? (checklist, annotated code, report)

[After clarification]

## Final Prompt

### Readable Version
[Multi-step code review prompt with clear phases]

### Copy-Paste Version
```markdown
You are an expert code reviewer...

## Phase 1: Initial Scan
[Specific instructions]

## Phase 2: Deep Analysis
[Detailed checks]

## Phase 3: Recommendations
[Output format]
```

## Temperature Recommendation
Use 0.2 for consistency in code review
```

### Domain-Specific Technical Prompt

```
User: "I need a prompt for analyzing medical research papers"

Prompt Master:
⚠️ **Safety Notice**: Medical domain detected. 

## Clarifying Questions
1. Target: systematic review, evidence synthesis, or clinical applicability?
2. Audience: researchers, clinicians, or patients?
3. Risk tolerance: peer-review ready or exploratory analysis?

## Final Delivery
[Prompt with appropriate medical disclaimers and evidence standards]

## Safety Notes
- Includes disclaimer about not replacing professional medical advice
- Emphasizes evidence quality and source verification
- Flags when consultation with medical professionals is needed
```

## Process Breakdown

### Phase 0: Domain Detection
- **Purpose**: Understand context and requirements
- **Actions**: 
  - Infers domain from request
  - Requests confirmation if uncertain
  - Proceeds with general structure if unclear
- **Output**: Domain classification or clarification request

### Phase 1: Understand Request
- **Purpose**: Eliminate ambiguity
- **Actions**:
  - Asks targeted questions
  - Clarifies intended outcome
  - Gathers explicit requirements
- **Output**: Clear understanding of user needs

### Phase 2: Define Key Elements
- **Purpose**: Establish prompt architecture
- **Actions**:
  - Identifies scope and tone
  - Determines constraints
  - Specifies output format
- **Output**: Structured requirements list

### Phase 3: Craft Initial Prompt
- **Purpose**: Create first working version
- **Actions**:
  - Builds multi-step structure
  - Ensures logical flow
  - Maintains modularity
- **Output**: First draft of prompt

### Phase 4: Optimize Performance
- **Purpose**: Maximize effectiveness
- **Actions**:
  - Reduces ambiguity
  - Improves token efficiency
  - Enhances clarity
- **Output**: Optimized prompt version

### Phase 5: Iterate with Feedback
- **Purpose**: Refine to perfection
- **Actions**:
  - Collects user feedback
  - Makes adjustments
  - Validates against objectives
- **Output**: Final, approved prompt

## Operating Guidelines

### Safety & Integrity
- Never fabricates citations, sources, or data
- Flags legal/medical/financial risks
- Proposes compliant alternatives
- Validates ethical considerations

### Reasoning Discipline
- Keeps internal reasoning hidden unless requested
- Provides brief plan when necessary
- Minimizes assumptions
- States uncertainties clearly

### Tooling Recommendations

**For Code Outputs:**
- Small, testable functions
- Runnable snippets
- Minimal globals
- Include brief tests or sample I/O

**For Structured Outputs:**
- Emit valid JSON (no comments)
- Clear schema definition
- Proper data types

**For Quantitative Work:**
- Show calculation steps
- Include units
- Validate results

### Sampling Hints

**Deterministic Tasks** (Temperature 0-0.2):
- Code generation
- Data extraction
- Factual Q&A
- Structured outputs

**Creative Tasks** (Temperature 0.7-0.9):
- Writing
- Brainstorming
- Ideation
- Creative problem-solving

## Evaluation Checklist

Before delivery, Prompt Master checks:

✅ **Format & Structure**
- Exact requested format followed
- Clear section boundaries
- Logical flow maintained

✅ **Scope & Constraints**
- All requirements addressed
- Constraints respected
- Edge cases considered

✅ **Consistency**
- Numbers/units/dates labeled
- Terminology consistent
- References valid

✅ **Audience Alignment**
- Tone matches target audience
- Technical level appropriate
- Language accessible

✅ **Actionability**
- Next steps included
- Revision hooks present
- Feedback mechanisms built-in

## Use Cases

### 1. Creating New Prompts
```
- "Design a prompt for [specific task]"
- "I need a multi-step prompt for [workflow]"
- "Create a domain-specific prompt for [field]"
```

### 2. Optimizing Existing Prompts
```
- "Improve this prompt: [existing prompt]"
- "Make this more token-efficient: [prompt]"
- "Reduce ambiguity in: [prompt]"
```

### 3. Domain-Specific Engineering
```
- "Legal contract analysis prompt"
- "Medical research reviewer"
- "Code review and security audit"
- "Marketing copy generator"
```

### 4. Multi-Step Workflows
```
- "Research → Analysis → Report generation"
- "Data extraction → Validation → Visualization"
- "Planning → Implementation → Testing"
```

### 5. Template Creation
```
- "Create reusable template for [category]"
- "Design modular prompt system for [domain]"
- "Build prompt library for [use case]"
```

## Best Practices

### For Best Results

1. **Be Specific**: Describe exact use case and requirements
2. **Provide Examples**: Show desired input/output if possible
3. **Mention Constraints**: Budget, time, quality requirements
4. **Specify Audience**: Technical level and background
5. **State Format**: Preferred output structure

### What to Include

- Domain or field of application
- Intended use case
- Target audience
- Desired output format
- Constraints (length, style, tone)
- Safety or compliance requirements
- Examples of good/bad outputs

### When to Use

- Creating complex, multi-step prompts
- Optimizing existing prompts
- Designing domain-specific systems
- Building reusable prompt templates
- Ensuring safety and compliance
- Maximizing token efficiency

## File Structure

```
Prompt Master/
├── README.md          # This file - usage instructions
└── Prompt.md          # The complete prompt for any LLM
```

## Notes

- **Compatible with**: ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms
- **Model Recommendation**: Works best with advanced models (GPT-4, Claude 3.5+, Gemini Pro)
- **Language**: Always responds in English for LLM precision
- **Format**: Dual delivery (readable + copy-paste)
- **Iteration**: Designed for feedback loops

## Troubleshooting

- **If domain unclear**: Explicitly state your domain or field
- **If prompt too generic**: Provide more specific requirements
- **If format not matching**: Specify exact desired structure
- **If missing elements**: Request specific additions

## Limitations

### What This Prompt Does NOT Do

- Generate example prompts unless requested
- Make assumptions without clarification
- Fabricate citations or sources
- Skip safety considerations
- Deliver without evaluation

### Always Verify

For critical applications:
- Test prompts with sample inputs
- Validate against requirements
- Review for safety and compliance
- Iterate based on results
- Consult domain experts when needed

## Optional References

The Prompt Master is informed by:
- [Google Cloud: What is Prompt Engineering](https://cloud.google.com/discover/what-is-prompt-engineering)
- [OpenAI: Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

## Contributing

This prompt can be customized for:
- Specific domains (legal, medical, technical, etc.)
- Organization standards (company style guides)
- Specialized workflows (research, development, analysis)
- Language preferences (though English recommended)

## License

This prompt is provided as-is for use with any LLM platform. Feel free to modify and distribute as needed.

---

**Last Updated**: 2024

**Language**: English (for LLM precision)

**Delivery**: Dual format (Readable + Copy-Paste)

**Questions or Suggestions?** Use Prompt Master to create your perfect prompt engineering assistant!


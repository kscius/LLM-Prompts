# Resume Analyzer - AI Prompt

A specialized AI assistant prompt designed to help software engineers optimize their CVs/resumes for technical roles. This prompt can be used with any LLM (ChatGPT, Claude, Gemini, Cursor AI, etc.) to transform the AI into a senior technical recruiter and career coach focused on backend, full-stack, and software engineering positions.

## Overview

This prompt provides comprehensive CV analysis, optimization, and rewriting services specifically tailored for software engineering roles. It helps candidates significantly increase their chances of getting interviews by:

- Analyzing CV structure and content
- Optimizing for ATS (Applicant Tracking Systems)
- Aligning with job descriptions
- Rewriting with impact-focused, quantified achievements
- Providing actionable recommendations

## Features

### 🎯 Core Capabilities

- **Multi-language Support**: Automatically detects CV language and responds in the same language
- **Target Role Optimization**: Tailors CVs for specific roles, seniority levels, and markets (US, EU, LATAM, remote)
- **ATS Optimization**: Ensures keyword alignment without keyword stuffing
- **Impact-Focused Rewriting**: Transforms task lists into quantified, results-driven achievements
- **Job Description Alignment**: Analyzes JDs and optimizes CVs accordingly

### 📋 Analysis & Diagnosis

- **Structured Diagnosis**: Provides concise, actionable feedback (max 10 bullet points)
- **Technical Depth Evaluation**: Assesses languages, frameworks, architecture, DevOps, cloud, testing, performance, security
- **ATS Keyword Analysis**: Identifies missing or weakly represented keywords
- **Structure Review**: Evaluates sections, clarity, relevance, and formatting

### ✍️ CV Optimization

- **Results-Driven Bullet Points**: Uses pattern: `[Action] + [Tech/approach] + [Impact/metric] + [Context]`
- **Section Optimization**: 
  - Professional Summary (3-5 lines, tailored)
  - Skills grouped by categories
  - Experience with 4-7 strong bullets per role
  - Projects highlighting real stack usage
  - Education & certifications
  - Links & portfolio
- **Quantified Impact**: Prioritizes metrics and measurable results

## How to Use

This prompt can be used with any LLM platform. Here are the most common ways:

### Option 1: Direct Copy-Paste (Universal)

1. Open `Prompt.md` in this folder
2. Copy the entire contents
3. Paste it into your LLM chat interface (ChatGPT, Claude, Gemini, etc.)
4. Start a new conversation with the prompt
5. The AI will automatically introduce itself and ask for your CV information

### Option 2: Custom Mode in Cursor AI

1. Open Cursor AI Settings (`Ctrl+,` or `Cmd+,`)
2. Navigate to **Custom Modes** or **Rules for AI**
3. Click **Add Custom Mode** or **Create New Mode**
4. **Name your mode**: "Resume Analyzer" or similar
5. **Add the prompt**:
   - Open `Prompt.md` in this folder
   - Copy the entire contents
   - Paste into the **Prompt** or **Rules** field
6. **Configure Model Settings** (optional):
   - Select your preferred model
   - **Disable RUN option** if available (uncheck in Tool Permissions)
7. **Save** and activate the mode

### Option 3: System Prompt / Custom Instructions

- **ChatGPT**: Add to Custom Instructions or use as a system message
- **Claude**: Use in the system prompt field
- **Other platforms**: Add to system prompt or custom instructions section

### Using the Resume Analyzer

1. **Start the conversation**: Paste the prompt or select the custom mode
2. **The AI will automatically**:
   - Introduce itself as a technical recruiter
   - Ask for your target role and market
   - Request your current CV
   - Ask if you have a job description
3. **Provide Information**:
   - Paste your CV as text
   - Include job description if available
   - Answer clarifying questions about your target role
4. **Receive Analysis**:
   - Structured diagnosis (max 10 bullet points)
   - Job description alignment (if JD provided)
   - Keyword analysis for ATS
5. **Get Optimized CV**:
   - Complete rewritten CV in clean text/Markdown
   - Change summary with main improvements
   - Actionable next steps (3-5 recommendations)

## Output Format

The Resume Analyzer provides two main outputs:

### 1. Improved CV (Full Rewrite)
- Complete, ATS-friendly CV in clean text or Markdown
- Clear section headings: SUMMARY, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATIONS, LINKS
- Tight structure, easy to copy into a document
- Optimized for the target role and market

### 2. Change Summary & Recommendations
- Main changes made (e.g., "quantified impact in experience bullets")
- 3-5 actionable next steps
- Suggestions for further improvement

## Key Principles

### Writing Style
- **Professional, clear, concise**: No purple prose or vague adjectives
- **Results-driven**: Every bullet point shows action, technology, and impact
- **Quantified**: Metrics and measurable results whenever possible
- **Context-aware**: Tailored to target role, market, and job description

### Ethical Guidelines
- **Never invents facts**: No fake companies, positions, dates, or credentials
- **Privacy-aware**: Treats all personal data as sensitive
- **Suggestions clearly marked**: Optional improvements are labeled as "Suggestion:"
- **Modern practices**: Recommends privacy-aware CV formatting

## Example Interaction Flow

```
User: "I need help optimizing my CV for a Senior Backend Engineer role"

AI: [Introduces itself and asks for:]
    - Target role & market
    - Current CV
    - Job description (if available)

User: [Provides information]

AI: [Provides:]
    1. Structured diagnosis (10 bullet points max)
    2. JD alignment & keyword analysis (if JD provided)
    3. Complete rewritten CV
    4. Change summary & recommendations
```

## Best Practices

### For Best Results

1. **Be Specific**: Provide clear target role, seniority, and market
2. **Include Job Description**: If available, paste the JD for better alignment
3. **Complete Information**: Share your full CV, not just snippets
4. **Follow Recommendations**: Implement the suggested next steps
5. **Iterate**: Use the analyzer multiple times for different roles

### What to Expect

- **Direct but constructive feedback**: Focus on improvements, not just criticism
- **Actionable suggestions**: All recommendations are immediately applicable
- **ATS-optimized output**: Ready to use in applicant tracking systems
- **Market-specific formatting**: Adapted to US, EU, LATAM, or remote conventions

## Supported Roles

This prompt is optimized for:
- Backend Developer
- Full-Stack Developer
- Software Engineer
- Senior/Lead positions in these roles

## Supported Markets

- United States (US)
- European Union (EU)
- Latin America (LATAM)
- Remote positions

## Language Support

- Automatically detects CV language
- Responds in the same language as the CV
- Supports translation/adaptation to different markets
- Can handle English, Spanish, and other languages

## File Structure

```
Resume Analyzer/
├── README.md          # This file - usage instructions
└── Prompt.md          # The complete prompt for any LLM
```

## Notes

- **Compatible with**: ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms
- **Model Recommendation**: Works best with advanced models (GPT-4, Claude 3.5+, Gemini Pro)
- **Privacy**: All personal data is treated as sensitive
- **Ethics**: Never invents facts or credentials
- **Customization**: You can modify the prompt to suit specific needs or add role-specific requirements

## Troubleshooting

- **If the AI doesn't detect language correctly**: Explicitly state your preferred language
- **If analysis is too generic**: Provide more specific target role information
- **If output format is unclear**: Ask for Markdown format explicitly
- **If keywords aren't aligned**: Make sure to provide the job description

## Contributing

Feel free to adapt this prompt to your needs:
- Add industry-specific requirements
- Customize for different roles (frontend, DevOps, etc.)
- Adjust formatting for specific markets
- Enhance with additional analysis criteria

## License

This prompt is provided as-is for use with any LLM platform. Feel free to modify and distribute as needed.


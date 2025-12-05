# Log Analyzer - AI Prompt

An expert system and application log analyzer that transforms any LLM into a specialized tool for diagnosing issues, detecting patterns, and providing actionable insights from logs. This prompt works with JSON and plain-text log formats.

## Overview

Log Analyzer provides comprehensive, structured analysis of system and application logs. It helps developers and DevOps teams:
- Quickly identify errors, exceptions, and failures
- Detect repetitive or anomalous behavior patterns
- Reconstruct event sequences and trace issues across services
- Get actionable technical recommendations
- Correlate events across multiple log sources

## Features

### 🔍 Intelligent Log Parsing

- **Multi-format Support**: Handles JSON and plain-text logs
- **Automatic Structure Detection**: Identifies timestamps, severity levels, stack traces, correlation IDs
- **Field Recognition**: Parses `timestamp`, `level`, `message`, `service`, `traceId`, `spanId`, `requestId`, etc.

### 🎯 Comprehensive Analysis

- **Error Detection**: Identifies all errors, exceptions, failures, and critical messages
- **Pattern Recognition**: Detects repetitive behaviors, anomalies, and time-based correlations
- **Event Traceability**: Reconstructs sequences and shows how errors propagate
- **Cross-Service Correlation**: Links events across multiple services using correlation IDs

### 📊 Structured Output

Every analysis includes 6 standard sections:
1. **Executive Summary** - Quick overview of what's happening and impact
2. **Detected Errors** - Detailed list of errors with context
3. **Key Event Traceability** - Timeline and flow reconstruction
4. **Pattern Analysis** - Recurring patterns and anomalies
5. **Technical Recommendations** - Actionable steps to resolve issues
6. **Metadata and General Statistics** - High-level metrics and coverage

### 🔗 Multi-Log Correlation

- Correlates events across different services
- Uses timestamps, trace IDs, request IDs, correlation IDs
- Identifies cross-component relationships
- Shows distributed system behavior

## How to Use

This prompt can be used with any LLM platform. Here are the most common ways:

### Option 1: Direct Copy-Paste (Universal)

1. Open `Prompt.md` in this folder
2. Copy the entire contents
3. Paste it into your LLM chat interface (ChatGPT, Claude, Gemini, etc.)
4. Paste your logs and ask for analysis
5. The AI will automatically provide structured analysis

### Option 2: Custom Mode in Cursor AI

1. Open Cursor AI Settings (`Ctrl+,` or `Cmd+,`)
2. Navigate to **Custom Modes** or **Rules for AI**
3. Click **Add Custom Mode** or **Create New Mode**
4. **Name your mode**: "Log Analyzer" or similar
5. **Add the prompt**:
   - Open `Prompt.md` in this folder
   - Copy the entire contents
   - Paste into the **Prompt** or **Rules** field
6. **Save** and activate the mode

### Option 3: System Prompt / Custom Instructions

- **ChatGPT**: Add to Custom Instructions or use as a system message
- **Claude**: Use in the system prompt field
- **Other platforms**: Add to system prompt or custom instructions section

## Usage Examples

### Basic Analysis

```
User: [Pastes application logs]

AI: [Provides structured analysis with 6 sections]
    1. Executive Summary
       - Application crash at 14:23:45 UTC
       - Root cause: NullPointerException in payment module
       - Impact: 127 failed transactions
       
    2. Detected Errors
       [Detailed error list with timestamps and context]
       
    3. Key Event Traceability
       [Timeline reconstruction]
       
    ... [remaining sections]
```

### With Specific Instructions

```
User: "Focus on database connection errors in the last hour"
[Pastes logs]

AI: [Prioritizes database errors in analysis while maintaining structure]
```

### Multiple Service Logs

```
User: "Analyze these logs from API gateway, payment service, and database"
[Pastes 3 log files]

AI: [Correlates events across services using trace IDs]
```

### JSON Logs

```
User: [Pastes structured JSON logs]

AI: [Parses JSON fields, uses metadata for correlation]
```

## Output Format

### 1. Executive Summary
- 3-8 concise bullet points
- What's happening
- Impact assessment
- Most likely causes

**Example:**
```
• Payment processing failures started at 14:23:45 UTC
• 127 transactions failed with NullPointerException
• Root cause: Missing validation in checkout module
• Impact: ~$15,000 in pending transactions
```

### 2. Detected Errors
- Table or list format
- Timestamp, component, severity, description
- Relevant log excerpts

**Example:**
```
| Time       | Component      | Severity | Description                    |
|------------|----------------|----------|--------------------------------|
| 14:23:45   | PaymentService | ERROR    | NullPointerException at line 42|
| 14:23:46   | CheckoutAPI    | ERROR    | Payment validation failed      |
```

### 3. Key Event Traceability
- Timeline of events
- Logical flow reconstruction
- Error propagation visualization

**Example:**
```
Timeline:
14:23:44.123 - User initiates checkout (trace_id: abc123)
14:23:44.856 - API Gateway forwards request
14:23:45.234 - Payment service validates (FAIL)
14:23:45.456 - Error propagates to frontend
```

### 4. Pattern Analysis
- Recurring patterns
- Anomalous behaviors
- Time-based correlations

**Example:**
```
Patterns:
• NullPointerException repeats every ~30 seconds
• Spike in errors corresponds to traffic increase
• Database timeout anomaly at 14:20-14:25
```

### 5. Technical Recommendations
- Actionable steps
- Configuration changes
- Monitoring improvements
- Code fixes

**Example:**
```
Recommendations:
1. Add null check in PaymentService.validateCard()
2. Increase database connection pool from 10 to 20
3. Add retry logic for transient failures
4. Set up alerting for payment errors > 5/min
```

### 6. Metadata and General Statistics
- Total log lines analyzed
- Time window coverage
- Severity distribution
- Other relevant metrics

**Example:**
```
Metadata:
• Total log entries: 1,247
• Time window: 2024-12-05 14:00:00 to 15:00:00 UTC (1 hour)
• Severity distribution: INFO (892), WARN (234), ERROR (121)
• Services analyzed: 3 (API Gateway, Payment Service, Database)
```

## Use Cases

### 1. Production Incident Analysis
```
User: [Emergency] "Users reporting checkout failures, analyze last 30 minutes"
AI: [Quick executive summary with root cause and immediate actions]
```

### 2. Post-Mortem Investigation
```
User: "Analyze yesterday's outage from 14:00-16:00"
AI: [Detailed timeline, patterns, and comprehensive recommendations]
```

### 3. Performance Debugging
```
User: "Find slow queries and database bottlenecks"
AI: [Filters for performance issues, shows patterns, suggests optimizations]
```

### 4. Multi-Service Troubleshooting
```
User: "API is slow, analyze gateway, backend, and database logs"
AI: [Correlates across services, identifies bottleneck location]
```

### 5. Pattern Detection
```
User: "Are there any recurring errors in these logs?"
AI: [Identifies patterns, frequencies, time-based correlations]
```

### 6. Proactive Monitoring
```
User: "Scan for warning signs before they become critical"
AI: [Highlights warnings, resource constraints, degradation patterns]
```

## Supported Log Formats

### JSON Logs

**Example:**
```json
{
  "timestamp": "2024-12-05T14:23:45.123Z",
  "level": "ERROR",
  "service": "payment-service",
  "traceId": "abc123",
  "message": "Payment validation failed",
  "error": "NullPointerException",
  "stack": "..."
}
```

**Parsed Fields:**
- `timestamp` - Event time
- `level` - Severity (INFO, WARN, ERROR, etc.)
- `service` - Component name
- `traceId`, `spanId`, `requestId` - Correlation identifiers
- `message` - Event description
- `error`, `stack` - Error details

### Plain-Text Logs

**Example:**
```
2024-12-05 14:23:45.123 ERROR [payment-service] Payment validation failed
  NullPointerException at PaymentService.java:42
  at checkout.process(Checkout.java:156)
  ...
```

**Inferred Structure:**
- Timestamp prefix detection
- Severity level extraction
- Stack trace grouping
- Thread/component identification

## Advanced Features

### Evidence-Based Analysis
- All conclusions backed by log excerpts
- Hypotheses clearly labeled
- Limitations explicitly mentioned
- Minimal quoting (only necessary evidence)

### Incomplete Log Handling
- Identifies truncated or missing data
- Notes ambiguities
- Suggests what additional logs would help

### Hypothesis Formation
- Proposes root causes with plausibility explanations
- Distinguishes facts from inferences
- Provides confidence levels when appropriate

### Cross-Reference Detection
- Links related events across time
- Identifies cause-effect relationships
- Shows cascading failures

## Best Practices

### For Best Results

1. **Provide Context**: Mention what you're investigating
2. **Include Timeframes**: Specify relevant time windows
3. **Multiple Sources**: Include logs from all relevant services
4. **Full Stack Traces**: Don't truncate error details
5. **Correlation IDs**: Ensure logs include trace/request IDs

### What to Include

- Full error messages and stack traces
- Surrounding context (before/after the error)
- Multiple service logs for distributed systems
- Configuration or deployment changes if relevant

### When to Use

- Production incidents
- Post-mortem analysis
- Performance troubleshooting
- Pattern detection
- Proactive monitoring
- Debugging distributed systems

## File Structure

```
Log Analyzer/
├── README.md          # This file - usage instructions
└── Prompt.md          # The complete prompt for any LLM
```

## Notes

- **Compatible with**: ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms
- **Model Recommendation**: Works best with advanced models (GPT-4, Claude 3.5+, Gemini Pro)
- **No Size Limits**: Can handle large log files (within LLM context limits)
- **Privacy**: Ensure logs don't contain sensitive data before sharing
- **Language**: Responds in the language of the user's request

## Troubleshooting

- **If structure is not detected**: Manually specify log format (JSON vs plain-text)
- **If correlation fails**: Ensure logs include trace/request IDs
- **If analysis is too broad**: Provide specific instructions or focus area
- **If errors are missed**: Include full stack traces and surrounding context

## Security & Privacy

- **Sensitive Data**: Remove credentials, tokens, PII before analysis
- **Production Logs**: Sanitize before sharing with external LLMs
- **Local Use**: Consider using local/private LLM instances for sensitive logs

## Contributing

This prompt can be customized for:
- Specific log formats (custom JSON schemas, proprietary formats)
- Industry-specific analysis (healthcare, finance, e-commerce)
- Framework-specific patterns (Django, Spring Boot, Express.js)
- Custom severity levels or log standards

## License

This prompt is provided as-is for use with any LLM platform. Feel free to modify and distribute as needed.

---

**Last Updated**: 2024

**Language**: Responds in user's language, technical terminology in English

**Questions or Suggestions?** Adapt the prompt to your specific logging needs!


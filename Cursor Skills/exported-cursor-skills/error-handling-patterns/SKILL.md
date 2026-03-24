---
name: error-handling-patterns
description: Error handling best practices for try/catch, error boundaries, HTTP errors, validation errors, and graceful degradation. Use when writing error handling code or reviewing error paths.
---

# Error Handling Patterns Skill

Use this skill when writing or reviewing error handling, validation, or resilience patterns.

## General Principles
- Fail fast, fail loud at boundaries (API, form, service edge)
- Fail gracefully inside (retry, fallback, degrade)
- Never swallow errors silently
- Always log the original error before wrapping
- Distinguish between operational errors (expected) and programmer errors (bugs)

## Backend Patterns
- Validate inputs at the boundary, not deep inside business logic
- Use typed error classes with error codes
- Return consistent error response shapes: { error: { code, message, details? } }
- Use HTTP status codes correctly (400 for client errors, 500 for server errors)
- Never expose stack traces or internal details in production responses

## Frontend Patterns
- Use Error Boundaries for React component trees
- Handle loading, error, and empty states for every async operation
- Show user-friendly messages, log technical details
- Retry transient failures (network errors) with exponential backoff
- Validate form inputs client-side AND server-side

## Database Patterns
- Wrap multi-step operations in transactions
- Handle constraint violations gracefully (unique, foreign key)
- Implement idempotency for retryable operations

## Anti-patterns
- catch(e) {} (swallowing errors)
- Generic "Something went wrong" without logging
- Retrying non-idempotent operations
- Mixing error handling with business logic
- Exposing sensitive data in error messages
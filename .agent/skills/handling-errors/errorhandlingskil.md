---
name: handling-errors
description: Apply error handling best practices, resilient API design, circuit breakers, and fault tolerance patterns.
---

# Error Handling Architecture

## When to use this skill
- Implementing error handling in new features
- Designing error-resilient APIs
- Debugging production issues
- Improving application reliability
- Creating better error messages for users and developers
- Implementing retry and circuit breaker patterns
- Handling async/concurrent errors
- Building fault-tolerant distributed systems

## Core Concepts & Workflow

1.  **Determine Philosophy**: 
    - **Exceptions**: Use for unexpected errors and exceptional conditions (try-catch, disrupts flow).
    - **Result Types**: Use for explicit success/failure and functional approaches (validation failures).
    - **Panics/Crashes**: Allow for unrecoverable errors and programming bugs.
2.  **Determine Error Category**: 
    - **Recoverable Errors**: Network timeouts, missing files, invalid user input, API rate limits.
    - **Unrecoverable Errors**: Out of memory, stack overflow, programming bugs (null pointer, etc.).
3.  **Implement Pattern**: Write defensive code tailored to the language environment using the examples below.

## Instructions & Best Practices
-   **Fail Fast**: Validate input early, fail quickly.
-   **Preserve Context**: Include stack traces, metadata, and timestamps.
-   **Meaningful Messages**: Explain what happened and how to fix it.
-   **Log Appropriately**: Error = log, expected failure = don't spam logs.
-   **Handle at Right Level**: Catch where you can meaningfully handle it.
-   **Clean Up Resources**: Use try-finally, context managers, and defer statements.
-   **Don't Swallow Errors**: Log or re-throw, don't silently ignore.
-   **Type-Safe Errors**: Use typed errors when possible.

### Common Pitfalls to Avoid
- **Catching Too Broadly:** `except Exception` hides bugs.
- **Empty Catch Blocks:** Silently swallowing errors.
- **Logging AND Re-throwing:** Creates duplicate log entries.
- **Not Cleaning Up:** Forgetting to close files and connections.
- **Poor Error Messages:** "Error occurred" is not helpful.
- **Ignoring Async Errors:** Leaving unhandled promise rejections.

## Reference Implementations

Consult these specialized language patterns and generic systems design patterns when writing code:
- 👉 [Python Error Handling](examples/python-patterns.md)
- 👉 [TypeScript/JS Error Handling](examples/typescript-patterns.md)
- 👉 [Rust Error Handling](examples/rust-patterns.md)
- 👉 [Go Error Handling](examples/go-patterns.md)
- 👉 [Universal Patterns (Circuit Breakers / Fallbacks)](examples/universal-patterns.md)

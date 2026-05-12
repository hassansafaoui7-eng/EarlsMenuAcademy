---
name: planning
description: Use when you have a spec or requirements for a multi-step task, before touching code. Generates bite-sized implementation plans.
---

# Writing Plans

## When to use this skill
- Before touching any actual implementation code.
- When transitioning from a spec or design doc into actionable dev tasks.
- When you need to create a `docs/superpowers/plans/...` document.

## Workflow

1.  **Scope Check**: Ensure the spec covers only a single independent subsystem. If not, suggest breaking it into multiple plans.
2.  **Map File Structure**: Determine which files will be created or modified, enforcing clear boundaries.
3.  **Draft Bite-Sized Tasks**: Break the implementation into small 2-5 minute actionable steps.
4.  **Self-Review**: Run a self-check for spec coverage, placeholders, and type consistency inline.
5.  **Execution Handoff**: Present execution options (Subagent-Driven or Inline Execution).

## Instructions

- **No Placeholders**: Never write "TBD", "TODO", "implement later", or vaguely describe edge cases. You must provide actual code.
- **Header Template**: Every plan must start with:
  ```markdown
  # [Feature Name] Implementation Plan
  > **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Use checkbox (`- [ ]`) syntax.
  **Goal:** [One sentence describing what this builds]
  **Architecture:** [2-3 sentences about approach]
  **Tech Stack:** [Key technologies]
  ---
  ```
- **Task Structure Template**:
  ```markdown
  ### Task N: [Component Name]
  **Files:**
  - Create: `exact/path/to/file.ext`
  - Modify: `exact/path/to/existing.ext:1-5`
  
  - [ ] **Step 1: Write the failing test**
        (Include code block)
  - [ ] **Step 2: Run test to verify it fails**
        Run: `test command`
  - [ ] **Step 3: Write minimal implementation**
        (Include code block)
  - [ ] **Step 4: Run test to verify it passes**
        Run: `test command`
  - [ ] **Step 5: Commit**
        Run: `git add ... && git commit -m "..."`
  ```

## Output Targets

Save your finished plan to `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`.

## Resources
- [Plan Document Reviewer Prompt](resources/plan-document-reviewer-prompt.md)

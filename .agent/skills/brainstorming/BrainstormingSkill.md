---
name: brainstorming
description: You MUST use this before any creative work or feature implementation. Explores user intent, limits scope, proposes visual and technical approaches, and prepares a spec.
---

# Brainstorming Ideas Into Designs

## When to use this skill
- Initiating any new project or major feature.
- Exploring user requirements or conceptual system design.
- Creating mockups or refining UI requirements.
- **HARD-GATE:** Do not build, scaffold, or execute code until a design spec is fully written and user-approved.

## Workflow

1.  **Explore project context**: Check files, docs, recent commits.
2.  **Offer visual companion**: Ask user if they'd like browser visualizations for layout/UI questions.
3.  **Ask clarifying questions**: Provide multiple choices when possible. One question per message.
4.  **Propose 2-3 approaches**: Present trade-offs and your recommendation.
5.  **Present design sections**: Validate with the user incrementally.
6.  **Write design doc**: Save the spec and commit.
7.  **Spec self-review**: Remove placeholders, check scope & ambiguity.
8.  **User approval**: Pause for explicit user review of the saved document.
9.  **Transition to planning**: Invoke the `planning` skill. (Do NOT invoke implementation directly).

## Instructions

-   **Visual Companion Usage**: Ask the user exactly this in a dedicated message if UI design is involved (do not ask other questions alongside it):
    > *"Some of what we're working on might be easier to explain if I can show it to you in a web browser. I can put together mockups, diagrams, comparisons, and other visuals as we go. This feature is still new and can be token-intensive. Want to try it? (Requires opening a local URL)"*
    Proceed according to the user's response.
-   **Scale sections properly**: Do not overwhelm the user. Write design sections in short 200-300 word chunks.
-   **One question at a time**: Prefer multiple choice choices. Never bombard the user with a giant wall of questions.

## Output Targets

Save your finished spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`.

## Validation Loops

-   Always get explicitly stated user approval prior to writing the spec or executing any subsequent step.
-   Refuse to write code if this spec is not finalized and approved.

## Resources
- [Spec Document Reviewer Prompt](resources/spec-document-reviewer-prompt.md)
- [Visual Companion Guidelines](resources/visual-companion.md)
- [Design Server Scripts](scripts/)

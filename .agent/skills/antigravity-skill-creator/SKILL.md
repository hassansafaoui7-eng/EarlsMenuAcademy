---
name: antigravity-skill-creator
description: Generates structured Antigravity agent skills. Use when the user asks to "create a skill", "build a skill", "make a skill", "download a skill", or "add a skill" for the Antigravity environment. Produces a complete `.agent/skills/<skill-name>/` directory with a compliant SKILL.md and optional supporting files.
---

# Antigravity Skill Creator

## When to use this skill
- User says "create a skill for X", "build me a skill", "make a skill that does Y"
- User pastes skill instructions and says "download this skill"
- User wants to standardize a repeatable agent workflow into a reusable skill

## Output Location
Always write skills to:
```
c:\Users\Beast\Skill Creator\.agent\skills\<skill-name>\SKILL.md
```
Use forward slashes internally. The `Skill Creator` workspace is the global skills repo.

---

## Workflow

### Checklist
- [ ] Confirm skill name (gerund form, lowercase, hyphens only, max 64 chars)
- [ ] Write YAML frontmatter (name + description)
- [ ] Write SKILL.md body (under 500 lines)
- [ ] Create optional supporting files if needed (`scripts/`, `examples/`, `resources/`)
- [ ] Write files to correct path under `.agent/skills/`

---

## Structural Requirements

Every skill must follow this hierarchy:

```
<skill-name>/
├── SKILL.md          ← Required
├── scripts/          ← Optional: helper scripts
├── examples/         ← Optional: reference implementations
└── resources/        ← Optional: templates or assets
```

---

## YAML Frontmatter Rules

```markdown
---
name: [gerund-form-name]
description: [Third-person. Includes specific triggers. Max 1024 chars.]
---
```

- **name**: Gerund (e.g., `testing-code`, `managing-databases`). No "claude" or "anthropic".
- **description**: Third person. Must include the trigger keywords a user would say.

---

## Writing Principles

- **Concise**: Assume the agent is smart. Don't over-explain basics.
- **Progressive Disclosure**: Keep SKILL.md under 500 lines. Link to secondary files if needed — only one level deep.
- **Paths**: Always use `/` not `\`.
- **Degrees of Freedom**:
  - Bullet points → high-freedom tasks (heuristics, judgment calls)
  - Code blocks → medium-freedom (templates to follow)
  - Specific bash commands → low-freedom (fragile, exact operations)

---

## SKILL.md Body Template

```markdown
---
name: [gerund-name]
description: [3rd-person description with trigger keywords]
---

# [Skill Title]

## When to use this skill
- [Trigger 1]
- [Trigger 2]

## Workflow
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Instructions
[Specific logic, rules, code snippets]

## Resources
- [Link to scripts/ or resources/ if applicable]
```

---

## Validation Loop

Before writing the final skill file:
1. **Plan** — Confirm the skill name, triggers, and scope with the user if ambiguous
2. **Validate** — Check that name is gerund form, description is third-person, body is under 500 lines
3. **Execute** — Write to `.agent/skills/<skill-name>/SKILL.md`

---

## Error Handling

- If the skill scope is unclear, ask one clarifying question before generating
- If a script is included, add a comment: `# Run with --help to see options`
- If the skill body exceeds 500 lines, split overflow into a linked `ADVANCED.md`

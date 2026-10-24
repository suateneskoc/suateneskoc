# Architecture decisions

Record decisions that affect the project's structure, dependencies, rendering
model, content model, or deployment behavior. These notes give future agents
the context behind a choice and reduce repeated reconsideration.

## File naming

Create files using this format:

```text
NNNN-short-title.md
```

Use the next available number and a short kebab-case title. Keep decisions
focused on one meaningful choice.

## Decision format

Copy [the decision template](template.md) for new records. Use these statuses:

- `proposed` — under consideration
- `accepted` — currently in use
- `superseded` — replaced by a later decision
- `rejected` — considered and intentionally not adopted

Update a decision when its rationale or status changes. Link to the replacing
decision when marking one as superseded.

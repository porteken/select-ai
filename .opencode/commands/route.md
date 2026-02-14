---
description: Classify task complexity and choose the cost-optimal agent.
agent: developer
---

# Task Router

Score each dimension from 0-2:

- Scope breadth
- Ambiguity
- Failure impact
- Reasoning depth
- Verification burden

## Decision

- `0-3`: route to `developer`
- `4-6`: route to `developer` (escalate only if blocked)
- `>=7`: route to `architect`

## Hard Escalation

Route to `architect` immediately if any of these apply:

- security-sensitive design/fix
- cross-service architecture change
- unresolved bug after one complete implement+verify pass
- conflicting grounded evidence

## Output

- **Score:** [0-10]
- **Route:** [developer/architect]
- **Justification:** [short, concrete]
- **Handoff Packet:** [only if architect]

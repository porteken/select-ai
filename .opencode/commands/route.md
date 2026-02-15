---
description: Classify task complexity and choose the cost-optimal agent.
agent: openagent
---

# Task Router

Score each dimension from 0-2:

- Scope breadth
- Ambiguity
- Failure impact
- Reasoning depth
- Verification burden

## Decision

- `0-3`: route to `openagent`
- `4-6`: route to `openagent` (escalate only if blocked)
- `>=7`: route to `opencoder`

## Hard Escalation

Route to `opencoder` immediately if any of these apply:

- security-sensitive design/fix
- cross-service architecture change
- unresolved bug after one complete implement+verify pass
- conflicting grounded evidence

## Output

- **Score:** [0-10]
- **Route:** [openagent/opencoder]
- **Justification:** [short, concrete]
- **Handoff Packet:** [only if opencoder]

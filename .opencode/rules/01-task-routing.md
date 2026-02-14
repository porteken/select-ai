---
description: Route tasks to Devstral by default; escalate only when complexity is high.
---

# Task Routing Rules

## Default

- Use `developer` (Devstral 2 Small) unless escalation criteria are met.

## Complexity Score

Score 0-2 points for each signal:

- Scope breadth: touches many modules, shared interfaces, or migrations.
- Ambiguity: unclear requirements, uncertain root cause, conflicting signals.
- Failure impact: security, data integrity, auth, billing, production outage risk.
- Reasoning depth: concurrency, race conditions, state machines, complex algorithms.
- Verification burden: requires broad integration testing or multi-step reproductions.

## Escalation Threshold

- `0-3`: Trivial -> `developer`.
- `4-6`: Moderate -> `developer`, escalate only if blocked.
- `>=7`: Complex -> `architect` first, then hand execution back to `developer`.

## Hard Escalation Triggers

- Security-sensitive design or exploit analysis.
- Cross-service architectural refactor.
- Persistent bug after one full dev implementation + verification cycle.
- Conflicting evidence after grounding (cannot determine safe fix path).

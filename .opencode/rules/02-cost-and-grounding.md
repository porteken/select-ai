---
description: Minimize token spend while reducing hallucinations.
---

# Cost And Grounding Rules

## Model Spend Discipline

- Keep default execution on Devstral.
- Use Claude only for high-complexity reasoning.
- Keep Claude context lean: only task, constraints, and minimal file excerpts.

## MCP Allocation

- Devstral: heavy MCP usage (`sequential-thinking`, `memory`, `context7`) is allowed.
- Claude: MCP disabled by default; allow only by explicit need.

## External Research

- Use built-in `websearch` only.
- Run OpenCode with `OPENCODE_ENABLE_EXA=1 opencode`.
- Do not use DuckDuckGo MCP.

## Hallucination Prevention

- Do not assert code behavior without local evidence.
- Do not assert external facts without `websearch` or `context7`.
- Before final answer, run at least one concrete verification action when code changes are made.

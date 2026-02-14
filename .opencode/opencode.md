# OpenCode Operating Profile

## Goal

Optimize for low cost and high reliability:

- Trivial and routine tasks run on `Devstral 2 Small`.
- Complex, ambiguous, or high-risk tasks escalate to `Claude 4.5 Sonnet`.

## Routing Policy

1. Start with the `developer` agent.
2. Run `/route` (or apply the same thresholds manually).
3. Escalate to `architect` only when complexity threshold is reached.
4. Return execution and verification to `developer`.

## Tooling Policy

- Use built-in `websearch` for external/current facts.
- Enable websearch with:
  - `OPENCODE_ENABLE_EXA=1 opencode`
- Never use DuckDuckGo MCP.

## Model-Specific Behavior

- `developer` (Devstral): heavy MCP usage (`sequential-thinking`, `memory`, `context7`) plus normal edit/bash workflows.
- `architect` (Claude): minimal tools and no MCP by default; focus on reasoning and targeted plans.

## Hallucination Controls

- Ground all claims in repo evidence (`read`/`bash`) or external evidence (`websearch`, `context7`).
- Verify before concluding: run syntax/type/tests relevant to the change.
- If uncertain, explicitly state uncertainty and gather more evidence before editing.

## Token Controls

- Prefer targeted reads for large files.
- Avoid lockfiles, generated artifacts, and `node_modules`.
- Keep handoff context small when escalating to Architect: include only task, constraints, and relevant snippets/files.

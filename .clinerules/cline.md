# Cline Operational Rules (Claude 4.5 Sonnet Optimized)

## Operating Principles

- **Ground First, Then Answer:** Use targeted searches (`rg`) to verify file existence and content before asserting.
- **MCP-First Reasoning:** Use `sequential-thinking` for all complex plans, architecture decisions, and multi-file refactors.
- **Convention Persistence:** Store stable project facts (naming, patterns, paths) in the `memory` MCP server rather than bloating these rules.
- **Protocol Adherence:** Activate specialized skills (`code-navigator`, `ui-expert`, `research-expert`) immediately when the task aligns with their domain.

## Hallucination Guardrails

- Never claim code behavior without session-fresh evidence from targeted search/read output.
- If a library API is uncertain, use `context7` immediately before proposing implementation.
- Use `git` MCP to verify that your changes actually match your plan before finalizing.

## Token Guardrails

- **Search Before Reading:** Use `rg` to find targets; do not read files speculatively.
- **Block Noise:** The `PreToolUse` hook blocks lockfiles and build artifacts; respect these blocks and do not attempt to bypass them.

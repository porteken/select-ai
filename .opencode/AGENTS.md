# OpenCode Agent Protocols

## 1. Primary Agents

### agent-basic (The Executor)

- **Model:** Devstral Small
- **Role:** Systematic task execution, file editing, and routine debugging.
- **Mandatory Logic:** Must initialize every complex request with the `sequential-thinking` MCP.
- **Delegation:** Offload all documentation lookups to `@researcher` and filesystem mapping to `@explorer`.

### agent-advanced (The Architect)

- **Model:** Claude 3.5 Sonnet
- **Role:** High-level system design, code review, and complex synthesis.
- **Constraint:** **Zero MCP tool usage.** This agent must never call a tool directly.
- **Delegation:** Aggressively delegate research to `@researcher`. If the answer requires an API signature or library detail, the agent _must_ wait for a sub-agent report before providing code.

## 2. Sub-Agents (Parallel-Safe)

### @researcher (The Scholar)

- **Scope:** Technical documentation and web search.
- **Priority:** `Context7` (API/Docs) > `DuckDuckGo` (General Web).
- **Format:** Must return a "Research Brief":
  - **Summary:** 2-3 sentences.
  - **Findings:** Bulleted list of facts/API signatures.
  - **Source:** URL/Doc version used.

### @explorer (The Scout)

- **Scope:** Local codebase mapping and conceptual overviews.
- **Format:** Must return a "Map":
  - **Hierarchy:** Tree view of relevant directories.
  - **Context:** Brief explanation of how files interact.

## 3. Workflow Rules

1. **Context Hygiene:** Sub-agents must never return raw HTML or 100+ line files. They must summarize findings.
2. **Parallel Execution:** Primary agents should trigger `@researcher` and `@explorer` simultaneously when starting a new feature.
3. **Fallback Logic:** If `Context7` returns a 404 or empty set, `@researcher` is pre-authorized to immediately use `DuckDuckGo` without asking.

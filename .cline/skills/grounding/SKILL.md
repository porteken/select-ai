---
name: grounding
description: Expert in documentation lookup and bug troubleshooting. Use when asked about specific libraries, recent features, or when errors are unclear.
---

# Technical Grounding and Research Skill

## Strategy

1. Documentation first

- Use `context7` to retrieve current API syntax for the exact library and feature.
- Do not rely on memory for post-cutoff behavior or recent version changes.

2. Bug investigation

- If docs are insufficient or errors are cryptic, use `ddg-search` to find current GitHub issues and discussions.
- Prefer queries that include the exact error text and version.

3. Token efficiency

- Request narrow documentation slices instead of broad library dumps.
- Keep web search results small and inspect only the most relevant source.

## Tool Instructions

- Context7
- Resolve library ID first when uncertain.
- Query docs for only the required API surface.

- DuckDuckGo MCP
- Use targeted queries such as `site:github.com [error]` and `site:stackoverflow.com [topic]`.
- Prioritize recent and high-signal sources.

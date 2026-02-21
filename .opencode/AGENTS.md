# OpenCode Agent Protocols

## 1. Runtime Agent Set

## 2. Effective Permission Model

### `agent-basic`

- Model: `mistral/devstral-small-2-24b-instruct-2512`
- Allowed: `bash`, `edit`, `mcp_sequential-thinking_*`, `subagent_invocation`
- Denied: `mcp_context7_*`, `mcp_duckduckgo_*`
- Intent: execution-first primary agent with mandatory sequential planning.

### `agent-advanced`

- Model: `anthropic/claude-3-5-sonnet`
- Allowed: `bash`, `edit`, `subagent_invocation`
- Denied: `mcp_*`
- Intent: synthesis-heavy primary agent with no direct MCP usage.

### `researcher`

- Model: `mistral/devstral-small-2-24b-instruct-2512`
- Allowed: `mcp_context7_*`, `mcp_duckduckgo_*`
- Denied: `edit`, `bash`
- Intent: evidence gathering and API verification.

### `explorer`

- Model: `mistral/devstral-small-2-24b-instruct-2512`
- Allowed: `read`, `mcp_duckduckgo_*`
- Denied: `edit`, `bash`
- Intent: mapping and high-level local discovery.

### Markdown agents

- `openagent`, `opencoder`, `explainer`, `test-pilot`, `system-builder` are loaded from `.opencode/agents/*.md`.
- They inherit baseline runtime permissions unless explicitly overridden in config.
- Their role definitions live in their prompt files.

## 3. Operating Rules

1. Use `researcher` for API signatures, docs, and external grounding.
2. Use `explorer` for local structure and conceptual mapping.
3. Keep subagent outputs summarized; avoid raw HTML and large uncurated dumps.
4. Prefer parallel delegation (`researcher` + `explorer`) for new feature exploration.

# Memory Policy (MCP-Enhanced)

Use the `memory` MCP server as the primary store for persistent facts to keep the system prompt lean.

## What to Store (via `memory` MCP)

- Stable project conventions (naming, linting, structure).
- Architectural decisions and trade-offs.
- Frequently used or project-specific shell commands.
- Known pitfalls, technical debt, and "gotchas."

## Interaction Rules

- **Store:** When a new convention is agreed upon or a significant design decision is made, use `memory` to save it.
- **Retrieve:** Check `memory` before starting a task to ensure compliance with existing decisions.
- **Update:** If a "fact" changes, update the memory entry immediately.

## What NOT to Store

- Large copied logs or raw tool outputs (link to them instead).
- Ephemeral task status (use chat for this).
- Code blocks (reference the file path instead).

## Policy Maintenance

- This file (`memory.md`) defines the _policy_.
- The `memory` MCP server holds the _data_.

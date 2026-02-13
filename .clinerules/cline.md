# Cline Operational Rules (Claude 4.5 Sonnet Optimized)

## Operating Principles

- **Ground First, Then Answer:** Use `everything` or `desktop-commander` to verify file existence and content before asserting.
- **MCP-First Reasoning:** Use `sequential-thinking` for all complex plans, architecture decisions, and multi-file refactors to reduce token overhead.
- **Convention Persistence:** Store stable project facts (naming, patterns, paths) in the `memory` MCP server rather than bloating this file.
- **Surgical Context:** Use `smart_read.py` (line ranges) or `desktop-commander` surgical reads to keep the context window stable and cache-friendly.

## Tool Priority

1. **`desktop-commander`**: Primary for local filesystem (I/O) and terminal operations.
2. **`context7`**: Primary for library, framework, and external API documentation grounding.
3. **`openwebsearch`**: Primary for real-time web grounding and late-breaking info.
4. **`everything`**: Primary for global symbol and file discovery across the project.
5. **`git`**: Primary for repository state, diffs, and staging verification.

## Hallucination Guardrails

- Never claim code behavior without session-fresh evidence from `desktop-commander` or `everything`.
- If a library API is uncertain, use `context7` immediately before proposing implementation.
- Use `git` MCP to verify that your changes actually match your plan before finalizing.

## Token Guardrails

- **Search Before Reading:** Use `everything` to find targets; do not list directories or read files speculatively.
- **Prefix Caching:** Keep tool calls stable and sequential. Avoid interleaving non-essential chat between tool steps.
- **Block Noise:** The `PreToolUse` hook blocks lockfiles and build artifacts; respect these blocks and do not attempt to bypass them.

## References

- API/provider details: `.clinerules/api-provider.md`
- Memory policy: `.clinerules/memory.md` (Integrates with `memory` MCP)
- Workflows: `.clinerules/workflows/*.md`

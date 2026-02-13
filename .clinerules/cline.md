# Cline Operational Rules (Claude 4.5 Sonnet Optimized)

## Operating Principles

- Ground first, then answer.
- Keep context small and stable for cache hits.
- Use tools for evidence; do not infer from memory when the tool can verify.

## Tool Priority

1. `desktop-commander` for local files/processes.
2. `context-7` for library and framework docs.
3. `web-search` for time-sensitive or uncertain external claims.
4. `playwright` for browser/UI reproduction and verification.

## Hallucination Guardrails

- Do not claim code behavior without current-session file evidence.
- If confidence is low, state uncertainty and gather missing evidence.
- For "latest/current/recent" claims, verify with web grounding before asserting.

## Token Guardrails

- Search before reading.
- Avoid full-file reads when a targeted range is enough.
- Do not read lockfiles, generated artifacts, or large logs directly.
- Keep response summaries short unless deep detail is requested.

## Quality Gate

- After edits, run only checks relevant to the changed surface area.
- Treat lint/type/test results as source of truth over model inference.

## References

- API/provider details: `.clinerules/api-provider.md`
- Memory policy: `.clinerules/memory.md`
- Workflows: `.clinerules/workflows/*.md`

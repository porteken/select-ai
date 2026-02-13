# OpenAI-Compatible API Configuration (Claude 4.5 Sonnet)

Use this when Cline is routed to Claude via an OpenAI-compatible endpoint.

## Model Naming

- Prefer a pinned provider model ID over floating aliases for production stability.
- If the gateway supports snapshots, use a dated snapshot for repeatable behavior.
- Keep one default model for coding tasks and only switch models when required.

## Request Parameters

- `temperature`: `0` to `0.2` for code and research.
- `top_p`: `1` unless a provider explicitly recommends otherwise.
- `max_completion_tokens`:
  - Routine edits: `600`-`1500`
  - Medium tasks: `1500`-`4000`
  - Complex design/debug: raise as needed, not globally.
- `n`: keep `1`.

## Thinking / Reasoning

- Enable only for architecture, complex debugging, and cross-file refactors.
- Disable for routine edits, simple transforms, and straightforward test updates.
- In OpenAI-compatible clients, pass Anthropic thinking controls via provider-specific extras (for example `extra_body`).

## Prompt Caching Discipline

- Keep system prompt and tool definitions stable across turns.
- Avoid unnecessary changes to `tool_choice`, web-search toggles, and thinking mode mid-thread.
- Cache benefit depends on exact prefix reuse (`tools` -> `system` -> `messages`).

## Cost + Reliability Defaults

- Keep instructions compact; avoid large static policy blocks.
- Prefer targeted tool calls over long natural-language analysis.
- Track usage metadata and adjust `max_completion_tokens` downward if completions are consistently under budget.

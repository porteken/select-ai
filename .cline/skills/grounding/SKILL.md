---
name: grounding
description: Targeted library/API research with context7 and ddg-search. Use for API syntax, version checks, and issue signals. Use /debug for full bug loops.
---

# Grounding

Use this skill for focused research, not end-to-end debugging.

## Use For

- Exact API syntax/behavior for a library feature.
- Version-specific or recent behavior checks.
- Targeted issue evidence when docs are insufficient.

## Not For

- Full debug loops (reproduce, isolate, fix, verify). Use `/debug`.

## Flow

1. `context7` first

- Resolve library ID if needed.
- Fetch only the required API surface.

2. `ddg-search` second

- Use when docs are insufficient or errors are unclear.
- Query exact error text + version.
- Prefer recent, high-signal GitHub/Stack Overflow results.

3. Keep scope narrow

- Avoid broad doc dumps.
- Inspect only top relevant sources.

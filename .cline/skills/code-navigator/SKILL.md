---
name: code-navigator
description: MCP-first code discovery and surgical file reading to reduce token usage and hallucinations.
---

# Code Navigator Protocol (Claude 4.5 Optimized)

Use MCP servers from `cline.mcp.json`.

## 1. Search First (Token Optimization)

- Use search (`rg`) to find symbols/call sites before reading code.
- Read only the specific line ranges required for the next action.
- Avoid broad rewrites; prefer minimal, surgical diffs to keep unchanged code untouched.

## 2. Surgical Reads

- For files >100 lines, use `.cline/skills/code-navigator/smart_read.py` ranges or pattern mode.
- Use `git` MCP to verify repository state and diffs before finalizing changes.

## 3. Avoid Redundant Reads

- If a file was already read in the same task and not modified, reuse prior context.
- Respect the `PreToolUse` hook blocks for lockfiles and build artifacts.

## 4. Grounding & Verification

- Query `context7` for external library APIs before implementation.
- Run the smallest relevant checks (lint/tests) first. Expand only if failures imply wider impact.

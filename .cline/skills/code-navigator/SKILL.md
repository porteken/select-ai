---
name: code-navigator
description: MCP-first code discovery and surgical file reading to reduce token usage and hallucinations.
---

# Code Navigator Protocol (Claude 4.5 Optimized)

Use MCP servers from `cline.mcp.json`.

## 1. Search First

- Find symbols/call sites before reading code.
- Prefer `rg` search for fast symbol/call-site discovery.
- Use `filesystem` MCP for targeted project-root reads when helpful.

## 2. Surgical Reads

- For files >100 lines, use `.cline/skills/code-navigator/smart_read.py` ranges or pattern mode.
- Read only the block required for the next action.

## 3. Avoid Redundant Reads

- If a file was already read in the same task and not modified, reuse prior context.

## 4. Minimal Edits

- Patch the smallest block that solves the issue.
- Re-run search after edits to confirm references remain consistent.

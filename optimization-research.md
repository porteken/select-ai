# Research Report: Reducing Cline Overhead & Improving Performance

This report outlines strategies to optimize the Cline (Gemini CLI) environment for better performance, reduced token usage, and minimized hallucinations.

## 1. Modular Rule Management

**Problem:** Massive system prompts or static `.clinerules` files bloat every turn's context, increasing latency and cost.
**Solution:**

- **Core Rules Only:** Keep `.clinerules/cline.md` limited to foundational operational principles (e.g., "ground before acting").
- **Workflow-on-Demand:** Use the `Apply workflow: <path>` pattern. Only read task-specific checklists (e.g., `feature.md`, `debug.md`) when that task begins.
- **Memory MCP:** Offload project-specific conventions (naming styles, tech stack details) to the `memory` MCP server instead of hardcoding them in rules.

## 2. MCP-First Architecture

**Problem:** Shell tools (like `ls`, `grep`, `cat`) are generic and produce unstructured output that the model must parse.
**Solution:**

- **Sequential Thinking:** Essential for complex logic. It forces the model to plan in discrete steps within a tool, reducing "monologue" tokens and improving accuracy.
- **Structured Git:** Use the `git` MCP server. It provides cleaner diffs and status updates than raw shell output.
- **Filesystem MCP:** Provides faster, safer, and more structured file operations than generic shell commands.
- **Language Server MCP:** (Recommended addition) Use `mcp-language-server` to get real-time type/lint diagnostics without having to run full build/lint commands or read multiple files to find errors.

## 3. Token-Efficient Operations

**Problem:** Redundant reads and large file processing exhaust context windows.
**Solution:**

- **Surgical Reads:** Enforce a 300-line limit for `read_file`. Use `smart_read.py` with line ranges or regex context.
- **Read Cache:** The existing `PreToolUse` hook is excellent. It blocks redundant reads of the same file in a session.
- **Lockfile/Artifact Guard:** Automatically block reads of `package-lock.json`, `node_modules`, and build artifacts via hooks.

## 4. Reducing Hallucinations

**Problem:** Models often "assume" code structure or API behavior when context is missing.
**Solution:**

- **Grounding Protocol:** Rules must mandate using `everything-search` or `grep` before making any claims about existing code.
- **Thinking Mode Control:** Only enable "Thinking" for architecture or complex debugging. For routine tasks, the overhead of thinking exceeds its benefit.
- **Verification Workflows:** Every workflow should end with a "Verification" phase that runs actual code (tests, lint) rather than relying on model inference.

## 5. Proposed cline.mcp.json

The created `cline.mcp.json` includes:

- `sequential-thinking` (Reasoning)
- `git` (State Tracking)
- `everything-search` (Grounding)
- `memory` (Convention Persistence)

# General MCP Workflow

Usage: `Apply workflow: .clinerules/workflows/cline.md`
MCP tools for this workflow are defined in `cline.mcp.json`.

1. Discovery
   - [ ] Search first (`rg`).
   - [ ] Read only targeted code ranges.

2. Grounding
   - [ ] Query `context7` for external library APIs before implementation.
   - [ ] Use `duckduckgo` when information is time-sensitive or uncertain.

3. Implementation
   - [ ] Make minimal edits (`edit_block` preferred).
   - [ ] Keep diffs focused to task scope.

4. Verification
   - [ ] Run lint/tests/build appropriate to changed surface area.
   - [ ] For UI changes, reproduce and verify with `playwright`.

5. Report
   - [ ] Summarize changed files, validation performed, and known risks.

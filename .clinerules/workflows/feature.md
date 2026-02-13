# Feature Workflow (MCP-grounded)

Usage: `Apply workflow: .clinerules/workflows/feature.md`
MCP tools for this workflow are defined in `cline.mcp.json`.

- [ ] Use `sequential-thinking` to decompose the request into a step-by-step implementation plan.
- [ ] List acceptance criteria in chat and get user confirmation.
- [ ] Discover affected files using `rg` and `git` MCP before reading.
- [ ] Read only targeted code ranges (`smart_read.py` or targeted `read_file`) for the touched symbols.
- [ ] Resolve relevant API docs with `context7` before implementing third-party/library usage.
- [ ] Implement the smallest safe change set using targeted writes.
- [ ] Add or update tests for the new behavior when test coverage exists.
- [ ] Run verification commands for changed scope (`npm run lint`, focused tests, then build if needed).
- [ ] Use `git` MCP to review changes and ensure they align with the plan.
- [ ] Summarize what changed, what was verified, and any residual risks.

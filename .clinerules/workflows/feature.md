# Feature Workflow (MCP-grounded)

Usage: `Apply workflow: .clinerules/workflows/feature.md`

- [ ] Clarify scope from user request and list acceptance criteria in chat.
- [ ] Discover affected files with `rg` or `desktop-commander` search tools before reading.
- [ ] Read only targeted code ranges (`smart_read.py` or targeted `read_file`) for the touched symbols.
- [ ] Resolve relevant API docs with `context-7` before implementing third-party/library usage.
- [ ] Implement the smallest safe change set with `edit_block` or targeted writes.
- [ ] Add or update tests for the new behavior when test coverage exists.
- [ ] Run verification commands for changed scope (`npm run lint`, focused tests, then build if needed).
- [ ] Summarize what changed, what was verified, and any residual risks.

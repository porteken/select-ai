# UI Debug Workflow (Playwright-first)

Usage: `Apply workflow: .clinerules/workflows/debug-ui.md`

- [ ] Confirm app is runnable and start dev server if required.
- [ ] Reproduce issue with `playwright` (`browser_navigate`, then minimal user actions).
- [ ] Capture evidence:
  - [ ] Console logs (`browser_console_messages` or injected `window.__CLINE_LOGS`).
  - [ ] Network failures (`browser_network_requests`).
  - [ ] UI state snapshot (`browser_snapshot` or screenshot).
- [ ] Map runtime failure to code via `rg`, then read only relevant ranges.
- [ ] Apply minimal fix and rerun the exact reproduction path.
- [ ] Verify both bug resolution and no immediate regressions in adjacent UI behavior.

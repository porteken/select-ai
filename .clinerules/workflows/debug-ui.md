# 🖥️ Frontend Debugging Workflow

**Usage**: `Apply workflow: .cline/workflows/debug-ui.md`

- [ ] **Environment**: Verify the dev server is active (check `package.json` -> `desktop-commander`).
- [ ] **Instrumentation**: Use `playwright_navigate` and inject the log hijacker script from `.clinerules`.
- [ ] **Trigger**: Perform the UI action using `playwright_click` or `playwright_fill`.
- [ ] **Analyze**:
  - [ ] Fetch `window.__CLINE_LOGS`.
  - [ ] Check for 400/500 errors in network via `playwright_evaluate`.
- [ ] **Trace**: Locate the failing component via `rg` (ripgrep).
- [ ] **Fix**: Apply changes and re-run the logs to verify the fix.

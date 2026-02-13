# Frontend Debugging

Goal: Fix a UI component bug with reproducible evidence.

1. Reproduce in browser
   - [ ] Use `playwright` to navigate and trigger the bug in the smallest number of steps.
2. Capture diagnostics
   - [ ] Collect console output and failed network requests.
   - [ ] Save screenshot/snapshot of failure state.
3. Trace to source
   - [ ] Use `everything` to find the component, handler, or relevant CSS/logic.
   - [ ] Use `smart_read.py` for failing logic blocks only.
   - [ ] If the bug involves a library, use `context7` to verify correct API usage.
4. Plan & Patch
   - [ ] Use `sequential-thinking` to plan the minimal fix.
   - [ ] Edit the smallest block that resolves the defect using `desktop-commander`.
5. Re-verify
   - [ ] Re-run same browser steps.
   - [ ] Use `git` MCP to review diffs and ensure no regressions.
   - [ ] Run `npm run lint` and focused tests for the affected component.

# Frontend Debugging

Goal: Fix a UI component bug with reproducible evidence.

1. Reproduce in browser
   - [ ] Use `playwright` to navigate and trigger the bug in the smallest number of steps.
2. Capture diagnostics
   - [ ] Collect console output and failed network requests.
   - [ ] Save screenshot/snapshot of failure state.
3. Trace to source
   - [ ] Use `rg` to find component/handler.
   - [ ] Use `smart_read.py` for imports and the failing logic block only.
4. Patch minimally
   - [ ] Edit the smallest block that resolves the defect.
5. Re-verify
   - [ ] Re-run same browser steps.
   - [ ] Run `npm run lint` and focused tests for the affected component if available.

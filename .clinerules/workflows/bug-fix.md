# Bug Fix Workflow

Goal: Resolve a defect with reproducible evidence and verification.

1. Discovery & Reproduction
   - [ ] Define the failure state.
   - [ ] For UI bugs: Use `ui-expert` skill to reproduce in browser via Playwright.
   - [ ] For Logic bugs: Use `code-navigator` to find the failing code and write a reproduction test.

2. Diagnosis
   - [ ] Capture evidence (logs, snapshots, or test failures).
   - [ ] Trace the defect to its root cause using `rg` and targeted reads.

3. Implementation
   - [ ] Use `sequential-thinking` to plan the minimal fix.
   - [ ] Apply the fix using surgical edits.

4. Verification
   - [ ] Rerun the reproduction steps (Playwright or test suite).
   - [ ] Run `npm run lint` and verify build if necessary.
   - [ ] Use `git` MCP to review the diff for unintended side effects.

5. Report
   - [ ] Summarize the fix, validation steps, and any remaining risks.

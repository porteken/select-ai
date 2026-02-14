---
description: Run strict verification on code and context.
agent: maintainer
---

# Verification Suite

## Phase 1: Context Integrity

- [ ] **State Check:** Did I verify the file content via `cat` or `grep` _immediately before_ this edit?
- [ ] **Drift Check:** Run `git diff` to ensure I didn't accidentally revert previous work.

## Phase 2: Syntax & Logic

- [ ] **Syntax:** Run `node --check <file>` (or `python -m py_compile`, `cargo check`).
- [ ] **Linter:** Run `npm run lint` (if available).
- [ ] **Types:** Run `npx tsc --noEmit` to catch type errors early.

## Phase 3: Runtime

- [ ] **Reproduction:** Run the specific reproduction script `repro.ts`.
- [ ] **Test Suite:** Run `npm test` (only if the change is broad).

**FAILURE PROTOCOL:**
If any step fails, do NOT guess the fix.

1. Copy the error.
2. Run `duckduckgo` with the error.
3. Update the `sequential-thinking` plan.

## Phase 4: Knowledge Capture

- [ ] **Persist:** If the fix involved a non-obvious solution or a new pattern, store it in `memory`.

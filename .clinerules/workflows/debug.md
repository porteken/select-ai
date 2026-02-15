# /debug - Repro Bug Workflow

Use this workflow when a bug is reproducible but root cause is unclear.

## Step 1: Capture Failure

- Capture exact error output and reproduction steps.
- Confirm relevant package versions.
- Write a one-sentence failure statement before editing.

## Step 2: Ground Assumptions

- Invoke the `grounding` skill for libraries or APIs touched by the failing path.
- Check divergence from current docs.
- Record doc/issue links used.

## Step 3: Isolate Root Cause

- Reduce to the smallest failing path.
- Form one clear hypothesis and test it with direct evidence.

## Step 4: Apply Minimal Fix

- Explain the root cause using grounded findings.
- Implement minimal changes.
- Cite the docs/issues that justify behavior assumptions.

## Step 5: Verification

- Re-run reproduction steps and relevant tests.
- If failure remains, repeat from Step 2 with updated error evidence.

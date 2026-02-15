# /debug - Systematic Bug Resolution

Use this workflow when a bug is reproducible but root cause is unclear.

## Step 1: Context Gathering

- Identify failing behavior and capture exact error output.
- Confirm relevant package versions from `package.json`.

## Step 2: Documentation Audit

- Use `context7` to validate current API usage for the failing path.
- Check whether implementation diverges from documented behavior.

## Step 3: Global Knowledge Search

- If docs do not explain the failure, use `ddg-search`.
- Run focused queries:
- `[Exact Error Message] site:github.com`
- `[Library] [Feature] latest issues`

## Step 4: Proposed Fix

- Explain the root cause using grounded findings.
- Implement minimal changes.
- Reference the docs page or issue URL used to justify the fix.

## Step 5: Verification

- Re-run reproduction steps and relevant tests.
- If failure remains, repeat Step 3 with updated error evidence.

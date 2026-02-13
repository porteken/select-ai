# Token Optimization Workflow (Claude 4.5 Sonnet)

Usage: `Apply workflow: .clinerules/workflows/optimization.md`

1. Scope

- [ ] Confirm exact acceptance criteria and touched surface area.

2. Discovery

- [ ] Use search first (`rg` or `desktop-commander` search).
- [ ] Read only minimal ranges needed for the next edit.

3. Editing

- [ ] Prefer minimal diffs over broad rewrites.
- [ ] Keep unchanged code untouched.

4. Verification

- [ ] Run the smallest relevant checks first.
- [ ] Expand verification only if failures imply wider impact.

5. Report

- [ ] Summarize changed files, checks run, and residual risks in compact form.

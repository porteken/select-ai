---
name: verification
description: Validate outputs by grounding information, performing linting and testing, and reporting results.
license: MIT
compatibility: Requires Node.js tooling (ESLint, Vitest, Playwright)
metadata:
  purpose: validation and quality gate
---

# Verification Skill

This skill defines a multi-step validation and quality gate process for code artifacts and generated work.

## When to Use

Use this skill when the user requests validation of outputs, quality checks for a codebase, or after completing a delegated work plan to ensure correctness and compliance.

## Steps

1. **GROUNDING:** Use `task` to assign a grounding task to the `grounding` subagent for additional web search and documentation context.
2. **HALLUCINATION CHECK:** Cross-reference any generated code or logic against the grounding results. If an API usage or library feature is not found in the documentation, flag it as a potential hallucination.
3. **INTEGRATE FINDINGS:** Merge any grounding results into the validation context for more accurate checks.
4. **LINTING:** Run `npx eslint <files>` with `--fix` where possible to correct style and syntax issues.
5. **TESTING:** Execute automated tests using `npx vitest run` and `npx playwright test` for unit and integration validation.
6. **REPORT:** If any step exits with a non-zero status, return specific error logs and guidance.

## Examples

- Validate a feature branch with both linting and automated tests.
- Provide grounding context to support or challenge assumptions in generated code.
- Generate actionable diagnostics after verification failures.

## Notes

- Ensure Node.js tooling dependencies are installed and available.
- Grounding improves accuracy by retrieving external documentation and sources.

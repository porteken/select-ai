---
name: verification
description: Multi-step validation: Grounding -> Linting -> Testing.
license: MIT
compatibility: Python 3.12+
metadata:
  purpose: "Quality Gate"
---

# Verification Skill

1. GROUNDING: Cross-reference logic with `context7` or `duckduckgo` if uncertain.
2. LINTING: `npx eslint <files>` --fix (attempt auto-fix first).
3. TESTING: `npx vitest run` / `npx playwright test`.
4. REPORT: If exit code != 0, return specific error logs.

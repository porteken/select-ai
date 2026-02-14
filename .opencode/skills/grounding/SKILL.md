---
name: grounding
description: Protocols for deep environment analysis and reality verification.
---

# Deep Grounding Protocol

Use this skill to build a mental map of the project.

## 0. Orchestrated Grounding Roles

- **Developer (The Scout):** Responsible for broad environmental grounding. Performs `ls -R`, reads manifests (`package.json`), and researches libraries via `context7`.
- **Architect (The Inspector):** Responsible for high-fidelity logic grounding. Verifies specific implementation details, checks for subtle race conditions, and ensures architectural alignment.

## 1. Project Reconnaissance

- **Manifests:** Read `package.json`, `requirements.txt`, or `Cargo.toml` completely.
- **Structure:** Run `ls -R` (ignoring `.git` and `node_modules`).
- **Config:** Read `tsconfig.json`, `.eslintrc`, or `pyproject.toml` to understand linting rules.
- **History:** Query `memory` for architectural summaries or project-specific constraints.

## 2. Documentation Verification

- **Unknown Libs:** If you see an import you don't recognize, use `context7` to fetch its API.
- **Version Check:** Compare the version in `package.json` with the `context7` docs.

## 3. Error Diagnostics

- **Search First:** If `npm test` fails, use built-in `websearch` with the _entire_ error log.
- **No Assumptions:** Never assume a fix works. Run the test again.

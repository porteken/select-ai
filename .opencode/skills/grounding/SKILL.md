---
name: grounding
description: Protocols for deep environment analysis and reality verification.
---

# Deep Grounding Protocol

Use this skill to build a mental map of the project.

## 0. Orchestrated Grounding Roles

- **Openagent (The Coordinator):** Responsible for deciding what evidence is needed and delegating efficiently.
- **Researcher (The Scout):** Responsible for documentation and API grounding via `context7` and `websearch`.
- **Opencoder (The Inspector):** Responsible for high-fidelity implementation grounding and correctness checks.

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

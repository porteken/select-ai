---
name: context-management
description: Advanced techniques to maintain reasoning quality by managing context load.
---

# Context Management Protocol

**OBJECTIVE:** Maintain high "Needle-in-a-Haystack" retrieval accuracy.
**RULE:** Never pollute the context window with low-value tokens.

## 1. Model-Specific Strategies

### Opencoder (Claude 4.5 Sonnet)

Opencoder has high reasoning density but is expensive. Keep its context window **lean**.

- **Rule:** Only use targeted reads (`read`, `rg`, or line-ranged file reads) for the exact blocks needed.
- **Avoid:** Large full-file reads on unrelated files. Rely on the coordinator plan for broader context.

### Specialist Subagents (Devstral 2 Small)

Devstral subagents are cost-efficient and good for broad discovery.

- **Rule:** Prefer targeted reads first (`grep`, line ranges); expand to full-file reads only for files you will modify.
- **Focus:** Build the context foundation that `openagent` can route or escalate.

## 2. Targeted Reading (The `grep` Strategy)

Instead of full-file reads on large files (>300 lines), use `rg`/`grep` to extract specific logic.

- **Find Usage:** `rg "API_KEY" src/` (Locate variable scope).
- **Read Function:** `rg -n "function processData" src/utils.ts` (Then read a small line range around the hit).
- **Verify Import:** `rg "import.*Icon" src/components/` (Check dependency usage).

## 3. Dependency Isolation

❌ **NEVER READ:** `node_modules/`, `package-lock.json`, `yarn.lock`, `.git/`.
✅ **ALWAYS READ:** `package.json` (for versions), `tsconfig.json` (for environment).

- **Action:** If you need library syntax, use `context7` tool. Do not try to read the library source code unless debugging deep internals.

## 4. Cognitive Garbage Collection

If the conversation gets too long (>10 turns) or you feel confused:

1. If `memory` is enabled for the active agent, store critical insights or progress.
2. Run `sequential-thinking` or summarize the active state to discard irrelevant history.
3. Re-read _only_ the files actively being modified.

## 5. Contextual Sanity Check

Before editing a file:

- Did you read the _latest_ version of it? (Run a targeted `read` or `rg` again if multiple turns have passed).
- **Why?** You might be editing an old version from your context memory, overwriting recent changes.

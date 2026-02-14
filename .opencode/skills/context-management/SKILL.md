---
name: context-management
description: Advanced techniques to maintain reasoning quality by managing context load.
---

# Context Management Protocol

**OBJECTIVE:** Maintain high "Needle-in-a-Haystack" retrieval accuracy.
**RULE:** Never pollute the context window with low-value tokens.

## 1. Model-Specific Strategies

### Architect (Claude 4.5 Sonnet)

Claude has high reasoning density but is expensive. Keep its context window **lean**.

- **Rule:** Only `read_file` or `grep` the exact lines/blocks necessary for the logic change.
- **Avoid:** Large `read_file` calls on unrelated files. Rely on the Developer's previous `PLAN.md` for broader context.

### Developer (Devstral 2 Small)

Devstral has a massive 128k context window. Use it to build a broad understanding.

- **Rule:** Prefer targeted reads first (`grep`, line ranges); expand to full-file reads only for files you will modify.
- **Focus:** Build the context foundation that the Architect will later use.

## 2. Targeted Reading (The `grep` Strategy)

Instead of `read_file` on large files (>300 lines), use `grep` to extract specific logic.

- **Find Usage:** `grep -r "API_KEY" src/` (Locate variable scope).
- **Read Function:** `grep -nC 10 "function processData" src/utils.ts` (Read function with 10 lines of padding).
- **Verify Import:** `grep "import.*Icon" src/components/` (Check dependency usage).

## 3. Dependency Isolation

❌ **NEVER READ:** `node_modules/`, `package-lock.json`, `yarn.lock`, `.git/`.
✅ **ALWAYS READ:** `package.json` (for versions), `tsconfig.json` (for environment).

- **Action:** If you need library syntax, use `context7` tool. Do not try to read the library source code unless debugging deep internals.

## 4. Cognitive Garbage Collection

If the conversation gets too long (>10 turns) or you feel confused:

1. Use `memory` to store any critical insights or progress made so far.
2. Run `sequential-thinking` (if Developer) or summarize (if Architect) to discard irrelevant history.
3. Re-read _only_ the files actively being modified.

## 5. Contextual Sanity Check

Before editing a file:

- Did you read the _latest_ version of it? (Run `read_file` or `grep` again if multiple turns have passed).
- **Why?** You might be editing an old version from your context memory, overwriting recent changes.

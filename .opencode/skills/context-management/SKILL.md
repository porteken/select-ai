---
name: context-management
description: Advanced techniques to maintain reasoning quality by managing context load.
---

# Context Management Protocol

**OBJECTIVE:** Maintain high "Needle-in-a-Haystack" retrieval accuracy.
**RULE:** Never pollute the context window with low-value tokens.

## 1. Targeted Reading (The `grep` Strategy)

Instead of `cat` on large files (>300 lines), use `grep` to extract specific logic.

- **Find Usage:** `grep -r "API_KEY" src/` (Locate variable scope).
- **Read Function:** `grep -nC 10 "function processData" src/utils.ts` (Read function with 10 lines of padding).
- **Verify Import:** `grep "import.*Icon" src/components/` (Check dependency usage).

## 2. Dependency Isolation

❌ **NEVER READ:** `node_modules/`, `package-lock.json`, `yarn.lock`, `.git/`.
✅ **ALWAYS READ:** `package.json` (for versions), `tsconfig.json` (for environment).

- **Action:** If you need library syntax, use `context7` tool. Do not try to read the library source code unless debugging deep internals.

## 3. Cognitive Garbage Collection

If the conversation gets too long (>10 turns) or you feel confused:

1. Use `memory` to store any critical insights or progress made so far.
2. Run `sequential-thinking` with the prompt: _"Summarize the current state of the code and discard irrelevant history."_
3. Re-read _only_ the files actively being modified.

## 4. Contextual Sanity Check

Before editing a file:

- Did you read the _latest_ version of it? (Run `cat` or `grep` again if multiple turns have passed).
- **Why?** You might be editing an old version from your context memory, overwriting recent changes.

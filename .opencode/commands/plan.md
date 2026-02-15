---
description: Generate a context-aware implementation plan.
agent: openagent
---

# Implementation Plan

1. **Grounding**
   - Identify relevant files only.
   - Load targeted context with `read` or `bash` (`rg`, `ls`, focused file reads).
   - Delegate targeted external checks to `researcher` when needed.

2. **Complexity Classification**
   - Score the task with routing rules (scope, ambiguity, impact, reasoning depth, verification burden).
   - If score is `>=7` or any hard trigger is present, recommend `opencoder`.
   - Otherwise keep execution on `openagent`.

3. **Implementation Plan**
   - Break into atomic steps.
   - For each step: files, change type, risk, and verification command.

4. **Escalation Handoff (if needed)**
   - Build a minimal handoff packet:
     - task summary
     - constraints
     - relevant files/snippets only
     - open questions

## Output Template

### Task Overview

- **Complexity Score:** [0-10]
- **Recommended Agent:** [openagent/opencoder]
- **Why:** [one short paragraph]

### Proposed Changes

- **File:** `path/to/file`
- **Change:** [what and why]
- **Verification:** [exact command]

### Unknowns

- [ ] [open issue]

---
description: Generate a context-aware implementation plan.
agent: researcher
---

# Architectural Plan

1. **Context Loading**:
   - List all files relevant to the request.
   - _Action:_ `cat` these files to load them into the 128k window.
   - _Action:_ Query `memory` for any relevant historical context or decisions.

2. **Sequential Thinking**:
   - Break the task into atomic steps.
   - Analyze impact on imported modules.

3. **Output Template**:

   ## Proposed Changes
   - **File:** `src/utils.ts`
   - **Change:** [Description]
   - **Verification:** [Command to run]

   ## Unknowns
   - [ ] Need to check `context7` for...
   - [ ] Need to verify file existence of...
   - [ ] Need to confirm `memory` for previous patterns of...

**Wait for approval.**

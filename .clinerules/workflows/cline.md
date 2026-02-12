# Feature Implementation Workflow

**Usage**: `/feature.md "Add login page"`

1.  **Grounding Phase**
    - [ ] Run `git-master` skill to check current branch state.
    - [ ] Use `context-7` or `web-search` to fetch docs for relevant libraries (e.g., "NextAuth docs").

2.  **Planning Phase**
    - [ ] Create a file `PLAN.md` with step-by-step implementation details.
    - [ ] Ask user for approval of the plan.

3.  **Execution Phase**
    - [ ] Use `desktop-commander` to create/edit files.
    - [ ] **Linting**: Before finishing, run the `pre_tool_use.sh` check implicitly by trying to save.

4.  **Verification Phase**
    - [ ] Run tests targeting _only_ the new feature.
    - [ ] Use `git-master` to prepare the commit.

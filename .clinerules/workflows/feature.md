# 🚀 Feature Implementation Workflow

**Usage**: `Apply workflow: .cline/workflows/feature.md`

- [ ] **Grounding**: Read `project_state.md` and check library docs via `context-7` or `web-search`.
- [ ] **Planning**: Outline the architecture changes in the chat and wait for user confirmation.
- [ ] **Surgical Read**: Identify existing logic using `smart_read.py`.
- [ ] **Testing (TDD)**: Write failing unit/integration tests for the new feature.
- [ ] **Drafting**: Write the code.
- [ ] **Verification**:
  - [ ] Run `npm run lint` or rely on the `pre_tool_use.sh` hook.
  - [ ] Execute relevant unit tests via `execute_command`.
- [ ] **Memory**: Update the `project_state.md` with the new feature details.

# AGENTS.md

This file defines the main OpenAgentsControl workflow for this OpenCode setup.

## Plan-First Workflow

1. `openagent` classifies intent and proposes a concise execution plan.
2. Require explicit user approval before edits, writes, or command execution with side effects.
3. Delegate implementation to `opencoder` for complex coding.
4. Delegate API/docs validation to `researcher`.
5. Delegate test execution and failure triage to `test-pilot`.
6. Delegate compression/summaries of large files to `explainer`.
7. Return a final grounded result with verification evidence.

## Approval Gate

- Approval is required before destructive or state-changing actions.
- If a plan changes after new evidence, present an updated plan and request approval again.

## Routing

- Default agent: `openagent`.
- Escalate to `opencoder` for high-risk code changes and synthesis tasks.
- Use `system-builder` for workflow, standards, and long-horizon architecture updates.

## Grounding Rules

- Do not claim behavior without local evidence (file reads or command output).
- Do not claim external facts without `websearch` or MCP evidence.
- Keep context lean: avoid lockfiles, generated artifacts, and `node_modules`.

## MCP Usage

- Claude agents (`openagent`, `opencoder`) may use only `context7` MCP.
- `researcher` should prefer `context7` for library/API specifics.
- `sequential-thinking` and `memory` are reserved for Devstral agents.
- Use `memory` for durable, non-obvious decisions that should survive sessions.

## Failure Recovery

1. Stop on failed verification.
2. Report the exact failure.
3. Re-plan with minimal additional context.
4. Re-run verification before final output.

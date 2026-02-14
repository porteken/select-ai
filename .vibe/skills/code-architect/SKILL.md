---
name: code-architect
description: Plan and orchestrate code architecture tasks using subagents and delegate file exploration and integration steps.
license: MIT
compatibility: Python 3.12+
metadata:
  purpose: architecture planning
---

# Code Architect Skill

This skill instructs the agent how to plan, orchestrate, and verify a comprehensive system architecture.

## When to Use

Use this skill when the user needs to generate a high-level plan for a codebase, coordinate file analysis, assign tasks to subagents, and ensure integration checks and quality gates are performed.

## Steps

1. **PLAN:** Use `sequential_thinking` to generate a structured architecture plan based on the project context and objectives.
2. **DELEGATE:** Use the `task` tool to assign specific file exploration tasks to the `explore` subagent.
3. **REVIEW:** Collect and integrate the findings returned from subagents, ensuring they align with the architecture plan.
4. **GATE:** Confirm that the final plan includes a verification phase that runs the verification skill to check quality, tests, and grounding.

## Examples

- Breaking down a monorepo into modular components.
- Delegating exploratory analysis of legacy code using a subagent.
- Ensuring a verification step is included before production commits.

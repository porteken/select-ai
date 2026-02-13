---
name: code-architect
description: High-level planning and delegation to subagents.
license: MIT
compatibility: Python 3.12+
metadata:
  purpose: 'Orchestration'
---

# Code Architect Skill

1. PLAN: Use `sequential_thinking` to map the architecture.
2. DELEGATE: Use `task` to assign file exploration to 'explore' subagent (Model: Devstral 24B).
3. REVIEW: Integrate subagent findings.
4. GATE: Ensure final plan includes a Verification step.

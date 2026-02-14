# OpenCode Optimization Plan: Cost-Effective Orchestration

This plan outlines the configuration for a cost-effective OpenCode setup using **Claude 4.5 Sonnet** for complex reasoning and **Devstral 2 Small** for routine tasks.

## 1. Task Classification Criteria

To minimize costs, tasks should be routed based on complexity and risk.

| Category    | Description                                                       | Examples                                                                                                                                                     | Recommended Agent                 |
| :---------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| **Simple**  | Well-defined scope, repetitive, low ambiguity.                    | - Writing unit tests for existing functions<br>- Updating documentation<br>- Simple bug fixes (typos, clear errors)<br>- Code generation from detailed specs | **Developer** (Devstral 2 Small)  |
| **Complex** | High ambiguity, requires architectural decisions, deep debugging. | - Designing new system architecture<br>- Debugging race conditions or memory leaks<br>- Refactoring core modules<br>- analyzing security vulnerabilities     | **Architect** (Claude 4.5 Sonnet) |

## 2. Model-Specific Configuration

### Global Defaults

Set the global model to **Devstral 2 Small** to ensure low-cost operation by default. Only specialized agents will use expensive models.

### Agent Definitions

#### **Architect (Claude 4.5 Sonnet)**

- **Role:** High-level reasoning, planning, and complex debugging.
- **Tools:** **Minimal**. Relies on native reasoning capabilities. Access to `read_file` and `grep` is essential, but heavy MCPs like `sequential-thinking` are disabled to reduce token usage and latency, relying instead on the model's superior internal chain-of-thought.
- **Configuration:**
  ```json
  "architect": {
    "model": "anthropic/claude-4-5-sonnet",
    "description": "Expert system architect for complex design, critical debugging, and planning.",
    "prompt": "You are a Principal Architect. Use your advanced reasoning to analyze complex problems. Delegate implementation details to the Developer agent.",
    "tools": {
      "sequential-thinking": false,
      "memory": false,
      "duckduckgo": false
    }
  }
  ```

#### **Developer (Devstral 2 Small)**

- **Role:** Implementation, testing, and routine maintenance.
- **Tools:** **Heavy**. Relies on MCPs to augment its capabilities. `sequential-thinking` is critical to help the smaller model stay on track. `memory` helps it retain context across steps.
- **Configuration:**
  ```json
  "developer": {
    "model": "mistralai/Devstral-Small-2-24B-Instruct-2512",
    "description": "Efficient developer for implementation, testing, and documentation.",
    "prompt": "You are a Senior Developer. You must use 'sequential-thinking' to plan your actions before executing. Check 'memory' for project conventions.",
    "tools": {
      "sequential-thinking": true,
      "memory": true,
      "duckduckgo": true,
      "edit": true,
      "bash": true
    }
  }
  ```

## 3. MCP Integration Strategy

| MCP                         | Usage Strategy                                                                                                                                                             |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sequential Thinking**     | **Enable for Devstral.** Critical for smaller models to break down tasks and avoid logic errors. **Disable for Claude** to save tokens, as it has strong native reasoning. |
| **Memory**                  | **Enable for Devstral.** Allows the smaller model to recall project-specific rules without needing them in the context window every time.                                  |
| **Web Search (DuckDuckGo)** | **Enable for Devstral.** Allows it to find documentation and fix syntax errors independently.                                                                              |
| **Filesystem/Git**          | **Enable for Devstral.** It should handle the bulk of file writing and version control.                                                                                    |

## 4. Cost Optimization Guidelines

1.  **Default to Developer:** Always start sessions with the `developer` agent unless the task is obviously complex.
2.  **Delegation Pattern:**
    - Start with **Architect** for a 5-minute planning session.
    - Have Architect produce a detailed `PLAN.md`.
    - Switch to **Developer** to execute the plan item-by-item.
3.  **Routing:** Use a lightweight "Router" agent (or just the user's judgment) to select the right agent. In OpenCode, you can use the `Task` tool to have one agent invoke another.
    - _Example:_ Architect says "I have analyzed the issue. Developer, please implement the fix in `src/utils.ts`." -> Triggers `developer` agent.
4.  **Token Limits:** Set a stricter `steps` limit for the `architect` (e.g., 10 steps) to prevent runaway costs, while allowing the `developer` more freedom (e.g., 50 steps).

## Recommended `opencode.json` Updates

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "mistralai/Devstral-Small-2-24B-Instruct-2512",
  "agent": {
    "architect": {
      "model": "anthropic/claude-4-5-sonnet",
      "tools": {
        "sequential-thinking": false,
        "memory": false,
        "duckduckgo": false
      }
    },
    "developer": {
      "model": "mistralai/Devstral-Small-2-24B-Instruct-2512",
      "tools": {
        "sequential-thinking": true,
        "memory": true,
        "duckduckgo": true
      }
    }
  }
}
```

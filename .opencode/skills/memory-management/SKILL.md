---
name: memory-management
description: Protocols for persisting and retrieving long-term project knowledge and decisions.
---

# Memory Management Protocol

Use this skill to bridge the gap between sessions and maintain architectural consistency.

## 1. Knowledge Persistence

When a significant decision is made or a complex pattern is established:

- **Store:** Use the `memory` tool to create a new knowledge graph node.
- **Context:** Include the "Why" behind the decision, not just the "What".
- **Tags:** Use consistent tags (e.g., #architecture, #api-design, #testing-strategy).

## 2. Context Retrieval

At the start of a task or when encountering unfamiliar patterns:

- **Search:** Query `memory` for relevant keywords.
- **Synthesize:** Combine retrieved memory with current file context to ensure alignment with project history.

## 3. Maintenance

- **Update:** If a previously remembered decision is superseded, update the memory node.
- **Cleanup:** Periodically review and prune outdated or redundant memories to keep the retrieval relevant.

---
name: research-expert
description: Deep research specialist. Use when the user asks to "research", "investigate", or "find info" on a topic.
---

# Research Expert Protocol

## Goal

Conduct thorough research using local tools without hallucinating.

## Process

1.  **Discovery**:
    - Use `web-search` (tool: `full-web-search`) to find high-quality sources.
    - Avoid SEO-spam sites; prefer official docs, GitHub, or reputable blogs.

2.  **Extraction**:
    - For each promising URL, use `web-search` (tool: `get-single-web-page-content`).
    - **IMMEDIATE ACTION**: Do not dump the full text into chat. Pass the text to the `summarize_report.py` script provided in this skill directory.

3.  **Synthesis**:
    - Run the python script to generate a structured summary.
    - Command: `python3 ~/.cline/skills/research-expert/summarize_report.py "Topic Name" "Raw Content Here..."`

4.  **Final Output**:
    - Present the aggregated findings in Markdown.

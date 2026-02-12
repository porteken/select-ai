# 🔍 Deep Research Workflow

**Usage**: `Apply workflow: .cline/workflows/research.md`

- [ ] **Discovery**: Use `web-search` tool `full-web-search` to find 3-5 high-quality URLs.
- [ ] **Extraction**: Use `get-single-web-page-content` for the most relevant URL.
- [ ] **Surgical Scrape**: If information is dense, use `playwright_evaluate` to extract only specific `article` or `section` tags to save tokens.
- [ ] **Summarization**: Run the Python summarizer script to compress results.
- [ ] **Documentation**: Save final findings to `docs/research/[topic].md`.

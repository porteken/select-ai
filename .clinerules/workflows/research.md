# 🔍 Deep Research Workflow

**Usage**: `Apply workflow: .cline/workflows/research.md`

- [ ] **Discovery**: Use `web-search search` to find 3-5 high-quality URLs.
- [ ] **Extraction**: For specific articles, use `web-search fetch<ArticleType>Article` (e.g., `web-search fetchGithubReadme`) for the most relevant URL. For generic content, consider using `playwright_evaluate` or other relevant tools to extract information.
- [ ] **Surgical Scrape**: If information is dense, use `playwright_evaluate` to extract only specific `article` or `section` tags to save tokens.
- [ ] **Summarization**: Run the Python summarizer script to compress results.
- [ ] **Documentation**: Save final findings to `docs/research/[topic].md`.

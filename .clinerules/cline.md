1. Check if query needs external recency (bugs/updates/time).
2. Perform retrieval:
   a) Context7
   b) If needed: DuckDuckGo web search
3. Filter and compress context to top-relevant passages.
4. Construct prompt with context and strict grounding instructions.
5. Generate answer (with citations, low temp).
6. Post-verify each claim against sources.
7. If unsupported, refuse or ask to refine.

# Cline Operational Rules

## MCP-first execution

- Prefer MCP tools over long reasoning in chat:
  1. `desktop-commander` for search/read/edit/process.
  2. `context-7` for library and framework APIs.
  3. `web-search` for time-sensitive or unknown external claims.
  4. `playwright` for browser reproduction and verification.
- For any third-party API usage or upgrade, resolve docs with `context-7` before editing code.
- For claims about "latest/current/recent", verify with `web-search` before asserting.

## Token economy

- Never read lockfiles (`package-lock.json`, `yarn.lock`) or binaries into context.
- Never start with whole-file reads on large files; search first, then read targeted ranges.
- Use `rg` before reading code to locate exact symbols and call sites.
- Use `.cline/skills/code-navigator/smart_read.py` for focused range or regex reads.
- Prefer targeted diffs (`git diff -- <path>`) or `git diff --stat`; avoid global large diffs.

## Deterministic quality gates

- After edits, run relevant checks with `desktop-commander` process tools (`lint`, tests, build as needed).
- Treat lint/type/test output as source of truth over model inference.
- If formatting/type checks fail, fix root cause before new edits.

## Browser debugging discipline

- For UI bugs, reproduce with `playwright` first, then inspect console and network traces.
- Verify the fix with the same interaction path used for reproduction.
- Use this instrumentation when console capture is needed:
  ```javascript
  () => {
    window.__CLINE_LOGS = [];
    ['log', 'info', 'warn', 'error'].forEach((t) => {
      const original = console[t];
      console[t] = (...args) => {
        window.__CLINE_LOGS.push(`[${t.toUpperCase()}] ${args.join(' ')}`);
        original.apply(console, args);
      };
    });
    window.onerror = (msg) => window.__CLINE_LOGS.push(`[FATAL] ${msg}`);
  };
  ```

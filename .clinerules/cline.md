# 🛠️ Cline Operational Rules

## 🪙 Token Economy (Cost & Performance)

- **NEVER** read lockfiles (`package-lock.json`, `yarn.lock`) or large binaries.
- **NEVER** run a global `git diff`. Use `git diff --stat` or targeted diffs.
- **ALWAYS** use `python3 ~/.cline/skills/code-navigator/smart_read.py` for files > 100 lines.
- **Search First**: Use `ripgrep` (`rg`) to locate code before reading files to avoid massive context intake.

## 🛡️ Code Quality & Hook Recovery

- **Enforcement**: All file writes are checked for Prettier formatting and ESLint syntax.
- **Handling Rejections**: If a `write_to_file` is cancelled by the hook with a "Prettier/Lint" error:
  1.  **Do not** keep trying the same code.
  2.  Run `execute_command` with: `npx prettier --write path/to/file` or format the code block yourself to match the project's `.prettierrc`.
  3.  Check for syntax errors using `npx tsc --noEmit` or `eslint` before retrying the write.
- **Consistency**: Always read the `.prettierrc` or `package.json` "prettier" config once per project to ground your style.

## 🎭 Browser & Frontend Debugging

- **Console Hijack**: Before debugging UI, use `playwright_evaluate` to instrument the console:
  ```javascript
  () => {
    window.__CLINE_LOGS = [];
    ['log', 'info', 'warn', 'error'].forEach((t) => {
      const o = console[t];
      console[t] = (...a) => {
        window.__CLINE_LOGS.push(`[${t.toUpperCase()}] ${a.join(' ')}`);
        o.apply(console, a);
      };
    });
    window.onerror = (m) => window.__CLINE_LOGS.push(`[FATAL] ${m}`);
  };
  ```

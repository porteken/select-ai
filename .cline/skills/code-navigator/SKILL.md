---
name: code-navigator
description: MCP-first code discovery and surgical file reading to reduce token usage and hallucinations.
---

# Code Navigator Protocol

## 1. Search first

Never read broad file sets by default. Find symbols and call sites first.

- Preferred: `desktop-commander` search tools (`start_search`, `get_more_search_results`).
- Fast CLI fallback: `rg "function login" src/`, `rg "import .*Auth" src/`.

## 2. Surgical reading (`smart_read.py`)

Avoid full-file reads for files > 100 lines unless the whole file is truly required.
Use the script to read exact ranges or regex matches.

- Range read:
  - `python3 ./.cline/skills/code-navigator/smart_read.py src/utils/helpers.ts --start 1 --end 80`
- Pattern read with context:
  - `python3 ./.cline/skills/code-navigator/smart_read.py src/utils/helpers.ts --pattern "useEffect|handleSubmit" --context 20`

Use full `read_file` only when:

- the file is small, or
- cross-cutting edits need whole-file understanding.

## 3. Edit strategy

- Edit with `edit_block` when possible to minimize diff size.
- Re-run search after edits to confirm references are still consistent.

## 4. Project map

To understand structure quickly, run: `tree -L 2 --gitignore`

---
name: code-navigator
description: Advanced file reading and searching to save tokens.
---

# Code Navigator Protocol

## 1. Search First (`rg`)

Never read a whole directory. Use `ripgrep` via `execute_command` to find exactly what you need.

- **Find function def**: `rg "function login" src/`
- **Find usage**: `rg "import .*Auth" src/`

## 2. Surgical Reading (`smart_read.py`)

Never use `read_file` on files > 100 lines unless necessary.
Use the python script to read chunks.

- **Command**: `python3 ~/.cline/skills/code-navigator/smart_read.py src/utils/helpers.ts 1 50`
- **When to use**: When you need to see the imports or a specific function logic, but not the whole file.

## 3. Project Map (`tree`)

To understand structure, run: `tree -L 2 --gitignore`

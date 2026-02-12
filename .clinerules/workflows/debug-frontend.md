# Frontend Debugging

**Goal**: Fix a UI component bug.

1.  **Locate Component**
    - Use `rg "export const ComponentName"` to find the file.
2.  **Check Imports**
    - Run `python3 ~/.cline/skills/code-navigator/smart_read.py <path> 1 20` to see what hooks/libraries are imported.
3.  **Analyze Logic**
    - Read _only_ the `useEffect` or handler causing the issue using `smart_read.py`.
4.  **Fix & Lint**
    - Apply fix.
    - Run `npm run lint` immediately to verify formatting.

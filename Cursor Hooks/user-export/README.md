# Exported user hooks (from `%USERPROFILE%\.cursor\`)

Mirror of **`%USERPROFILE%\.cursor\hooks.json`** and **`%USERPROFILE%\.cursor\hooks\*.js`**:

- [hooks.json](./hooks.json)
- [hooks/](./hooks/) — Node scripts

## Restore on a new machine

1. Copy **`hooks.json`** to **`%USERPROFILE%\.cursor\hooks.json`**.
2. Copy every **`.js`** file from **`hooks/`** into **`%USERPROFILE%\.cursor\hooks\`** (same filenames).
3. Ensure **Node.js** is on `PATH` (hooks invoke `node ./hooks/...` relative to `%USERPROFILE%\.cursor\` when using global hooks — confirm with [Cursor Hooks docs](https://cursor.com/docs/hooks)).

Do **not** commit **`hooks/logs/`** or audit trails from your local machine.

---

**Last updated:** March 2026

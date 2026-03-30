# Exported user hooks (from `%USERPROFILE%\.cursor\`)

Mirror of **`%USERPROFILE%\.cursor\hooks.json`** and **`%USERPROFILE%\.cursor\hooks\*.js`**:

- [hooks.json](./hooks.json)
- [hooks/](./hooks/) — Node scripts (incluye `agent-dispatch.js` para CLI headless y `dispatch-config.example.json` de referencia)

## Restore on a new machine

1. Copy **`hooks.json`** to **`%USERPROFILE%\.cursor\hooks.json`**.
2. Copy every **`.js`** file from **`hooks/`** into **`%USERPROFILE%\.cursor\hooks\`** (same filenames).
3. Ensure **Node.js** is on `PATH`. This repo’s [hooks.json](./hooks.json) uses **`node ./hooks/…`** paths: place `hooks.json` in **`%USERPROFILE%\.cursor\`** and the scripts in **`%USERPROFILE%\.cursor\hooks\`** (same layout as here). If your live config uses absolute `node C:/…/hooks/…` paths, either keep that on your machine or switch to relative `./hooks/…` for portability.

Do **not** commit **`hooks/logs/`** or audit trails from your local machine.

---

**Last updated:** 2026-03-30 (`hooks.json` alineado con `%USERPROFILE%\.cursor\hooks.json`; scripts sincronizados con `robocopy /XO`; +`agent-dispatch.js`, +`dispatch-config.example.json`; rutas portables `./hooks/…`)

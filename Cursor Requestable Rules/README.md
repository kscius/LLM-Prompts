# Cursor requestable rules (project-level)

Files here are meant to be used as **Agent-requestable** or scoped rules in a real project under **`.cursor/rules/`**.

## Contents

| File | Purpose |
|------|---------|
| [cursor10x-mcp.mdc](./cursor10x-mcp.mdc) | Cuándo y cómo usar **cursor10x-mcp** (memoria, contexto, episodios). Copia del entorno del mantenedor (`%USERPROFILE%\.cursor\rules\`). |
| [devcontext-mcp.mdc](./devcontext-mcp.mdc) | Uso de **devcontext** (contexto de conversación multi‑paso). |
| [orchestration-protocol.mdc](./orchestration-protocol.mdc) | Protocolo de orquestación del agente (fases, handoffs). |
| [sdlc-workflow.mdc](./sdlc-workflow.mdc) | Flujo SDLC y gates con subagentes / herramientas. |

## Usage

1. Copy the `.mdc` file into your app repo’s `.cursor/rules/` (or merge with your existing rules).
2. Adjust `globs` / `alwaysApply` / `description` to match that project.

---

**Last updated:** 2026-03-29

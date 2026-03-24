# Cursor User Rules

**User Rules** live in the Cursor application (Settings → Rules, or equivalent). They are **not** automatically files on disk in a stable, portable path across versions.

## What this folder is for

- **Backup / sharing:** Paste or maintain a copy of your global user rules here if you want them versioned with this repo.
- **Restore:** Copy text from `user-rules-backup.md` back into Cursor when setting up a new machine.

## How to export from Cursor

1. Open **Cursor Settings** → find **Rules** / **User rules** (wording varies by version).
2. Select all rule text and copy into `user-rules-backup.md` in this folder (create the file if needed).
3. Commit only if the content has **no secrets** (tokens, internal URLs, PII).

## Relation to `Cursor Rules/`

The markdown files under **`Cursor Rules/`** are a **curated, shareable** ruleset (plan mode, execution pack, stack overlays, etc.). They complement but do not replace User Rules unless you paste the same content into Cursor.

---

**Last updated:** March 2026

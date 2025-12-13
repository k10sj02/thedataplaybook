---
title: "Git Commit Message Quick Cheat Sheet"
date: 2025-12-13 12:18:35 -0400
draft: false
tags: ["git", "version control", "commit messages", "developer workflow", "best practices"]
categories: ["blog", "software development"]
--- 

A practical guide for writing clear, consistent commit messages.

## Format

```
<type>: <short summary>

[optional: details or context]
```

**First line (required):**
- `<type>` = the category of the change (feat, fix, refactor, docs, etc.)
- `<short summary>` = one concise sentence describing what you did

**Body (optional):**
- Add only if the change needs extra explanation
- Explain the logic, context, or reasoning behind the change

## Common Types

| Type | Purpose |
|------|---------|
| `feat` | New feature or enhancement |
| `fix` | Bug fix |
| `refactor` | Code restructure (no behavior change) |
| `perf` | Performance improvements |
| `docs` | Documentation updates |
| `data` | Dataset or query updates |
| `viz` | Charts, dashboards, visuals |
| `analysis` | Analytical logic or metrics updates |
| `chore` | Cleanup, renaming, misc tasks |
| `test` | Tests added or updated |

## Summary Rules

✅ **Do:**
- Start with a **verb** (add, update, fix, clean, refactor)
- Be **specific** about what changed
- Keep to **10–15 words max**
- Write in imperative mood ("add feature" not "added feature")

❌ **Don't:**
- Use vague words like "stuff," "update," or "changes" alone
- Add punctuation at the end
- Write overly long summaries

## Examples

Good commit messages:

```
analysis: add median solicitation timeline calculation

viz: update heatmap color scale for impact scores

data: clean prospect_rating column and normalize values

refactor: simplify portfolio load calculation logic

fix: correct join causing duplicate opportunity counts

docs: add slide outline for case study presentation
```

## When to Add a Body

Add a short explanatory paragraph if:
- You changed business logic
- A query is non-obvious
- You need to explain *why* something changed

**Example with body:**

```
analysis: adjust success-rate normalization method

Updated min-max scaling because outliers were inflating scores.
```

---

## Quick Reference

```bash
# Template
git commit -m "type: brief description"

# With body
git commit -m "type: brief description" -m "Additional context here"
```

---
title: "Git Commit Message Quick Cheat Sheet for Data Analysts"
date: 2025-12-13 12:18:35 -0400
draft: false
tags: ["git", "version control", "commit messages", "developer workflow", "best practices"]
categories: ["blog", "software development"]
---

## Background

A small thing I’ve been thinking more about lately: git commit messages. In analytics work, commit messages aren’t just about code; they’re about documenting how business logic evolves. A small change to a SQL query can quietly change KPIs, forecasts, or stakeholder decisions. Without clear commits, that history is lost. In analytics, commits often capture changes that won’t surface in code reviews or dashboards immediately. That makes commit history one of the few reliable ways to reconstruct how metrics evolved over time.

I put together this commit style guide for myself to reduce that friction. I often spend a good minute deciding what I actually want to base a commit on, so I asked a colleague working in a large-scale production environment how they approach commit messaging. What stood out wasn’t that there’s not a single “right way", but that even very experienced engineers optimize commits differently depending on context and scale.

Some teams:
- keep commits short and verb-driven
- are more verbose and use the commit body for context
- rely on PR descriptions to tell the full story
- prefix commits with modules, JIRA ticket numbers, or features to stay sane in massive codebases

My main takeaway: there aren’t universal rules, but being intentional about how you write commits pays dividends in readability, onboarding, and long-term maintainability.

Because analytics work involves frequent iteration on data logic, metrics, and business assumptions, commit history needs to be clear and descriptive. This is what I’ve found works in practice. The examples are drawn from real fundraising and growth analytics work, reflecting the kinds of iterative data, metric, and reporting changes analysts deal with day to day.

I’ve seen cases where unclear commits made it impossible to trace why a KPI changed weeks later. The code was correct, but the reasoning behind the change was lost.

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

Each pair shows a vague commit followed by a more intentional one.

```
# Bad: too vague, no context
fix: fix query

# Good: specific about what broke and where
fix: correct join causing duplicate opportunity counts in pipeline report
```

```
# Bad: non-descriptive, could mean anything
data: update data

# Good: says what was cleaned and how
data: clean prospect_rating column and normalize values to 0–100 scale
```

```
# Bad: passive, unclear scope
analysis: updated metrics

# Good: imperative, names the specific metric added
analysis: add median solicitation timeline calculation by portfolio segment
```

```
# Bad: vague action word
viz: change colors

# Good: says what changed and why it matters
viz: update heatmap color scale to improve low-score legibility
```

```
# Bad: no signal about what or why
refactor: clean up script

# Good: explains restructuring without changing behavior
refactor: simplify portfolio load calculation by extracting helper function
```

The pattern is consistent: bad commits tell you *that* something happened, good commits tell you *what* changed and ideally *why* it matters. That's what makes the diff useful six months later.

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

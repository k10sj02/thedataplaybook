---
title: "What COVID Did to Jobs in Canada: A Sector-Level Analysis in R"
date: 2024-05-02 12:18:35 -0400
draft: false
tags: ["R", "tidyverse", "data analysis", "public policy"]
categories: ["blog", "data science"]
---

## Background

During the early months of COVID-19, job losses were widely reported—but I wanted to understand *how those impacts varied across sectors and provinces*, and how quickly recovery actually began.

Specifically:
- Which sectors were hit hardest?
- Did recovery happen uniformly across provinces?
- Were there meaningful differences across demographic or regional patterns?

To answer this, I analyzed labor market data across Canadian provinces from January to September 2020 using R.

---

## Approach

I worked with multiple datasets covering employment by province, sector (NAICS categories), and month. The workflow was straightforward but important:

1. **Clean and standardize sector labels** across datasets
2. **Fill missing values** (notably for British Columbia) using supplemental data
3. **Merge datasets** into a unified panel
4. **Calculate month-over-month changes** in employment
5. **Visualize trends** across provinces and sectors

The goal wasn't just to process the data—but to create something interpretable at a glance.

---

## Key Transformation

One of the more important steps was reconstructing missing provincial data and integrating it cleanly into the main dataset.

```r
lmic_renamed_new <- lmic_renamed %>%
  left_join(laborstatsBC_new, by = c("naics", "month", "geo")) %>%
  mutate(
    employment_1000s.y = as.numeric(employment_1000s.y),
    employment_1000s = coalesce(employment_1000s.x, employment_1000s.y)
  ) %>%
  select(-employment_1000s.x, -employment_1000s.y)
```

This ensured continuity across provinces and avoided distortions in downstream comparisons.

---

## Results

### 1. Sharp and Immediate Job Loss (Jan–Apr 2020)

Across all provinces and sectors, employment dropped significantly in the first months of the pandemic. The steepest declines occurred between March and April 2020, reflecting the immediate impact of lockdown measures.

### 2. Uneven Recovery Across Provinces

Most provinces began recovering by May 2020, but Quebec lagged, with recovery starting closer to June. This likely reflects stricter lockdowns and higher COVID severity early on.

### 3. Accommodation & Food Services Were Hit Hardest

This sector saw the largest initial decline and the most volatility—consistent with reduced travel and the closure of restaurants and entertainment venues.

### 4. Strong Rebound Driven by Pent-Up Demand

Interestingly, the same sector also showed the strongest rebound once restrictions eased. A likely explanation: temporary layoffs rather than permanent job loss, combined with pent-up demand for leisure and social activity.

### 5. Other Sectors Were More Stable

Wholesale, retail, and other services experienced declines but less severe than accommodation and food services. These sectors were partially essential and more adaptable to operating under restrictions.

---

## Visualization

The chart above shows month-over-month changes in employment across provinces and sectors. The shock was immediate, but recovery was uneven—both geographically and by sector.

---

## Interpretation

This analysis highlights three broader patterns:

1. COVID was not just a macro shock—it was sector-specific
2. Recovery timelines varied significantly across provinces
3. Temporary disruption played a major role in certain sectors

From a policy perspective, this suggests that targeted interventions matter more than blanket responses, and that sectors like hospitality require different recovery strategies than retail.

---

## Final Thoughts

Clean data enables insight, but structure and interpretation make it useful. In analytics work, the goal isn't just to process data—it's to understand what actually changed and why it matters.
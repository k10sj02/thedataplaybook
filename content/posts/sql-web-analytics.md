---
title: "Driving Engagement and Donations: A Web Analytics Case Study in SQL"
date: 2024-04-15 09:18:35 -0400
draft: false
tags: ["sql", "web analytics", "fundraising", "tableau"]
categories: ["blog", "data science", "analytics"]
---

## Background

For a political advocacy organization, I analyzed web traffic and conversion data to understand what drives user engagement, which segments generate the most revenue, and where optimization opportunities exist.

The goal was straightforward: turn raw web activity into actionable insights for the web and fundraising teams.

---

## Approach

I worked with two core datasets—`page_views` for user behavior and `conversions` for donations—focusing on traffic patterns, device segmentation, referral sources, and donor value.

Rather than analyzing metrics in isolation, I joined behavioral and conversion data to understand how engagement translates into revenue.

---

## Key Transformation

A core step was linking user behavior to donations:

```sql
SELECT
    device,
    SUM(conversion_amount) AS revenue,
    AVG(conversion_amount) AS avg_gift_size
FROM conversions
GROUP BY device;
```

This allowed me to move beyond traffic analysis and evaluate revenue quality by segment.

---

## Results

### 1. iOS Drives Revenue, Windows Drives Value

iOS users generated the most total revenue, while Windows users had the highest average gift size. This points to a meaningful behavioral split: mobile users donate more frequently, desktop users donate more per transaction.

![Revenue by Device](https://github.com/k10sj02/aclu-web-analytics-sql/assets/35823259/13332e78-e625-41c9-9720-baef93a738da)

### 2. Engagement Is Concentrated on Issue-Based Content

The issues page received the most visits, followed by the homepage and news. Users appear motivated by specific causes rather than general browsing—a signal worth building on.

![Monthly Page Visits](https://github.com/k10sj02/aclu-web-analytics-sql/assets/35823259/d0381bc4-686a-4802-8317-32f08beed370)

### 3. Google Dominates Acquisition

Google is the primary referral source, with social channels like Twitter and Facebook lagging behind. SEO is the highest-leverage acquisition channel available.

### 4. Fridays Are Peak Conversion Days

Both page views and donations peak on Fridays, suggesting campaign timing has more impact than expected.

### 5. Donation Behavior Is Highly Skewed

A small number of users account for a large share of total donations—classic high-value donor concentration.

---

## Interpretation

Three key dynamics emerge from this analysis.

**Device behavior is not uniform.** Mobile and desktop users engage and convert differently, which has direct implications for UX and messaging strategy.

**Content drives intent.** Users engage most with issue-specific pages, indicating strong alignment between content and motivation. The funnel starts with the cause, not the brand.

**Acquisition is uneven.** Heavy reliance on Google creates both opportunity—SEO investment has clear upside—and risk through channel concentration.

---

## Recommendations

**Optimize for mobile conversion.** Streamline donation flows for iOS users and explore SMS or one-click donation options to reduce friction.

**Double down on high-intent content.** Invest in issue-based pages and embed stronger calls-to-action where user motivation is already highest.

**Expand acquisition channels.** Strengthen SEO as the highest-ROI channel while experimenting with Instagram and emerging platforms to reduce Google dependency.

**Time campaigns strategically.** Prioritize Friday launches and align communications with peak engagement windows.

**Develop donor segmentation.** Identify high-value donors and build personalized outreach and retention strategies around them.

---

## Final Thoughts

Traffic alone doesn't matter—conversion quality does. By connecting behavior to revenue, the analysis moves from reporting metrics to understanding what actually drives impact. That's the shift that makes web analytics useful.
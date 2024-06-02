---
title: "SQL Web Analytics - Unveiling Trends & Strategies in Political Advocacy"
date: 2024-06-02 09:18:35 -0400
draft: false
tags: ["SQLite", "tableau"]
categories: ["blog", "data science", "politics"]
---

## SQL Web Analytics - Unveiling Trends & Strategies in Political Advocacy

In this project, I generated insights specifically tailored for a web team within a prominent political advocacy organization. The queries cover various aspects such as user engagement, revenue analysis, and page views over time. Additionally, I designed visualizations in Tableau and provided recommendations based on my findings.

---

### Exploratory Data Analysis (EDA) Summary

This section outlines the steps taken to explore and analyze web analytics data using SQL queries. The analysis provides insights into user engagement, popular pages, device segmentation, and referral sources.

#### Unique Pages

**Query:**
```sql
SELECT DISTINCT(page)
FROM page_views;
```
**Explanation:**  
This query identifies the distinct pages available in the dataset. The result shows four different pages: homepage, blog, issues, and news.

#### Date Span

**Query:**
```sql
SELECT DISTINCT(page_view_date)
FROM page_views
ORDER BY page_view_date;
```
**Explanation:**  
This query determines the timeline of the recorded data. The dataset spans from March 30, 2020, to March 21, 2022, covering seven quarters.

#### Unique Users

**Query:**
```sql
SELECT COUNT(DISTINCT user_id) AS no_of_users
FROM page_views;
```
**Explanation:**  
This query calculates the number of unique users over the period covered in the database, resulting in 100 unique users.

#### Page Views

**Query:**
```sql
SELECT COUNT(page_view_id) AS page_view_count
FROM page_views;
```
**Explanation:**  
This query counts the total number of page views, yielding 149 page views over the period covered.

#### Popular Pages by Visits

**Query:**
```sql
SELECT 
    page,
    COUNT(page_view_id) AS page_visits
FROM page_views
GROUP BY 
    page
ORDER BY page_visits DESC;
```
**Explanation:**  
This query identifies the most popular pages based on the number of visits. The issues page is the most visited, followed by the homepage.

#### Popular Pages by Device Segment

**Query Method 1:**
```sql
WITH device_page_segment AS (
    SELECT 
        t1.page,
        t2.device,
        COUNT(t1.page_view_id) AS page_visits
    FROM page_views t1
    INNER JOIN conversions t2 ON t1.page_view_id = t2.page_view_id
    GROUP BY 
        t1.page,
        t2.device
)
SELECT
    page,
    device,
    MAX(page_visits) AS top_page
FROM 
    device_page_segment
GROUP BY 
    device
ORDER BY
    top_page DESC;
```

**Query Method 2:**
```sql
WITH device_page_segment AS (
    SELECT 
        t1.page,
        t2.device,
        COUNT(t1.page_view_id) AS page_visits,
        ROW_NUMBER() OVER(PARTITION BY t2.device ORDER BY COUNT(t1.page_view_id) DESC) AS row_num
    FROM page_views t1
    INNER JOIN conversions t2 ON t1.page_view_id = t2.page_view_id
    GROUP BY 
        t1.page,
        t2.device
)
SELECT
    page,
    device,
    page_visits
FROM 
    device_page_segment
WHERE 
    row_num = 1
ORDER BY
    page_visits;
```
**Explanation:**  
These queries determine the most popular pages by device segment using two different methods. The first method uses a common table expression (CTE) and the `MAX()` function, while the second method uses a window function to rank the pages within each device segment.

#### Unique Users in Q1 2021

**Query Method 1:**
```sql
SELECT 
    COUNT(DISTINCT user_id) AS uniq_users
FROM 
    page_views
WHERE 
    page = 'homepage' AND 
    page_view_date BETWEEN '2021-01-01' AND '2021-03-31';
```

**Query Method 2:**
```sql
SELECT 
    COUNT(DISTINCT user_id) AS uniq_users
FROM 
    page_views
WHERE 
    page = 'homepage' AND 
    page_view_date >= '2021-01-01' AND page_view_date <= '2021-03-31';
```
**Explanation:**  
Both queries return the number of unique users who visited the homepage in Q1 2021. The result shows four unique visits to the homepage during this period.

#### Test `BETWEEN` Function

**Query:**
```sql
SELECT 
    *
FROM 
    page_views
WHERE 
    page_view_date BETWEEN '2021-01-01' AND '2022-03-21'
ORDER BY 
    page_view_date;
```
**Explanation:**  
This query tests if the `BETWEEN` function is inclusive of the upper bound. The result confirms that it is inclusive.

#### Percent Difference in Unique Users (Q1 vs. Q2 2021)

**Query:**
```sql
WITH Q1_users AS (
    SELECT DISTINCT user_id
    FROM page_views
    WHERE page = 'homepage'
    AND page_view_date BETWEEN '2021-01-01' AND '2021-03-31'
),
Q2_users AS (
    SELECT DISTINCT user_id
    FROM page_views
    WHERE page = 'homepage'
    AND page_view_date BETWEEN '2021-04-01' AND '2021-06-30'
)
SELECT 
    (COUNT(DISTINCT Q2_users.user_id) - COUNT(DISTINCT Q1_users.user_id)) * 100.0 / COUNT(DISTINCT Q1_users.user_id) AS percentage_difference
FROM 
    Q1_users
LEFT JOIN 
    Q2_users ON 1 = 1;
```
**Explanation:**  
This query calculates the percentage difference in the number of unique users who visited the homepage between Q1 and Q2 2021. The result shows a 25% increase in web traffic.

#### Revenue and Average Gift Size by Device

**Query:**
```sql
SELECT
    device,
    SUM(conversion_amount) AS revenue,
    AVG(conversion_amount) AS avg_gift_size
FROM conversions
GROUP BY device
ORDER BY 
    revenue DESC,
    avg_gift_size DESC;
```
**Explanation:**  
This query calculates the total revenue and average gift size by device. iOS users generate the highest revenue, while Windows users have the highest average gift size.

#### Page Views by Month in 2021

**Query:**
```sql
SELECT 
    strftime('%Y', page_view_date) AS extracted_year,
    strftime('%m', page_view_date) AS extracted_month,
    page,
    COUNT(page_view_id) AS page_view_count
FROM 
    page_views
WHERE 
    strftime('%Y', page_view_date) = '2021'
GROUP BY 
    extracted_month, 
    extracted_year,
    page
ORDER BY 
    page,
    extracted_year,
    extracted_month;
```
**Explanation:**  
This query shows the number of page views by page over time (by month) in the year 2021.

#### Referrals

**Query:**
```sql
SELECT
    DISTINCT (referrer),
    COUNT(referrer) AS no_of_referrals
FROM page_views
GROUP BY 
    referrer
ORDER BY
    no_of_referrals DESC;
```
**Explanation:**  
This query identifies the top referral sources. Google is the most significant source of referrals, followed by Twitter and Facebook.

#### Most Generous Donors

**Query:**
```sql
SELECT
    t2.user_id,
    SUM(t1.conversion_amount) AS donor_lifetime_value
FROM 
    conversions t1
LEFT JOIN 
    page_views t2 ON t1.page_view_id = t2.page_view_id
GROUP BY 
    t2.user_id
ORDER BY
    donor_lifetime_value DESC;
```
**Explanation:**  
This query finds the most generous donors based on their lifetime value. Donor 164904200849 has donated the most to the organization.

#### Popular Day for Page Visits

**Query:**
```sql
SELECT 
    strftime('%w', page_view_date) AS day_of_week,
    COUNT(page_view_id) AS page_view_count
FROM 
    page_views
GROUP BY 
    day_of_week
ORDER BY 
    page_view_count DESC
LIMIT 1;
```
**Explanation:**  
This query identifies the most popular day for page visits, which is Friday.

#### Popular Day for Donations

**Query:**
```sql
SELECT 
    strftime('%w', t2.page_view_date) AS day_of_week,
    COUNT(t1.donation_id) AS donation_count
FROM 
    conversions t1
LEFT JOIN 
    page_views t2 ON t1.page_view_id = t2.page_view_id
GROUP BY 
    day_of_week
ORDER BY 
    donation_count DESC
LIMIT 1;
```
**Explanation:**  
This query identifies the most popular day for donations, which is also Friday.

---

## Key Insights and Recommendations:

### Device Segmentation:
Understanding user behavior across various devices is essential. iOS users emerge as the top revenue generators, signaling the need for a mobile-first approach in design and functionality. Conversely, Windows users, contributing larger average gift sizes, might benefit from tailored messaging to encourage more frequent donations. The discernible trends among user segments underscore the significance of customized strategies to

 optimize revenue and engagement.

The data underscores distinct trends among user segments regarding revenue and average gift size. iOS users lead as the highest revenue generators, accumulating a total of $2066. Meanwhile, Windows users boast the highest average gift size, averaging $45 per donation, ranking second in overall revenue.

Conversely, Android users lag behind in both revenue and average gift size metrics, indicating a potential correlation between user profiles and donor value. It's plausible that younger, more affluent demographics gravitate towards iOS devices which foster a culture of frequent, on-the-go donations, consequently driving higher revenue figures. To reinforce this trend, consider expanding donation options, such as iMessage/SMS-to- donate functionality, to further engage iOS users and capitalize on their propensity for charitable giving. Meanwhile, optimizing engagement with Android users is crucial, considering their potentially limited UI/UX experiences compared to iOS users, which may contribute to lower lifetime value and donation size.

We may conjecture that older donors, typically possessing higher net worth, may favor Windows devices for their donation activities. While their contributions may be less frequent, their inclination towards larger donations could be attributed to their higher net worth and perhaps a preference for 'traditional' computing devices such as desktops and laptops.

![Sheet 2](https://github.com/k10sj02/aclu-web-analytics-sql/assets/35823259/13332e78-e625-41c9-9720-baef93a738da)

### Engagement Analysis:
Our data uncovers valuable insights into user behavior on our website. The issues page emerges as the focal point of activity, closely followed by news and homepage. iOS users demonstrate a notable preference for the issues page, likely reflecting a younger demographic's interest in trending topics. Conversely, Windows users, often more mature and deeply committed to the organization, gravitate towards blog content which helps them to feel like a part of the mission. Enhancing individualized user content and calls-to-action on these pages could substantially boost engagement and conversions.

![monthly-page-visits](https://github.com/k10sj02/aclu-web-analytics-sql/assets/35823259/d0381bc4-686a-4802-8317-32f08beed370)

### Referral Source Analysis:
Google easily emerges as the primary driver of traffic, followed by Twitter and Facebook which account for a much smaller share of referrals. Double down on high referral score from Google by enhancing search engine optimization (SEO) practices to boost click-through rate.

Notably, Instagram yielded the fewest referrals, with only 7 URL conversions, despite its popularity among youth, superior UX/UI, and affiliation with Facebook, our third-largest referral source. This might stem from Instagram's inclination towards aspirational lifestyle content, ads, and micro-blogging, with less emphasis on political discourse and advocacy. However, this ripe landscape appears to be evolving, with Instagram maturing (i.e. the new “Facebook”) and the social media realm witnessing consolidation amidst the decline of platforms like Twitter and Facebook.

Considering these shifts, piloting an Instagram engagement strategy tailored to youth, and leveraging politically active influencers and celebrities like Hasan Piker and Cynthia Nixon, could present promising opportunities for our organization's outreach efforts.
As older social media platforms experience a decline in engagement, I would suggest conducting further ROI research to determine whether we should scale up or scale down our acquisition efforts on Facebook and Twitter. However, based on current insights, I would maintain our current approach for the time being.

### Time Analysis:
Fridays emerge as the peak day for both page visits and donations, emphasizing the significance of scheduling campaigns and communications during high-engagement periods.

### Donor Value:
Identifying and engaging active donors, such as Donor 164904200849, who has made significant contributions, is crucial for sustaining support. Creating user personas for top donors can provide valuable insights into the motivations and behaviors of this cohort, aiding in donor retention and engagement efforts.

### Follow-up Questions for the Web Team:
1. What specific metrics or KPIs does the Web team prioritize, and how do they align with organizational goals?
2. Are there particular user segments or demographics that the Web team aims to target, and how can we tailor web experiences to meet their preferences?
3. What UX research and testing methodologies are currently employed, and have any usability issues been identified by users?
4. How does the Web team track and measure the effectiveness of marketing campaigns and website optimizations?
5. Are there any ongoing or planned initiatives related to website redesign, content strategy, or technology upgrades that could impact the analysis and recommendations provided?

By collaboratively addressing these questions, we can refine our insights and recommendations to closely align with the Web team's objectives, fostering meaningful improvements to the web experience.

---

This comprehensive analysis of web analytics data provides actionable insights and strategic recommendations to enhance user engagement and optimize donation efforts for a political advocacy organization. By leveraging SQL queries and data visualizations, we can uncover trends and patterns that inform targeted interventions and drive organizational success.

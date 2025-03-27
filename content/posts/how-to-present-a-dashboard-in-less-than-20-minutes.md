---
title: "How to Present a Dashboard in Less Than 20 Mins"
date: 2025-03-27 03:00:35 -0400
draft: false
tags: ["tableau", "dashboard", "public health"]
categories: ["blog", "data science"]
---

I took Andy Kriebel’s Makeover Monday challenge a step further by creating a quick tutorial on how to present a dashboard. Surprisingly, I couldn’t find a comprehensive resource on this topic online, so I’m hoping other netizens will find this helpful.

Presenting a dashboard, especially when it's compact like a one-page overview, requires a structured approach to convey insights effectively and keep the audience engaged. A typical presentation time for this kind of dashboard is around 15-20 minutes, as this provides enough time to cover the dashboard's key elements without overwhelming your audience.

Here's how you can present a dashboard beyond just the basics:

{{< tableau "viz1743063721041" "ST" "STDRatesintheUS_17418338437490" "STDSummaryDashboard" >}}

## Start with Context (4-7 minutes)

**Introduce the Purpose**: Begin by explaining the objective of the dashboard. What is the problem or decision it's intended to help with? Who is the audience, and what decisions will they make based on this data?

**Explain the Metrics**: Briefly describe the key metrics or data points displayed on the dashboard. Make sure to highlight the most important KPIs (Key Performance Indicators) that are crucial for your audience to focus on.

### Voiceover Script
This dashboard provides a comprehensive analysis of STD trends across the United States from 1996 to the present, offering insights into how infection rates have evolved over time. The goal is to help policymakers, public health officials, and researchers better understand the patterns and factors contributing to the spread of STDs.`

### Who is the Audience?

The primary users of this dashboard include:
- Public Health Officials: To monitor trends and allocate resources effectively.
- Epidemiologists & Researchers: To analyze factors influencing outbreaks and assess the effectiveness of interventions.
- Healthcare Providers & NGOs: To identify high-risk populations and tailor awareness campaigns.
- Policy Makers: To develop informed public health policies and funding strategies.

### Key Questions This Dashboard Answers:
- How have STD infection rates changed over time?
- Which regions or demographics are experiencing the highest increases or declines?

### How This Dashboard Supports Decision-Making

By presenting clear visual trends and comparisons, this dashboard can help stakeholders to:
- Identify hotspots where infections are rising and require intervention.
- Assess the impact of public health initiatives over time.
- Allocate funding and resources more effectively to at-risk communities.
- Develop targeted prevention strategies based on historical and emerging trends.

### Key Metrics Explained

This dashboard provides three core metrics that help track and analyze STD trends over time:

1. **Total STD Cases (SUM of STD Cases)**
   - This metric represents the total number of reported STD cases for a given year or region.
   - It provides a high-level view of disease prevalence but must be considered alongside population size for meaningful comparisons.

2. **STD Rate per 100,000 People**

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfUC1LRQaY5Gg7n6m32y1WrwM114RHIYjYMM5mHH1LBMFJ_GhpjJML4kbTrB4w0Td8mUqSuN2gksdu0BbP3JNKwPuJFldWq-w6u0ppPBqr_KSmMh8f0kkNrNElbyc1RjySmvc-YbQ?key=STCp1N7rU7sW9WPKECU7s_WU)

   - This standardized rate allows for fair comparisons across different population sizes, helping identify which regions or time periods experience the highest infection rates.
   - It is crucial for understanding trends in disease spread relative to population growth or decline.

3. **% Difference (from baseline year, 1996)**
   - This metric calculates the percentage difference in STD rates compared to 1996, our "anchor" year.
   - Purpose: It highlights whether infection rates have increased or decreased over time, helping policymakers and researchers assess long-term trends.
   - This is particularly important for evaluating the effectiveness of public health interventions and identifying emerging concerns.

By focusing on these key indicators, users can quickly assess overall infection trends, regional hotspots, and long-term changes to make data-driven decisions.

## Show the Flow (1-2 minutes)

**Walk Through the Dashboard**: Starting from the top-left (or where it naturally makes sense in the layout), explain the flow of the dashboard. Explain how different sections connect with each other and tell a story, guiding the viewer from one part to the next.

**Explain Relationships Between Data Points**: For instance, if one metric is impacting another (e.g., sales volume affecting revenue), make sure to connect those dots for clarity.

### Dashboard Layout & Flow

**TIP**: When presenting, remember to demo or toggle through the sections of the dashboard as you walk through the layout for the audience. This allows the audience to follow along and see how each section connects to the next, ensuring they can visualize the flow of the data and better understand the context of your analysis. It also helps make the presentation more dynamic and engaging.


### Voiceover Script
#### Geographic Distribution (Top-Left)
- This heatmap highlights state-by-state variations, immediately showing which states have the highest and lowest STD rates.
- This connects to the demographic trends section, helping us investigate whether certain population groups in high-prevalence states are driving the overall rates.

#### Overview Section (Upper Top-Right)
- This section provides a high-level summary of STD trends across the U.S. from 1996 to the present.
- Here, the data is segmented by gender, revealing key disparities.
- Gender differences are visualized with side-by-side comparisons, showing how STD rates among men and women have evolved differently.
- Key metrics such as STD rates per 100K are displayed to establish the big-picture context before diving into more detailed breakdowns.
- Right above this section, there is a drop-down menu that you can use to switch between the recorded STDs.

#### Demographic Breakdown (Lower Top-Right)
- Here, the data is segmented by age group, revealing key disparities.
- The age group trends are ordered in a way that allows for easy comparisons across different STDs.

#### Time Trends & Disease-Specific Patterns (Bottom Section)
- This section tracks how different STDs have evolved over time, displaying trends for gonorrhea, syphilis, and chlamydia separately.
- The line chart shows how STD rates have changed relative to 1996, helping identify which diseases are rising or declining over time.
- When a disease is selected from the dropdown menu, its trend line is highlighted in red, displaying its STD rate as of 2014, while all other lines are grayed out.

#### Connecting the Dots
- By starting with the big picture, then drilling down into geography, demographics, and trend lines of specific diseases, the dashboard provides a cohesive narrative about the who, where, and how of STD trends in the U.S.
- The connections between sections ensure that viewers not only see the data but understand the key drivers behind these trends, making it easier to inform public health interventions.

#### Logical Flow
This logical flow ensures that each section builds upon the previous one, guiding the viewer through the insights step by step.

## Highlight Key Insights (5-7 minutes)

**Focus on the Top 3-5 Insights**: Avoid diving too deep into each data point. Instead, provide high-level insights based on the data that will make the most impact on your audience. For example:
- "Here you can see that our sales conversion rate dropped by 10% this quarter, which we believe is due to X."
- "This chart shows that while we've seen a 20% increase in traffic, our conversion rate has remained flat, suggesting a need for improvements in user experience."

**Point Out Trends and Comparisons**: Focus on any trends, comparisons, or anomalies that can help the audience make informed decisions. Use visual cues like color or annotations to draw attention to these elements.

**TIP**: When presenting the insights section, be sure to click through the dashboard as you go, allowing the audience to follow your findings in real-time. This helps maintain engagement and ensures that the data you're discussing is visually connected to the points you're making, making the insights more impactful and easier to understand.


### Voiceover Script
Here are the top insights from the dashboard, highlighting major trends in STD rates across demographics and time:

### States with the Highest and Lowest STD Rates
- The highest STD rates were observed in Washington D.C., Alaska, and Mississippi.
- The lowest rates were found in Utah, Maine, and New Hampshire.
- Regionally, the highest STD rates were recorded in the South, particularly in the Deep South, which had the highest rate at 236 per 100K, followed by the Midwest. In contrast, the lowest rates were observed in New England and the West. However, notable anomalies included Alaska (Pacific region), which had an STD rate of 326 per 100K—second only to Washington, D.C., at 450 per 100K.

### Gender Differences in STD Rates
- Women consistently had higher STD rates across all tracked diseases, except syphilis, with 222 cases per 100,000 people, compared to 103 cases per 100,000 among men.
- For women, gonorrhea and syphilis rates remained mostly stable across age groups, while chlamydia rose exponentially, with the exception of the 0-14 age group.
- For men, STD rates increased across all age groups, with syphilis spiking dramatically—except in the 0-14 cohort. Gonorrhea saw the least significant rise.

### Age Group Trends
- STD prevalence was highest in the 20-24 age group, followed by 15-19 and 25-29.
- STD rates were lowest among individuals aged 0-14 and 40+.
- Among women, the 15-19 age group had the highest STD rate, nearly matching that of 20-24-year-olds.

### Notable Increases Since 1996
- STDs showed a sharper increase among men and women aged 25-40+, compared to those aged 0-24.
- Gonorrhea is rising across both genders from ages 20-40+, with the most significant jump in 25-29-year-olds (32% increase for males, 31% for females).
- Syphilis rates declined sharply for women, dropping 60-70% across all age groups.
- For men, syphilis saw an alarming increase across all age groups except 0-14, where it declined.
  - 205% rise in 20-14-year-olds.
  - 241%+ rise in 25-29-year-olds
  - 100%+ rise in 30-34 and 40+ age groups.
- Despite the dramatic increase, overall syphilis rates in men remain at 7 per 100,000 people.

**Takeaway**:
These findings highlight geographic disparities, gender-specific trends, and age-related risk factors, emphasizing the need for targeted public health interventions, particularly for young adults and men in high-risk states.

## Actionable Takeaways (2-3 minutes)

**Provide Recommendations**: Offer some actionable takeaways based on what you've highlighted. What should the audience do next based on this information? For example, "Given that we're seeing a significant drop in our customer satisfaction score, I recommend prioritizing product improvements."

**Next Steps**: Suggest further exploration if needed, e.g., "We can drill into these customer feedback categories to get more specific insights."


### Voiceover Script
Based on the trends observed in the dashboard, here are key recommendations to address the most pressing STD trends:

### Targeted Public Health Campaigns in High-Risk States
- Given that DC, Alaska, and Mississippi have the highest STD rates, state-level health departments should prioritize awareness campaigns, free screening programs, and increased access to treatment in these regions.
- Specific outreach efforts should be focused on rural areas and communities with limited healthcare access (such as Alaska) where these rates are disproportionately high.

### Gender-Specific Interventions
- Since STD rates among women are consistently higher, especially for chlamydia, healthcare providers should implement routine screenings in high-risk age groups (15-24 years old) and ensure wider availability of affordable testing and treatment options.
- Studies indicate that [women are less likely to negotiate condom use](https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-025-22315-0#:~:text=Regarding%20early%20sexual%20debut%2C%20AGYW,0.97%3B%20p%20%3D%200.027\).) and other protective measures during sex and are [more vulnerable to gender-based violence](https://www.unwomen.org/en/articles/facts-and-figures/facts-and-figures-ending-violence-against-women), including assault, rape, and stealthing—all of which may contribute to higher STD rates. To reduce transmission, comprehensive sexual education should prioritize consent, communication, and mutual agreement for both men and women.
- For men, given the dramatic increase in syphilis, there should be a stronger emphasis on early detection, education on risk factors, and targeted interventions for high-risk groups.

### Age-Focused Prevention Strategies
- Since STDs are most prevalent among the 15-24 age group, schools, universities, and youth organizations should be key partners in education initiatives, sexual health programs, and free testing services.
- The rising gonorrhea rates in individuals aged 25-40+ suggest a need for continued public health messaging beyond adolescence, ensuring that adults remain engaged in preventative care and regular testing.

### Addressing the Syphilis Surge in Men
- With syphilis increasing by 200+% in men aged 20-29 and over 100% in men 30-34 and 40+, there should be a renewed focus on prevention, early detection, and timely treatment.
- Collaboration with health clinics, LGBTQ+ organizations, and community outreach programs can ensure effective risk communication and increased testing accessibility.

### Strengthening Data-Driven Public Health Policies
- Given the clear upward trends in some STDs, policymakers should re-evaluate funding for prevention and treatment programs, ensuring that resources are allocated to the most affected regions and demographics.
- Tracking interventions over time will be essential in measuring the effectiveness of these efforts and adjusting strategies as needed.

### Next Steps
- Public health agencies should use this data to guide intervention programs and allocate resources effectively.
- Healthcare providers should increase routine screenings and targeted outreach efforts.
- Policy advocates should push for stronger STI prevention initiatives in high-risk communities.
- Further analysis could examine behavioral and socioeconomic factors influencing these trends to refine intervention strategies.

By taking action now, we can work toward reducing STD prevalence and improving sexual health outcomes across the U.S.

## Q&A and Closing (3-5 minutes)

**Invite Questions**: Open the floor to any questions your audience may have. Answer any queries regarding data sources, assumptions, or deeper dives into specific aspects of the dashboard.

**Only If There's Time (5 minutes)**:
You can integrate hypotheses and suppositional arguments, especially those supported by external research, plausible explanations, and root cause analysis, to enrich your analysis and help stakeholders make informed decisions. These can be incorporated into your insights, ensuring a clear distinction between findings and inferences, or presented separately at the end, just before your conclusion. Be prepared for the audience to challenge your findings, which may require you to present your arguments in defense of your conclusions. The approach you take may depend on your audience or the presentation's objective. Additionally, I’ve created several new visualizations, included in the "appendix", which drill down into key demographics in anticipation of potential audience questions.

Possible questions from the audience may include:
- Why are STD rates higher for women in general?
- Why is chlamydia spiking more than gonorrhea and syphilis among women?
- Why is syphilis spiking among men?
- Why is gonorrhea showing the least significant increase across all three tracked STDs in men?
- Why were STD rates higher for individuals under 14 and over 40?
- Why were STD rates high for other age groups?

As you can see, your findings may not always provide answers to all of these questions, so it's important to conduct some background research on the topic and understand the current state of the literature. If you lack the capacity to do this, it's a good idea to inform the audience upfront about which questions the presentation aims to answer and which it does not. If you plan to share your hypotheses, however, it's essential to:
- Clearly distinguish between observed data and inferred insights.
- Present the dashboard findings first and then introduce potential explanations.

**Example**: "We observe that the Deep South has the highest STD rates, while New England has the lowest. One possible explanation is income inequality, which research suggests is correlated with health disparities."

Support hypotheses with external research where possible.
If time allows, citing relevant studies, public health reports, or policy papers strengthens credibility.

**Example**: "A 2023 CDC report links socioeconomic factors like healthcare access and education levels to STD prevalence."

Use cautious, data-driven language.
Avoid making absolute claims unless there's strong empirical evidence.

**Example**: Instead of "Income inequality causes high STD rates," say: "Regions with higher income inequality, such as the Deep South and Midwest, tend to have higher STD rates, which aligns with research on health disparities."

Acknowledge outliers and contradictions.

**Example**: "Interestingly, Alaska has high STD rates despite lower income inequality. This may be due to limited healthcare access, as suggested by studies on rural health disparities."

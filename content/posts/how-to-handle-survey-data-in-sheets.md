---
title: "how to handle survey data in sheets"
date: 2025-05-28T00:00:01.217Z
draft: true
tags: []
description: ""
---

You're running into a **common and important data modeling challenge**—especially in civic tech, campaigns, and research: how to **store survey data flexibly when the structure varies between campaigns**.

Here are the **best options** for storing this data cleanly and scalably:

---

### ✅ **Best Practice: Use a Long Format (Tidy Data)**

Rather than having a wide table where each question is a column (leading to sparse, inconsistent rows), use a **long format** where **each response to each question is a separate row**.

#### **Structure:**

| respondent\_id | campaign\_name      | question\_id | question\_text               | response       | timestamp           |
| -------------- | ------------------- | ------------ | ---------------------------- | -------------- | ------------------- |
| 001            | GOTV\_Nov2024       | Q1           | Do you plan to vote?         | Yes            | 2024-11-01 10:32 AM |
| 001            | GOTV\_Nov2024       | Q2           | Will you need a ride?        | No             | 2024-11-01 10:32 AM |
| 002            | PolicyPush\_Mar2025 | Q1           | Do you support free transit? | Strongly agree | 2025-03-12 09:45 AM |

#### ✅ Benefits:

* Clean and scalable, even if every campaign has different questions.
* Easy to filter/analyze by campaign, respondent, or question.
* Works well in SQL, Sheets, Python, R, and BI tools like Tableau.

---

### 🛠️ **Supplemental Tables to Include:**

1. **Questions Table**

   | question\_id | campaign\_name      | question\_text               | response\_type |
   | ------------ | ------------------- | ---------------------------- | -------------- |
   | Q1           | GOTV\_Nov2024       | Do you plan to vote?         | yes\_no        |
   | Q1           | PolicyPush\_Mar2025 | Do you support free transit? | likert         |

2. **Respondents Table**

   | respondent\_id | name | phone | postal\_code | etc. |
   | -------------- | ---- | ----- | ------------ | ---- |

3. **Campaign Metadata Table (optional)**

   | campaign\_name | start\_date | end\_date | notes |
   | -------------- | ----------- | --------- | ----- |

---

### 🚫 What to Avoid:

* **One-tab-per-campaign:** gets messy fast and hard to maintain.
* **Wide format with every possible question as a column:** leads to mostly empty columns and complex logic.

---

### 🧠 Tools That Handle Long Format Well:

* **Google Sheets** (with filters + pivot)
* **SQL databases**
* **Pandas (Python)** or **tidyverse (R)**
* **Tableau/Power BI** (loves long format!)

---

Would you like a working example template in Sheets or a snippet of code to convert wide to long format?


Yes, it absolutely makes sense — and it's a **best practice** in many data workflows to split the data this way. Here's why:

---

### ✅ Why use a *long* + *wide* separation?

#### **1. Long format for responses/interactions**

* Each row = one interaction or question-response per person per campaign.
* Efficient for:

  * Analysis (e.g. grouping by campaign, question type, tag)
  * Filtering and visualizing responses
  * Feeding into survey tools, dashboards, or modeling

#### **2. Wide format for contact + demographic data**

* Each row = one contact (deduplicated by a key like email, phone, or a generated `contact_id`)
* Columns hold demographic info: postal code, household size, urban/rural flag, riding, etc.
* This avoids repeating the same info for every question answered.

---

### 🔁 How do you connect them?

Use a **key** like `contact_id`, `email`, or `name_email_key` to link both tables. This allows:

* Merging (VLOOKUP / INDEX-MATCH / `XLOOKUP`)
* Joining in Python or SQL for deeper analysis
* Creating dashboard filters or summaries without bloating the long-format dataset

---

### 🔍 Bonus Tip

If contacts can appear in multiple campaigns, also include `campaign_id` or `campaign_name` in both datasets to manage cross-campaign comparisons.

---

Would you like a sample schema showing what each table would look like in Google Sheets?

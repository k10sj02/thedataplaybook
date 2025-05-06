---
title: "connecting_to_data_in_tableau"
date: 2025-05-06T17:49:27.529Z
draft: true
tags: []
description: ""
---

In Tableau, **logical space** and **physical space** refer to two distinct layers in the **Data Model** (introduced in Tableau 2020.2 and later). Understanding the difference helps when working with relationships, joins, and combining data sources more effectively.

---

### 🧠 Logical Space

* **Definition**: This is the **higher-level modeling layer** in Tableau where **tables are related** using *relationships* (not joins).
* **Purpose**: To define **how tables are connected** conceptually, *without combining them yet*.
* **Relationships**:

  * Are **flexible** and maintain the **granularity** of each table.
  * Are evaluated **at the time of use** (e.g. when you drag fields into a viz).
  * Prevent unwanted row duplication or filtering issues (a common problem in joins).
* **Appearance**: Tables in logical space look like **independent blocks** (they don’t show join diagrams).

🟩 Think of logical space as the **blueprint or schema** of how your data tables relate.

---

### 🔧 Physical Space

* **Definition**: This is the **lower-level layer** where **joins and unions** happen — the actual SQL-like data combinations.
* **Purpose**: To **combine data physically**, creating a **new, flat table** from multiple sources.
* **Joins**:

  * Are **evaluated immediately** and affect the dataset directly.
  * Can cause **row multiplication**, especially with one-to-many relationships.
  * Should be used when you need to **flatten or reshape** data explicitly.
* **Appearance**: You access physical space by **double-clicking a logical table**, revealing the join canvas.

🛠️ Think of physical space as **how the data is actually combined and processed**.

---

### 🔄 Summary Table

| Feature              | Logical Space                 | Physical Space                      |
| -------------------- | ----------------------------- | ----------------------------------- |
| Layer Type           | Conceptual model              | Actual data combination             |
| Used for             | Relationships (smart linking) | Joins and Unions                    |
| Data Evaluation      | On use (in viz)               | Immediately                         |
| Row Duplication Risk | Low                           | High (if joins aren't handled well) |
| Accessed via         | Data source canvas            | Double-clicking a logical table     |

---

Would you like an example showing how the same data behaves differently in logical vs physical modeling?

Great question. In Tableau’s logical layer, relationships don’t use fixed joins like INNER or LEFT upfront. Instead, Tableau automatically determines the correct join type at query time based on the fields you use in the view. Here’s how it works:

⸻

🔄 How Tableau Relationships Decide Join Types

📌 1. Field Usage in the Viz

Tableau evaluates the fields you drag into a worksheet (the view). It then:
	•	Identifies which tables contain those fields.
	•	Dynamically generates SQL only between the necessary tables.
	•	Chooses a join type (inner, left, right, etc.) based on what’s needed to answer your question correctly and efficiently.

📌 2. Cardinality and Referential Integrity Settings

When you define a relationship, you can optionally set:
	•	Cardinality: one-to-one, one-to-many, many-to-many
	•	Referential Integrity: “All records match” vs “Some records match”

These hints help Tableau optimize joins and prevent incorrect aggregations or row multiplication.

💡 Tableau doesn’t immediately join tables in relationships — it defers that until the query is built. This is called semantic query generation.

⸻

🧠 Example

Suppose you have two logical tables:
	•	Customers
	•	Orders

You define a relationship on Customer ID.

Case A: You build a view using only fields from Customers
	•	Tableau queries only the Customers table — no join occurs at all.

Case B: You add Order Amount from Orders to the same view
	•	Tableau generates a join between Customers and Orders, choosing a LEFT JOIN if you keep all customers, or an INNER JOIN if only matching customers make sense in the context (based on aggregation and filtering logic).

⸻

🚦 Practical Tip

You can see what Tableau does behind the scenes by:
	•	Going to “Worksheet” → “View Data” → “Full Data”
	•	Using Performance Recorder or Log files
	•	Or right-clicking the data source and choosing “Copy Query” (on live connections)

⸻

Would you like a visual or demo dataset to walk through a relationship vs join case in Tableau?

Great question! Tableau Packaged Workbooks (.twbx) and Extracts (.hyper) are two very different file types that serve different purposes. Here’s a breakdown of how they differ and how they’re saved:

⸻

📦 Tableau Packaged Workbook (.twbx)

🔹 What It Is:
	•	A bundle that contains:
	•	The workbook (.twb)
	•	Any data extracts (e.g., .hyper)
	•	Images, custom shapes, or other local resources

🔹 Purpose:
	•	Share a complete Tableau project in a single file
	•	Ideal for offline sharing or emailing a workbook with its data and assets

🔹 How It’s Saved:
	•	Choose File → Export As → Packaged Workbook (.twbx)
or File → Save As → .twbx
	•	The .twbx file compresses everything into one zipped package

🔹 Key Traits:

Feature	Packaged Workbook (.twbx)
Contains data?	✅ Yes (if extract or static data)
Portable?	✅ Yes
Editable?	✅ Yes (can open and edit in Tableau)
Source file type	.twb (XML-based workbook)



⸻

⚙️ Tableau Extract (.hyper)

🔹 What It Is:
	•	A compressed, optimized snapshot of data extracted from a data source
	•	Used for faster performance, offline analysis, and publishing to Tableau Server/Cloud

🔹 Purpose:
	•	To store data efficiently for use in Tableau dashboards
	•	Used in live dashboards or with Tableau Server to improve load times

🔹 How It’s Saved:
	•	When you extract data in Tableau:
	•	Data → Extract → Save as .hyper
	•	Often embedded in .twbx, but can also be saved standalone

🔹 Key Traits:

Feature	Extract (.hyper)
Contains data?	✅ Yes (only the data)
Portable?	✅ Yes, but not a workbook
Editable?	❌ Not directly (but usable in Tableau)
Used in publishing?	✅ Yes, especially for dashboards



⸻

🧠 Key Difference Summary

Feature	.twbx (Packaged Workbook)	.hyper (Extract)
Contains workbook layout?	✅ Yes	❌ No
Contains data?	✅ Yes (static)	✅ Yes
Use case	Sharing a complete Tableau file	Saving/querying data efficiently
Openable in Tableau?	✅ Yes	🔄 Only via Tableau, not directly



⸻

✅ Use .twbx when:
	•	You want to share a full dashboard with data included
	•	You’re sending a file to someone who might not have access to the original source

✅ Use .hyper when:
	•	You need to reuse or publish the dataset
	•	You want faster queries or offline data access in Tableau Server/Public

⸻

Would you like help converting a live connection to an extract or packaging your workbook?

Yes — you're absolutely right! `.tde` **is also an extract format**, but it's the **older version** of Tableau’s data extract file. Here's how it fits in:

---

## 🗂️ `.tde` vs `.hyper`: Tableau Extract Formats

| Feature                  | `.tde` (Tableau Data Extract)     | `.hyper` (Hyper Data Extract)               |
| ------------------------ | --------------------------------- | ------------------------------------------- |
| 📅 Introduced In         | Older versions (pre-Tableau 10.5) | Tableau 10.5 and later                      |
| 💾 File Extension        | `.tde`                            | `.hyper`                                    |
| 🧠 Engine                | Proprietary Tableau engine        | Hyper engine (based on columnar DB tech)    |
| ⚡ Performance            | Good                              | Better (faster queries, better compression) |
| 📈 Data Size Limitations | More limited                      | Supports large data volumes efficiently     |
| 🔄 Compatibility         | Legacy Tableau versions           | Standard in current Tableau                 |
| ✅ Still Supported?       | Yes, for backward compatibility   | Yes — preferred and default                 |

---

### 🔄 Transition Summary:

* **.tde was Tableau’s original extract format**, replaced by **.hyper** starting in **Tableau 10.5 (2018)**.
* When you **open or publish** an old `.tde` extract in newer Tableau versions, it will often **convert it to `.hyper`**.
* `.hyper` uses a more modern engine built for **faster query performance and larger datasets**.

---

### ✅ TL;DR:

`.tde` = old extract format
`.hyper` = new and current extract format (default since 2018)

Want help converting a `.tde` to `.hyper`, or testing which performs better for your data?


---
title: "tableau_order_of_operations"
date: 2025-05-06T17:53:01.885Z
draft: true
tags: []
description: ""
---

Tableau’s **order of operations** matters because it determines the **sequence in which filters, calculations, and other operations are applied** to your data. If you apply a filter or calculation in the wrong order, it can lead to **unexpected results** or **incorrect visualizations**.

### Here's why it’s important:

1. **Filters affect what data is available to later steps.**

   * For example, if you apply a **dimension filter** before a **table calculation**, Tableau removes that data before the calculation runs—so the calculation doesn’t "see" it.

2. **Context filters limit what other filters can act on.**

   * Tableau evaluates **context filters** before **top N filters**, **sets**, and **LOD (Level of Detail) expressions**. If you don’t set the context properly, those later filters might operate on the wrong subset of data.

3. **LOD expressions depend on when they are evaluated.**

   * If you're using **FIXED LOD expressions**, they run **before** most filters (except extract and data source filters). So if you try to filter data after an LOD has already calculated, the LOD won’t change—leading to confusion.

4. **Performance optimization.**

   * Understanding the order can help you apply filters at the **earliest possible step** (like extract or data source level), reducing the volume of data Tableau processes downstream.

---

### Tableau’s Order of Operations (Simplified):

1. **Extract filters**
2. **Data source filters**
3. **Context filters**
4. **Top N / Conditional filters**
5. **Dimension filters**
6. **Measure filters**
7. **Table calculations**
8. **Trend lines / reference lines**
9. **Table display filters**

---

### Example:

If you use a FIXED LOD to count customers per region, but then apply a region filter **after**, the count won’t change—it was already calculated. You’d need to move that region filter into the **context** for it to affect the FIXED LOD result.

---

Would you like a diagram of Tableau's order of operations?

Here’s a **text version** of Tableau’s Order of Operations, showing the sequence in which Tableau processes different elements when building a visualization:

```
1. Extract Filters         – Applied when you create a data extract; limits data at the source.
2. Data Source Filters     – Applied to limit the data brought into Tableau from the source.
3. Context Filters         – Filters that define the dataset context for Top N, Sets, and LODs.
4. FIXED Level of Detail Expressions - Calculated after context filters but before dimension filters. Not affected by regular filters unless those filters are made part of the context.
4. Top N / Conditional Filters – Based on ranked values or custom conditions; evaluated after context.
5. Dimension Filters       – Filters on categorical fields (e.g., Region, Product Category).
6. INCLUDE / EXCLUDE LOD Expressions - Calculated after dimension filters, because they operate at the view level.
7. Measure Filters         – Filters on aggregated measures (e.g., SUM(Sales) > 1000).
8. Table Calculation Filters – Filters using calculated fields that depend on table layout.
9. Data Blending           – Occurs after filters above are applied to the primary data source.
10. Forecasting / Trend Lines – Added after the data is fully shaped and aggregated.
11. Reference Lines        – Drawn based on final values in the visualization.
12. Table Display Filters  – Visual filters (like hiding headers or using filter actions).
```

### Visual Analogy (Indented for Dependency):

```
[EARLY FILTERS – affect all downstream steps]
└── Extract Filters
    └── Data Source Filters
        └── Context Filters
            └── Top N / Conditional Filters
                └── Dimension Filters
                    └── Measure Filters
                        └── Table Calculation Filters
                            └── Data Blending
                                └── Forecasting / Trend Lines
                                    └── Reference Lines
                                        └── Table Display Filters
```

Each layer only "sees" the data passed down to it. So, placing filters or calculations at the right level is crucial to control **what data is included**, **how it's calculated**, and **what ends up being displayed**.

Would you like an example use case that shows how changing the filter order impacts the result?

Great question — **context filters** and **dimension filters** can both filter categorical fields (like Region, Category, etc.), but they **operate at different stages in Tableau’s order of operations** and have different **purposes**.

---

### 🔹 **Dimension Filter** (Regular Filter)

* **What it is**: A standard filter applied to dimension fields (e.g., filtering Region = 'West').
* **When it runs**: **After context filters**, and **after LOD expressions** and Top N filters.
* **Impact**: Filters out data before aggregations are calculated.
* **Default behavior**: All filters you drag to the Filters shelf are dimension filters unless specified otherwise.

---

### 🔸 **Context Filter**

* **What it is**: A dimension filter that you **elevate** to run earlier, before LOD expressions, Top N filters, and sets.
* **When it runs**: **Before** dimension filters, as part of Tableau's **"context"** layer.
* **Purpose**:

  * Makes dependent filters (like Top N, FIXED LODs, or set membership) work **on a filtered subset** of the data.
  * Used when performance or logic depends on pre-filtering the dataset.

---

### ✅ **Key Differences**

| Feature                | Context Filter                              | Dimension Filter                         |
| ---------------------- | ------------------------------------------- | ---------------------------------------- |
| **Default Behavior**   | Not by default; must be manually set        | Applied by default to dimensions         |
| **Order of Execution** | Early (before Top N, LODs, sets)            | Later (after LODs, Top N, etc.)          |
| **Use Case**           | To define a "starting dataset"              | To filter data more generally            |
| **Performance Impact** | Can improve performance by reducing data    | Has less impact on upstream calculations |
| **Enables**            | Top N filters, FIXED LODs to work correctly | General filtering                        |

---

### 🧠 Example:

Imagine you have:

* 10,000 customers
* You want to get the **Top 10 customers by Sales**, but only **within the Technology category**

#### Without Context Filter:

* The **Top N** filter runs on **all categories**, then filters to "Technology" — this may give incorrect results (e.g., customers with high sales in Furniture).

#### With Context Filter:

* Make `Category = Technology` a **context filter**.
* Now Tableau filters to Technology **first**, and the Top N filter runs **only on Technology customers**, as expected.

---

Let me know if you want a quick walkthrough of when to use context filters in your own dashboards.

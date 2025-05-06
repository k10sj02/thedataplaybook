---
title: "predicting_data_viz_in_tableau"
date: 2025-05-06T17:51:27.753Z
draft: true
tags: []
description: ""
---

That’s a super common struggle in Tableau—**not being able to “see” what will happen until after you drop something**. Fortunately, once you understand how Tableau thinks about **Rows, Columns, and Marks**, you’ll start to predict the outcome more confidently.

Here’s a breakdown of what to expect when dragging and dropping fields:

---

### 🧠 **The Mental Model: Tableau is a query generator**

When you drag fields to the view, Tableau generates a SQL-like query and visualizes the result. You’re defining *what you want to group by*, *what to measure*, and *how to encode it visually*.

---

### 🎯 Step-by-Step Guide to Predicting Visualization Behavior

#### 1. **Dimensions vs Measures: Know the difference**

* **Dimensions** slice the data (think: categories like Country, Date, Product).
* **Measures** are values to be aggregated (think: Sales, Profit, Count of Customers).

> **Tip:** Dragging a Dimension to Rows/Columns will define *what categories you’re breaking the view into*. Dragging a Measure will show an axis (numeric).

---

#### 2. **Rows vs Columns**

* **Rows**: Each unique value creates a new *row* in the viz.
* **Columns**: Each unique value creates a new *column* in the viz.

> E.g. Drag `Region` to Columns and `Sales` to Rows → you get a horizontal bar chart by default.

---

#### 3. **Default Chart Types You Can Expect**

Here’s a cheat sheet of what usually happens:

| Fields Dragged                        | Expected Chart Type                |
| ------------------------------------- | ---------------------------------- |
| Dimension to Columns, Measure to Rows | Vertical bar chart                 |
| Date to Columns, Measure to Rows      | Line chart (if date is continuous) |
| Two Measures (Rows + Columns)         | Scatter plot                       |
| Multiple Dimensions                   | Table with headers                 |
| No Dimension, just Measure            | Single bar or number (depends)     |
| Geographic field to view              | Map                                |

---

#### 4. **Watch the "Show Me" panel**

* The **Show Me** panel on the right gives a visual cue: as you select fields, it highlights which chart types are available.
* Even if you don’t click "Show Me," it helps you *guess* what kind of view Tableau will generate.

---

### 🧪 Try This Simple Exercise:

Create a dummy dataset with:

* Category (dimension)
* Sales (measure)
* Date (dimension)

Now try:

* Dragging `Category` to Columns and `Sales` to Rows — you’ll get a bar chart.
* Dragging `Date` to Columns (set as continuous) and `Sales` to Rows — you’ll get a line chart.
* Dragging both `Sales` and `Profit` to Rows — you’ll get two bar charts stacked.
* Dragging `Sales` to Columns and `Profit` to Rows — you’ll get a scatterplot.

---

Would you like a quick visual cheat sheet that summarizes these behaviors?

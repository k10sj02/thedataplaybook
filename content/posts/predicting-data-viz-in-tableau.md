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

Certainly! Here's a comprehensive guide on how to create various essential chart types in Tableau, complete with step-by-step instructions and resources to help you visualize your data effectively.

---

## 📊 Essential Chart Types in Tableau

### 1. **Bar Chart**

Bar charts are used to compare data across categories.

**Steps:**

1. Drag a dimension (e.g., `Category`) to the **Rows** shelf.
2. Drag a measure (e.g., `Sales`) to the **Columns** shelf.
3. Ensure the **Marks** type is set to **Bar**.([Tableau Community][1], [Tableau Community][2])

🔗 [Tableau Help: Build a Bar Chart](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_bar.htm)

---

### 2. **Line Chart**

Line charts display trends over time.

**Steps:**

1. Drag a date field (e.g., `Order Date`) to the **Columns** shelf.
2. Drag a measure (e.g., `Sales`) to the **Rows** shelf.
3. Ensure the **Marks** type is set to **Line**.([Tableau Help][3])

🔗 [Tableau Help: Build a Line Chart](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_line.htm)

---

### 3. **Scatter Plot**

Scatter plots show relationships between two measures.

**Steps:**

1. Drag one measure to the **Columns** shelf.
2. Drag another measure to the **Rows** shelf.
3. Set the **Marks** type to **Circle**.

🔗 [Tableau Help: Build a Scatter Plot](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_scatter.htm)

---

### 4. **Box Plot**

Box plots display the distribution of data.

**Steps:**

1. Drag a dimension to the **Columns** shelf.
2. Drag a measure to the **Rows** shelf.
3. From the **Show Me** panel, select the **Box-and-Whisker Plot**.([Tableau Help][4], [Tableau Help][5])

🔗 [Tableau Help: Build a Box Plot](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_boxplot.htm)

---

### 5. **Histogram**

Histograms show the distribution of a single measure.

**Steps:**

1. Right-click on a measure and select **Create > Bins**.
2. Drag the newly created bins to the **Columns** shelf.
3. Drag the same measure to the **Rows** shelf.
4. Set the **Marks** type to **Bar**.([Tableau][6])

🔗 [Tableau Help: Build a Histogram](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_histogram.htm)

---

### 6. **Stacked Bar Chart**

Stacked bar charts show the composition of data across categories.

**Steps:**

1. Drag a dimension to the **Columns** shelf.
2. Drag a measure to the **Rows** shelf.
3. Drag another dimension to the **Color** mark on the **Marks** card.([Tableau Help][7])

🔗 [Tableau Knowledge Base: Stacked Bar Chart with Multiple Measures](https://kb.tableau.com/articles/howto/stacked-bar-chart-multiple-measures)

---

### 7. **Grouped Bar Chart**

Grouped bar charts compare multiple measures across categories.

**Steps:**

1. Drag a dimension to the **Columns** shelf.
2. Drag multiple measures to the **Rows** shelf.
3. Use the **Measure Names** and **Measure Values** fields to group bars.([Tableau Help][4], [Tableau Help][8], [Tableau Community][9])

🔗 [Salesforce Help: Creating Grouped Combo-Charts](https://medium.com/@TableauByChris/tableau-creating-grouped-combo-charts-d3ea16de445a)

---

### 8. **Dot Plot**

Dot plots display individual data points across categories.([Tableau Help][10])

**Steps:**

1. Drag a dimension to the **Rows** shelf.
2. Drag a measure to the **Columns** shelf.
3. Set the **Marks** type to **Circle**.([Tableau Community][2])

🔗 [YouTube: How to Create a Dot Plot in Tableau](https://www.youtube.com/watch?v=tynvY7Q3lHU)

---

### 9. **Area Chart**

Area charts show cumulative totals over time.

**Steps:**

1. Drag a date field to the **Columns** shelf.
2. Drag a measure to the **Rows** shelf.
3. Set the **Marks** type to **Area**.

🔗 [Tableau Help: Quick Start - Area Charts](https://help.tableau.com/current/pro/desktop/en-us/qs_area_charts.htm)

---

### 10. **Dual-Axis Chart**

Dual-axis charts compare two measures with different scales.([Tableau Help][8])

**Steps:**

1. Drag one measure to the **Rows** shelf.
2. Drag another measure to the right side of the view until you see a black dashed line, then drop it to create a dual axis.
3. Right-click on the second axis and select **Synchronize Axis** if needed.([Tableau Help][8])

🔗 [Tableau Help: Add Axes for Multiple Measures](https://help.tableau.com/current/pro/desktop/en-us/multiple_measures.htm)

---

### 11. **Bubble Chart**

Bubble charts display data with circles, where size represents a measure.

**Steps:**

1. Drag a dimension to the **Rows** shelf.
2. Drag a measure to the **Size** mark on the **Marks** card.
3. Set the **Marks** type to **Circle**.([Tableau Help][11])

🔗 [Tableau Help: Build a Packed Bubble Chart](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_bubbles.htm)

---

### 12. **Density Plot (Heatmap)**

Density plots show data concentration.

**Steps:**

1. Drag one measure to the **Columns** shelf and another to the **Rows** shelf.
2. Set the **Marks** type to **Density**.

🔗 [Tableau Help: Build with Density Marks](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_density.htm)

---

### 13. **Violin Plot**

Violin plots display data distribution and probability density.([Tableau Help][12])

**Note:** Creating violin plots in Tableau requires advanced techniques, including data densification and calculated fields.

🔗 [The Data School: Making a Violin Plot in Tableau](https://www.thedataschool.co.uk/liam-holland/understanding-and-making-violin-plot-in-tableau/)

---

### 14. **Heatmap**

Heatmaps use color to represent data values in a matrix.

**Steps:**

1. Drag two dimensions to the **Columns** and **Rows** shelves.
2. Drag a measure to the **Color** mark on the **Marks** card.
3. Set the **Marks** type to **Square**.([Tableau Help][4], [Tableau Help][11])

🔗 [Tableau Help: Build a Highlight Table or Heat Map](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_highlight.htm)

---

### 15. **Pie Chart**

Pie charts show parts of a whole.

**Steps:**

1. Drag a dimension to the **Color** mark on the **Marks** card.
2. Drag a measure to the **Angle** mark.
3. Set the **Marks** type to **Pie**.

🔗 [Tableau Help: Build a Pie Chart](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_pie.htm)

---

### 16. **Funnel Chart**

Funnel charts represent stages in a process.

**Note:** Funnel charts are not a default chart type in Tableau and require custom calculations and formatting.

🔗 [Tableau Community: Creating a Funnel Chart](https://community.tableau.com/s/question/0D54T00000C5zDySAJ/merging-3-bar-charts-into-one-stacked-bar-chart-in-tableau)

---

### 17. **Bullet Chart**

Bullet charts compare a measure against a target.

**Steps:**

1. Drag a measure to the **Columns** shelf.
2. Drag a dimension to the **Rows** shelf.
3. From the **Show Me** panel, select the **Bullet Graph**.

🔗 [Tableau Help: Build a Bullet Graph](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_bullet.htm)

---

### 18. **Map-Based Plot**

Map-based plots visualize data geographically.

**Steps:**

1. Drag a geographic dimension (e.g., `State`) to the \*\*Rows

Absolutely! Below are **the additional chart types** from your list that **weren’t previously included**, along with **how to build them in Tableau** and **official resource links**:

---

### 19. **Gantt Chart**

Gantt charts visualize project timelines or task schedules.

**Steps:**

1. Drag a **dimension** (e.g., `Task Name`) to the **Rows** shelf.
2. Drag a **date** field (e.g., `Start Date`) to the **Columns** shelf.
3. Change the **Marks** type to **Gantt Bar**.
4. Drag a measure (e.g., `Duration`) to the **Size** mark on the Marks card.

🔗 [Build a Gantt Chart (Tableau Help)](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_gantt.htm)

---

### 20. **Text Table (Crosstab)**

Text tables show exact values in a spreadsheet-style layout.

**Steps:**

1. Drag dimensions to the **Rows** and **Columns** shelves.
2. Drag a measure to the **Text** mark on the Marks card.
3. Optional: Add more dimensions to break out details.

🔗 [Build a Text Table (Crosstab) (Tableau Help)](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_texttable.htm)

---

### 21. **Treemap**

Treemaps display hierarchical data using nested rectangles sized by a measure.

**Steps:**

1. Drag a dimension (e.g., `Category`) to the **Rows** shelf.
2. Drag a measure (e.g., `Sales`) to the **Size** mark.
3. Set the **Marks** type to **Treemap** (via the Show Me panel or manually).
4. Optional: Drag a second dimension (e.g., `Sub-Category`) to **Detail** or **Label**.

🔗 [Build a Treemap (Tableau Help)](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_treemap.htm)

---

### 22. **Combination Charts (Dual-Axis or Combo Charts)**

Combination charts show multiple chart types (e.g., bars and lines) in one view.

**Steps:**

1. Drag one measure to the **Rows** shelf.
2. Drag a second measure to the **Rows** shelf — drop it to the right side to create a second axis (dual axis).
3. Right-click the second axis and select **Dual Axis**.
4. Use the **Marks** dropdown to change each axis’ chart type (e.g., bar + line).

🔗 [Build Combination Charts (Tableau Help)](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_combined.htm)

[1]: https://community.tableau.com/s/question/0D58b0000B95wq9CQA/hello-i-was-wondering-how-to-have-multiple-dualline-charts-in-one-chart-it-lets-me-have-one-but-when-i-try-to-do-it-for-the-second-pair-of-data-it-wont-let-me-please-let-me-know-what-is-the-best-way-to-do-this?utm_source=chatgpt.com "Hello! I was wondering how to have multiple dual-line charts in one ..."
[2]: https://community.tableau.com/s/question/0D58b0000BHtn3zCQB/how-can-i-make-a-histogram-in-tableau-desktop?utm_source=chatgpt.com "How can i make a histogram in Tableau desktop"
[3]: https://help.tableau.com/current/pro/desktop/en-us/qs_area_charts.htm?utm_source=chatgpt.com "Quick Start: Area Charts - Tableau Help"
[4]: https://help.tableau.com/current/pro/desktop/en-us/buildexamples_line.htm?utm_source=chatgpt.com "Building Line Charts - Tableau Help"
[5]: https://help.tableau.com/current/pro/desktop/en-us/buildexamples_bar.htm?utm_source=chatgpt.com "Build a Bar Chart - Tableau Help"
[6]: https://www.tableau.com/chart/how-to-make-a-histogram?utm_source=chatgpt.com "How To Make A Histogram in Tableau, Excel, and Google Sheets"
[7]: https://help.tableau.com/current/pro/desktop/en-us/buildexamples_pie.htm?utm_source=chatgpt.com "Build a Pie Chart - Tableau Help"
[8]: https://help.tableau.com/current/pro/desktop/en-us/multiple_measures.htm?utm_source=chatgpt.com "Add Axes for Multiple Measures in Views - Tableau Help"
[9]: https://community.tableau.com/s/question/0D54T00000nm3SZ/how-do-you-make-an-area-chart-with-3-measures-on-the-samen-synchronised-axis?utm_source=chatgpt.com "How do you make an area chart with 3 measures on the samen ..."
[10]: https://help.tableau.com/current/pro/desktop/en-us/buildexamples_boxplot.htm?utm_source=chatgpt.com "Build a Box Plot - Tableau Help"
[11]: https://help.tableau.com/current/pro/desktop/en-us/buildexamples_highlight.htm?utm_source=chatgpt.com "Build a Highlight Table or Heat Map - Tableau Help"
[12]: https://help.tableau.com/current/pro/desktop/en-us/maps_howto_heatmap.htm?utm_source=chatgpt.com "Maps that Show Density or Trends - Tableau Help"
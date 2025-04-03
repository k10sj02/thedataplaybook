---
title: "🔥 The Ultimate SQL Interview Cheat Sheet 🔥"
date: 2024-05-02 12:18:35 -0400
draft: false
tags: ["SQL"]
categories: ["data science"]
---

# 🏆 Ultimate SQL Interview Cheat Sheet

## 1️⃣ Running Totals & Cumulative Sums

✅ **Key Function:** `SUM() OVER (ORDER BY column)`  
✅ **Use Case:** Running totals of revenue, sales, or cumulative counts.  
📌 **Example:** Compute cumulative revenue over time.

```sql
SELECT order_date, total_amount, 
       SUM(total_amount) OVER (ORDER BY order_date) AS running_total 
FROM orders;



⸻

2️⃣ Moving Averages (Rolling Window Aggregates)

✅ Key Function: AVG() OVER (ORDER BY column ROWS BETWEEN N PRECEDING AND CURRENT ROW)
📌 Example: Compute 7-day rolling average of revenue.

SELECT order_date, total_amount, 
       AVG(total_amount) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg 
FROM orders;



⸻

3️⃣ Handling NULLs

✅ Key Functions:
	•	COALESCE(column, default_value) → Replace NULL with a default value
	•	NULLIF(value1, value2) → Returns NULL if both values are equal
	•	IS NULL / IS NOT NULL → Filter NULL values

📌 Example: Replace missing values with 0.

SELECT customer_id, COALESCE(total_amount, 0) AS total_amount FROM orders;

📌 Example: Handle division by zero using NULLIF.

SELECT revenue / NULLIF(orders, 0) FROM sales;



⸻

4️⃣ Date & Time Manipulation

✅ Key Functions:
	•	DATE_TRUNC() → Truncate date to year, month, day, etc.
	•	EXTRACT(YEAR FROM date) → Get year, month, or day from a date
	•	DATEADD(interval, value, date) → Add/subtract days/months
	•	DATEDIFF(end_date, start_date) → Difference between dates

📌 Example: Find total sales per month.

SELECT DATE_TRUNC('month', order_date) AS month, SUM(total_amount) 
FROM orders 
GROUP BY month;

📌 Example: Find orders placed in the last 7 days.

SELECT * FROM orders 
WHERE order_date >= CURRENT_DATE - INTERVAL '7 days';



⸻

5️⃣ CTEs (Common Table Expressions) & Subqueries

✅ CTEs (WITH cte AS (...)) → Make queries more readable
✅ Subqueries → Nested queries within SELECT, FROM, or WHERE

📌 Example: Compute top customers by revenue using a CTE.

WITH customer_revenue AS (
    SELECT customer_id, SUM(total_amount) AS total_revenue 
    FROM orders 
    GROUP BY customer_id
) 
SELECT * FROM customer_revenue 
ORDER BY total_revenue DESC 
LIMIT 10;

📌 Example: Find customers who spent more than the average order amount using a subquery.

SELECT customer_id, total_amount 
FROM orders 
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);



⸻

6️⃣ Recursive CTEs (Hierarchical Data)

✅ Key Function: Recursive WITH
✅ Use Case: Hierarchical relationships (e.g., org charts, folder structures).

📌 Example: Find all employees reporting to a specific manager.

WITH RECURSIVE employee_hierarchy AS (
    SELECT employee_id, manager_id, 1 AS depth 
    FROM employees 
    WHERE manager_id IS NULL -- Start with the CEO
    UNION ALL
    SELECT e.employee_id, e.manager_id, h.depth + 1 
    FROM employees e 
    JOIN employee_hierarchy h 
    ON e.manager_id = h.employee_id
) 
SELECT * FROM employee_hierarchy;



⸻

7️⃣ Joins (Inner, Left, Right, Full, Self Joins, Cross Joins)

✅ Use Case: Combine data from multiple tables efficiently.

📌 Example: Find customer orders and their details.

SELECT customers.name, orders.order_date, orders.total_amount 
FROM customers 
LEFT JOIN orders ON customers.customer_id = orders.customer_id;



⸻

8️⃣ EXISTS vs. IN vs. JOIN (Performance Considerations)

✅ Key Functions:
	•	EXISTS → Stops at first match (efficient for large datasets)
	•	IN → Works well for small lists but slower for large datasets
	•	JOIN → Preferred when retrieving related columns

📌 Example: Find customers who have placed at least one order.

SELECT name 
FROM customers 
WHERE EXISTS (
    SELECT 1 FROM orders WHERE orders.customer_id = customers.customer_id
);



⸻

9️⃣ GROUP BY vs. DISTINCT vs. Window Functions

Feature	GROUP BY	DISTINCT	Window Functions
Use Case	Aggregates	Removes duplicates	Ranking, cumulative sums
Performance	Medium	Fast	Can be slow with large data

📌 Example: Count unique customers per region.

SELECT region, COUNT(DISTINCT customer_id) 
FROM customers 
GROUP BY region;



⸻

🔟 Pivoting & Unpivoting Data (CASE WHEN & PIVOT)

✅ Key Functions:
	•	CASE WHEN for manual pivoting
	•	PIVOT() (if supported)
	•	UNPIVOT() for reversing pivot tables

📌 Example: Pivot sales data by region.

SELECT 
    SUM(CASE WHEN region = 'North' THEN total_amount END) AS north_sales, 
    SUM(CASE WHEN region = 'South' THEN total_amount END) AS south_sales 
FROM orders;



⸻

1️⃣1️⃣ Web Scraping & Large-Scale Data Aggregation

✅ Key Techniques:
	•	Extracting data from APIs (JSON functions in SQL)
	•	Combining web-scraped datasets using UNION
	•	Cleaning and normalizing extracted data

📌 Example: Aggregating data from multiple sources into a single table.

SELECT name, address FROM web_data_source1 
UNION 
SELECT name, address FROM web_data_source2;



⸻

1️⃣2️⃣ Performance Optimization (Indexing, Query Execution Plans)

✅ Key Concepts:
	•	Use indexes (CREATE INDEX) to speed up queries.
	•	Analyze query performance with EXPLAIN ANALYZE.
	•	Optimize JOIN orders (use smaller tables first).
	•	Use LIMIT or TOP to improve efficiency in large queries.

📌 Example: Add an index to speed up searches.

CREATE INDEX idx_orders_customer ON orders (customer_id);



⸻

🛠 SQL Interview Practice Checklist

✅ Aggregation Queries (SUM, COUNT, AVG, MIN, MAX, GROUP BY)
✅ Window Functions (Running Sums, Moving Averages, Ranking, Lag/Lead)
✅ Joins (INNER, OUTER, SELF, CROSS Joins)
✅ Performance Tuning (Indexes, Query Execution Plans, EXISTS vs. IN)
✅ Recursive Queries (Recursive CTEs, Hierarchical Data Processing)
✅ Pivoting Data (CASE WHEN, PIVOT(), UNPIVOT())
✅ Web Scraping & Large-Scale Data Aggregation (JSON, API Data, UNION, ETL Processes)
✅ Handling NULLs (COALESCE, NULLIF, IS NULL)
✅ Date/Time Manipulation (DATE_TRUNC, EXTRACT, DATEDIFF)

📌 Source:
thedataplaybook/content/posts/ultimate-sql-interview-cheat-sheet.md


---
title: "🔥 The Ultimate SQL Interview Cheat Sheet 🔥"
date: 2024-05-02 12:18:35 -0400
draft: false
tags: ["SQL"]
categories: ["data science"]
---

I’ll be skipping past the standard SQL techniques, assuming we’re all familiar with the basics because in today’s data-driven world, mastering advanced SQL isn’t just useful for day-to-day analysis, it’s crucial for standing out in live-coding interviews, where you’re expected to navigate and manipulate complex datasets quickly and confidently.


## 1️⃣ GROUP BY vs. DISTINCT vs. Window Functions

| Feature | GROUP BY | DISTINCT | Window Functions |
|---------|----------|----------|-----------------|
| Use Case | Aggregates | Removes duplicates | Ranking, cumulative sums |
| Performance | Medium | Fast | Can be slow with large data |

**Example**: Count unique customers per region.
```sql
SELECT region, COUNT(DISTINCT customer_id) 
FROM customers 
GROUP BY region;
```

---

## 2️⃣ Joins (Inner, Left, Right, Full, Self Joins, Cross Joins)

✅ **Use Case**: Combine data from multiple tables efficiently.

**Example**: Find customer orders and their details.
```sql
SELECT customers.name, orders.order_date, orders.total_amount 
FROM customers 
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```
---

## 3️⃣ CTEs (Common Table Expressions) & Subqueries

✅ CTEs (`WITH cte AS (…)`) → Make queries more readable  
✅ Subqueries → Nested queries within SELECT, FROM, or WHERE

**Example**: Compute top customers by revenue using a CTE.
```sql
WITH customer_revenue AS (
  SELECT customer_id, SUM(total_amount) AS total_revenue 
  FROM orders 
  GROUP BY customer_id
)
SELECT * FROM customer_revenue 
ORDER BY total_revenue DESC 
LIMIT 10;
```

**Example**: Find customers who spent more than the average order amount using a subquery.
```sql
SELECT customer_id, total_amount 
FROM orders 
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);
```

---

## 4️⃣ EXISTS vs. IN vs. JOIN (Performance Considerations)

✅ **Key Functions**:
* `EXISTS` → Stops at first match (efficient for large datasets)
* `IN` → Works well for small lists but slower for large datasets
* `JOIN` → Preferred when retrieving related columns

**Example**: Find customers who have placed at least one order.
```sql
SELECT name 
FROM customers 
WHERE EXISTS (
  SELECT 1 
  FROM orders 
  WHERE orders.customer_id = customers.customer_id
);
```

---

## 5️⃣ Running Totals & Cumulative Sums

✅ **Key Function**: `SUM() OVER (ORDER BY column)`  
✅ **Use Case**: Running totals of revenue, sales, or cumulative counts.

**Example**: Compute cumulative revenue over time.
```sql
SELECT order_date, total_amount, 
       SUM(total_amount) OVER (ORDER BY order_date) AS running_total 
FROM orders;
```

---

## 6️⃣ Moving Averages (Rolling Window Aggregates)

✅ **Key Function**: `AVG() OVER (ORDER BY column ROWS BETWEEN N PRECEDING AND CURRENT ROW)`

**Example**: Compute 7-day rolling average of revenue.
```sql
SELECT order_date, total_amount, 
       AVG(total_amount) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg 
FROM orders;
```

---

## 7️⃣ Date & Time Manipulation

✅ **Key Functions**:
* `DATE_TRUNC()` → Truncate date to year, month, day, etc.
* `EXTRACT(YEAR FROM date)` → Get year, month, or day from a date
* `DATEADD(interval, value, date)` → Add/subtract days/months
* `DATEDIFF(end_date, start_date)` → Difference between dates

**Example**: Find total sales per month.
```sql
SELECT DATE_TRUNC('month', order_date) AS month, SUM(total_amount) 
FROM orders 
GROUP BY month;
```

**Example**: Find orders placed in the last 7 days.
```sql
SELECT * FROM orders 
WHERE order_date >= CURRENT_DATE - INTERVAL '7 days';
```

---

## 8️⃣ Handling NULLs

✅ **Key Functions**:
* `COALESCE(column, default_value)` → Replace NULL with a default value
* `NULLIF(value1, value2)` → Returns NULL if both values are equal
* `IS NULL / IS NOT NULL` → Filter NULL values

**Example**: Replace missing values with 0.
```sql
SELECT customer_id, COALESCE(total_amount, 0) AS total_amount 
FROM orders;
```

**Example**: Handle division by zero using NULLIF.
```sql
SELECT revenue / NULLIF(orders, 0) 
FROM sales;
```

---

## 9️⃣ Recursive CTEs (Hierarchical Data)

✅ **Key Function**: Recursive WITH  
✅ **Use Case**: Hierarchical relationships (e.g., org charts, folder structures).

**Example**: Find all employees reporting to a specific manager.
```sql
WITH RECURSIVE employee_hierarchy AS (
  SELECT employee_id, manager_id, 1 AS depth 
  FROM employees 
  WHERE manager_id IS NULL -- Start with the CEO
  
  UNION ALL
  
  SELECT e.employee_id, e.manager_id, h.depth + 1 
  FROM employees e 
  JOIN employee_hierarchy h ON e.manager_id = h.employee_id
)
SELECT * FROM employee_hierarchy;
```

---

## 🔟 Pivoting & Unpivoting Data (CASE WHEN & PIVOT)

✅ **Key Functions**:
* `CASE WHEN` for manual pivoting
* `PIVOT()` (if supported)
* `UNPIVOT()` for reversing pivot tables

**Example**: Pivot sales data by region.

🔹 Before (Raw Table)

| region | total_amount |
|--------|--------------|
| North  | 5000         |
| South  | 3000         |
| East   | 7000         |
| West   | 4000         |
| North  | 2000         |
| South  | 1500         |

```sql
SELECT 
  SUM(CASE WHEN region = 'North' THEN total_amount END) AS north_sales,
  SUM(CASE WHEN region = 'South' THEN total_amount END) AS south_sales,
  SUM(CASE WHEN region = 'East' THEN total_amount END) AS east_sales,
  SUM(CASE WHEN region = 'West' THEN total_amount END) AS west_sales
FROM orders;
```

🔹 After (Simulated Pivoted Table with CASE WHEN)
| north_sales | south_sales | east_sales | west_sales |
|-------------|-------------|------------|------------|
| 7000        | 4500        | 7000       | 4000       |

**Example**: Pivot data so that each region is a row and each product becomes a column

🔹 **Before (Raw Table)**

| Region | Product | TotalSales |
|--------|---------|------------|
| East   | Laptop  | 2000       |
| West   | Laptop  | 1500       |
| East   | Phone   | 1200       |
| West   | Phone   | 1300       |

```sql
SELECT 
    Region,
    ISNULL([Laptop], 0) AS Laptop,
    ISNULL([Phone], 0) AS Phone
FROM (
    SELECT Region, Product, TotalSales
    FROM Sales
) AS SourceTable
PIVOT (
    SUM(TotalSales)
    FOR Product IN ([Laptop], [Phone])
) AS PivotTable;
```

🔹 After (Pivoted Table)
| Region | Laptop | Phone |
|--------|--------|-------|
| East   | 2000   | 1200  |
| West   | 1500   | 1300  |

---

## 1️⃣1️⃣ Performance Optimization (Indexing, Query Execution Plans)

✅ **Key Concepts**:
* Use indexes (`CREATE INDEX`) to speed up queries.
* Analyze query performance with `EXPLAIN ANALYZE`.
* Optimize JOIN orders (use smaller tables first).
* Use `LIMIT` or `TOP` to improve efficiency in large queries.

**Example**: Add an index to speed up searches.
```sql
CREATE INDEX idx_orders_customer ON orders (customer_id);
```

---

## 1️⃣2️⃣ Web Scraping & Large-Scale Data Aggregation

✅ **Key Techniques**:
* Extracting data from APIs (JSON functions in SQL)
* Combining web-scraped datasets using UNION
* Cleaning and normalizing extracted data

**Example**: Aggregating data from multiple sources into a single table.
```sql
SELECT name, address 
FROM web_data_source1 
UNION 
SELECT name, address 
FROM web_data_source2;
```

### 🛠 SQL Interview Practice Checklist

- ✅ Aggregation Queries (`SUM`, `COUNT`, `AVG`, `MIN`, `MAX`, `GROUP BY`)
- ✅ Window Functions (Running Sums, Moving Averages, Ranking, `LAG`/`LEAD`)
- ✅ Joins (`INNER`, `OUTER`, `SELF`, `CROSS` Joins)
- ✅ Date/Time Manipulation (`DATE_TRUNC`, `EXTRACT`, `DATEDIFF`)
- ✅ Handling NULLs (`COALESCE`, `NULLIF`, `IS NULL`)
- ✅ Recursive Queries (Recursive `CTEs`, Hierarchical Data Processing)
- ✅ Pivoting Data (`CASE WHEN`, `PIVOT()`, `UNPIVOT()`)
- ✅ Performance Tuning (`INDEXES`, Query Execution Plans, `EXISTS` vs. `IN`)
- ✅ Web Scraping & Large-Scale Data Aggregation (`JSON`, API Data, `UNION`, ETL Processes)

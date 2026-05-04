---
title: "how to set up dbeaver with csv files online"
date: 2025-10-20T03:40:30.037Z
draft: true
tags: []
description: ""
---

# How I Created a Local Database from Kaggle Using DuckDB and DBeaver

Working with real-world datasets is a great way to practice SQL and analytics. I recently downloaded the **Startup Investments dataset** from Kaggle and built a **local database** that I can query in **DBeaver**. Here’s how I did it.

---

## Step 1: Prepare Your Environment

1. **Install DuckDB** (lightweight, fast analytical database):

```bash
brew install duckdb
```

2. **Open a terminal** and navigate to the folder containing your dataset:

```bash
cd ~/Projects/offline/startup_investments
```

---

## Step 2: Create a Persistent DuckDB Database

I created a new DuckDB database file to store all the tables:

```bash
duckdb startup_investments.duckdb
```

Inside the DuckDB prompt:

```sql
.open startup_investments.duckdb
```

This opens (or creates) a persistent database file called `startup_investments.duckdb`.

---

## Step 3: Load CSV Files into DuckDB

The dataset comes with 11 CSV files:

* `acquisitions.csv`
* `degrees.csv`
* `funding_rounds.csv`
* `funds.csv`
* `investments.csv`
* `ipos.csv`
* `milestones.csv`
* `objects.csv`
* `offices.csv`
* `people.csv`
* `relationships.csv`

I loaded each CSV into DuckDB using `read_csv_auto()`:

```sql
CREATE TABLE acquisitions    AS SELECT * FROM read_csv_auto('acquisitions.csv');
CREATE TABLE degrees         AS SELECT * FROM read_csv_auto('degrees.csv');
CREATE TABLE funding_rounds  AS SELECT * FROM read_csv_auto('funding_rounds.csv');
CREATE TABLE funds           AS SELECT * FROM read_csv_auto('funds.csv');
CREATE TABLE investments     AS SELECT * FROM read_csv_auto('investments.csv');
CREATE TABLE ipos            AS SELECT * FROM read_csv_auto('ipos.csv');
CREATE TABLE milestones      AS SELECT * FROM read_csv_auto('milestones.csv');
CREATE TABLE objects         AS SELECT * FROM read_csv_auto('objects.csv');
CREATE TABLE offices         AS SELECT * FROM read_csv_auto('offices.csv');
CREATE TABLE people          AS SELECT * FROM read_csv_auto('people.csv');
CREATE TABLE relationships   AS SELECT * FROM read_csv_auto('relationships.csv');
```

---

## Step 4: Verify the Tables

Once loaded, I checked which tables exist:

```sql
.tables
```

And verified row counts for each table:

```sql
SELECT 'acquisitions' AS table_name, COUNT(*) AS rows FROM acquisitions
UNION ALL
SELECT 'degrees', COUNT(*) FROM degrees
UNION ALL
SELECT 'funding_rounds', COUNT(*) FROM funding_rounds
UNION ALL
SELECT 'funds', COUNT(*) FROM funds
UNION ALL
SELECT 'investments', COUNT(*) FROM investments
UNION ALL
SELECT 'ipos', COUNT(*) FROM ipos
UNION ALL
SELECT 'milestones', COUNT(*) FROM milestones
UNION ALL
SELECT 'objects', COUNT(*) FROM objects
UNION ALL
SELECT 'offices', COUNT(*) FROM offices
UNION ALL
SELECT 'people', COUNT(*) FROM people
UNION ALL
SELECT 'relationships', COUNT(*) FROM relationships;
```

This confirmed all 11 tables were loaded successfully.

---

## Step 5: Connect DuckDB to DBeaver

1. Open **DBeaver**.
2. Go to **Database → New Database Connection → DuckDB**.
3. Select the `startup_investments.duckdb` file as your database.
4. Test the connection and finish setup.

All tables are now accessible through DBeaver’s visual interface, ready for SQL queries.

---

## Step 6: Start Exploring

You can now write SQL queries like:

```sql
-- Top 10 largest acquisitions
SELECT acquired_object_id, price_amount, price_currency_code
FROM acquisitions
ORDER BY price_amount DESC
LIMIT 10;

-- Count of funding rounds by year
SELECT strftime('%Y', announced_on) AS year, COUNT(*) AS rounds
FROM funding_rounds
GROUP BY year
ORDER BY year;
```

---

## Why This Workflow Works

* **Local and lightweight:** DuckDB stores everything locally, no cloud required.
* **Fast CSV ingestion:** `read_csv_auto()` automatically detects column types.
* **Portable:** Your database file can be opened in DBeaver or other SQL clients.
* **Practical for learning:** You can run complex SQL queries and practice analytics on real-world datasets.

---

### Conclusion

With just a few commands, I turned raw Kaggle CSV files into a fully queryable **local database**. This setup is perfect for practicing SQL, building dashboards, or exploring data without relying on cloud databases.

---

If you want, I can also **create a version with a visual diagram of the tables and their relationships**—makes it easier for readers to understand the dataset structure.

Do you want me to do that?

*** 

Perfect! Here’s an **updated draft** that adds the MovieLens 32M dataset instructions alongside your Startup Investments ETL workflow. I’ve integrated it seamlessly, highlighting that it’s a SQL-focused dataset.

````markdown
# How I Created Local Databases from Kaggle Using DuckDB and DBeaver

Working with real-world datasets is a great way to practice SQL and analytics. I recently downloaded two datasets from Kaggle—the **Startup Investments dataset** and the **MovieLens 32M dataset**—and built **local databases** that I can query in **DBeaver**. Here’s how I did it.

---

## Part 1: Startup Investments Dataset

### Step 1: Prepare Your Environment

1. **Install DuckDB** (lightweight, fast analytical database):

```bash
brew install duckdb
````

2. Navigate to the folder containing your dataset:

```bash
cd ~/Projects/offline/startup_investments
```

---

### Step 2: Create a Persistent DuckDB Database

Create a new DuckDB database file:

```bash
duckdb startup_investments.duckdb
```

Inside the DuckDB prompt:

```sql
.open startup_investments.duckdb
```

---

### Step 3: Load CSV Files into DuckDB

The dataset comes with 11 CSV files:

* `acquisitions.csv`
* `degrees.csv`
* `funding_rounds.csv`
* `funds.csv`
* `investments.csv`
* `ipos.csv`
* `milestones.csv`
* `objects.csv`
* `offices.csv`
* `people.csv`
* `relationships.csv`

Load each CSV into DuckDB:

```sql
CREATE TABLE acquisitions    AS SELECT * FROM read_csv_auto('acquisitions.csv');
CREATE TABLE degrees         AS SELECT * FROM read_csv_auto('degrees.csv');
CREATE TABLE funding_rounds  AS SELECT * FROM read_csv_auto('funding_rounds.csv');
CREATE TABLE funds           AS SELECT * FROM read_csv_auto('funds.csv');
CREATE TABLE investments     AS SELECT * FROM read_csv_auto('investments.csv');
CREATE TABLE ipos            AS SELECT * FROM read_csv_auto('ipos.csv');
CREATE TABLE milestones      AS SELECT * FROM read_csv_auto('milestones.csv');
CREATE TABLE objects         AS SELECT * FROM read_csv_auto('objects.csv');
CREATE TABLE offices         AS SELECT * FROM read_csv_auto('offices.csv');
CREATE TABLE people          AS SELECT * FROM read_csv_auto('people.csv');
CREATE TABLE relationships   AS SELECT * FROM read_csv_auto('relationships.csv');
```

---

### Step 4: Verify the Tables

Check which tables exist:

```sql
.tables
```

Check row counts:

```sql
SELECT 'acquisitions' AS table_name, COUNT(*) AS rows FROM acquisitions
UNION ALL
SELECT 'degrees', COUNT(*) FROM degrees
UNION ALL
SELECT 'funding_rounds', COUNT(*) FROM funding_rounds
UNION ALL
SELECT 'funds', COUNT(*) FROM funds
UNION ALL
SELECT 'investments', COUNT(*) FROM investments
UNION ALL
SELECT 'ipos', COUNT(*) FROM ipos
UNION ALL
SELECT 'milestones', COUNT(*) FROM milestones
UNION ALL
SELECT 'objects', COUNT(*) FROM objects
UNION ALL
SELECT 'offices', COUNT(*) FROM offices
UNION ALL
SELECT 'people', COUNT(*) FROM people
UNION ALL
SELECT 'relationships', COUNT(*) FROM relationships;
```

---

### Step 5: Connect DuckDB to DBeaver

1. Open **DBeaver**.
2. Go to **Database → New Database Connection → DuckDB**.
3. Select `startup_investments.duckdb`.
4. Test the connection and finish setup.

---

### Step 6: Start Exploring

Example queries:

```sql
-- Top 10 largest acquisitions
SELECT acquired_object_id, price_amount, price_currency_code
FROM acquisitions
ORDER BY price_amount DESC
LIMIT 10;

-- Count of funding rounds by year
SELECT strftime('%Y', announced_on) AS year, COUNT(*) AS rounds
FROM funding_rounds
GROUP BY year
ORDER BY year;
```

---

## Part 2: MovieLens 32M Dataset

The **MovieLens dataset** is ideal for practicing SQL analytics on user ratings and movie data.

### Step 1: Download and Prepare

1. Download the dataset from [MovieLens 32M](https://grouplens.org/datasets/movielens/32m/).
2. Extract the CSV files into a folder, e.g.:

```bash
cd ~/Projects/offline/movielens_32m
```

---

### Step 2: Create a DuckDB Database

```bash
duckdb movielens.duckdb
```

Inside the DuckDB prompt:

```sql
.open movielens.duckdb
```

---

### Step 3: Load MovieLens CSVs

The main CSV files are:

* `movies.csv`
* `ratings.csv`
* `tags.csv`
* `genome-scores.csv`
* `genome-tags.csv`

Load each CSV into DuckDB:

```sql
CREATE TABLE movies       AS SELECT * FROM read_csv_auto('movies.csv');
CREATE TABLE ratings      AS SELECT * FROM read_csv_auto('ratings.csv');
CREATE TABLE tags         AS SELECT * FROM read_csv_auto('tags.csv');
CREATE TABLE genome_scores AS SELECT * FROM read_csv_auto('genome-scores.csv');
CREATE TABLE genome_tags  AS SELECT * FROM read_csv_auto('genome-tags.csv');
```

---

### Step 4: Verify and Explore

Check tables:

```sql
.tables
```

Example queries:

```sql
-- Top 10 highest rated movies (with at least 100 ratings)
SELECT m.title, AVG(r.rating) AS avg_rating, COUNT(r.rating) AS num_ratings
FROM ratings r
JOIN movies m ON r.movieId = m.movieId
GROUP BY m.title
HAVING COUNT(r.rating) >= 100
ORDER BY avg_rating DESC
LIMIT 10;

-- Count of ratings per year
SELECT strftime('%Y', timestamp) AS year, COUNT(*) AS num_ratings
FROM ratings
GROUP BY year
ORDER BY year;
```

---

## Why This Workflow Works

* **Local and lightweight:** DuckDB stores everything locally.
* **Fast CSV ingestion:** `read_csv_auto()` automatically detects column types.
* **Portable:** Database files can be opened in DBeaver or other SQL clients.
* **Great for learning SQL:** Both datasets offer realistic, queryable tables.

---

### Conclusion

With a few commands, I turned raw Kaggle CSV files into fully queryable **local databases**. Startup Investments is great for exploring financial data, while MovieLens 32M is ideal for practicing joins, aggregations, and recommendation-style queries—all without relying on a cloud database.

```

I can also **add a small diagram showing both datasets’ table relationships** so the article is more visual and reader-friendly.  

Do you want me to add that diagram next?
```

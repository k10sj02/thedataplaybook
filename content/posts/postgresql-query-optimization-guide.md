---
title: "PostgreSQL Query Optimization: A Practical Workflow Guide"
date: 2025-12-21 12:00:00 -0500
draft: false
tags: ["PostgreSQL", "query optimization", "database performance", "EXPLAIN ANALYZE", "SQL tuning"]
categories: ["blog", "database", "tutorial"]
---

## Background 

As a data analyst on critical projects, I optimize PostgreSQL queries to ensure end users receive accurate data because even a single second can make a difference in time-sensitive analyses. In resource-constrained environments, cloud computing costs can also limit access to essential tools, slowing decision-making, reducing team transparency, and even threatening a project’s success. That’s why SQL performance tuning matters. Over the past year, I’ve gained substantial experience in query optimization, yet I was surprised by how scarce practical resources were when I was actively tackling these challenges. Many nuances were obscure, and some even eluded more senior colleagues.

One tool that has become indispensable in my tuning toolkit is [`EXPLAIN (ANALYZE, BUFFERS)`](https://www.postgresql.org/docs/current/using-explain.html), which surfaces critical query performance metrics. This guide walks you through identifying common areas for query optimization, reading and interpreting `EXPLAIN (ANALYZE, BUFFERS)` output, and measuring improvements effectively.

## The Query Optimization Workflow

Query optimization is an iterative process. Here's the workflow I follow:

1. **Baseline measurement**: Run `EXPLAIN (ANALYZE, BUFFERS)` on the original query 3-5 times to establish baseline performance
2. **Identify bottlenecks**: Analyze the output to find slow operations, memory spills, or excessive disk I/O
3. **Apply optimization techniques**: Implement targeted improvements (see common techniques below)
4. **Re-measure**: Run `EXPLAIN (ANALYZE, BUFFERS)` again to verify the impact
5. **Iterate**: Repeat steps 2-4 until the query meets performance requirements

### Common Optimization Techniques

Based on your query plan analysis, consider these approaches:

**Indexing**
- Add indexes on columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses
- Use composite indexes for multi-column conditions
- Consider hash indexes for equality comparisons on large tables

**Query rewriting**
- Replace `NOT IN` with `LEFT JOIN` and `IS NULL` checks for better performance with large exclusion lists
- Avoid functions in `WHERE` clauses (e.g., `CONVERT(date_column)`) as they prevent index usage
- Use `EXISTS` instead of `IN` for subqueries when appropriate
- Use `COUNT(*)` instead of `COUNT(DISTINCT column)` when counting rows with primary keys
- Remove unnecessary `OUTER JOIN`s—use `INNER JOIN` when you don't need unmatched rows
- Avoid calculated fields in `JOIN` and `WHERE` clauses (e.g., `WHERE YEAR(date_column) = 2024`)
- Limit your working data set—filter early and often to reduce rows processed
- Select only the columns you need rather than using `SELECT *`

**Resource configuration**
- Increase `work_mem` if you see "Batches > 1" in hash operations (memory spilling)
- Adjust `shared_buffers` to improve cache hit rates
- Update table statistics with `ANALYZE` to help the query planner

**Data structure improvements**
- Implement table partitioning for very large tables
- Use appropriate clustering keys for frequently-joined tables
- Remove unnecessary columns from SELECT when aggregating millions of rows

The key is to make one change at a time and measure its impact with `EXPLAIN ANALYZE BUFFERS` before proceeding to the next optimization.

## Example Output

```sql
-- Source - https://stackoverflow.com/q/79846354
-- Posted by Oliver S, modified by community. See post 'Timeline' for change history
-- Retrieved 2025-12-21, License - CC BY-SA 4.0
-- Table and column names modified for educational purposes
Aggregate  (cost=80.48..80.49 rows=1 width=8) (actual time=0.530..0.532 rows=1 loops=1)
  Buffers: shared hit=22
  ->  Hash Join  (cost=70.41..80.05 rows=172 width=8) (actual time=0.395..0.507 rows=110 loops=1)
        Hash Cond: (loc.company_id = comp.id)
        Buffers: shared hit=22
        ->  Hash Join  (cost=14.74..23.88 rows=188 width=16) (actual time=0.098..0.185 rows=187 loops=1)
              Hash Cond: (dev.location_id = loc.id)
              Buffers: shared hit=15
              ->  Seq Scan on devices dev  (cost=0.00..8.64 rows=188 width=16) (actual time=0.009..0.062 rows=187 loops=1)
                    Filter: ((name)::text !~~ '%test%'::text)
                    Rows Removed by Filter: 24
                    Buffers: shared hit=6
              ->  Hash  (cost=11.55..11.55 rows=255 width=16) (actual time=0.084..0.084 rows=267 loops=1)
                    Buckets: 1024  Batches: 1  Memory Usage: 21kB
                    Buffers: shared hit=9
                    ->  Seq Scan on locations loc  (cost=0.00..11.55 rows=255 width=16) (actual time=0.003..0.054 rows=267 loops=1)
                          Buffers: shared hit=9
        ->  Hash  (cost=49.05..49.05 rows=530 width=8) (actual time=0.293..0.293 rows=542 loops=1)
              Buckets: 1024  Batches: 1  Memory Usage: 30kB
              Buffers: shared hit=7
              ->  Seq Scan on companies comp  (cost=0.00..49.05 rows=530 width=8) (actual time=0.004..0.237 rows=542 loops=1)
                    Filter: (id <> ALL ('{161,162,163,...}'::bigint[]))
                    Rows Removed by Filter: 50
                    Buffers: shared hit=7
Planning:
  Buffers: shared hit=29
Planning Time: 0.393 ms
Execution Time: 0.563 ms
```

## Understanding Performance Variation

Before diving into metrics, recognize that query runtimes naturally fluctuate between executions. Minor differences often reflect normal variation rather than meaningful changes.

**Rule of thumb:** Consider an optimization meaningful when runtime consistently improves by 20-30% across multiple executions (3-5 runs), or when variance tightens noticeably. For example:
- **10s → 9.4s**: Likely noise
- **10s → 7s (repeatedly)**: Real improvement

## Key Metrics to Track

### 1. Execution Time

Found at the bottom of the output:
```
Execution Time: 0.553 ms
```

This is your primary performance indicator—the total wall-clock time for query execution.

### 2. Memory Usage

Memory appears in hash nodes and aggregation operations:
```
Batches: 1  Memory Usage: 40kB
```

**How to interpret:**
- Focus on the **largest Memory Usage** among all hash nodes
- This determines whether the query fits in `work_mem` without spilling to disk
- Memory is shown **per plan node** as peak usage, not cumulative
- Smaller nodes are usually negligible
- Watch for "Batches: >1" which indicates memory spilling (performance penalty)

Some analysts sum memory across nodes, but this can give a misleading estimate because the peak usage in different nodes doesn’t necessarily happen at the same time.

### 3. Buffer Activity (I/O)

Buffers track data access patterns:
```
Buffers: shared hit=22
```
PostgreSQL tracks how queries access data in memory and on disk using buffers. The Buffers: line in EXPLAIN (ANALYZE, BUFFERS) tells you where the data came from and how much I/O occurred.

**Key buffer types:**
- **shared hit**: The data was already in PostgreSQL’s shared memory cache. This is very fast because the query didn’t need to touch the disk.
- **shared read**: The data had to be read from disk because it wasn’t in memory. Disk reads are much slower than memory hits.
- **temp read/written**: PostgreSQL had to create temporary files on disk because the query exceeded work_mem. This is usually a sign of heavy sorting, hashing, or joins that didn’t fit in memory, resulting in slower performance.

**How to interpret:**
- High "shared hit" with zero "shared read" means all data came from cache (ideal)
- The top node's buffer count covers the entire query
- More reads = more disk I/O = slower performance. If shared read or temp read/written counts are high, your query is hitting the disk often. This is a signal that you may need to increase work_mem, optimize indexes, or reduce data scanned.

### 4. Actual Time vs Cost

Each node shows both estimated cost and actual timing:
```
HashAggregate  (cost=49.84..51.77 rows=193 width=45) 
               (actual time=0.493..0.504 rows=45 loops=1)
```

The planner is PostgreSQL’s internal optimizer that decides how to run your query. In this example, the planner thought it would output 193 rows, but the query actually produced 45. Large differences here often indicate outdated statistics or non-representative data distribution, which can lead to suboptimal plans. Small differences between estimated cost/rows and actual time/rows mean planner is accurate and the query is likely well-optimized.

- **cost**: Planner's estimate (unitless)
- **actual time**: Real wall-clock milliseconds (start..end)
- **rows**: Estimated vs actual row counts

## Common Misconceptions

**CPU Time:** The "actual time" field shows wall-clock time, not CPU time. True CPU metrics require `pg_stat_statements` or OS-level monitoring tools, which may require elevated privileges.

**Planning vs Execution:** Don't overlook planning overhead:
```
Planning Time: 0.410 ms
```
For frequently-executed queries, consider prepared statements to amortize planning cost.

## Practical Example Analysis

Given this output summary:
```
Execution Time: 0.553 ms
Memory Usage: 40 kB (largest node)
Buffers: shared hit=22 (all cache hits, no disk reads)
```

**Interpretation:**
- Query is very fast (sub-millisecond)
- Memory footprint is small, no spilling concerns
- All data served from cache—excellent I/O profile
- Minimal optimization needed unless running millions of times

## Optimization Workflow

1. **Baseline**: Run query 3-5 times, record metrics
2. **Identify bottleneck**: 
   - Slow node with high actual time?
   - Memory spilling (Batches > 1)?
   - Excessive disk reads (shared read)?
3. **Apply change**: Add index, increase work_mem, rewrite query
4. **Measure**: Run 3-5 times again
5. **Validate**: Improvement ≥20-30%? Variance tighter?

## Quick Reference

| Metric | Location | Good | Bad |
|--------|----------|------|-----|
| Execution Time | Bottom line | <10ms | Seconds+ |
| Memory | Hash/Agg nodes | Fits in work_mem | Batches >1 |
| Buffers | Per node | shared hit | shared read |
| Row estimates | vs actual | Within 2x | Off by 10x+ |

Remember: Focus on the metrics that matter for your specific workload. A query that runs once per hour can tolerate higher latency than one executing thousands of times per second.

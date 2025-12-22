---
title: "How to Interpret EXPLAIN ANALYZE BUFFERS Output in PostgreSQL"
date: 2025-12-21 12:00:00 -0500
draft: false
tags: ["PostgreSQL", "SQL", "database optimization", "query performance", "EXPLAIN ANALYZE"]
categories: ["blog", "data science", "database"]
---

As a data analyst on sustainability projects, I optimize PostgreSQL queries to ensure end users get accurate data because in these projects, even a second can make a difference. When optimizing PostgreSQL queries, `EXPLAIN (ANALYZE, BUFFERS)` provides critical performance metrics. This guide explains how to read and interpret the output to identify bottlenecks and measure improvements.

## Example Query

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT 
    c.id,
    c.name,
    COUNT(DISTINCT i.id) AS item_count,
    SUM(i.metric_value) AS total_metric,
    SUM(i.unit_value) AS total_units
FROM items i
JOIN sites s ON i.site_id = s.id
JOIN organizations o ON s.organization_id = o.id
WHERE o.id NOT IN (SELECT id FROM test_organizations)
    -- Exclude test/demo data
GROUP BY o.id, o.name;
```

This query aggregates device data by company, counting distinct devices and summing capacity metrics while filtering out test/internal company IDs.

## Example Output

```sql
-- Table and column names modified for educational purposes
Aggregate  (cost=80.48..80.49 rows=1 width=8) (actual time=0.530..0.532 rows=1 loops=1)
  Buffers: shared hit=22
  ->  Hash Join  (cost=70.41..80.05 rows=172 width=8) (actual time=0.395..0.507 rows=110 loops=1)
        Hash Cond: (s.organization_id = o.id)
        Buffers: shared hit=22
        ->  Hash Join  (cost=14.74..23.88 rows=188 width=16) (actual time=0.098..0.185 rows=187 loops=1)
              Hash Cond: (i.site_id = s.id)
              Buffers: shared hit=15
              ->  Seq Scan on items i  (cost=0.00..8.64 rows=188 width=16) (actual time=0.009..0.062 rows=187 loops=1)
                    Filter: ((name)::text !~~ '%test%'::text)
                    Rows Removed by Filter: 24
                    Buffers: shared hit=6
              ->  Hash  (cost=11.55..11.55 rows=255 width=16) (actual time=0.084..0.084 rows=267 loops=1)
                    Buckets: 1024  Batches: 1  Memory Usage: 21kB
                    Buffers: shared hit=9
                    ->  Seq Scan on sites s  (cost=0.00..11.55 rows=255 width=16) (actual time=0.003..0.054 rows=267 loops=1)
                          Buffers: shared hit=9
        ->  Hash  (cost=49.05..49.05 rows=530 width=8) (actual time=0.293..0.293 rows=542 loops=1)
              Buckets: 1024  Batches: 1  Memory Usage: 30kB
              Buffers: shared hit=7
              ->  Seq Scan on organizations o  (cost=0.00..49.05 rows=530 width=8) (actual time=0.004..0.237 rows=542 loops=1)
                    Filter: (id <> ALL ('{1,2,3,4,5,...}'::bigint[]))
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

### 3. Buffer Activity (I/O)

Buffers track data access patterns:
```
Buffers: shared hit=22
```

**Key buffer types:**
- **shared hit**: Data found in PostgreSQL's shared buffer cache (fast)
- **shared read**: Data read from disk (slow)
- **temp read/written**: Temporary files used when work_mem exceeded

**How to interpret:**
- High "shared hit" with zero "shared read" means all data came from cache (ideal)
- The top node's buffer count covers the entire query
- More reads = more disk I/O = slower performance

### 4. Actual Time vs Cost

Each node shows both estimated cost and actual timing:
```
HashAggregate  (cost=49.84..51.77 rows=193 width=45) 
               (actual time=0.493..0.504 rows=45 loops=1)
```

- **cost**: Planner's estimate (unitless)
- **actual time**: Real wall-clock milliseconds (start..end)
- **rows**: Estimated vs actual row counts
- Large discrepancies suggest outdated statistics

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

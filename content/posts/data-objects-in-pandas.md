---
title: "A Quick Overview of Different Types of Data Structures and Objects in Pandas"
date: 2024-06-01 23:18:35 -0400
draft: false
tags: ["python", "pandas", "NumPy"]
categories: ["blog", "data science"]
---

As a Data Scientist at the ShapeUp Project, I’ve been working on data analysis projects at Shape Up The Vote Data Project that activate barbershops and salons as voter engagement hubs in 13 states with 5,500 participating shops by 2024. 

We use relational organizing principles and remote communication through text and phone banking. My role involves collecting, cleaning, and enriching data on potential participants to identify the best shops to contact.

In this process, I’ve had the chance to thoroughly explore the various data structures and objects provided by pandas, a powerful library for data manipulation and analysis, and NumPy, in Python. Here’s a quick overview of the primary data structures you’ll encounter in pandas and NumPy:

### 1. Series
**Description**: A one-dimensional labeled array capable of holding data of any type (integers, strings, floating point numbers, Python objects, etc.).

**Use Case**: Similar to a column in an Excel spreadsheet or a single column in a DataFrame.

**Example**:
```python
import pandas as pd
series = pd.Series([1, 2, 3, 4, 5])
```

### 2. DataFrame
**Description**: A two-dimensional labeled data structure with columns of potentially different types. It's like a table in a database or an Excel spreadsheet.

**Use Case**: Used for storing and manipulating tabular data.

**Example**:
```python
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(data)
```

### 3. Index
**Description**: The index object is the axis labels for pandas objects. It's used to label and identify data.

**Use Case**: Used as row labels in a DataFrame or labels in a Series.

**Example**:
```python
index = pd.Index([1, 2, 3])
```

### 4. MultiIndex
**Description**: A multi-level, or hierarchical, index object for pandas objects.

**Use Case**: Used for working with higher-dimensional data in a two-dimensional DataFrame.

**Example**:
```python
index = pd.MultiIndex.from_tuples([('A', 1), ('A', 2), ('B', 1)])
df = pd.DataFrame({'values': [1, 2, 3]}, index=index)
```

### 5. Categorical
**Description**: A data type for categorical (fixed number of possible values) data, which can be ordered or unordered.

**Use Case**: Useful for saving memory and improving performance for categorical data.

**Example**:
```python
categories = pd.Categorical(['a', 'b', 'a', 'c', 'b'])
```

### 6. DatetimeIndex
**Description**: An index type for pandas objects holding datetime64 data.

**Use Case**: Used for time series data.

**Example**:
```python
dates = pd.date_range('20210101', periods=6)
df = pd.DataFrame({'values': [1, 2, 3, 4, 5, 6]}, index=dates)
```

### 7. TimedeltaIndex
**Description**: An index type for pandas objects holding timedelta64 data.

**Use Case**: Used for representing differences in time.

**Example**:
```python
timedeltas = pd.to_timedelta(['1 days', '2 days', '3 days'])
```

### 8. PeriodIndex
**Description**: An index type for pandas objects holding period data.

**Use Case**: Used for time spans, like months or years.

**Example**:
```python
periods = pd.period_range('2021-01', periods=3, freq='M')
```

# Quick Overview of NumPy Data Objects

### 1. ndarray (N-dimensional array)
**Description**: The core data structure in NumPy, representing a multidimensional, homogeneous array of fixed-size items.
**Use Case**: Used for numerical computations where operations are performed element-wise on arrays.
**Example**:
```python
import numpy as np

# Creating a 1D array
array_1d = np.array([1, 2, 3])

# Creating a 2D array
array_2d = np.array([[1, 2, 3], [4, 5, 6]])
```

### 2. Masked Array
**Description**: An array that allows elements to be masked or ignored in computations, useful for handling missing or invalid data.
**Use Case**: Useful in data cleaning and preprocessing where some data points are invalid or missing.
**Example**:
```python
import numpy as np
import numpy.ma as ma

# Creating a masked array
data = np.array([1, 2, 3, -1, 5])
mask = data < 0
masked_array = ma.array(data, mask=mask)
```

### 3. Structured Array
**Description**: Arrays with heterogeneous data types, similar to a table or spreadsheet where each column can have a different data type.
**Use Case**: Useful for handling complex data sets where each column may represent a different data type.
**Example**:
```python
import numpy as np

# Creating a structured array
data = np.array([(1, 'A'), (2, 'B')], dtype=[('x', 'i4'), ('y', 'U1')])
```

### 4. Record Array
**Description**: A specialized form of a structured array that allows field access by attribute rather than by index.
**Use Case**: Useful for cleaner and more readable code when accessing structured data fields.
**Example**:
```python
import numpy as np

# Creating a record array
data = np.rec.array([(1, 'A'), (2, 'B')], dtype=[('x', 'i4'), ('y', 'U1')])

# Accessing fields by attribute
print(data.x)
print(data.y)
```

### 5. Matrix
**Description**: A specialized 2D array subclass for matrix operations. Unlike regular ndarrays, matrices are strictly 2D and support matrix multiplication with the `*` operator.
**Use Case**: Used for linear algebra operations, particularly matrix multiplication.
**Example**:
```python
import numpy as np

# Creating a matrix
matrix = np.matrix([[1, 2], [3, 4]])

# Matrix multiplication
result = matrix * matrix
```

### 6. Array Scalars
**Description**: Scalars that extend the standard scalar types (int, float, etc.) to ensure they behave like arrays in terms of broadcasting and type promotion.
**Use Case**: Useful for consistent behavior across array operations, especially when dealing with single elements.
**Example**:
```python
import numpy as np

# Creating an array scalar
scalar = np.float32(10.0)

# Behaves like an array element
print(scalar + np.array([1.0, 2.0]))
```

Each of these data objects serves a specific purpose and is optimized for different types of data manipulation and analysis tasks. Understanding when and how to use each will help you make the most of pandas and NumPy in your data science projects.

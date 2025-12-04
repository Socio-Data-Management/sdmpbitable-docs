---
sidebar_position: 2
title: Sorting & Ordering
---

# Sorting & Ordering Reference

## Overview

Customize how rows and columns are arranged in your table with flexible sorting options.

---

## Row Sorting

### Sort Method
**Setting**: Row sorting  
**Options**: None, Row Label (Alphabetical), Column Value  
**Default**: None

#### None
Rows appear in the order they come from the data source.

#### Row Label (Alphabetical)
Sorts rows alphabetically by their label.

**Example**:
```
Before: North, South, East, West
After:  East, North, South, West
```

#### Column Value
Sorts rows based on values from a specific column you select.

**Use Cases**:
- Sort products by highest sales
- Rank regions by satisfaction score
- Order responses by frequency

---

## Sort Direction

### Sorting Order
**Setting**: Row sorting order  
**Options**: Ascending, Descending  
**Default**: Ascending

Controls whether sorted values go low-to-high or high-to-low.

**Example (Column Value sorting)**:
- **Ascending**: Smallest values first (1, 2, 3...)
- **Descending**: Largest values first (...100, 99, 98)

---

## Sort Properties

### Column Property
**Setting**: Column property  
**Options**: Value, Horizontal Percentage, Indice  
**Default**: Value

When using "Column Value" sort, choose which metric to sort by.

- **Value**: Raw count or sum
- **Horizontal Percentage**: Percentage within row
- **Indice**: Index value

---

## Fixed Row/Column Positioning

Force certain rows or columns to stay at the beginning or end, regardless of sort order.

### First Rows
**Setting**: 'First row(s)' label(s)  
**Type**: Text input  
**Format**: Comma-separated  
**Example**: `Total,Subtotal`

These rows always appear first in your table, even if a sort would normally place them elsewhere.

**Example**:
```
Configuration: First rows = "Total"
Result table:
- Total (always first)
- Product A
- Product B
- Product C
```

### Last Rows
**Setting**: 'Last row(s)' label(s)  
**Type**: Text input  
**Format**: Comma-separated  
**Example**: `Not Applicable,Other`

These rows always appear last in your table.

**Example**:
```
Configuration: Last rows = "Not Answered,Other"
Result table:
- Product A
- Product B
- Product C
- Not Answered (always last)
- Other (always last)
```

### First Columns
**Setting**: 'First column(s)' label(s)  
**Type**: Text input  
**Format**: Comma-separated  
**Example**: `Total,All Categories`

These columns always appear first.

### Last Columns
**Setting**: 'Last column(s)' label(s)  
**Type**: Text input  
**Format**: Comma-separated

These columns always appear last.

---

## Practical Examples

### Example 1: Sales Report
```
Configuration:
- Sort Method: Column Value
- Column to Sort: Total Sales
- Sort Direction: Descending
- Last Row: Total

Result: Highest-performing products first,
         with Total always at the bottom
```

### Example 2: Survey Analysis
```
Configuration:
- Sort Method: Row Label (Alphabetical)
- First Rows: Total,Base
- Last Rows: Not Answered

Result: Alphabetical regions, with
        totals first and N/A last
```

### Example 3: Regional Comparison
```
Configuration:
- Sort Method: Column Value
- Sort by Column: "North Region"
- Sort Direction: Descending
- First Columns: Total

Result: Regions ranked by North performance,
        with Total column always first
```

---

## Best Practices

1. **Use Column Sort for Insights**: Sort by the most important metric (sales, satisfaction, etc.)
2. **Fix Totals**: Always put totals first or last for clarity
3. **Alphabetical for Stability**: Use alphabetical sort for consistent report appearance
4. **Limit Fixed Items**: Too many fixed rows makes the table confusing
5. **Consider User Expectations**: Sort in a logical order for your audience

---

## Tips & Tricks

- **Multiple Sort Levels**: Combine with ranking to show top performers visually
- **Dynamic Sorting**: Power BI's interactions allow end-users to click columns to resort (with Power BI native features)
- **Regional Reports**: Use First/Last columns to keep comparison columns visible while scrolling

---

## Troubleshooting

**Q: Sort doesn't seem to work**  
A: Ensure you've selected a sort method other than "None"

**Q: My first/last rows aren't appearing**  
A: Check the exact spelling and case of row labels

**Q: Column value sort uses wrong column**  
A: Verify you selected the correct column in "Row Sort Column" setting

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md).

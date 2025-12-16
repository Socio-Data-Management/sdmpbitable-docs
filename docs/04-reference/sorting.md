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

:::caution
If you use this setting for numeric labels like "1", "2", "3", the **'10'** label will be considered as coming before "**2"** in alphabetical order (1,10,2,3,4...). In such cases, consider using 'Last Row/Column Positioning' to fix specific label ("10") at the end.

![classify 10 at the end of row list](../images/classify10-at-end.png)
:::

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

**Example (Raw label sorting)**:
- **Ascending**: Alphabetical order (A, B, C...)
- **Descending**: Reverse alphabetical order (Z, Y, X...)

---

## Sort Properties

### Column Property
**Setting**: Column property  
**Options**: Value, Horizontal Percentage, Indice  
**Default**: Value

When using "Column Value" sort, choose which metric to sort by.

- **Value**: Value of cells (AND Vertical Percentage)
- **Horizontal Percentage**: Percentage within row
- **Indice**: Index value

:::tip
For percentage tables, sorting by **"Value"** and **"Vertical Percentage"** yield exactly the same order, reason why on ly 'value',  'horizontal percentage' and indice options are shown.
:::

---

## Fixed Row/Column Positioning

Force certain rows or columns to stay at the beginning or end, regardless of sort order.

:::info
In the folowing settings, multiple labels can be specified separated by commas. The comparison is not case sensitive and enclose labels in double quotes if they contain comma.
e.g., `My Brand, My First Competitor` or `"Not Answered","no, never"`
:::

### First Rows
**Setting**: 'First row(s)' label(s)  
**Type**: Text input  
**Format**: Comma-separated  
**Example**: `My Brand, My First Competitor`

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
**Example**: `Not Answered, Other`

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
**Example**: `Current Year, Last Year`

These columns always appear first.

### Last Columns
**Setting**: 'Last column(s)' label(s)  
**Type**: Text input  
**Format**: Comma-separated  
**Example**: `Previous Year, Two Years Ago`

These columns always appear last.

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

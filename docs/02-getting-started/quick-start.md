---
sidebar_position: 2
title: Quick Start
---

# Quick Start Guide

## 5-Minute Overview

Get SDM Cross Table Tool up and running in just a few minutes with this quick walkthrough.

<video autoPlay loop muted playsInline style={{ maxWidth: "100%", border: "1px solid #ccc", borderRadius: "4px" }}>
  <source src="/sdmpbitable-docs/videos/quickstart.webm" type="video/webm" />
</video>
[Quick Start Video](/videos/quickstart.webm)

### Step 1: Add the Visual

1. In Power BI Desktop, create a **new blank report**
2. Go to **Visualizations** pane on the right
3. Click the **three dots** and select **Get more visuals**
4. Search for and add **SDM Cross Table Tool**

### Step 2: Prepare Your Data

SDM Cross Table Tool needs at least:
- **Row field(s)**: Categories for table rows
- **Column field(s)**: Categories for table columns
- **Value field**: Numerical data (usually for mean table) or any categorical variable or measure (usually for percentage table).

**Example dataset:**

Product      | Region   | Sales
-------------|----------|--------
Product A    | North    | 15,000
Product A    | South    | 12,000
Product B    | North    | 18,000
Product B    | South    | 14,000

With this dataset you can create:
- a cross-tab showing sales distribution of products across regions, in this case, drop any of "Product" or "Region" column in the "value" field and select "Count" measure in the "Values" field.
- a mean table showing average sales per product and region, in this case, drop "Sales" column in the "value" field and select "Average" measure in the "Values" field.

### Step 3: Create Your First Table

1. Add the **SDM Cross Table Tool** visual to your report canvas
2. In the **Visualizations** pane:
   - Drag a field to **Rows** (e.g., "Product")
   - Drag a field to **Columns** (e.g., "Region")
   - Drag a measure to **Values** (e.g., "Sales")

3. Click on the **Format** icon (paint bucket) in the Visualizations pane
4. Your table appears!

### Step 4: Basic Configuration

In the format panel, you can immediately:

- **Table Type**: Switch between "Percentage" or "Mean"
- **Show Percentages**: Toggle vertical/horizontal percentages
- **Show Totals**: Add row and column totals
- **Formatting**: Change theme, fonts and colors

---

## Common Configurations

### Configuration A: Percentage Analysis

Best for survey data, response rates, market share

1. Set **Table Type** → "Percentage"
2. Check **Vertical percentage** (% within each column)
3. Check **Show total column**
4. Enable **Zebra rows** for readability

### Configuration B: Mean Analysis

Best for averages, performance metrics

1. Set **Table Type** → "Mean"
2. Configure **Mean Series** in data properties
3. Add **Count Series** for sample size
4. Optional: Add **Standard Deviation** for analysis

### Configuration C: Comparison with Significance

Best for highlighting differences in survey data

1. Configure as Percentage Analysis
2. In **Significance settings**:
   - Set **Significance 1** to "All columns" or "Item vs other"
   - Set **Significance Level** to "95%"
   - Select **Font Color** for display
3. Significant differences appear highlighted

---

## Next Steps

### To Learn More:
- [Create Your First Table](first-table.md) — Detailed step-by-step
- [Feature Reference](../04-reference/table-content.md) — All available options
- [Use Cases](../03-use-cases/business-cases.md) — Real-world examples

### To Customize:
- [Complete Reference Guide](../04-reference/table-content.md) — All settings explained
- Specific guides:
  - [Table Contents](../04-reference/table-content.md)
  - [Sorting Options](../04-reference/sorting.md)
  - [Ranking & Visualization](../04-reference/ranking.md)

---

## Keyboard Shortcuts (Power BI)

- **Ctrl+Shift+F5**: Refresh visuals
- **Click + Drag**: Interact with table (if enabled)
- **Export**: Use Power BI's Export option

---

## Common Questions

**Q: My data doesn't appear in the table**  
A: Check that you've assigned values to Rows, Columns, and at least one Value field.

**Q: Can I show multiple metrics?**  
A: Yes! Drag multiple measures to Values and configure series in settings.

**Q: How do I add hierarchies?**  
A: Drag multiple fields to Rows or Columns to create hierarchical levels.

**Q: Is there a data limit?**  
A: SDM Cross Table Tool follows Power BI's native limits (~1M rows visual-level).

---

Ready to go deeper? Check out the [complete reference guide](../04-reference/table-content.md) or explore [real-world use cases](../03-use-cases/business-cases.md)!

---
sidebar_position: 1
title: Overview
---

# What is SDM Xtended Table?

## Purpose & Design Philosophy

**SDM Xtended Table** (Socio Data Management Xtended Table for Power BI) is a specialized Power BI custom visual built for creating and analyzing cross-tabulation tables (also known as contingency tables or crosstabs). It keeps everything that makes the [CrossTable](../../01-introduction/overview.md) engine valuable for survey and market-research work, and removes its structural limits: **any number of row levels and any number of column levels**, each one formatted from a dedicated editor. It goes far beyond simple data grids by providing:

- **Hierarchical table structures** with as many levels of rows and columns as your analysis needs

![Hierarchical Data](Hierarchical_data.png)
- **Statistical analysis capabilities** including multiple significance testing

![Significance Testing](Significance.png)
- **Advanced formatting options** to highlight key insights

![Advanced Formatting](AdvFormating.png)
- **Professional styling** for reports and presentations

![Styling](Styling.png)
- **Flexible data aggregation** supporting both percentages and means
- **Interactive filtering** through row and column selection

## Who Should Use SDM Xtended Table?

SDM Xtended Table is ideal for:

- **Scientific Market Research Professionals**: Analyze survey data with deep breakdowns (country > wave > brand > item…)
- **Data Analysts**: Create multi-dimensional analysis tables with statistical rigor
- **Business Intelligence Teams**: Build professional dashboards and reports
- **Statistical Consultants**: Perform complex cross-tabulations with significance tests
- **Corporate Reporting**: Generate polished, formatted tables for executive presentations

## What is different from CrossTable?

| CrossTable | SDM Xtended Table |
|---|---|
| 2 levels of rows, 3 levels of columns | **N levels of rows and N levels of columns** |
| Logo Lv1–Lv3 / Row Logo Lv1–Lv2 data roles | One **Additional Series** role, plus a *Logo series* field per level or a **Header Logos** lookup |
| Separate *Top level*, *Sub level* and *Row header* format cards | **Table Headers** card: ⚙ **Column Headers** and **Row Headers** editors, one block per level, no ceiling |
| *Show Level 1/2 Sub-Total* | *Show sub-total* choice **per column level** |
| *Multiple answer* and *Rows are repeated items* | **Sample across items** (Disjoint / Shared / Native) set **per level** |
| Row headers always in a side column | Per row level: side column (rowspan) or full-width band |
| `row1`/`row2`, `col1`…`col3` in Cell Rules | `rowN` / `colN` for any N |

Xtended Table is a **separate visual** with its own identifier: reports built with CrossTable are not converted automatically. It is a *pure table*: Data Bar, Data Line and Gap Mode belong to [CrossTable InCell Charts](../../05-crosstable-charts/overview.md).

## Core Capabilities

### 1. Table Types
- **Percentage Tables**: Analyze response distributions and proportions
- **Mean Tables**: Analyze averages Power BI series with statistical measures (count, standard deviation)

### 2. Data Aggregation
- Weighted and unweighted bases
- Custom series for values, bases, and significance calculations
- A per-level **sample** model (Disjoint / Shared / Native) describing how group bases are built — see [Sample Across Items](../04-reference/sample-across-items.md)

### 3. Advanced Formatting
- Customize fonts, colors, and backgrounds **level by level** from the Table Headers editors
- Apply formatting to headers, cells, and totals independently
- Dark mode support for modern dashboards

### 4. Statistical Analysis
- Perform significance tests between columns and segments
- Multiple test types: all columns, item vs total, regex-based
- Adjustable confidence levels (90%, 95%, 99%)

### 5. Smart Sorting
- Sort rows alphabetically, by column value, or custom order
- Designate "first" and "last" rows/columns to keep in place
- Sort based on specific cell properties (value, vertical %, horizontal %, indice)

### 6. Ranking & Visualization
- Automatically rank cells within columns
- Visual indicators: numbered badges or color gradients
- Customizable color schemes and intensity levels

### 7. Interactive Selection
- Users can click to select rows and columns
- Integrated Power BI cross-filtering for dynamic dashboards
- Multiple selection support for complex analysis

### 8. Data Protection
- Mask sensitive values below thresholds
- Apply warnings for data quality issues
- Flexible threshold rules based on cell value or base size

### 9. Cell Tooltip
- Native Power BI tooltip on hover, surfacing figures the table computes but doesn't necessarily display: row/column levels, value, both percentages, index, weighted and unweighted base
- The **compared base** and a **continuous significance confidence level** behind each pass/fail marker — see [Cell Tooltip Reference](../04-reference/tooltip.md)

## Data Requirements

SDM Xtended Table requires a data source with:
- **Row dimension(s)**: The categories for table rows (one or many levels)
- **Column dimension(s)**: The categories for table columns (one or many levels)
- **Measures**: Numerical values to populate cells. The tool leverages the standard Power BI aggregation methods (counts, means...).

_For statistical testing, you'll need additional measures for base values and significance calculations._

## Typical Workflow

```
1. Connect your data source
2. Assign row, column, and value fields (as many levels as needed)
3. Choose table type (Percentage or Mean)
4. Configure data aggregation options and the sample model of each level
5. Shape the headers level by level (⚙ Column Headers / Row Headers)
6. Apply formatting and styling
7. (Optional) Configure statistical tests
8. Add sorting, ranking, or threshold rules
9. (Optional) Enable row/column selection for interactivity
10. Export or embed in reports
```

## Next Steps

- Explore the [Edition Comparison](editions.md) to choose the right plan
- Follow the [Quick Start Guide](../02-getting-started/quick-start.md) to create your first table
- Review [Use Cases](../03-use-cases/business-cases.md) for real-world examples

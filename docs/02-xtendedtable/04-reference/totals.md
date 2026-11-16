---
sidebar_position: 6
title: Totals & Subtotals
---

<span style={{color: '#ffffff', backgroundColor: '#ffffff'}}>Socio Data Management - All rights reserved</span>


# Totals & Subtotals Reference

## Overview

Configure total columns, base rows, and subtotals to provide context and summary information in your cross-tabulation tables.

![total settings](../../images/xtendedtable-totals-settings.png)
---

## Total Columns

### Show Table Total Column
**Card**: Totals  
**Setting**: Show total column  
**Type**: Toggle  
**Default**: On

Displays a total column that sums all values across the table.

**Position**: Appears as the first column (leftmost) in the table

**Example**:

![Global totals](../../images/xtendedtable-totals-table-totals.png)


**Use Cases**:
- Quick reference to overall totals
- Comparing individual segments to total
- Understanding proportional contribution

:::note[Mean tables with a single series]
When the table type is **Mean** and only one value series is bound, **Show total column**, **Show base row** and **Show Signif Base Row** are forced off: there is no count series to build a base from.
:::

### Show sub-total column (per column level)
**Setting**: Show sub-total column  
**Where**: **Column editor** (🏛️ icon at the top-right of the visual, Edit view) → **Sub-total** section, one block per column level  
**Type**: Checkbox  
**Default**: Off

Displays the sub-total column of the groups formed at that level — i.e. the columns that have sub-columns beneath them. XtendedTable has no fixed "Level 1 / Level 2" switches: the editor has one block per column level, with **no limit on the number of levels**, and each block owns its own switch.

**When It Appears**: Only when you have hierarchical columns (multiple column levels). The switch has no effect on the **last** level (leaf columns have no sub-columns).

:::note
Sub-totals are off by default: check **Show sub-total column** on each level whose groups need one.
:::

The switch stays available even when the level's header label is hidden, so you can hide a level's labels while keeping its sub-total.

**Example**:

![Level 1 Sub Total](../../images/xtendedtable-totals-level1-subtotal.png)

The "Total" columns show the sub-totals of the first column level.




### Sub-total styling
When **Show sub-total column** is on, the same block offers **Sub-total colors** (Inherit from theme / Custom), background (default #f2f2f2), font color, font, size, bold, italic and underline for that level's sub-total columns. See [Table Headers](./table-headers.md).

### What a sub-total base is made of
The base carried by a sub-total (or by the total of a row) is built from the bases of the items it groups. The **Sample across items** property of the level that groups them (**Disjoint**, **Shared**, **Native**) decides whether those bases are added, replaced by the base of one item, or read from your measure. See [Sample Across Items](./sample-across-items.md).

---

## Base Rows

Base rows display the sample size or denominator used in calculations. Essential for understanding data reliability.

![Base Rows](../../images/xtendedtable-totals-allbase-rows.png)

_The example shows the three different base rows available._

### Show Base Row
**Setting**: Show base row  
**Type**: Toggle  
**Default**: On

Displays a row showing the "Base" series selected in the [Percentage Series setting](./percentage-series) or [Mean Series setting](./mean-series).

**What It Shows**: 
- For percentage tables: The denominator used to calculate percentages
- For mean tables: The count of observations

**Example**:

![Base Row Example](../../images/xtendedtable-totals-table-totals.png)

**Why It Matters**: 
- Small bases = less reliable percentages
- Helps readers judge statistical significance
- Required for proper interpretation

### Show Unweighted Base Row
**Setting**: Show unweighted base row  
**Type**: Toggle
**Default**: Off

Displays a row showing the unweighted (raw) sample size.

**When to Use**: 
- When your data is weighted in base series
- For transparency in research reporting
- To show actual number of obeservations/respondents

**Example**:

![Unweighted Base Row Example](../../images/xtendedtable-totals-allbase-rows.png)

**Difference from Base**:
- **Base**: Reflects weighting adjustments
- **Unweighted**: Raw count of records/respondents

### Show Signif Base Row
**Setting**: Show Signif Base Row  
**Type**: Toggle  
**Default**: Off  

Displays a separate base row used specifically for significance testing calculations.

:::warning
The row is only drawn when significance tests are active in the [Significance Testing settings](./significance). With **Activate significance tests** off, the toggle reads Off and no row is drawn.
:::

**When to Use**:
- When significance tests use different data than display values
- Complex weighting scenarios
- Specialized statistical testing

**Example**:

![All Base Row Example](../../images/xtendedtable-totals-allbase-rows.png)

---

## Row Labels

Customize the text labels for base rows.

### Base Row Label
**Setting**: Base Row Label  
**Type**: Text input  
**Default**: "Base"

The label that appears for the weighted base row.

**Common Labels**:
- "Base"
- "Total N"
- "Sample Size"
- "Weighted Base"
- "n="

**Example**:

![Base Row labels Settings](../../images/xtendedtable-totals-settings.png)
![Base Row labels Example](../../images/xtendedtable-totals-base-row-labels.png)


### Unweighted Base Row Label
**Setting**: Unweighted Base Row Label  
**Type**: Text input  
**Default**: "Unweighted Base"

The label for the unweighted base row.

**Common Labels**:
- "Unweighted n"
- "Raw Base"
- "Actual Count"
- "Sample (unwtd)"

### Signif Base Row Label
**Setting**: Signif Base Row Label  
**Type**: Text input  
**Default**: "Signif Base"  

The label for the significance testing base row.

**Common Labels**:
- "Signif n"
- "Test Base"
- "Statistical Base"

---

## Row Positioning

### Base Rows on Top of Table
**Setting**: Base Rows on Top  
**Type**: Toggle  
**Default**: On

Controls whether base rows appear at the top or bottom of the table.

**On (Default)**: Base rows appear immediately below headers

![All Base Row Example](../../images/xtendedtable-totals-allbase-rows.png)


**Off**: Base rows appear at the bottom

![All Base Bottom Example](../../images/xtendedtable-totals-base-row-bottom.png)


**Best Practices**:
- **Top**: Better for reports where base size is critical (research, surveys)
- **Bottom**: Cleaner look for executive dashboards
- **Top**: Standard in market research industry

---

## Practical Examples

### Example 1: Basic Survey Table
```
Configuration:
- Show total column: Yes
- Show base row: Yes
- Base Rows on Top: Yes
```
Result:

![Totals Sample 1](../../images/xtendedtable-totals-table-totals.png)

### Example 2: Weighted Research Study
```
Configuration:
- Show total column: Yes
- Show base row: Yes
- Show unweighted base row: Yes
- Base Row Label: "Weighted base"
- Unweighted Base Row Label: "Respondents (n)"
- Base Rows on Top: Yes
```

Result:

![Totals Sample 2](../../images/xtendedtable-totals-base-row-labels.png)

### Example 3: Multiple Row/Columns Analysis
```
Configuration:
- Show total column: Yes
- Show sub-total column: Yes on column level 1 (Column editor)
- Show base row: Yes
- Base Rows on Top: Yes
```

![Totals Sample 3](../../images/xtendedtable-totals-level1-subtotal.png)


### Example 4: Clean Dashboard Style
```
Configuration:
- Show total column: No
- Show base row: Yes
```

![Totals Sample 4](../../images/xtendedtable-totals-no-total-col.png)

---

## Best Practices

### 1. Always Show Base Rows
Base rows are critical for proper interpretation. Only hide them if:
- Space is extremely limited
- Audience is very familiar with the data
- Bases are identical across all columns

### 2. Unweighted Bases for Research
When reporting weighted data:
- Always show both weighted and unweighted bases
- Label them clearly to avoid confusion
- Place unweighted base directly below weighted base

### 3. Label Clarity
Use industry-standard labels:
- **Market Research**: "Base", "Unweighted Base"
- **Academic**: "N", "n (unweighted)"
- **Business**: "Total", "Sample Size"

### 4. Position Based on Audience
- **Research/Technical**: Bases on top
- **Executive/Business**: Consider bases on bottom
- **Reports with many rows**: Bases on top for reference

### 5. Subtotals in Hierarchies
Enable sub-totals on the column levels that matter when:
- You have 2+ levels of column grouping (any depth)
- Subtotals provide meaningful insights
- Table isn't too wide already

---

## Common Configurations

### Standard Market Research
```
- Show Table Total: Yes
- Show Base Row: Yes
- Show Unweighted Base: Yes
- Base Label: "Weighted Base"
- Unweighted Label: "Unweighted Base"
- Position: Top
```

### Business Dashboard
```
- Show Table Total: No (or Yes, depends)
- Show Base Row: Yes
- Base Label: "Total"
- Position: Top or Bottom
- Column sub-totals: As needed, per level
```

### Academic/Scientific
```
- Show Base Row: Yes
- Show Unweighted Base: No (unless weighted)
- Base Label: "N"
- Position: Top
- Include significance testing base if relevant
```

### Executive Summary
```
- Show Table Total: Yes
- Show Base Row: Yes
- Base Label: "Sample"
- Position: Bottom
- Minimal detail, clean look
```

---

## Data Series Configuration

For base rows to display correctly, ensure proper series mapping:

### For Percentage Tables
- **Base Series**: Set in "% series usage" settings
- **Unweighted Base Series**: Set in "% series usage"
- **Signif Base Series**: Set in "% series usage" (if using significance)

### For Mean Tables
- **Count Series**: Set in "Mean series usage" (acts as base)
- **Unweighted Base Series**: Set in "Mean series usage"

See [Percentage Series](./percentage-series.md) and [Mean Series](./mean-series.md) for detailed configuration.

---

## Statistical Context

### Why Base Sizes Matter

**Small Bases (\<30)**:
- Percentages are unreliable
- Use thresholds to mask or warn
- Consider combining categories

**Medium Bases (30-100)**:
- Percentages acceptable but note limitations
- Significance tests may not detect real differences

**Large Bases (100+)**:
- Reliable percentages
- Significance tests have good power

### Weighted vs Unweighted

**Weighted Base**:
- Adjusted to match population proportions
- Use for percentage calculations
- May differ significantly from raw count

**Unweighted Base**:
- Actual number of records/respondents
- Use to judge reliability
- Important for transparency

**Rule of Thumb**: Show both when weighting is applied.

---

## Troubleshooting

**Q: Base row doesn't appear**  
A: Ensure you've mapped the Base Series in percentage/mean series settings

**Q: Unweighted base is identical to weighted base**  
A: Your data likely isn't weighted; consider hiding unweighted row

**Q: Base values look wrong**  
A: Check series mapping; ensure you're using the correct measure

**Q: A subtotal/total doesn't match the sum of the rows you actually see**  
A: If your base measure is a filtered `SUM` (e.g. to hide BLANK rows), Power BI's native subtotal calculation can desynchronize from the visible rows. See [Understanding Bases → filtered base measure pitfall](./understanding-bases.md#pitfall-a-filtered-base-measure-desynchronizes-native-subtotals).

**Q: Subtotals don't appear**  
A: Sub-totals only show with hierarchical column structures (2+ levels), and only for levels whose **Show sub-total column** checkbox is on (it is off by default)

**Q: Can I show bases in cells instead of rows?**  
A: No, bases are always shown as separate rows; consider custom formatting

**Q: Base rows break my table layout**  
A: Try positioning them at bottom, or reduce font size in formatting

---

## Related Settings

- [Table Contents](./table-content.md) — Overall table configuration
- [Percentage Series](./percentage-series.md) — Map base data series
- [Mean Series](./mean-series.md) — Configure count series
- [Sample Across Items](./sample-across-items.md) — How bases combine in totals and sub-totals
- [Thresholds](./thresholds.md) — Mask low base values
- [Understanding Bases](./understanding-bases.md) — How bases are aggregated, the per-level `Sample across items` property, and the filtered-measure pitfall

---

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md) or contact support.

<span style={{color: '#ffffff', backgroundColor: '#ffffff'}}>Socio Data Management - All rights reserved</span>

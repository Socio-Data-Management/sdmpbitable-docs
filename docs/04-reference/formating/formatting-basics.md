---
sidebar_position: 5.2
title: Table Options (Basics)
---

# Table Options Reference

Control the fundamental display behavior of your table including hover effects, row striping, freezing panes, and display precision.

:::info Settings Location
These settings correspond to the **`tableSettingsCard`** in the configuration model.
:::

---

## Overview

Table Options control how your table behaves and displays data without changing the styling or colors. These are the foundational display settings.

---

## Hover Behavior

### Highlight Row on Hover
**Setting**: Highlight row on hover  
**Type**: Toggle  
**Default**: On

Highlights the entire row when your cursor moves over it.

**Use cases**:
- Interactive dashboards
- Reports where users will hover to explore
- Tables with many columns (helps track which row you're in)

**Example**:
```
Normal:  | Region  | Q1  | Q2  | Q3  |
         
Hover:   | Region  | Q1  | Q2  | Q3  |  ← Entire row highlighted
```

---

## Row Appearance

### Zebra Rows
**Setting**: Zebra rows  
**Type**: Toggle  
**Default**: On

Alternates row background colors for easier reading.

**Visual effect**:
```
Row 1: White background
Row 2: Light gray background
Row 3: White background
Row 4: Light gray background
...
```

**Benefits**:
- Helps readers track across wide tables
- Improves readability for people with dyslexia
- Makes data-dense tables easier to scan

**When to disable**:
- Very narrow tables (few columns)
- When custom styling already provides good contrast

---

## Display Formatting

### Show % Symbol
**Setting**: Show % symbol  
**Type**: Toggle  
**Default**: On

Controls whether the "%" character appears after percentage values.

**Examples**:
- **On**: `45%`, `68.5%`
- **Off**: `45`, `68.5`

**Use cases**:
- Keep **On** for general reporting (clearer meaning)
- Turn **Off** for data-dense tables where space is limited

### Percent Precision
**Setting**: Percent precision  
**Type**: Number (0-5)  
**Default**: 1

Number of decimal places for percentage display.

**Common settings**:

| Precision | Example | Use Case |
|-----------|---------|----------|
| 0 | 45% | Executive summaries, simple reporting |
| 1 | 45.2% | Standard business reporting (most common) |
| 2 | 45.23% | Detailed analysis, research |
| 3+ | 45.234% | Scientific/academic work |

**Tips**:
- Higher precision = larger numbers in cells (may affect readability)
- Lower precision = cleaner look but less detail
- Match precision to your audience's needs

---

## Column & Row Freezing

Freezing keeps certain rows/columns visible while scrolling, essential for navigating large tables.

### Freeze Left Column
**Setting**: Freeze left column  
**Type**: Toggle  
**Default**: On

Keeps the row labels (leftmost column) visible while scrolling horizontally.

**When enabled**:
- You scroll left/right through data columns
- Row labels stay visible on the left
- Easy to identify which row you're looking at

**When to disable**:
- Table fits on screen (no horizontal scroll needed)
- First column should scroll with the rest

**Example**:
```
Frozen left:
┌─────────────┬──────────────────────────────┐
│ Product (F) │ Q1  Q2  Q3  Q4  ... (scroll)  │
│ Product A   │ 100 120 115 130              │
│ Product B   │ 85  92  98  105              │
└─────────────┴──────────────────────────────┘
```

### Freeze Top Row
**Setting**: Freeze top row  
**Type**: Toggle  
**Default**: On

Keeps column headers visible while scrolling vertically.

**When enabled**:
- You scroll up/down through rows
- Headers stay visible at top
- Easy to know which column you're looking at

**When to disable**:
- Table fits on screen (no vertical scroll needed)
- Headers should scroll with the rest

**Example**:
```
┌──────────────────────────────────────┐
│ Region  │ Q1    Q2    Q3    Q4 (F)   │
├─────────┼──────────────────────────┤
│ North   │ 1000  1100  1050  1200     │
│ South   │ 800   920   950   1050     │
│ East    │ 1200  1300  1250  1400     │
│ ....... │ ... (scroll down) ...      │
└─────────┴──────────────────────────┘
```

:::tip Best Practice
Keep both freezing options **On** for tables larger than your screen. Disable only if your table is small enough to fit completely.
:::

---

## Column Sizing

### Row Title Fixed Width
**Setting**: Row title fixed width  
**Type**: Text input  
**Format**: Any valid CSS width (`200px`, `20%`, `15em`)  
**Default**: Empty (automatic sizing)

Set a fixed width for the row labels column instead of letting it auto-size.

**Use cases**:
- **Consistent layouts**: When creating multiple tables with same row structure
- **Visual alignment**: Aligning tables vertically across multiple reports
- **Space control**: Limiting label space when labels are very long

**Examples**:

```
/* Fixed pixel width */
Row Title Fixed Width: 250px

/* Fixed percentage */
Row Title Fixed Width: 25%

/* Em units (relative to font size) */
Row Title Fixed Width: 20em
```

**Tips**:
- Leave empty for automatic sizing (recommended for most cases)
- Use when labels are consistent across reports
- Test that labels aren't cut off if using fixed widths
- Percentage widths are relative to total table width

:::tip When to Use Fixed Width
This is particularly useful when you have the same column variables but different row variables across multiple tables, maintaining visual consistency.
:::

---

## Header Visibility

### Show Column Header
**Setting**: Show column header  
**Type**: Toggle  
**Default**: On

Show or hide the column header row entirely.

**When to keep enabled** (most cases):
- Users need to identify columns
- Multiple hierarchical levels

**When to disable**:
- Table is part of a dashboard with clear context
- Column labels are already provided elsewhere
- Space is extremely limited
- Headers are obvious from surrounding documentation

**Example - Headers Hidden**:
```
Before (Header On):          After (Header Off):
┌──────┬─────┬─────┐        ┌──────┬─────┬─────┐
│ Item │ Q1  │ Q2  │        │  100 │ 120 │ 115 │
├──────┼─────┼─────┤        ├──────┼─────┼─────┤
│ A    │ 100 │ 120 │   →    │  85  │  92 │  98 │
│ B    │  85 │  92 │        │  45  │  52 │  48 │
└──────┴─────┴─────┘        └──────┴─────┴─────┘
```

---

## Configuration Examples

### Standard Business Report
```
- Highlight row on hover: On
- Zebra rows: On
- Show % symbol: On
- Percent precision: 1
- Freeze left: On
- Freeze top: On
- Row title fixed width: (leave empty)
- Show column header: On
```

### Data-Dense Table
```
- Highlight row on hover: Off (reduces visual clutter)
- Zebra rows: On (helps tracking)
- Show % symbol: On
- Percent precision: 0 (more compact)
- Freeze left: On
- Freeze top: On
- Row title fixed width: 180px
- Show column header: On
```

### Executive Dashboard
```
- Highlight row on hover: On
- Zebra rows: Off (cleaner look)
- Show % symbol: On
- Percent precision: 0 (simplicity)
- Freeze left: On
- Freeze top: On
- Row title fixed width: (auto)
- Show column header: On
```

### Minimal/Embedded Table
```
- Highlight row on hover: On
- Zebra rows: Off
- Show % symbol: On
- Percent precision: 1
- Freeze left: Off (if table is narrow)
- Freeze top: Off (if few rows)
- Row title fixed width: (auto)
- Show column header: Off or On (context dependent)
```

---

## Best Practices

1. **Hover Highlight**: Keep On for interactive reports, Off for print-friendly views
2. **Zebra Rows**: Always On unless table is very narrow
3. **Symbol/Precision**: Match your audience (executives = simpler, analysts = more detail)
4. **Freezing**: Always On for large tables, consider Off for small ones
5. **Column Headers**: Keep On unless context is very clear

---

## Troubleshooting

**Q: Text is overlapping or hard to read**  
A: Increase precision decimals or reduce row title fixed width

**Q: Zebra rows make it harder to read**  
A: This may indicate insufficient contrast - adjust custom formatting colors instead

**Q: Freeze isn't working**  
A: Verify your browser/Power BI version supports sticky positioning; try disabling custom scrolling settings

**Q: Row labels are cut off**  
A: Use auto sizing (leave Row Title Fixed Width empty) or increase the fixed width value

---

## Related Topics

- [Table Styles](formatting-styles.md) - Apply professional themes
- [Custom Element Formatting](formatting-custom.md) - Colors and fonts
- [Formatting Overview](formatting.md) - All formatting options

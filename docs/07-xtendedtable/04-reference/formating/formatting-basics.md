---
sidebar_position: 5.2
title: Table Options (Basics)
---

# Table Options Reference

Control the fundamental display behavior of your table including hover effects, row striping, borders, freezing panes, and display precision.

:::info[Settings Location]
These settings live in the **Table Format** card of the SDM Xtended Table format pane, in the **Table Options** group.
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

### Table Border
**Setting**: Table border  
**Type**: Toggle  
**Default**: On

Shows or hides all cell and table borders. When off, the table renders without any grid lines, giving a clean, minimal look. Significance borders (`.sigBordPlus` / `.sigBordMinus`) are preserved regardless of this setting.

**When to enable** (default):
- Standard reporting where grid lines help readability
- Dense tables where borders guide the eye across columns

**When to disable**:
- Tile mode designs (borders already absent per tile)
- Minimalist dashboards where whitespace replaces structure
- Embedding a table inside a styled card or frame

:::note
Disabling borders does not affect the significance highlight borders — those remain visible to preserve data interpretation.
:::

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

### Precision
**Setting**: Precision  
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

### Forbid Horizontal Scroll
**Setting**: Forbid horizontal scroll  
**Type**: Toggle  
**Default**: Off

Fits the table into the **width of the visual**: the data columns shrink instead of overflowing, so no horizontal scrollbar appears. Because a column can no longer widen to fit its title, long column titles are **cut** — choose how with the **Title cut** field of each column level in the [Column Headers editor](../table-headers.md#title-cut-when-horizontal-scroll-is-forbidden) (one line + ellipsis, two lines + ellipsis, or as many lines as needed).

**Good to know**:
- While it is **on**, the **Freeze left column** setting is hidden and has no effect (there is nothing to scroll horizontally).
- The width of the data columns still follows the **Width** field of the last column level (see [Size](../table-headers.md#size-width-and-height)); when the columns cannot fit, they are scaled down uniformly (never below 30 px).

### Freeze Left Column
**Setting**: Freeze left column  
**Type**: Toggle  
**Default**: On

Keeps the row labels (leftmost column) visible while scrolling horizontally. Hidden — and ignored — while **Forbid horizontal scroll** is on.

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

:::tip[Best Practice]
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

:::tip[When to Use Fixed Width]
This is particularly useful when you have the same column variables but different row variables across multiple tables, maintaining visual consistency.
:::

---

## Row & Column Sizing, Group Gaps

In SDM Xtended Table, the size of columns and rows and the gaps between groups are no longer Table options: they are set **level by level** in the ⚙ [Column Headers and Row Headers editors](../table-headers.md), in the **Layout** section of each level. This replaces the former *Row height (px)* and *Row group spacing* settings (and the Tile mode *Group gap*, *Sub-group gap* and *Row gap* settings), which no longer exist.

| You want to… | Where |
|---|---|
| Give every data row a given height, or make rows fill the visual height | Row Headers editor → last level → **Layout → Height of each group of this level** ([details](../table-headers.md#size-width-and-height)) |
| Set the width of the data columns (equal, fixed, minimal) | Column Headers editor → last level → **Layout → Width** ([details](../table-headers.md#size-width-and-height)) |
| Leave a vertical gap between two sub-tables (one country, one wave…) | Row Headers editor → the level of the sub-tables → **Layout → Gap before each group** ([details](../table-headers.md#gaps-between-groups)) |
| Leave a horizontal gap before each group of columns | Column Headers editor → the level → **Layout → Gap before each group** ([details](../table-headers.md#gaps-between-groups)) |

---

## Header Visibility

### Show Column Header
**Setting**: Show column header  
**Type**: Toggle  
**Default**: On

Show or hide the whole column header area entirely. To hide only **one** column header level (and keep the others), use the **Show this header** field of that level in the [Column Headers ⚙ editor](../table-headers.md#hiding-a-header-level) instead.

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
- Table border: On
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
- Table border: On
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
- Table border: Off (minimal feel)
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
- Table border: Off
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
3. **Table Border**: Keep On for standard reporting; turn Off for minimal/tile-mode designs
4. **Symbol/Precision**: Match your audience (executives = simpler, analysts = more detail)
5. **Freezing**: Always On for large tables, consider Off for small ones
6. **Column Headers**: Keep On unless context is very clear

---

## Troubleshooting

**Q: Text is overlapping or hard to read**  
A: Increase precision decimals or reduce row title fixed width

**Q: Zebra rows make it harder to read**  
A: This may indicate insufficient contrast - adjust custom formatting colors instead

**Q: Freeze isn't working**  
A: Verify your browser/Power BI version supports sticky positioning; try disabling custom scrolling settings

**Q: I want to hide just one header level, not the whole header**  
A: Use **Show this header** in the Column Headers / Row Headers ⚙ editor — see [Hiding a header level](../table-headers.md#hiding-a-header-level)

**Q: Row labels are cut off**  
A: Use auto sizing (leave Row Title Fixed Width empty) or increase the fixed width value

---

## Related Topics

- [Table Styles](formatting-styles.md) - Apply professional themes
- [Custom Element Formatting](formatting-custom.md) - Colors and fonts
- [Table Headers](../table-headers.md) - Per-level header formatting, logos and row layout
- [Formatting Overview](index.md) - All formatting options

---
sidebar_position: 5
title: Cell Rules
---

# Cell Rules Reference

## Overview

Cell Rules let you decorate individual cells based on the return value of a DAX measure. The measure acts as a per-cell "rule engine": it evaluates in the exact context of each cell and returns a color, a label, or both. The visual then applies the decoration according to the selected display mode.

:::info[Edition Availability]
Cell Rules are available in **Pro** and **Premium** editions.
:::

---

## How It Works

### The Cell Rules Measure

Add a measure to the **Cell Rules** data role. The measure is evaluated for every data cell independently, giving you full access to DAX context (row filters, column filters, etc.).

The measure must return one of:

| Return value | Interpretation |
|---|---|
| `#RRGGBB` or `#RGB` | A hex color (used as background or text color) |
| `Any text` | A label (used as displayed text) |
| `#RRGGBB;Label text` | A color **and** a label, separated by the first `;` |
| `BLANK()` | No decoration applied to this cell |

:::tip Semicolon in label
The split occurs on the **first** semicolon only. The label part can contain further semicolons freely:  
`#FF6600;Level 3; very high` → color `#FF6600`, label `Level 3; very high`.
:::

### Example DAX Measure

```dax
Cell Rule Color =
VAR score = [Mean Score]
RETURN
    SWITCH(
        TRUE(),
        score >= 7.5,   "#2E86AB;Très haut",
        score >= 5,     "#A8DADC;Haut",
        score >= 2.5,   "#E63946;Bas",
        score >= 0,     "#C1121F;Très bas",
        BLANK()
    )
```

This measure assigns a color and label to each cell based on a mean score value.

---

## Enable Cell Rules

### Activate Cell Rules
**Setting**: Activate Cell Rules  
**Type**: Toggle  
**Default**: Off

Master switch. When off, the Cell Rules measure is still evaluated (so DAX overhead exists) but no decoration is applied.

---

## Display Modes

### Measure Content
**Setting**: Measure content  
**Type**: Dropdown  
**Default**: Cell background color

Controls what part of the measure return value is used and how it is rendered.

#### `Cell background color`
The measure must return a hex color. The color is applied as the cell background.

```
Measure returns: #2E86AB
Result: Cell background turns blue
```

#### `Text color`
The measure must return a hex color. The color is applied to the cell's text.

```
Measure returns: #C1121F
Result: Cell values display in dark red
```

#### `Label only`
The measure returns a text label (or the text part after `;`). The label is prepended to the cell content.

```
Measure returns: "Très haut"
Result: "Très haut  99.5 %"
```

#### `Label + cell background`
The measure returns `#color;label`. Background color and label are applied simultaneously.

```
Measure returns: "#2E86AB;Très haut"
Result: Blue background + label "Très haut" prepended to cell value
```

#### `Label + text color`
The measure returns `#color;label`. Text color and label are applied simultaneously.

```
Measure returns: "#2E86AB;Très haut"
Result: Blue text + label "Très haut" prepended to cell value
```

#### `Label + badge`
The measure returns `#color;label`. A colored badge is prepended to the cell, containing the label.  
The badge shape is controlled by the **Badge shape** setting.

```
Measure returns: "#2E86AB;Très haut"
Result: [Très haut] badge (blue pill) + numeric cell value
```

:::note Compatibility with Ranking badges
Cell Rules badges and Ranking badges are **cumulative** — both can appear in the same cell at the same time. The Cell Rules badge is placed first (leftmost).
:::

---

## Badge Shape

**Setting**: Badge shape  
**Type**: Dropdown  
**Default**: Circle  
**Visible when**: Mode is `Label + badge`

| Shape | Appearance |
|---|---|
| Circle | Fully rounded pill |
| Square | Sharp rectangular badge |
| Rounded Square | Rectangle with slightly rounded corners |

---

## Compatibility and Conflicts

Some decoration modes are mutually exclusive because they operate on the same visual property. When a conflict is detected, the table is **not rendered** and an error message is displayed instead.

| Conflict | Reason |
|---|---|
| Cell Rules (background) + Ranking (color mode) | Both write to cell background |
| Cell Rules (background) + Significance (background mode) | Both write to cell background |
| Cell Rules (text color) + Significance (font color mode) | Both write to cell text color |
| Ranking (color mode) + Significance (background mode) | Both write to cell background |

**To resolve a conflict**: disable one of the conflicting features, or switch to a non-overlapping mode (e.g., switch from Cell Rules "background" to "label only").

:::tip No conflict with Significance in icon or border mode
Significance displayed as **icons** or **cell borders** does not conflict with any Cell Rules mode.
:::

---

## Behavior on Subtotals and Totals

The Cell Rules measure is evaluated by the DAX engine in the filter context of each cell. For subtotal and total cells, the filter context is broader (aggregated), so a lookup-style measure typically returns `BLANK()` — meaning **no decoration is applied to totals**, which is the expected behavior.

If you explicitly want to decorate total rows, use `ISINSCOPE` in your measure to detect the aggregation level:

```dax
Cell Rule Color =
IF(
    ISINSCOPE(Item[Category]),   -- only leaf-level rows
    SWITCH(TRUE(), [Mean Score] >= 7.5, "#2E86AB;Très haut", ...),
    BLANK()                      -- totals: no decoration
)
```

---

## Practical Examples

### Example 1: Satisfaction Rating Classes

```dax
Satisfaction Class =
VAR s = [Mean Satisfaction]
RETURN SWITCH(TRUE(),
    s >= 8,   "#27AE60;Excellent",
    s >= 6,   "#F39C12;Good",
    s >= 4,   "#E74C3C;Poor",
    BLANK()
)
```

**Mode**: Label + badge  
**Shape**: Rounded Square

Result: Each cell shows a colored badge with the satisfaction class label alongside the numeric mean.

### Example 2: Traffic Light (Background Only)

```dax
Traffic Light =
VAR pct = [Vertical %]
RETURN SWITCH(TRUE(),
    pct >= 0.30, "#27AE60",
    pct >= 0.15, "#F39C12",
    pct >= 0,    "#E74C3C",
    BLANK()
)
```

**Mode**: Cell background color

Result: Cells are colored green / orange / red based on their vertical percentage, with no label overhead.

### Example 3: Highlight Outliers with Text Color

```dax
Outlier Highlight =
VAR z = [Z-Score]
RETURN IF(ABS(z) >= 2, "#C0392B", BLANK())
```

**Mode**: Text color

Result: Statistical outliers display their values in red; normal cells are unaffected.

---

## Best Practices

1. **Return `BLANK()` for undecorated cells** — don't return an empty string, as the visual won't distinguish it from a label.
2. **Use `ISINSCOPE` to exclude totals** — keeps decoration meaningful at the item level.
3. **Badge mode for dense tables** — badges preserve full numeric readability while adding classification.
4. **Background mode for heatmaps** — pair with "Auto font color" in the Format > Cell settings if background colors vary widely.
5. **Avoid conflicts** — choose your Cell Rules mode before choosing Significance/Ranking display modes, and verify there is no overlap on background or text color.

---

## Troubleshooting

**Q: The table shows a blank/error message instead of the grid**  
A: A conflict has been detected between Cell Rules and another decoration mode. Read the error message and disable the conflicting feature.

**Q: Background or text color mode shows no color**  
A: Verify that your measure actually returns a valid hex color (e.g., `#FF0000`) and not a label string. Use the DAX "Evaluate" feature in DAX Studio to check.

**Q: Badge mode shows the badge but the color is wrong**  
A: The first part of the return value must be a valid hex color (`#RGB` or `#RRGGBB`). Make sure there is no trailing space before the semicolon.

**Q: Decoration appears on some cells but not others**  
A: That is expected — cells where the measure returns `BLANK()` are left undecorated. Check your DAX logic for cells that unexpectedly return blank.

**Q: I want label and background on totals only**  
A: Use `NOT ISINSCOPE(...)` as the condition in your measure to target aggregate rows.

---
sidebar_position: 12
title: Cell Tooltip
---

# Cell Tooltip Reference

## Overview

It is easy to assume a table needs no tooltip — everything worth knowing is already a column, right? In practice, every cell in the visual carries **more figures than are ever displayed**: a raw (unweighted) base, a weighted base, the base of whatever it was statistically compared against, an index, both percentages, and — with significance testing on — a continuous confidence level behind the pass/fail marker. The **Cell Tooltip** surfaces this "hidden" layer on hover, using Power BI's native tooltip (so it matches the report's theme and positions itself correctly), without cluttering the table itself.

---

## Scope

Cell Tooltip is available on both **CrossTable** and **CrossTable InCell Charts** — same settings, same content, same behavior.

:::note[One gap on CrossTable InCell Charts]
When [Data Bar or Data Line "Group into one chart"](../05-crosstable-charts/data-bar.md) merges several series into a single cell (one `<td>` holding multiple bars/points), the tooltip does not yet cover that merged cell — only "one cell = one bar/point" layouts are covered. Every other cell, including ungrouped Data Bar and Data Line cells, has the full tooltip.
:::

---

## Activation

**Card**: Tooltip
**Setting**: Activate Tooltip
**Type**: Toggle
**Default**: Off

The tooltip is opt-in. Once activated, a **Tooltip content** sub-card appears with one toggle per piece of information you want to expose.

---

## Tooltip content

| Setting | Shows | Default |
|---|---|---|
| Row levels | The full row header path (every level, from the outermost to the innermost) for the hovered cell | On |
| Column levels | The full column header path (every level) for the hovered cell | On |
| Value | The cell's value — a count in a percentage table, the average in a mean table | On |
| Vertical % | The cell's vertical percentage (percentage tables only) | On |
| Horizontal % | The cell's horizontal percentage (percentage tables only) | Off |
| Index | The cell's index | Off |
| Weighted base | The cell's weighted base (the same figure used as the significance test's own denominator) | Off |
| Unweighted base | The cell's unweighted (respondent) base | Off |
| Compared base | The base of the group this cell was statistically compared against (see [below](#compared-base)) | Off |
| Significance confidence level | The continuous confidence level of the active significance test(s) (see [below](#significance-confidence-level)) | Off |

:::tip
Vertical % and Horizontal % are automatically skipped on **mean** tables even if toggled on — percentages have no meaning there. Everything else (Value, Index, both bases) applies to both table types.
:::

Row and column levels are labeled **Row** / **Column** when the table has a single level, or **Row 1**, **Row 2**… / **Column 1**, **Column 2**… when it has several — matching the order they appear in the header hierarchy, outermost first.

**Value**, **Weighted base** and **Unweighted base** reuse the labels you already configured elsewhere, so the tooltip stays consistent with the rest of the table:
- **Value** uses the measure's display name (the same label used on single-indicator column headers).
- **Weighted base** / **Unweighted base** reuse the **Base row label** / **Unweighted row label** settings from [Totals & Subtotals](totals.md), even if those base rows are not currently displayed in the table.

:::info[Precision matches what's displayed]
Numbers in the tooltip are rounded to the **same number of decimals** the table itself uses for that figure — the Table options card's precision for Value/Base/Unweighted base on mean tables (0 on percentage tables), and the configured precision for Vertical %/Horizontal %. The tooltip never applies its own, unrelated rounding.
:::

---

## Significance confidence level

Every significance test already produces a pass/fail marker (icon, font color, background or border — see [Significance Testing](significance.md)) based on the **Significance level** threshold you configured (90%, 95% or 99%). That threshold necessarily throws information away: a cell that misses a 95% threshold by a hair looks identical to one that is nowhere close.

The tooltip instead shows the **actual, continuous confidence level** the underlying statistical test reached for that cell — for example `+92.5%` or `−98.8%` — computed from the same z/t statistic the pass/fail test already uses, just not discarded after the comparison.

- The **sign** follows the same convention as the pass/fail marker: **+** means the cell is higher than what it was compared against, **−** means lower.
- The **magnitude** is independent of the **Significance level** setting — it does not change if you switch that setting from 90% to 99%. Only the pass/fail marker's threshold changes; the confidence level itself is a property of the data.
- If more than one significance test is active on a cell (Significance 1/2/3), the tooltip lists one **Confidence level** line per active test, in the same order as the tests.

:::tip[Reading it together with the marker]
A cell marked "not significant" at your chosen 95% threshold but showing a tooltip confidence level of `91%` is a **near miss**, worth a second look. A cell showing `12%` is nowhere close. The pass/fail marker alone cannot tell you which is which — the tooltip can.
:::

---

## Compared base

Every significance test compares the cell against *something*: the complement of the same row, the table's grand total, a regex-matched reference column, the previous visible column, or the previous row. **Compared base** shows the base of that other side of the comparison — the denominator the cell was actually tested against, not the cell's own base.

| Active test type | What "Compared base" shows |
|---|---|
| Item vs Other Question Item (complement) | The base of everything else in the row (the complement) |
| Item versus Total (Base) | The table's grand total base |
| Regular expression | The base of the regex-matched reference column |
| Previous visible column / Previous row | The base of the previous visible column or row it was compared against |
| All Columns | *(not available — this mode compares against every other column at once, so there is no single "compared" base)* |

If more than one significance test is active on a cell, the tooltip lists one **Compared base** line per active test — numbered **Compared base 1**, **Compared base 2**… in the same order as the tests, exactly like [Significance confidence level](#significance-confidence-level) above.

---

## Gap Mode cells

On [CrossTable InCell Charts](../05-crosstable-charts/overview.md), a cell that belongs to a [Gap Mode](../05-crosstable-charts/gap-mode.md) column doesn't hold an ordinary value — it holds the *gap itself* (main partition − reference). On a percentage table, the number that actually drives the bar/label is the **gap of the vertical percentage**, not a gap of raw counts — so the plain Value line would show an unrelated figure. The tooltip handles this by substituting the driving line (**Vertical %** on a percentage table, **Value** on a mean table) with three lines instead of one:

| Line | Shows |
|---|---|
| *(metric)* **(Gap)** | The gap actually shown on the bar/number — main partition minus its reference. |
| *(metric)* **(Raw)** | The main partition's own value, **before** the gap was computed. |
| *(metric)* **(Reference)** | The value it was compared against (the group's average for "Gap vs average", or the named competitor for "Gap vs 2nd/3rd"). |

*(metric)* is **Vertical %** or the measure's display name, matching whichever one is actually driving that gap column. All three are rounded to that gap column's own **Precision** setting (the [⚙ editor](../05-crosstable-charts/gap-mode.md#per-column-presentation--the--editor)), not the table's general precision — since that is the precision the column is actually rendered at.

This trio only replaces the driving line; the table's ordinary **Compared base** and **Significance confidence level** (borrowed from the significance test assigned to that gap column, see [Significance drives color](../05-crosstable-charts/gap-mode.md#significance-drives-color-the-scale-is-computed-per-column)) still work normally on gap cells.

---

## How it renders

The tooltip is wired to Power BI's native tooltip service (`host.tooltipService`), the same mechanism used by built-in visuals, so it:
- follows the report's light/dark theme automatically,
- positions itself relative to the pointer and stays within the report canvas,
- does not require any extra configuration for touch devices.

Internally, a single set of event listeners is attached to the table (not one per cell), so activating the tooltip has no measurable performance impact even on large tables.

---

## Troubleshooting

**Q: I toggled a content option but nothing changed in the tooltip**
A: Check that **Activate Tooltip** is on — the content sub-card only takes effect once the feature itself is enabled.

**Q: Vertical %/Horizontal % don't appear even though I enabled them**
A: You are looking at a mean table — percentages are not meaningful there and are always skipped (see [Tooltip content](#tooltip-content) above).

**Q: Compared base is empty**
A: The cell's active significance test is **All Columns**, which has no single comparison partner (see [Compared base](#compared-base)), or no significance test is active on that cell at all.

**Q: Significance confidence level is empty**
A: No significance test is active for that cell, or [Significance testing](significance.md) itself is not configured.

**Q: On a Gap Mode column, Value/Vertical % shows a number I can't reconcile with the bar**
A: That's the [Gap Mode cells](#gap-mode-cells) case — the driving line is replaced by a Gap/Raw/Reference trio automatically; look for those three lines instead of the plain one.

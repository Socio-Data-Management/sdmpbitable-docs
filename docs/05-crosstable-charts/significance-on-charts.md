---
sidebar_position: 4
title: Significance on Charts
---

# Significance on Charts

Significance **tests** — what is compared, at what confidence level, with which variance method — are configured exactly the same way as in CrossTable. See [Significance Testing](../04-reference/significance.md) for the full reference (test types, confidence levels, regex targeting, legend). This page only covers what's **different** when the test result decorates a chart (Data Bar / Data Line) instead of a plain table cell.

---

## No "All Columns" (lettered) testing

CrossTable's **All Columns** test type marks each cell with a **letter** (A, B, C…) identifying *which other specific column* it is significantly different from. That only makes sense next to a printed number — there is nowhere to put a legible letter on a 10px-tall bar.

CrossTable InCell Charts therefore only offers:

| Test type | Available |
|---|:---:|
| None | ✅ |
| All columns *(lettered)* | ❌ |
| Item vs question item | ✅ |
| Item versus Total (Base) | ✅ |
| Regular expression | ✅ |

The three remaining test types all produce a simple **verdict per cell** — higher (+1), lower (−1), or not significant (0) — which is exactly what a chart overlay needs.

---

## The chart overlay

Instead of coloring table cell backgrounds/borders and printing letters, each active, **significant** test applies its configured **view** as a chart decoration:

| View | Effect on Data Bar | Effect on Data Line |
|---|---|---|
| **Font color** | Colors the numeric label next to the bar. | *(no label to color — no effect)* |
| **Background color** | Colors the bar's fill — solid, or a gradient if a *Gradient end* color is set for that sign (see [Significance colors](#significance-colors--gradients) below). | *(no fill to color — no effect)* |
| **Marker** | A colored shape (circle / square / diamond / triangle — see [Legend](../04-reference/significance.md#significance-legend)) at the bar's tip. | A colored shape at the data point. |
| **Icon** | The default green/red triangle, or your custom base64 icon, at the bar's tip. | The default/custom icon at the data point. |
| **Border color** | *(not used — border is reserved for CrossTable's plain cell rendering)* | *(not used)* |

Configure the view **per test** (Significance 1 / 2 / 3 each have their own **Significance view option**), exactly as in CrossTable.

### When several tests are significant on the same cell

- **Font color** and **Background color** are single values — if more than one active test requests them on the same cell, the **first** matching test (1, then 2, then 3) wins.
- **Marker** and **Icon** **stack** — you can see, for example, test 1's icon *and* test 2's marker on the same bar tip at once.

---

## Significance colors & gradients

**Location**: Format pane → **Significance** card → **Significance colors** group *(shared with CrossTable)*.

| Setting | Description |
|---|---|
| **Positive — Background start** | Override color for a significantly-higher verdict. Feeds both the table's cell background (in CrossTable) and the chart's Background/Font views (here). Leave empty to use the style theme's default. |
| **Positive — Gradient end** | If set, the Background view becomes a gradient from *Background start* to this color instead of a solid fill. |
| **Negative — Background start** / **Negative — Gradient end** | Same, for a significantly-lower verdict. |
| **Gradient direction** | 6 directions (Top↔Bottom, Left↔Right, both diagonals) — applies to the significance gradient specifically, independent of Data Bar's own axis-to-tip gradient direction (see [Data Bar Colors](data-bar.md#colors)). |

:::tip[Two different gradients, don't confuse them]
Data Bar's **Positive/Negative from/to** (in the *Data Bar* card) color the bar based on its **sign**, regardless of significance. Significance's **Background start/Gradient end** (in the *Significance* card) color it based on a **test's verdict**, and only take effect when *Bar value* is set to a *Follow Signif Rule* and that test's view is *Background color*. When both could apply, the significance colors win — see [Data Bar Colors](data-bar.md#colors).
:::

---

## Marker shapes & custom icons

- **Marker shape** — Circle, Square, Diamond or Triangle, set per test (Significance 1 / 2 / 3), used when that test's view is **Marker**.
- **Custom icon (base64)** — replace the default green/red triangle with your own image, set per test and per direction (**Custom icon positive**, **Custom icon negative**), used when that test's view is **Icon**.

---

## Legend

The [significance legend](../04-reference/significance.md#significance-legend) (labels, suffixes, font) works identically and can be shown under the table regardless of whether the underlying cells are plain numbers or charts.

---

## Grouped charts

The overlay described on this page decorates **individual** Data Bar/Data Line elements. When [Group into one chart](data-bar.md#grouping) is active, grouped series bars/points use their series color only — the significance overlay does not currently apply in grouped mode.

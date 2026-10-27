---
sidebar_position: 8.5
title: Understanding Bases
---

# Understanding Bases

## Overview

The **base** of a cell answers a simple question: *how many respondents is this figure computed on?* It is the denominator behind every percentage and the weight behind every mean. Because the visual re-aggregates data across a column hierarchy (of any depth) **and** across rows, getting the base right requires understanding a few subtleties. This page explains them and gives a decision guide for every layout.

:::tip[Key idea]
Percentages and means are **ratios** — they stay correct even if the base is scaled. The base row, on the other hand, is an **absolute count**, so it is the value most sensitive to how rows and columns are aggregated. If your means look right but the base row looks wrong, this page is for you.
:::

---

## The two base rows

The visual can display two different base rows (see [Totals & Subtotals](./totals.md) to switch them on):

| Row | Reads the series | Meaning |
|-----|------------------|---------|
| **Base** | the *base / count* series (weighted count in a mean table, count in a % table) | The weighted base used as the denominator / weight. |
| **Unweighted Base** | the *unweighted base* series | The raw number of respondents (effectifs), unweighted. |

Both are configured in [Percentage Series](./percentage-series.md) or [Mean Series](./mean-series.md). They are aggregated the **same way** — only the source series differs. If the two disagree in a way that is not explained by weighting, an aggregation setting is wrong.

:::tip[A third base, per cell]
When [significance testing](./significance.md) is active, every cell is also tested against *something* — a complement, a total, a reference column. The **[Cell Tooltip](./tooltip.md#compared-base)** can show that third figure, the **compared base**, without adding a row to the table.
:::

---

## How a base is aggregated

A base value shown on a total or subtotal is built by combining the bases of the **items** it groups: the brands of a year, the modalities of a question, the rows of a block. The question is always the same: **do those items add up?**

- **Items are disjoint respondent groups** (Age, Gender, Region…). Each respondent appears in exactly one item → the bases **add up**.
- **Items are measured on the same respondents** (a battery of 60 satisfaction items, 18 brands rated by the same people, a multiple-answer question). Each respondent appears in **every** item → summing would count them once per item, inflating the base by the number of items.

:::warning[The tell-tale symptom]
If a base (or subtotal) is exactly **your correct value × the number of items**, the base is being summed across items answered by the same respondents. Example: a Direction subtotal showing `5 760` when the detail sums to `120`, with 48 item rows → `120 × 48 = 5 760`. The **means are still correct** because the inflation cancels in the ratio.
:::

---

## The `Sample across items` property

XtendedTable does not have a single global switch. Instead, **every level** of the **Column Headers** and **Row Headers** editors (⚙, in the **Table Headers** card) carries a **Sample across items** property, so each axis — and each level of a deep hierarchy — can be declared independently.

| Value | Rule | Use for |
|-------|------|---------|
| **Disjoint** (default) | Bases **add up** | Demographics, any single-answer variable |
| **Shared** | Bases **do not add up**: a total keeps the base of one item and the average count | Batteries of items, multiple-answer questions |
| **Native** | The base is **read from your measure** in the sub-total context (native Power BI sub-total) | Items shown to partially overlapping subsets of the sample |

The property sits on the level whose **items are combined**. With columns `Year > Brand`, set it on the **Brand** level to control the *Year* sub-total, and on the **Year** level to control the row total across years. On rows, only the last level (leaf rows) is read: higher row levels split the table into independent sub-tables.

:::note
This property only affects **totals and sub-totals**: their **bases** (weighted *Base* and *Unweighted Base*) and the significance complement derived from them. With **Native**, the sub-total's own **value** is also read from your measure. Leaf cells (percentages and means) are never affected.
:::

Full details, the DAX pattern required by **Native** and its limits are in [Sample Across Items](./sample-across-items.md).

### Quick decision guide

| Your items are… | Example | Value |
|-----------------|---------|-------|
| Disjoint respondent groups | Age brackets, Gender, Region, Seniority | **Disjoint** |
| Rated items / measures answered by the same people | 60 satisfaction items, 18 brands rated by everybody | **Shared** |
| Items shown to partly overlapping subsets | 30 items, each respondent sees 10 to 20 | **Native** |
| A single item (one measure) | one KPI over the columns | Any (no aggregation happens) |

---

## Pitfall: a filtered base measure desynchronizes native subtotals

This is a different failure mode from the inflation symptom above, and it is easy to confuse with it. It shows up when the **base measure itself is filtered**, typically because a BLANK row needs to be hidden — e.g. a DAX measure such as `A9_SignifBase = SUM(TableA9[weight])` combined with a visual-level filter **"A9_SignifBase is not blank"**.

:::warning[Why this happens]
Whenever a subtotal/total is read from Power BI's native **Subtotal API** — always for a level set to **Native**, and for means wherever Power BI supplies a native value — the measure is *re-evaluated* in an expanded filter context for the whole group, it is **not** a sum of the values already shown in the visible rows. If the base measure is a `SUM` that is filtered to drop structurally-blank rows, that re-evaluation can still pull in weight that doesn't correspond to anything displayed. The result: a subtotal/total that silently disagrees with what you get by summing the visible rows by hand — even though every individual visible cell looks correct, and the discrepancy carries over into significance tests computed against that base.
:::

**How to recognize it**: recompute a total by hand from the rows Power BI actually displays — if it doesn't match the subtotal/total Power BI shows, and the ratio is *not* a clean "× number of items" (that's the unrelated symptom described above), suspect this instead.

**Fix** — either of:
- Keep the level on **Disjoint** (or **Shared**). The visual then computes the subtotal itself from the cells actually displayed, which stays consistent with a filtered measure. Only use **Native** when the measure is written to be evaluated in the sub-total context (see [Sample Across Items](./sample-across-items.md#native)).
- Or avoid filtering the measure altogether: drag the raw weight **column** into the data well instead of a filtered `SUM` measure. A plain column aggregation is resolved via a row-level relational join *before* aggregation, so structurally-blank rows disappear naturally with no desync — but then you lose the option to filter on anything other than the join itself.

---

## Layout matters: Hierarchical vs Side-by-Side columns

The column layout changes how the base is presented, but the rules above are the same in both.

### Hierarchical columns (nested)

Column variables are nested, with as many levels as you need (e.g. **Direction › Sous-Direction › Site**). You get:

- a base for each **leaf**,
- a base for each **subtotal** at every level that shows one (see **Show sub-total column** in [Totals & Subtotals](./totals.md)), aggregated from its children according to that level's **Sample across items**,
- a grand-total base.

### Side-by-Side columns

When [Side by Side Columns](./table-content.md) is enabled, each column variable is **flattened into its own independent group** placed next to the others. Each group shows the *marginal* base of that variable's modalities.

- For a **single-response** variable, the modality bases within a group add up to the same overall total across every group.
- **Means are re-aggregated from the leaf values** (weighted by the base) for each flattened modality — a transversal modality's mean is the base-weighted average of that modality across all parents.

---

## Percentages vs Means

The base concept is the same for both table types; only which series feeds it differs.

| | Percentage table | Mean table |
|---|---|---|
| Displayed figure | a % (share of a base) | a weighted average |
| Weighted base comes from | the *base* series | the *count* series (also the mean's weight) |
| Unweighted base comes from | the *unweighted base* series | the *unweighted base* series |
| Subtotal value | re-summed / re-based from children | **weighted mean** re-aggregated from children (native Power BI subtotals used when available) |

In a **mean** table, the base doubles as the **weight**: a subtotal mean is `Σ(meanᵢ × baseᵢ) / Σ(baseᵢ)` over its children. This is why an inflated base never corrupts the mean — the same factor appears in the numerator and denominator.

---

## Troubleshooting checklist

- **A subtotal base is a large multiple of the detail** → the items are answered by the same respondents; set **Sample across items** to **Shared** on the level that groups them.
- **A demographic table shows a base that is too small (looks like one group)** → the items are disjoint groups; set **Sample across items** back to **Disjoint**.
- **Items are shown to overlapping subsets and neither the sum nor the largest base is right** → use **Native** with a measure that counts each respondent once.
- **Base and Unweighted Base differ by more than weighting** → check that both series are mapped correctly in [Percentage Series](./percentage-series.md) / [Mean Series](./mean-series.md), and that the unweighted base series is the raw respondent count.
- **Means are correct but bases are not** → this is expected when the property is misconfigured; fix it — the means will not change.
- **A subtotal/total doesn't match the sum of visible rows, but it's not a clean ×N multiple** → see [Pitfall: a filtered base measure desynchronizes native subtotals](#pitfall-a-filtered-base-measure-desynchronizes-native-subtotals). Your base measure is likely filtered (e.g. to hide BLANK rows) while the level reads native sub-totals; switch it back to Disjoint/Shared or feed the raw weight column instead of the filtered measure.

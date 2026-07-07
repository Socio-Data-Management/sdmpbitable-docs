---
sidebar_position: 8.5
title: Understanding Bases
---

# Understanding Bases

## Overview

The **base** of a cell answers a simple question: *how many respondents is this figure computed on?* It is the denominator behind every percentage and the weight behind every mean. Because the visual re-aggregates data across a column hierarchy **and** across rows, getting the base right requires understanding a few subtleties. This page explains them and gives a decision guide for every layout.

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

---

## How a base is aggregated

A base value shown on a total or subtotal is built by combining leaf cells along **two independent axes**.

### 1. Across columns (the hierarchy)

For a nested column hierarchy such as **Direction › Sous-Direction**, the base of a parent column (the *subtotal*) is the aggregate of its child columns. This is always correct: a respondent belongs to exactly one child, so the children partition the parent.

### 2. Across rows

This is the subtle axis. The base of a column is also combined **across the table's rows**, and here the correct operation depends on *what the rows are*:

- **Rows are disjoint respondent groups** (e.g. Age, Gender, Region). Each respondent appears in exactly one row → the bases **add up**. Summing across rows is correct.
- **Rows are repeated items** rated by the **same** respondents (e.g. a battery of 60 satisfaction items, each scored on a scale). Each respondent appears in **every** row → summing would count them once per item, inflating the base by the number of rows.

:::warning[The tell-tale symptom]
If a base (or subtotal) is exactly **your correct value × the number of rows**, the base is being summed across repeated items. Example: a Direction subtotal showing `5 760` when the detail sums to `120`, with 48 item rows → `120 × 48 = 5 760`. The **means are still correct** because the inflation cancels in the ratio.
:::

---

## The `Rows are repeated items` toggle

Because the two situations above are indistinguishable from the data model alone, a single switch controls the row axis:

**Setting**: `Rows are repeated items (don't sum base)`
**Location**: **Table contents** card
**Type**: Toggle
**Default**: **On**

- **On** (default) — rows are treated as repeated items answered by the same respondents. The base is **not** summed across rows; the per-item base is used for column totals **and** subtotals. This is the most frequent case (rating batteries, note-by-note tables).
- **Off** — rows are treated as disjoint respondent groups. The base is **summed** across rows. Use this when your rows are a demographic or any variable where each respondent belongs to a single row.

:::note
This toggle only affects the **base** figures (both the weighted *Base* and the *Unweighted Base*, at leaves, subtotals and the grand total). Percentages and means are unaffected.
:::

### Quick decision guide

| Your rows are… | Example | Toggle |
|----------------|---------|--------|
| Rated items / measures answered by the same people | 60 satisfaction items, each on a 0–10 scale | **On** |
| Disjoint respondent groups | Age brackets, Gender, Region, Seniority | **Off** |
| A single row (one measure) | one KPI over the columns | Either (no row aggregation happens) |

---

## Layout matters: Hierarchical vs Side-by-Side columns

The column layout changes how the base is presented, but the row rule above is the same in both.

### Hierarchical columns (nested)

Column variables are nested (e.g. **Direction › Sous-Direction**). You get:

- a base for each **leaf** (Sous-Direction),
- a base for each **subtotal** (Direction), aggregated from its leaves,
- a grand-total base.

With `Rows are repeated items` **On**, every level shows the respondent base; with it **Off**, every level is summed across rows.

### Side-by-Side columns

When [Side by Side Columns](./table-content.md) is enabled, each column variable is **flattened into its own independent group** placed next to the others. Each group shows the *marginal* base of that variable's modalities.

- For a **single-response** variable, the modality bases within a group add up to the same overall total across every group.
- **Means are re-aggregated from the leaf values** (weighted by the base) for each flattened modality — a transversal modality's mean is the base-weighted average of that modality across all parents.

The `Rows are repeated items` toggle applies identically here: it decides whether the base shown per side-by-side column is summed across rows or not.

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

- **A subtotal base is a large multiple of the detail** → rows are repeated items; make sure `Rows are repeated items` is **On**.
- **A demographic table shows a base that is too small (looks like one group)** → rows are disjoint groups; turn `Rows are repeated items` **Off**.
- **Base and Unweighted Base differ by more than weighting** → check that both series are mapped correctly in [Percentage Series](./percentage-series.md) / [Mean Series](./mean-series.md), and that the unweighted base series is the raw respondent count.
- **Means are correct but bases are not** → this is expected when the row axis is misconfigured; fix it with the toggle — the means will not change.

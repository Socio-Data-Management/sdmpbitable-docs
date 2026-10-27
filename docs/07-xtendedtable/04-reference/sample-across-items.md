---
sidebar_position: 8.7
title: Sample Across Items
---

# Sample Across Items: Disjoint, Shared, Native

## Overview

Every level of the **Column Headers** and **Row Headers** editors (⚙, in the **Table Headers** card) has a **Sample across items** property. It tells the visual how to build the **base of a total or sub-total** from the bases of the items it groups (the brands of a year, the modalities of a question…).

It replaces the former global "Multiple answer?" and "Rows are repeated items" toggles: the nature of the sample is now declared where it belongs, **per level**, with no limit on the number of levels.

| Value | Short rule | Setup |
|---|---|---|
| **Disjoint** (default) | Bases **add up** | Nothing to do |
| **Shared** | Bases **do not add up**: the total keeps the base of one item | One switch |
| **Native** | The base comes from **your measure**, evaluated in the sub-total context | A dedicated DAX measure |

The property sits on the level whose **items are combined**. With columns `Year > Brand`, set it on the **Brand** level to control the *Year* sub-total, and on the **Year** level to control the row total across years. On rows, only the last level (leaf rows) is read; the ancestor row levels split the table into independent sub-tables, so setting it there has no effect.

:::note
The property is always visible in the editor, even if the level's header label is hidden.
:::

---

## Disjoint

The simplest mode, and the right one for **single-answer variables**: each respondent falls in exactly one item (Gender, Age bracket, Country…). The groups are distinct sub-populations, so the base of a total is the **sum** of the bases of its items. Nothing else to set up.

---

## Shared

Same as Disjoint, with one rule: **do not cumulate the bases**. Use it for **multiple-answer variables** and for batteries of items rated by the *same* people (a respondent names every brand they know). The items can score differently but their bases are identical, so:

- the base of the total is the base of **one** item (the largest),
- its value is the **average** count across the items, so `value / base` stays the cumulated percentage,
- the horizontal percentage of the children is still computed on the sum of their values (share of citations),
- the significance tests stop comparing a cell with a "rest of the sample" inflated by the sum of the bases.

Shared is exact when every respondent is asked every item. It is only a lower bound of the real base when the items were shown to **partly overlapping** subsets of the sample.

Comparisons between two cells remain treated as independent samples (no covariance is modeled), which makes the tests conservative.

---

## Native

The complex case. The visual stops computing the base of a sub-total and reads the value that **Power BI returns for your measure in the sub-total context** (the native sub-total API). Base, unweighted base and value of the sub-total are all read from the measure.

Use it when **not every item is shown to every respondent**: for example one quarter of the sample sees the first 10 of 30 items, 60 % see the first 20 and 15 % see the last 20. From the aggregated bases of the items, nobody can tell how many respondents the groups have in common, so neither the sum (too large) nor the largest base (too small) is the true base of the sub-total. Only a measure computed on respondent-level data can give it.

**The measure must count each respondent once in the sub-total context.** With one table row per respondent × item, a plain `SUM` counts a respondent once per item at the sub-total:

```dax
-- Wrong at sub-totals: a respondent shown 16 brands is counted 16 times
Weight_Base = SUM ( 'Fact'[Weight] )

-- Right: one weight per respondent, whatever the number of items in the filter context
Weight_Base =
SUMX (
    SUMMARIZE ( 'Fact', 'Fact'[Country], 'Fact'[Year], 'Fact'[Wave], 'Fact'[RespondentId] ),
    CALCULATE ( MAX ( 'Fact'[Weight] ) )
)
```

On an item cell it returns the base of that item (the filter keeps the respondents shown the item). On a sub-total it returns the real union of respondents exposed to at least one item.

### Checklist

1. Check the measure first in a native Power BI table: its sub-total row must show the expected union (not Σ of the items).
2. Turn the **sub-totals on** for the matrix (they are the source of the native values).
3. Put the base measure in the base series; if the displayed values and the unweighted base also need a sub-total context, give them a measure written the same way.
4. Set **Native** on the level that groups the items.

### Behaviour and limits

- Where Power BI returns no sub-total (sub-totals off, BLANK), the visual falls back to the Disjoint sum.
- Native applies to **column groups and the total of a row**. On the rows axis it behaves as Disjoint (no row sub-total is read).
- The horizontal percentage of the children stays computed on the sum of their values (share of citations); only the node's own value and bases are native.
- **Significance tests against the rest of the row** ("Item vs Other Question Item"): a native sub-total gives the union of a group, never "the group minus this cell", so it cannot supply the base of the complement. Native therefore uses the **Shared** rule for that complement: the base of the rest is the **largest** base among the other items, not their sum (which would be roughly `45,000 − 2,500` instead of about `2,500`). It is a lower bound of the true base, which makes the test conservative. There is no separate setting for it: Native exists precisely because the items overlap, so summing their bases is never right. Check the base actually used with the **Compared base** line of the [tooltip](./tooltip.md#compared-base).
- **Mean tables** already use the native sub-total wherever Power BI supplies one, whatever the property: Native matters for **percentage** tables.
- A **filtered** base measure can desynchronize native sub-totals — see [Understanding Bases → pitfall](./understanding-bases.md#pitfall-a-filtered-base-measure-desynchronizes-native-subtotals).

---

## Effective size and weighted samples

On weighted data the precision of a proportion depends on the **effective base** (raw N × design effect E, with E = (Σ weights)² / (N × Σ weights²)), not on the weighted base. To use it in the tests:

1. Provide a measure that returns the effective base and map it to **Effective base series** in the [% series usage](./percentage-series.md#effective-base-series) card.
2. Choose **Separate (effective base)** as the variance method in [Significance Testing](./significance.md#variance-method-percentage-tables-only).

The effective base is used as the denominator of each group's variance; P1 and P2 still come from the values and base series. Cells without an effective base fall back to their raw base.

---

## Which value should I pick?

| Situation | Value |
|---|---|
| Single-answer question, demographics | **Disjoint** |
| Multiple-answer question, battery of items asked to everyone | **Shared** |
| Items asked to partly overlapping subsets, you can write a respondent-level measure | **Native** |

See also [Understanding Bases](./understanding-bases.md), [Percentage Series](./percentage-series.md) and [Totals & Subtotals](./totals.md).

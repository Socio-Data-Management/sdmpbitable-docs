---
sidebar_position: 6.8
title: Title Constants
---

# Title Constants Reference

## Overview

The **Title Constants** card holds up to five text values and five numeric values that the free-text settings of the ⚙ editors can reference. Each one carries Power BI's own **fx** button, so it is normally **bound to a measure** rather than typed — which is what makes a column title follow the report's filters.

**Location**: Format pane → **Title Constants** card.

It exists for one reason: a title that changes with the data needs a value *from* the data, and the obvious way to get one — dropping a label measure in a data well — is the expensive way.

:::info[Why not just put the measure in a well]
A measure placed in **Values** is returned by the engine for **every intersection of the matrix**: thousands of copies of the same string, for a title that needs it once. It also adds a measure to the query, which shifts the position of every other series. A constant bound through fx is evaluated outside the data wells, so the matrix keeps exactly the shape it had.
:::

---

## The two counters

| Field | Range | Default | Description |
|---|---|---|---|
| **Number of string constants for title** | 0–5 | 0 | How many **ConstantString** boxes are shown below. |
| **Number of numeric constants for title** | 0–5 | 0 | How many **ConstantNum** boxes are shown below. |
| **Decimals of numeric constants** | Auto, 0–4 | Auto | Shown once at least one numeric constant is. Applies to all of them. |

Both counters only control **visibility**. Lowering a counter hides boxes, it never clears them: set 5, fill them, drop to 2 and back to 5 — the five values are still there. So they are safe to play with, and the pane stays short when you only need one constant.

:::note[Why a counter and not an *Add* button]
The number of boxes **shown** is free, because the formatting pane is rebuilt from code on every render. The number that can **exist** is not: every field in the pane must be declared once and for all in the visual's capabilities, which is the only channel Power BI persists through. Hence five of each, with a counter hiding the rest. (The trick that gives one color picker per series does not apply here — its repetition comes from a *selector built from the data*, and these constants are deliberately disconnected from any series.)
:::

---

## Binding one, then using it

1. Set **Number of string constants for title** to 1 — **ConstantString1** appears.
2. Hover it and click the **fx** button, then bind it to a measure returning a single label, e.g.

   ```dax
   Wave label = SELECTEDVALUE(Survey[Wave])
   ```

3. Open the ⚙ editor of the columns and write the reference in the **Column title**:

   ```
   Gap vs market — %[ConstantString1]
   ```

The picker under the title box lists the constants currently shown, each with a preview of its value (`ConstantString1 — T4 2026`), and inserts the reference for you.

### Substitution, not replacement

The reference is replaced **inside** the text; everything around it is kept:

| Typed | Rendered, `ConstantNum1` = 14 |
|---|---|
| `Rank` | Rank |
| `Rank (/%[ConstantNum1])` | Rank (/14) |
| `%[ConstantNum1]` | 14 |
| `%[ConstantNum1]/%[ConstantNum1]` | 14/14 |

Name matching ignores case, spaces and punctuation, so `%[ConstantNum1]`, `%[constant_num1]` and `%[CONSTANTNUM1]` are the same constant.

### What happens when it doesn't resolve

- A name matching **no** constant stays on screen as `%[Typo]` — a misspelling is visible rather than silent.
- A constant that resolves to nothing gives an empty string. For a Gap Mode column whose whole title was that one reference, the column falls back to its default title rather than showing a blank header.
- **Numeric constants and the raw double**: a measure bound through fx arrives unformatted, so a count can come back as `13.9999999`. **Decimals = Auto** rounds that to `14`; set an explicit 0–4 when you want a fixed number of decimals. If you need a thousands separator or a currency, format the value in DAX and use a *string* constant instead.

:::tip[The data-well route still works]
`%[My measure]` also resolves against the fields actually present in the data wells, taking that field's first value. It is kept as a silent fallback for reports that already carry such a field — but the ⚙ picker does not offer it, because of the per-intersection cost described above.
:::

---

## Where the references are accepted

| Visual | Setting |
|---|---|
| CrossTable InCell Charts | **Column title** of each [Gap Mode](gap-mode.md#a-title-that-follows-the-data) column (⚙ editor) |
| SDM Funnel | **Column title** of each extra column (⚙ editor) |

---
sidebar_position: 7
title: "Tutorial: Configuring Gap Mode"
---

# Tutorial: Configuring Gap Mode

This is a step-by-step walkthrough of setting up [Gap Mode](gap-mode.md) end to end, on a concrete example: a mean table of **satisfaction score by Brand**, where we want each brand's own column group collapsed into "how does *our* brand compare" instead of showing every competitor's raw score.

Gap Mode has more moving parts than a typical card — it touches **significance test slots** as well as its own card — so this tutorial exists alongside the [Gap Mode reference](gap-mode.md) rather than instead of it: come back here for the "what do I click, in what order" version, and to the reference page for the exhaustive field list.

:::note[Starting point]
This tutorial assumes you already have a working CrossTable InCell Charts table with [Data Bar](data-bar.md) rendering normally (or you're happy to let step 1 turn it on for you), and a column hierarchy where one level's partitions include your "main" brand alongside its competitors.
:::

---

## What we're building

Before: one column per brand, each showing a plain percentage.

```
┌────────────┬─────────┬─────────┬─────────┬─────────┐
│            │ Brand A │ Brand B │ Brand C │ Brand D │
├────────────┼─────────┼─────────┼─────────┼─────────┤
│ Would buy  │   62%   │   58%   │   71%   │   49%   │
└────────────┴─────────┴─────────┴─────────┴─────────┘
```

After (Brand A is "ours"): the group collapses to gap columns.

```
┌────────────┬──────────────────┬──────────────────┐
│            │  Gap vs average   │   Gap vs 2nd      │
│            │   (vs. group)     │  (vs. Brand C)    │
├────────────┼──────────────────┼──────────────────┤
│ Would buy  │      ▬▬▮ -3       │      ▬▬▬▮ -9       │
└────────────┴──────────────────┴──────────────────┘
```

📸 **Screenshot** `tutorial-gapmode-before-after.png` — side-by-side (or before/after toggle) of the same table with Gap Mode off, then on. Insert here.

---

## Step 1 — Turn on Gap Mode

Format pane → **Gap Mode** card → **Gap mode** toggle → On.

This automatically turns **Data Bar** on if it wasn't already (and turns off Data Line, since the two are mutually exclusive — see the [Gap Mode reference](gap-mode.md#overview)).

📸 **Screenshot** `tutorial-gapmode-step1-toggle.png` — the Gap Mode card with the master toggle switched on, showing the rest of the card appear.

---

## Step 2 — Point Gap Mode at your columns

Still in the **Gap Mode** card:

| Field | What to type for this example |
|---|---|
| **Main partition** | `Brand A` — the exact label of your own brand's column. A regex also works if the label varies (e.g. `Brand A.*`). |
| **Second partition** | `Brand C` — your main competitor. Leave empty if you only want **Gap vs average**. |
| **Third partition** | *(empty for this example)* |
| **Gap vs average column** | On (default) |

📸 **Screenshot** `tutorial-gapmode-step2-partitions.png` — the three partition fields filled in.

At this point the table already re-renders with gap columns — but every bar is **gray**, because no significance test has been told which comparison to drive which column yet. That's step 3.

📸 **Screenshot** `tutorial-gapmode-step2-graybars.png` — the table showing gray "not significant" gap bars, to make the next step's *before* state obvious.

---

## Step 3 — Wire up significance (the part that trips people up)

Gap Mode doesn't invent its own comparison logic — it borrows verdicts from the table's existing **Significance 1/2/3** slots (Format pane → **Significance Testing** card), the same three slots used everywhere else in the table. The rule:

- **Gap vs average** is driven by any slot whose test type is *not* **Partition Gap**.
- **Gap vs 2nd** / **Gap vs 3rd** are driven by the **one** slot set to **Partition Gap**.

For this example:

| Slot | Test type | Drives |
|---|---|---|
| **Significance 1** | Item vs question item | **Gap vs average** |
| **Significance 2** | *(unused — set to None)* | — |
| **Significance 3** | **Partition Gap** | **Gap vs 2nd** (Brand A vs Brand C) |

📸 **Screenshot** `tutorial-gapmode-step3-signif1.png` — Significance Testing card, slot 1 set to *Item vs question item*, view = Background color (or your preferred view).

📸 **Screenshot** `tutorial-gapmode-step3-signif3.png` — slot 3 set to **Partition Gap**, with its own view option.

📸 **Screenshot** `tutorial-gapmode-step3-result.png` — the table now showing colored (green/red) gap bars instead of gray.

:::tip[If you only need Gap vs average]
Skip the **Partition Gap** slot entirely — any ordinary test type in Significance 1 or 2 is enough to color **Gap vs average**. You only need a **Partition Gap** slot when **Second partition** and/or **Third partition** are configured.
:::

:::warning[Still gray after this step?]
Re-check the exact label typed in **Main partition** / **Second partition** against what the column header actually displays — see [Troubleshooting → "Main partition … not found"](gap-mode.md#troubleshooting). The orange warning banner under the table (if present) tells you exactly what's missing.
:::

---

## Step 4 — Style the gap columns (the ⚙ editor)

With **Gap mode** on and the report in **Edit** view, a **⚙** icon appears at the top-right of the visual. Click it to open the per-column editor — one block per active gap column.

📸 **Screenshot** `tutorial-gapmode-step4-icon.png` — the ⚙ icon location on the visual.

📸 **Screenshot** `tutorial-gapmode-step4-editor.png` — the editor open, showing the **Gap vs average** block: Title, Render (Bar), Precision, colors.

For this example, set:

| Field | Value |
|---|---|
| **Title** | *vs. category average* |
| **Render** | Bar |
| **Precision** | 0 |
| **Positive color** | `#6AA84F` (default green) |
| **Negative color** | `#CC0000` (default red) |

Repeat for the **Gap vs 2nd** block — try **Render: Number** instead of **Bar** to see the difference (a plain colored figure, no bar), and toggle **Show separator** to visually detach it from **Gap vs average**.

📸 **Screenshot** `tutorial-gapmode-step4-numberrender.png` — a Gap vs 2nd column rendered as **Number** next to a Gap vs average column rendered as **Bar**, showing the visual contrast.

---

## Step 5 — Read the result

Hover any gap cell: the [Cell Tooltip](../04-reference/tooltip.md#gap-mode-cells) shows the **Gap**, the **Raw** (Brand A's own value) and the **Reference** value it was compared against — useful for sanity-checking the arithmetic without leaving the report.

📸 **Screenshot** `tutorial-gapmode-step5-tooltip.png` — the native tooltip open on a gap cell, showing Gap / Raw / Reference.

---

## Optional — keep the raw value alongside the gaps

Turn on **Keep main partition column** (Gap Mode card) to prepend Brand A's own raw score as a first column, before the gap columns — useful when the audience still wants to see "62%", not just "-3 points".

📸 **Screenshot** `tutorial-gapmode-optional-keepmain.png` — the table with the raw Brand A column kept, followed by the gap columns.

---

## Full settings recap

| Card | Setting | Value |
|---|---|---|
| Gap Mode | Gap mode | On |
| Gap Mode | Main partition | `Brand A` |
| Gap Mode | Second partition | `Brand C` |
| Gap Mode | Gap vs average column | On |
| Significance Testing | Significance 1 | Item vs question item |
| Significance Testing | Significance 3 | Partition Gap |
| ⚙ editor | Gap vs average → Render | Bar |
| ⚙ editor | Gap vs 2nd → Render | Number |

For every field's full range of options and defaults, see the [Gap Mode reference](gap-mode.md).

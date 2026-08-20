---
sidebar_position: 5
title: Gap Mode
---

# Gap Mode Reference

## Overview

**Gap Mode** replaces the ordinary partition columns of a column group with 1 to 3 synthetic **écart (gap) columns**, each showing how far a chosen "main" partition sits from the group's average or from a named competitor — the classic *"our brand vs. the market"* comparison chart.

Instead of reading raw values for every brand/model in a group, Gap Mode collapses that group down to the number(s) that actually matter: how the main partition compares.

**Location**: Format pane → **Gap Mode** card → master toggle **Gap mode**.

:::note[A transformation, not a new engine]
Gap Mode does not add a new calculation engine. It transforms the column tree *after* significance testing and *before* the bar/line scales are computed, replacing each group's partitions with up to three terminal columns. Everything downstream — headers, Data Bar, Data Line, masking, thresholds, freeze panes, Excel export — treats those gap columns like any other column, because that's exactly what they become.
:::

---

## What each gap column shows

| Gap column | Setting | What it computes |
|---|---|---|
| **Gap vs average** | Gap vs average column (`gapShowAverage`) | Main partition **minus the total of its column group** (the group's parent node) — not the complement, the group's total. |
| **Gap vs 2nd** | Second partition (`gapSecondPartition`) | Main partition minus the named **second partition**. |
| **Gap vs 3rd** | Third partition (`gapThirdPartition`) | Main partition minus the named **third partition**. |

Only the gaps you configure are produced — leave **Second partition** / **Third partition** empty (and/or turn off **Gap vs average column**) to drop the corresponding column. If **no** gap column resolves in a given group of columns, that group is left untouched (raw partitions still show).

---

## Configuration

**Location**: Format pane → **Gap Mode** card.

| Setting | Type | Default | Description |
|---|---|---|---|
| **Gap mode** (`showGapMode`) | Toggle | Off | Master switch. Turns the transformation on for every column group in the table. |
| **Main partition** (`gapMainPartition`) | Text (constant or rule) | *(empty)* | Name — or regular expression — of the column holding the partition you want to compare (e.g. your own brand or model). Every gap is computed **from** this column. Type the label exactly as it displays, or a regex to match it dynamically. |
| **Second partition** (`gapSecondPartition`) | Text (constant or rule) | *(empty)* | Name/regex of the first competitor. Leave empty to drop the **Gap vs 2nd** column. |
| **Third partition** (`gapThirdPartition`) | Text (constant or rule) | *(empty)* | Name/regex of the second competitor. Leave empty to drop the **Gap vs 3rd** column. |
| **Gap vs average column** (`gapShowAverage`) | Toggle | On | Adds the **Gap vs average** column. |
| **Keep main partition column** (`gapKeepMainValue`) | Toggle | Off | Also keeps the raw value of the main partition itself, as the first column of the group (before the gap columns), so the audience can see the absolute figure alongside the gaps. |
| **Gap columns (JSON)** (`gapColumnFormat`) | Text area | `[]` | Holds the per-column presentation produced by the **⚙ editor** below. Managed automatically — left visible mainly so a configuration can be copy/pasted between reports. |

The **Main / Second / Third partition** fields accept a `ConstantOrRule` value, exactly like [Significance Testing's regex targeting](../04-reference/significance.md#regular-expression) — a plain label matches that exact column, or a regular expression matches dynamically across a changing set of column labels.

---

## Per-column presentation — the ⚙ editor

Gap columns don't get individual Format-pane slices (that would mean the same dozen settings × three columns). Instead, a **⚙ gear icon** appears at the top-right of the visual whenever the report is in **Edit mode** and Gap Mode is on. Clicking it opens the same schematized editor used by other SDM visuals, with one block per active gap column (only the ones actually enabled by **Second/Third partition** and **Gap vs average column** are listed).

| Field | Options / Range | Default | Description |
|---|---|---|---|
| **Title** | Text | *Gap vs average* / *Gap vs 2nd* / *Gap vs 3rd* | Header label for the column. |
| **Render** | Bar, Bar only, Number | Bar for *Gap vs average*, Number for the others | **Bar** = diverging bar + numeric label (like Data Bar). **Bar only** = bar without the label. **Number** = colored figure only, no bar. |
| **Precision** | 0–6 decimals | 0 | Decimals shown on the numeric label. |
| **Force sign** | Toggle | Off | Always prefix positive gaps with `+`. |
| **Positive / Negative / Neutral color** | Color | Green `#6AA84F` / Red `#CC0000` / Gray `#9E9E9E` | Colors the bar and/or the number according to the significance verdict for that gap (see [below](#significance-drives-color-the-scale-is-computed-per-column)). |
| **Background** | Color | Transparent for *Gap vs average*, light gray `#EFEFEF` for the others | Cell background — the "chip" look behind a Number-mode gap. |
| **Font family / size** | Text / 5–40 px | Segoe UI / 10 px | Label typography. |
| **Bold / Italic / Underline** | Toggle | Bold on for *Gap vs 2nd*/*Gap vs 3rd* | Label style. |
| **Column width** | 0–400 px | 0 (automatic) | Forces the column's pixel width. |
| **Bar thickness** | 0–60 px | 0 (inherits the [Data Bar](data-bar.md#sizing) card's bar height) | Only relevant when Render is Bar/Bar only. |
| **Show separator** + **Separator color** | Toggle + Color | Off / `#CCCCCC` | Draws a vertical rule to the left of the column — useful to set a gap column visually apart from the raw partitions kept via **Keep main partition column**. |

Changes made in the editor are saved back into **Gap columns (JSON)** and persist with the report, like any other formatting property.

---

## Significance drives color, the scale is computed per column

Each gap column borrows its verdict from one of the table's three existing significance tests — reusing the same configuration described in [Significance Testing](../04-reference/significance.md), not a separate statistic:

- **Gap vs average** ← **Significance 1**
- **Gap vs 2nd** ← **Significance 2**
- **Gap vs 3rd** ← **Significance 3**

For the comparison to make sense, configure:

- **Significance 1** as **Item vs question item** (compares the main partition to the complement — i.e. to the rest of the group, which is what "vs average" needs).
- **Significance 2** / **Significance 3** as **Regular expression**, each targeting the second/third partition.

:::warning[Missing test configuration]
If a gap column is enabled but its matching significance test is left at **None**, the visual shows an orange warning banner under the table (*"Gap mode: no significance test set for … — those gaps are shown as 'not significant'"*) rather than silently rendering everything gray.
:::

Two different numbers feed a gap column, and they are allowed to differ slightly:

- The bar's **length** and the number's **value** come from the plain arithmetic gap (main − reference), computed by the Gap Mode transformation itself.
- The bar's/number's **color** comes from the assigned significance test's verdict (higher / lower / not significant) — and a test like *Item vs question item* does not compare strictly to the same reference the gap was computed against, so a visually large gap can occasionally show as "not significant" colored, or vice versa. This mirrors how [Follow Signif mode](data-bar.md#bar-value--what-drives-the-length) already works on plain Data Bars.

Each gap column gets its **own bar scale** (`min`/`max` computed from the actual gaps found in that column) rather than sharing the table-wide axis Data Bar normally uses — so a *Gap vs average* column ranging −6…+21 points doesn't get visually crushed by a *Gap vs 2nd* column ranging −28…+3.

---

## Other data role priority & table type

Gap columns follow the same **Value → Vertical % → Horizontal % → Indice** priority as the rest of the table (see [Table Content](../04-reference/table-content.md)) for what "the" quantity being compared actually is: percentage points on a Percentage table, the raw mean on a Mean table.

---

## What still works unchanged

Because the transformation mutates the same column tree the rest of the visual already renders from, everything else keeps working without special-casing:

- **Headers** — the gap columns' headers replace the group's partition headers directly, keeping the same hierarchy level.
- **Totals & thresholds** — a gap column participates in totals/masking like any terminal column.
- **Sorting, logos, styles, freeze panes, Excel export** — unaffected.
- **Data Bar / Data Line cards** — Gap Mode's own bars are rendered via the same Data Bar renderer (forced into a per-column *Follow Signif* style), so **Bar height**, **Zero axis** and other Data Bar sizing settings still apply unless overridden per-column via **Bar thickness**.

---

## Troubleshooting

- **"Main partition … not found" warning** → the **Main partition** text must match a column label exactly (or be a valid regular expression). Check the column headers seen for that group, listed in the warning message.
- **A whole group is left unchanged** → Gap Mode only transforms groups where the main partition actually resolves; groups without it keep their raw partitions and the warning lists which group(s) were skipped.
- **A gap column is always gray** → its significance test is set to **None** — see [Significance drives color](#significance-drives-color-the-scale-is-computed-per-column) above.
- **⚙ icon not visible** → it only appears in the report's **Edit** view (not Reading view) and only while **Gap mode** is on.

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

:::note[Gap Mode requires Data Bar]
A **Bar**/**Bar only** gap column renders through the same engine as an ordinary [Data Bar](data-bar.md) — its colors, thickness, orientation and axis style come from that card. The two toggles are kept in sync automatically: turning **Gap mode** on turns **Data Bar** on too if it wasn't already (turning off [Data Line](data-line.md) in the process, since Data Bar and Data Line are mutually exclusive); turning **Data Bar** off while Gap Mode is active turns Gap Mode off with it, rather than leaving it rendering against a chart engine that's no longer configured.
:::

---

## What each gap column shows

| Gap column | Setting | What it computes |
|---|---|---|
| **Gap vs average** | Gap vs average column (`gapShowAverage`) | Main partition **minus the total of its column group** (the group's parent node) — not the complement, the group's total. |
| **Gap vs 2nd** | Second partition (`gapSecondPartition`) | Main partition minus the named **second partition**. |
| **Gap vs 3rd** | Third partition (`gapThirdPartition`) | Main partition minus the named **third partition**. |

Only the gaps you configure are produced — leave **Second partition** / **Third partition** empty (and/or turn off **Gap vs average column**) to drop the corresponding column. If **no** gap column resolves in a given group of columns (none of the configured Second/Third patterns match anything in that group), that group is left untouched (raw partitions still show).

:::note[A group missing the main partition itself is rendered blank, not left untouched]
This is different from the case above: if the **main partition** doesn't exist in a given group at all (common on a **side-by-side** table where each side-by-side table doesn't carry the exact same set of partitions — e.g. a model sold in one country but not another), that group still gets the **same gap columns** as every other group, but **blank** — no bar, no number — rather than keeping its original, differently-shaped set of partition columns. This keeps every side-by-side table's column structure identical. See [Troubleshooting](#troubleshooting).
:::

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

The three tables-wide significance tests (**Significance 1/2/3**, configured exactly as in [Significance Testing](../04-reference/significance.md)) don't map to gap columns one-for-one by slot number. Instead, **what a test compares determines which gap column it can decorate**:

- **Gap vs average** is decorated by **any and all** of the three tests whose type is *not* **Partition Gap** — Item vs question item, Item versus Total, Regular expression, Previous visible column, Previous row… Several can target it **at once**: exactly like an ordinary table cell, icon/marker decorations from different tests **stack**, while font-color/background-color use the **first** active, significant test among them (Significance 1, then 2, then 3) — see [Combining tests with the same symbol](../04-reference/significance.md#combining-tests-with-the-same-symbol).
- **Gap vs 2nd** and **Gap vs 3rd** are decorated by the **one** test (if any) whose type is set to **Partition Gap**. That single test is computed **twice**, freshly, specifically for Gap Mode: once as *main partition vs. Second partition*, once as *main partition vs. Third partition* — using the same **Significance level** and **Signif. Var. Method** settings as every other test, but a comparison no other test type can express (they all compare within the *current* column tree; Gap Mode's main/2nd/3rd are three separate columns being explicitly related to each other).

Set this up by assigning **one** of the three significance slots to **Partition Gap** (its own **Significance view option** — icon, font color, background color or border color — applies as usual), and leaving the other one or two slots on whichever test type should decorate **Gap vs average**:

| Example test setup | Decorates |
|---|---|
| Significance 1 = *Item vs question item*, view = Background color | **Gap vs average** — colors the bar (or the number's background, depending on **Render**) |
| Significance 2 = *Regular expression* (e.g. matching a prior year's masked columns), view = Icon | **Gap vs average** — an icon stacks alongside Significance 1's background |
| Significance 3 = *Partition Gap*, view = Icon | **Gap vs 2nd** *and* **Gap vs 3rd** — main vs. **Second partition** / main vs. **Third partition** |

:::warning[Missing test configuration]
If **Gap vs average** is shown but none of the three tests has a type other than *None*/*Partition Gap*, or if **Gap vs 2nd**/**Gap vs 3rd** is shown but no test is set to **Partition Gap**, the visual shows an orange warning banner under the table (*"Gap mode: no significance test set for … — those gaps are shown as 'not significant'"*) rather than silently rendering everything gray. Setting **more than one** test to **Partition Gap** also warns — only the lowest-numbered one is used.
:::

Two different numbers feed a gap column, and they are allowed to differ slightly:

- The bar's **length** and the number's **value** come from the plain arithmetic gap (main − reference), computed by the Gap Mode transformation itself — this never depends on which significance test is active.
- The bar's/number's **color** comes from the deciding test's verdict (higher / lower / not significant), as described above. For **Gap vs average**, a test like *Item vs question item* does not compare strictly to the group's total (it compares to the complement), so a visually large gap can occasionally show as "not significant" colored, or vice versa — this mirrors how [Follow Signif mode](data-bar.md#bar-value--what-drives-the-length) already works on plain Data Bars. **Gap vs 2nd**/**Gap vs 3rd** under **Partition Gap** don't have this mismatch: the verdict is computed against the *exact* same reference the gap itself is measuring.

:::note[Bar vs. Number: what the deciding test's "view" actually changes]
On a **Bar**/**Bar only** column, the bar's fill always follows the deciding test's verdict (higher/lower/not significant) — this is the same "Follow Signif Rule" behavior an ordinary [Data Bar](data-bar.md#bar-value--what-drives-the-length) already has, independent of that test's own **Significance view option**. Any *other* active test can still add an icon/marker on top, or take over the fill via **Background color** (first match wins, same rule as [Combining tests](../04-reference/significance.md#combining-tests-with-the-same-symbol)). **Border color**, on either render, colors the gap cell's own border — the one view that behaves identically whether the column renders as a bar or a plain number.

On a **Number** column there is no bar to fall back on, so the deciding test's **Significance view option** is what decides everything: **Font color** colors the figure itself, **Background color** colors the cell, **Icon**/**Marker** adds a symbol next to the figure. Pick **Font color** if you want the plain colored number you'd get from a Bar/Number column before this behavior existed.
:::

:::note[On a Bar column, the numeric label never mirrors the bar's own color]
The bar's fill follows the deciding test's verdict, as described above — but the **numeric label** next to it only takes a color from an **active test whose view is Font color**. Absent one, the label stays in that column's configured **Neutral color** (see the ⚙ editor above), regardless of whether the bar itself is green or red. A green bar next to a green number is a coincidence of both following the *same* test's positive verdict — not the label "matching its bar".
:::

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

## Explaining a gap: the tooltip

A gap column only ever shows the arithmetic result (main − reference) — not the two numbers that produced it. The [Cell Tooltip](../04-reference/tooltip.md#gap-mode-cells) fills that gap (pun intended): hovering a gap cell shows the **Gap**, the **Raw** (main partition's own value) and the **Reference** value side by side, at that column's own **Precision** setting.

---

## Troubleshooting

- **"Main partition … not found" warning** → the **Main partition** text must match a column label exactly (or be a valid regular expression), in **at least one** group across the whole table (side-by-side tables included) — Gap Mode can't locate where to insert gap columns for the table type otherwise. Check the column headers seen, listed in the warning message.
- **A group renders blank instead of showing gaps** → that specific group doesn't have a column matching **Main partition** (while another group elsewhere in the table does) — see the note under [What each gap column shows](#what-each-gap-column-shows). The warning banner ("main partition missing in *N* column group(s) — those groups are left blank") tells you how many groups this affects; this is expected when a partition (e.g. a model) genuinely isn't present everywhere.
- **A gap column is always gray** → **Gap vs average** needs at least one of the three tests set to something other than *None*/*Partition Gap*; **Gap vs 2nd**/**Gap vs 3rd** need one test set to **Partition Gap** specifically — see [Significance drives color](#significance-drives-color-the-scale-is-computed-per-column) above.
- **⚙ icon not visible** → it only appears in the report's **Edit** view (not Reading view) and only while **Gap mode** is on.

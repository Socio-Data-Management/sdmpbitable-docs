---
sidebar_position: 6
title: Table Headers
---

# Table Headers Reference

## Overview

**Table Headers** controls how column and row header levels look — background, font, an optional logo, and (for row headers) the overall layout. It replaces CrossTable's fixed, level-capped settings (`Column Logo Lv1/Lv2/Lv3`/`Row Logo Lv1/Lv2` data roles, `Top-Level`/`Sub-Level Column Header`, `Row header format` — see [Logos in Headers](../04-reference/logos.md) and [Custom Element Formatting](../04-reference/formating/formatting-custom.md), which still describe CrossTable's own mechanism) with **two schema-driven editors** — Column Headers and Row Headers — each managing an open-ended list of per-level presentation blocks.

:::info[CrossTable InCell Charts only]
This page describes a mechanism that only exists in CrossTable InCell Charts. CrossTable itself still uses the fixed level-suffixed settings and dedicated logo data roles documented under [Logos in Headers](../04-reference/logos.md) and [Custom Element Formatting](../04-reference/formating/formatting-custom.md).
:::

:::tip[Want to bind logos from a DAX measure?]
See the [Header Logos tutorial](tutorial-header-logos.md) for a full, click-by-click walkthrough — from base64-encoding your images to wiring a `CONCATENATEX` measure into the **Header logos** lookup.
:::

**Location**: Format pane → **Table Headers** card, holding two JSON text fields (`Column headers`, `Row headers`) managed through their own **⚙ gear icons**, plus a **Header logos** field with its own **⚙**. The gear icons appear at the top-right of the visual in the report's **Edit** view.

---

## The ⚙ editors — Column editor / Row editor

Click the **🏛️** icon (**Column editor**) or **📝** icon (**Row editor**) to open the editor. Each opens the same schema-driven dialog used elsewhere in the visual (e.g. [Gap Mode's column editor](gap-mode.md#per-column-presentation--the--editor)), with **one block per header level** and an **Add level** button:

| Editor | Levels | Cap |
|---|---|---|
| **Column editor** | One block per column-header depth (Level 1 = outermost) | None — add as many levels as your column hierarchy has. |
| **Row editor** | Level 1 (outer, only meaningful with 2-level row grouping) / Level 2 (inner) | 2 — row grouping never produces more than 2 row levels in this visual. |

A level with **no** block configured simply shows the active style theme's default — you only need to add a level to override something.

📸 **Screenshot — Format pane / editor dialog** `tableheaders-editor-open.png` — the Column Headers (or Row Headers) ⚙ editor open, showing one configured level block with its fields.

### Fields (per level)

| Field | Type | Default | Description |
|---|---|---|---|
| **Show this header** | Toggle | On | Unchecking it hides this level's header row (columns) or column (rows) — see [Hiding a header level](#hiding-a-header-level) below. All other fields for this level are hidden in the editor while it's off, since there's nothing left to style. |
| **Header colors** | Inherit / Custom | Inherit | *Inherit* lets the [style theme](../04-reference/formating/formatting-styles.md) decide this level's background and font color — the recommended default when you're only adding a level for its logo. *Custom* reveals **Background** and **Font color** below. |
| **Background** | Color | White | *(Custom only)* Background of every header cell at this level — including the corner cell, for Column level 1. |
| **Font color** | Color | Black | *(Custom only)* Text color at this level. |
| **Font** | Font family | — | Typography for this level. |
| **Font size** | 6–40 px | 11 | |
| **Bold / Italic / Underline** | Toggle | — | |
| **Logo series** | Measure (optional) | *(none)* | A measure from the **Additional Series** data role, providing a base64 logo image for this level. See [Header logos](#header-logos--the-lookup-editor) below for the recommended, cheaper alternative. |
| **Logo placement** | Logo only / Logo above text / Logo under text | Logo above text | How the logo combines with the header label — no effect if no logo resolves for a given header. |
| **Logo size (px)** | 8–100 | 24 | Logo height at this level. |
| **Row layout** *(Row Headers only)* | Side column / Hierarchical | Side column | See [Row layout: Side column vs. Hierarchical](#row-layout-side-column-vs-hierarchical) below. |
| **Column separator** *(Column editor only)* | None / Dotted / Dashed / Axis / Solid / Double | None | Draws a vertical line on the **left** of every column group of this level (except the first group of its parent), through the headers, the data cells and the base rows. See [Column separators](#column-separators) below. |
| **Separator color** / **Separator width (px)** | Color / 1–8 | Grey / 1 | *(when a separator style is set)* Color and thickness of the line. A *Double* line is at least 3 px wide so both strokes stay visible. |
| **Sample across items** | Disjoint / Shared / Native | Disjoint | How the base of a total or sub-total is built from the items of this level. See [Sample Across Items](sample-across-items.md). |
| **Additional CSS** | Free text (multi-line) | *(empty)* | Raw CSS declarations appended to this level's generated style rule — see [Additional CSS](#additional-css) below. |

Changes save back into the underlying JSON field (`Column headers` / `Row headers`) and persist with the report, like any other formatting property.

📸 **Screenshot — rendered result** `tableheaders-logoplacement-montage.png` — the same header with a logo, compared across the three **Logo placement** options: Logo only, Logo above text, Logo under text.

---

## Column separators

Set **Column separator** on a column level to separate its groups visually — for example a dashed line between each *Year* of a *Year > Brand* hierarchy. The line sits on the left edge of the first column of each group (header, data cells and base rows alike), so it stays continuous from the top of the table to the bottom. The first group under a parent never gets one: the line separates siblings, it doesn't frame the table.

- **Axis** draws a long-short-long-short stroke, handy for a chart table where the separator should read as a baseline.
- The separator also applies to the merged cells of **Group into one chart** and **Group last-level rows**.
- With the **Total** column on, the first level-0 group is separated from it.

---

## Hiding a header level

To hide a column or row header level, **add a level block in the relevant ⚙ editor and uncheck "Show this header"** — there's no separate on/off setting elsewhere; this field *is* the mechanism. A level with no block configured is always shown at its theme default, so hiding one means adding a block for it (via **Add level**) specifically to turn it off.

This is a genuine removal, not a CSS-level hide: the visual doesn't create that header row (columns) or column (rows) at all, rather than rendering it invisibly. That matters because a naive hide (`visibility: hidden`, which still reserves the space, or `display: none` on a single row-header cell, which shifts every cell after it out of alignment) gets either wasted whitespace or a misaligned table — neither of which happens here. The corner cell's span shrinks to match whichever levels remain.

The most common reason to do this: a row or column level whose label stopped being meaningful once merged into a [grouped chart](data-bar.md#grouping) — e.g. group **Awareness**/**Familiarity** into one chart per row (**Group last-level rows**) and their old per-row labels no longer say anything a category-colored legend entry doesn't already say. Add a block for that row level and uncheck **Show this header**.

:::note[Row headers: hiding also affects the Base/Unweighted Base/Signif Base row labels]
On row headers, the per-row label level and the label column used by the **Base**/**Unweighted Base**/**Signif Base** total rows are the same column — hiding one hides the other too, so those total rows keep the same column count as the data rows above them (a total row can't have one more column than the data rows without breaking alignment).
:::

📸 **Screenshot — rendered result** `tableheaders-hidelevel-before.png` — a table with the redundant row level still shown (e.g. after grouping Awareness/Familiarity into one chart, the old per-row labels).
📸 **Screenshot — rendered result** `tableheaders-hidelevel-after.png` — the same table with that level's **Show this header** unchecked: the level is gone, corner cell span shrunk to match.

---

## Logos on a header

Two independent sources can supply a header's logo, tried in this order — **the first one that resolves for a given header label wins**:

1. **Header logos** (the lookup editor, below) — a simple label → logo map, resolved **entirely inside the visual**, at zero query cost.
2. **Logo series** (the per-level field above) — a measure from the **Additional Series** data role.

### Header logos — the lookup editor

Click the **🖼️** icon to open a small editor listing **label / logo** pairs — type the header's exact displayed label and paste (or bind via a DAX measure and the **fx** button) its base64 logo.

:::tip[Prefer this over Logo series when the logo only depends on the category]
A measure bound through **Additional Series** lives in the Matrix's `Values` bucket, so Power BI evaluates and transmits it **for every cell** (row × column) — not once per header. With only a handful of distinct logos (e.g. one flag per country) repeated across thousands of cells, that can by itself push a large table into **matrix truncation**. The Header logos lookup has none of this cost: it's resolved once, in memory, from a small JSON list.
:::

A convenient way to keep this list in sync with a lookup table is a DAX measure that concatenates it into JSON, bound to the **Header logos (JSON)** field via the **fx** button so it's recomputed once per report render (respecting slicers) rather than per cell:

```dax
Header Logos JSON =
"[" &
CONCATENATEX(
    VALUES( Country[Label_country] ),
    "{""label"":""" & Country[Label_country] & """,""logo"":""" & MAX( Country[Logo_Country] ) & """}",
    ","
) & "]"
```

See the [Header Logos tutorial](tutorial-header-logos.md) for the full walkthrough, from base64-encoding your images to binding this measure.

#### Named logo tables — more than one lookup in the same field

By default every entry in **Header logos** lands in one shared namespace — any level whose label matches gets that logo. If two unrelated sets of logos happen to share a label (or you'd simply rather keep them apart — e.g. country flags at one row level and brand marks at another, both produced by the same DAX measure into one JSON array), tag each entry with an optional **`table`** field:

```json
[
  { "label": "France",  "logo": "data:image/png;base64,...", "table": "countries" },
  { "label": "Brand A", "logo": "data:image/png;base64,...", "table": "brands" }
]
```

Entries with **no** `table` field stay in the default (untagged) namespace and keep applying automatically to any level that hasn't opted into a named table — this is fully backward compatible with a plain flat lookup.

To make a level use one named table specifically, pick it from that level's **Logo series** dropdown — named tables found in your **Header logos** JSON appear there (prefixed 🖼️), alongside the normal **Additional Series** measures. A level can use *either* a named lookup table *or* a **Logo series** measure, never both at once — picking one clears the other.

📸 **Screenshot — Format pane settings** `tableheaders-namedtable-dropdown.png` — a level's **Logo series** dropdown open, showing a 🖼️-prefixed named table entry alongside normal Additional Series measures.

:::note[Renamed or deleted table]
If a level points at a named table that no longer exists in **Header logos** (renamed, or its entries removed), that level silently falls back to showing the plain text label — exactly as if no logo were configured — rather than erroring.
:::

### Logo series

Still useful when a logo genuinely needs to be **calculated** (not a fixed lookup) — pick a measure from the **Additional Series** data role in the **Logo series** field of a level. Remember its per-cell evaluation cost on large tables; scan a few rows before assuming a constant value doesn't hold, and prefer **Header logos** whenever the mapping is really just "one logo per category name".

---

## Row layout: Side column vs. Hierarchical

With **2-level row grouping** active (the row hierarchy has two levels — see [Understanding Bases](../04-reference/understanding-bases.md) for how grouping interacts with bases), Level 1's **Row layout** field controls how the outer category renders:

| Layout | Rendering |
|---|---|
| **Side column** *(default)* | Level 1's label is a narrow, row-spanning **first column**, next to the Level 2 rows it groups — the historical behavior. |
| **Hierarchical** | Level 1's label becomes a **full-width banner row** above its group of Level 2 rows, instead of a side column. |

```
Side column                      Hierarchical
┌──────────┬────────┬─────┐      ┌──────────────────────┐
│          │ Trust  │ ... │      │ Fundamentals          │
│Fundamen- ├────────┼─────┤      ├──────────┬─────┬──────┤
│  tals    │ Quality│ ... │      │ Trust    │ ... │      │
├──────────┼────────┼─────┤      ├──────────┼─────┼──────┤
│ Crafted  │ Comfort│ ... │      │ Quality  │ ... │      │
│  space   ├────────┼─────┤      ├──────────────────────┤
│          │ Design │ ... │      │ Crafted space          │
└──────────┴────────┴─────┘      ├──────────┬─────┬──────┤
                                  │ Comfort  │ ... │      │
                                  └──────────┴─────┴──────┘
```

The banner row picks up **Level 1's own** Background/Font/Additional CSS — style it like any other level. Combine it with [Additional CSS](#additional-css) to get, for example, a dashed border framing each section.

📸 **Screenshot — rendered result** `tableheaders-rowlayout-sidecolumn.png` — a 2-level row grouping with Level 1's **Row layout** set to **Side column** (the historical narrow first-column look).
📸 **Screenshot — rendered result** `tableheaders-rowlayout-hierarchical.png` — the same table with **Hierarchical**: Level 1's label as a full-width banner row above its Level 2 group.

:::note[Field is per level, layout scope is Level 1 today]
**Row layout** is exposed on every row level in the editor, but only **Level 1**'s value has an effect today — this visual currently only ever groups rows two levels deep. The per-level field is forward-looking, for a planned N-dimension version where each row level will pick its own layout independently.
:::

:::note[Known limits]
Side-by-side (Table of Tables) mode and freeze panes are not specially handled for the banner row in this first version — it scrolls normally, and side-by-side mode ignores the Hierarchical setting for now.
:::

---

## Additional CSS

A free-text field, per level, for anything the structured fields above can't express — vertical writing, gradients, custom border styles, letter spacing, whatever your design needs. It's appended, verbatim, to the end of that level's generated CSS rule — after the structured properties, so add `!important` if you need to override one of them (e.g. `background: linear-gradient(...) !important;`).

```css
border: 2px dashed #999999 !important;
border-radius: 6px;
```

📸 **Screenshot — rendered result** `tableheaders-additionalcss-example.png` — a header level styled with the CSS above: a dashed border framing that level's cells.

:::warning[No remote resources]
Any `url(...)` fragment is silently stripped before use — the same "no external network access" policy applied to logo images (see [Logos → Security & certification](../04-reference/logos.md#security--certification)) extends to this free-form field, so it can't be used to load a remote background image or font.
:::

---

## Troubleshooting

- **A level I added a logo to lost its theme background/text color** → set that level's **Header colors** to *Inherit* instead of *Custom* — *Custom* with empty Background/Font color fields defaults to white/black, overriding the theme.
- **The corner cell (top-left) doesn't match Column Level 1's custom color** → this is fixed; if you still see it, confirm the report is on a recent version — Column Level 1's Custom background/font now applies to the corner cell too.
- **Logo doesn't show for one header, but shows for others** → check both sources: does **Header logos** have an entry whose **label** matches that header's exact displayed text, and/or does the **Logo series** measure return a non-blank value for that header member?
- **Table got slow / truncated after adding a logo** → if you're using **Logo series**, switch to **Header logos** (the lookup editor) — see the cost explanation [above](#header-logos--the-lookup-editor).
- **Additional CSS doesn't seem to apply** → structured fields (Background, Font color…) are written with `!important`; add `!important` to your own declaration if it's meant to override one of them.
- **Row layout: Hierarchical has no effect** → it only applies to Row Header **Level 1**, and only when the table actually has 2-level row grouping; it's currently ignored in side-by-side (Table of Tables) mode.
- **I don't see an on/off switch to hide a header level** → there isn't a separate one; open the relevant ⚙ editor, **Add level** for that level if it doesn't have a block yet, and uncheck **Show this header** — see [Hiding a header level](#hiding-a-header-level).

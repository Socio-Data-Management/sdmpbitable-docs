---
sidebar_position: 11.5
title: Table Headers
---

# Table Headers Reference

## Overview

**Table Headers** controls how column and row header levels look and are laid out — background, font, an optional logo, title cut, sub-total columns, column width and row height, gaps between groups, column separators, the sample type of the level's items, and (for row headers) the layout of each level. It is driven by **two schema-driven editors** — Column Headers and Row Headers — each managing an open-ended list of per-level blocks, **one block per hierarchy level, with no cap on the number of levels**.

:::info[Replaces the fixed, level-capped settings of CrossTable]
CrossTable uses fixed, level-suffixed settings (`Column Logo Lv1/Lv2/Lv3` and `Row Logo Lv1/Lv2` data roles, *Top-Level* / *Sub-Level Column Header* and *Row header format* cards, *Show Level 1/2 Sub-Total*, *Multiple answer*, *Rows are repeated items*). SDM Xtended Table has none of them: everything that depends on a header level is a field of that level's block in the ⚙ editors described below. The **Cell format** card ([Custom Element Formatting](formating/formatting-custom.md)) is unchanged.
:::

:::tip[Want to bind logos from a DAX measure?]
See the [Header Logos tutorial](tutorial-header-logos.md) for a full, click-by-click walkthrough — from base64-encoding your images to wiring a `CONCATENATEX` measure into the **Header logos** lookup.
:::

**Location**: Format pane → **Table Headers** card, holding two JSON text fields (`Column headers`, `Row headers`) managed through their own **⚙ gear icons**, plus a **Header logos** field with its own icon. The icons appear at the top-right of the visual in the report's **Edit** view.

---

## The ⚙ editors — Column Headers / Row Headers

Click the **Column editor** icon or the **Row editor** icon to open the editor. Each shows **one block per header level** and an **Add level** button:

| Editor | Levels | Cap |
|---|---|---|
| **Column Headers** | One block per column-header depth (Level 1 = outermost) | None — add as many levels as your column hierarchy has. |
| **Row Headers** | One block per row depth, outermost first; the **last** level is the row labels themselves (the leaf rows) | None — add as many levels as your row hierarchy has. |

Within a block, the fields are grouped in three collapsible sections: **Header** (open by default: colors, font, logo, additional CSS and, for columns, the title cut), **Sub-total** (the sub-total column style and the *Sample across items* property) and **Layout** (size, gap before each group, separator, row layout). The **Show this header** switch stays outside the sections, always visible.

A level with **no** block configured simply shows the active style theme's default — you only need to add a level to override something.

📸 **Screenshot — Format pane / editor dialog** `tableheaders-editor-open.png` — the Column Headers (or Row Headers) ⚙ editor open, showing one configured level block with its fields.

### Fields (per level)

| Field | Applies to | Type | Default | Description |
|---|---|---|---|---|
| **Show this header** | Columns, Rows | Toggle | On | Unchecking it hides this level's header row (columns) or column / banner (rows) — see [Hiding a header level](#hiding-a-header-level) below. The styling fields of this level are hidden in the editor while it's off, since there's nothing left to style. |
| **Header colors** | Columns, Rows | Inherit from theme / Custom | Inherit from theme | *Inherit* lets the [style theme](formating/formatting-styles.md) decide this level's background and font color — the recommended default when you're only adding a level for its logo. *Custom* reveals **Background** and **Font color** below. |
| **Background** | Columns, Rows | Color | White | *(Custom only)* Background of every header cell at this level — including the corner cell, for Column level 1. |
| **Font color** | Columns, Rows | Color | Black | *(Custom only)* Text color at this level. |
| **Font** | Columns, Rows | Font family | — | Typography for this level. |
| **Font size** | Columns, Rows | 6–40 | 11 | |
| **Bold / Italic / Underline** | Columns, Rows | Toggle | — | |
| **Logo series** | Columns, Rows | Measure or named logo table (optional) | *(none)* | A measure from the **Additional Series** data role providing a base64 logo for this level, or a named table of the Header logos lookup. See [Logos on a header](#logos-on-a-header) below. |
| **Logo placement** | Columns, Rows | Logo only / Logo above text / Logo under text | Logo above text | How the logo combines with the header label — no effect if no logo resolves for a given header. |
| **Logo size (px)** | Columns, Rows | 8–100 | 24 | Logo height at this level. |
| **Additional CSS** | Columns, Rows | Free text (multi-line) | *(empty)* | Raw CSS declarations appended to this level's generated style rule — see [Additional CSS](#additional-css) below. |
| **Title cut (when horizontal scroll is forbidden)** | Columns | Ellipsis / 2 lines + ellipsis / As many lines as needed | Ellipsis | How long titles of this level are cut when **Forbid horizontal scroll** is on — see [Title cut](#title-cut-when-horizontal-scroll-is-forbidden). Only shown while the level's header is shown. |
| **Width (last level only)** | Columns | Auto / Distribute equally / Minimal / Fixed (px) | Auto | Width of the data columns — see [Size](#size-width-and-height). |
| **Height of each group of this level** | Rows | Auto / Distribute equally / Minimal / Fixed (px) | Minimal | Height of each row (last level) or of each sub-table (outer levels) — see [Size](#size-width-and-height). |
| **Width / Height (px)** | Columns, Rows | 10–2000 | 100 (columns) / 30 (rows) | Only shown when the size mode is *Fixed*. |
| **Gap before each group (px)** | Columns, Rows | 0–100 | 0 | Space before each group of this level — see [Gaps between groups](#gaps-between-groups). |
| **Row layout** | Rows | Side column / Hierarchical | Side column | See [Row layout](#row-layout-side-column-vs-hierarchical) below. |
| **Show sub-total column** | Columns | Toggle | On | Shows the sub-total column of this level (the one that sums its sub-columns) — see [Sub-total columns](#sub-total-columns-column-levels). |
| **Sub-total colors** … **Sub-total underline** | Columns | Same as the header fields | Inherit from theme | Style of this level's sub-total column (header and cells). Only shown while *Show sub-total column* is on. |
| **Column separator** | Columns | None / Dotted / Dashed / Axis / Solid / Double | None | A vertical line on the left of each group of this level. See [Column separators](#column-separators-column-levels). |
| **Separator color / width (px)** | Columns | Color / 1–8 | `#999999` / 1 | Only shown when a separator style is selected. |
| **Sample across items** | Columns, Rows | Disjoint / Shared / Native | Disjoint | How the items of this level relate to each other — see [Sample across items](#sample-across-items). |

Changes save back into the underlying JSON field (`Column headers` / `Row headers`) and persist with the report, like any other formatting property.

📸 **Screenshot — rendered result** `tableheaders-logoplacement-montage.png` — the same header with a logo, compared across the three **Logo placement** options: Logo only, Logo above text, Logo under text.

---

## Hiding a header level

To hide a column or row header level, **add a level block in the relevant ⚙ editor and uncheck "Show this header"** — there's no separate on/off setting elsewhere; this field *is* the mechanism. A level with no block configured is always shown at its theme default, so hiding one means adding a block for it (via **Add level**) specifically to turn it off.

This is a genuine removal, not a CSS-level hide: the visual doesn't create that header row (columns) or column / banner (rows) at all, rather than rendering it invisibly. That matters because a naive hide (`visibility: hidden`, which still reserves the space, or `display: none` on a single row-header cell, which shifts every cell after it out of alignment) gets either wasted whitespace or a misaligned table — neither of which happens here. The corner cell's span shrinks to match whichever levels remain.

A hidden **column** level can still show its sub-total column: the *Show sub-total column* field stays available even when the header itself is hidden.

:::note[Row headers: hiding also affects the Base/Unweighted Base/Signif Base row labels]
On row headers, the label column used by the **Base**/**Unweighted Base**/**Signif Base** total rows is the leaf row-label level — hiding that level hides the label of those total rows too, so they keep the same column count as the data rows above them (a total row can't have one more column than the data rows without breaking alignment).
:::

📸 **Screenshot — rendered result** `tableheaders-hidelevel-before.png` — a table with the redundant header level still shown.
📸 **Screenshot — rendered result** `tableheaders-hidelevel-after.png` — the same table with that level's **Show this header** unchecked: the level is gone, corner cell span shrunk to match.

---

## Logos on a header

Two independent sources can supply a header's logo, tried in this order — **the first one that resolves for a given header label wins**:

1. **Header logos** (the lookup editor, below) — a simple label → logo map, resolved **entirely inside the visual**, at zero query cost.
2. **Logo series** (the per-level field above) — a measure from the **Additional Series** data role.

### Header logos — the lookup editor

Click the **Header Logos** icon to open a small editor listing **label / logo** pairs — type the header's exact displayed label and paste (or bind via a DAX measure and the **fx** button) its base64 logo.

:::tip[Prefer this over Logo series when the logo only depends on the category]
A measure bound through **Additional Series** lives in the Matrix's `Values` bucket, so Power BI evaluates and transmits it **for every cell** (row × column) — not once per header. With only a handful of distinct logos (e.g. one flag per country) repeated across thousands of cells, that can by itself push a large table into **matrix truncation**. The Header logos lookup has none of this cost: it's resolved once, in memory, from a small JSON list.
:::

A convenient way to keep this list in sync with a lookup table is a DAX measure that concatenates it into JSON, bound to the **Header logos lookup (JSON)** field via the **fx** button so it's recomputed once per report render (respecting slicers) rather than per cell:

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

By default every entry in **Header logos** lands in one shared namespace — any level whose label matches gets that logo. If two unrelated sets of logos happen to share a label (or you'd simply rather keep them apart — e.g. country flags at one level and brand marks at another, both produced by the same DAX measure into one JSON array), tag each entry with an optional **`table`** field:

```json
[
  { "label": "France",  "logo": "data:image/png;base64,...", "table": "countries" },
  { "label": "Brand A", "logo": "data:image/png;base64,...", "table": "brands" }
]
```

Entries with **no** `table` field stay in the default (untagged) namespace and keep applying automatically to any level that hasn't opted into a named table — this is fully backward compatible with a plain flat lookup.

To make a level use one named table specifically, pick it from that level's **Logo series** dropdown — named tables found in your **Header logos** JSON appear there (prefixed 🖼️ *Header Logos:*), alongside the normal **Additional Series** measures. A level can use *either* a named lookup table *or* a **Logo series** measure, never both at once — picking one clears the other.

📸 **Screenshot — Format pane settings** `tableheaders-namedtable-dropdown.png` — a level's **Logo series** dropdown open, showing a 🖼️-prefixed named table entry alongside normal Additional Series measures.

:::note[Renamed or deleted table]
If a level points at a named table that no longer exists in **Header logos** (renamed, or its entries removed), that level silently falls back to showing the plain text label — exactly as if no logo were configured — rather than erroring.
:::

### Logo series

Still useful when a logo genuinely needs to be **calculated** (not a fixed lookup) — pick a measure from the **Additional Series** data role in the **Logo series** field of a level. Remember its per-cell evaluation cost on large tables; scan a few rows before assuming a constant value doesn't hold, and prefer **Header logos** whenever the mapping is really just "one logo per category name".

:::note[Security]
Every image field of the visual accepts base64 data URIs only — no external URL is ever fetched. This applies to both the lookup and the Logo series.
:::

---

## Row layout: Side column vs. Hierarchical

With two or more row levels, every **outer** row level (every level except the last one, which holds the row labels) picks **independently** how it renders, through its **Row layout** field:

| Layout | Rendering |
|---|---|
| **Side column** *(default)* | The level's label is a narrow, row-spanning **column** on the left, next to the rows it groups. |
| **Hierarchical** | The level's label becomes a **full-width banner row** above its group of rows, instead of a side column. |

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

Layouts can be **mixed** across levels — for example Level 1 as a banner and Level 2 as a side column. A banner row picks up **its own level's** Background / Font / Additional CSS — style it like any other level. Combine it with [Additional CSS](#additional-css) to get, for example, a dashed border framing each section.

The **Row layout** field has no effect on the **last** row level (the leaf rows), whose labels are always the row-label column. Combine row layouts with a [Gap before each group](#gaps-between-groups) to add a vertical space between consecutive sub-tables.

📸 **Screenshot — rendered result** `tableheaders-rowlayout-sidecolumn.png` — a 2-level row grouping with Level 1's **Row layout** set to **Side column** (the narrow first-column look).
📸 **Screenshot — rendered result** `tableheaders-rowlayout-hierarchical.png` — the same table with **Hierarchical**: Level 1's label as a full-width banner row above its Level 2 group.

:::note[Known limits]
Side-by-side (Table of Tables) mode and freeze panes are not specially handled for banner rows — a banner scrolls normally, and side-by-side mode ignores the Hierarchical setting.
:::

---

## Size: width and height

The **Layout** section of a level sets the size of what that level lays out. The same four modes exist for columns (**Width**) and rows (**Height of each group of this level**):

| Mode | Columns (last level) | Rows |
|---|---|---|
| **Auto** | The browser distributes the width and the table grows to fill the visual width. *(Default for columns)* | The natural heights are stretched so the rows fill the visual height. |
| **Distribute equally** | All data columns get the same width, sharing the available width. | All groups of the level get the same height, sharing the available height. |
| **Minimal** *(just what is needed)* | Each column takes only the width it needs; empty space is left on the right. | Each row takes only the height it needs; empty space is left at the bottom. *(Default for rows, i.e. the historical behavior.)* |
| **Fixed (px)** | Every data column is exactly the given number of pixels wide. | Every group is exactly the given number of pixels high. |

- **Columns**: the setting is read on the **last** column level (the leaf columns); parent levels are simple spans over them.
- **Rows**: each row level can be set independently. On the **last** level, *Height* applies to **each row**; on an outer level it applies to **each group** of that level (for example each country of a `Country > Brand` hierarchy), and the inner levels then share the height of their parent's group. This replaces the former *Row height (px)* Table option.
- A *Fixed* height is a target for the whole group, including any [gap](#gaps-between-groups).

---

## Gaps between groups

The **Gap before each group (px)** field adds empty space in front of each group of the level, **in standard mode and in Tile mode alike**. It replaces the former *Row group spacing* Table option and the *Group gap* / *Sub-group gap* / *Row gap* Tile-mode settings, and works at **any** level.

- **Columns**: horizontal space before each group of the level (not before the first group of its parent). A [column separator](#column-separators-column-levels) of the same level is drawn **centered inside** that space. The gap is also applied before the level's sub-total column.
- **Rows, outer level**: a vertical spacer row before each group of the level, i.e. between two consecutive sub-tables (one country, one wave…). The spacer is a real empty row, not a border, so it doesn't disturb zebra striping or frozen rows. With a single sub-table there is nothing to space.
- **Rows, last level**: space **between two consecutive leaf rows**.

`0` (default) means no gap.

---

## Title cut (when horizontal scroll is forbidden)

When Table options → [**Forbid horizontal scroll**](formating/formatting-basics.md#forbid-horizontal-scroll) is on, the table is fitted to the width of the visual: a column can no longer widen to fit its title, so titles are cut. The **Title cut** field of each column level chooses how:

| Option | Rendering |
|---|---|
| **Ellipsis** *(default)* | One line, ending with "…" |
| **2 lines + ellipsis** | Up to two lines, ending with "…" if it still doesn't fit |
| **As many lines as needed** | The title wraps on as many lines as necessary |

The field has no effect while horizontal scroll is allowed.

---

## Sub-total columns (column levels)

Each column level that has sub-columns can display a **sub-total column** summing them (e.g. a *Total Country* column in a `Country > Brand` hierarchy). In SDM Xtended Table this is the **Show sub-total column** field of the column level — **On by default at every level** — instead of CrossTable's two fixed *Show Level 1/2 Sub-Total* switches.

- It has no effect on the last (deepest) column level, which has no sub-columns.
- A table with four column levels therefore shows sub-totals at levels 1, 2 and 3 by default; uncheck the ones you don't want.
- Header, data cells and total rows stay aligned: switching a sub-total off removes it everywhere.
- The **Sub-total colors / font / size / bold / italic / underline** fields style that sub-total column (header and cells); *Inherit from theme* keeps the theme's sub-total look.
- The field stays available even when the level's header is hidden with **Show this header**: you can hide a level's label and still keep its sub-total.

See [Totals](totals.md) for how total and sub-total values are computed.

---

## Column separators (column levels)

The **Column separator** field draws a vertical line on the left of each group of the level — useful to visually delimit the countries of a `Country > Brand` hierarchy, for example without resorting to gaps. Pick a style (**Dotted**, **Dashed**, **Axis**, **Solid**, **Double**), then a **Separator color** and a **Separator width (px)**. **None** (default) draws nothing. If the level also has a [gap](#gaps-between-groups), the line is centered in the gap.

---

## Sample across items

The **Sample across items** field tells the statistics engine how the items of a level relate to each other:

| Value | Meaning | Typical use |
|---|---|---|
| **Disjoint (bases add up)** *(default)* | Two items are two separate populations: bases add up in totals and in the "complement" of a significance test. | Countries, age groups, waves, segments. |
| **Shared (same sample, bases don't add up)** | Items are measured on the **same** respondents (a battery of items, brands rated by the same people…): a total's base is the base of **one** item, its value is the **average** count, and the complement of a significance test isn't inflated by summing the bases. | A brand-image grid where all brands were rated by the same 2,500 people. |
| **Native (sub-total read from the measure)** *(columns only)* | Like Shared, but the sub-total / grand-total value, base and unweighted base are read from the **measure itself** (Power BI's native sub-total) instead of being recombined from the items. If the measure returns no value (BLANK) for a total, that total falls back to the sum of the items. | A DAX measure that already computes the right total (e.g. a deduplicated respondent count). |

The field is set on the level **of the items** (e.g. on the *Brand* level, to say that brands share the same sample, which governs the *Year* sub-total).

On **rows**, only the **last** level (the leaf rows) is used; the outer row levels split the table into independent sub-tables and are not affected. *Native* is a column-only mode — on rows it behaves like *Disjoint*.

This field replaces CrossTable's *Multiple answer* and *Rows are repeated items* settings, which do not exist in SDM Xtended Table. See [Understanding Bases](understanding-bases.md) for the underlying principles and [Significance](significance.md) for the effect on tests.

---

## Additional CSS

A free-text field, per level, for anything the structured fields above can't express — vertical writing, gradients, custom border styles, letter spacing, whatever your design needs. It's appended, verbatim, to the end of that level's generated CSS rule — after the structured properties, so add `!important` if you need to override one of them (e.g. `background: linear-gradient(...) !important;`).

```css
border: 2px dashed #999999 !important;
border-radius: 6px;
```

📸 **Screenshot — rendered result** `tableheaders-additionalcss-example.png` — a header level styled with the CSS above: a dashed border framing that level's cells.

:::warning[No remote resources]
Any `url(...)` fragment is silently stripped before use — the same "no external network access" policy applied to logo images extends to this free-form field, so it can't be used to load a remote background image or font.
:::

---

## Troubleshooting

- **A level I added a logo to lost its theme background/text color** → set that level's **Header colors** to *Inherit from theme* instead of *Custom* — *Custom* with empty Background/Font color fields defaults to white/black, overriding the theme.
- **The corner cell (top-left) doesn't match Column Level 1's custom color** → Column Level 1's Custom background/font applies to the corner cell too; confirm the report is on a recent version.
- **Logo doesn't show for one header, but shows for others** → check both sources: does **Header logos** have an entry whose **label** matches that header's exact displayed text, and/or does the **Logo series** measure return a non-blank value for that header member?
- **Table got slow / truncated after adding a logo** → if you're using **Logo series**, switch to **Header logos** (the lookup editor) — see the cost explanation [above](#header-logos--the-lookup-editor).
- **Additional CSS doesn't seem to apply** → structured fields (Background, Font color…) are written with `!important`; add `!important` to your own declaration if it's meant to override one of them.
- **Row layout: Hierarchical has no effect** → it applies to the **outer** row levels only (not the last level), and it's ignored in side-by-side (Table of Tables) mode.
- **I don't see an on/off switch to hide a header level** → there isn't a separate one; open the relevant ⚙ editor, **Add level** for that level if it doesn't have a block yet, and uncheck **Show this header** — see [Hiding a header level](#hiding-a-header-level).
- **Long column titles are cut / my table no longer scrolls horizontally** → **Forbid horizontal scroll** is on; switch it off, or choose another [Title cut](#title-cut-when-horizontal-scroll-is-forbidden) per level.
- **I can't find Row height, Row group spacing or the Tile mode gaps** → they moved into the editors: see [Size](#size-width-and-height) and [Gaps between groups](#gaps-between-groups).
- **A sub-total column appeared that I didn't ask for** → *Show sub-total column* is On by default at every column level; uncheck it on the levels where you don't want one.

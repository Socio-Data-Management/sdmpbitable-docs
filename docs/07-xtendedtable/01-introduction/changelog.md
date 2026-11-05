---
sidebar_position: 3
---

# Changelog

History of SDM Xtended Table. The visual is new (first builds in **October 2026**) and is **independent** from CrossTable: it has its own identifier, its own versioning and is not a drop-in replacement for it.

---

## Version 1.0.2.x *(late October 2026)*

Layout controls move into the header editors, and the tooltip can replay a significance test.

- **Editors organized in sections.** Each level block of the ⚙ Column Headers and Row Headers editors is now split into **Header**, **Sub-total** and **Layout** sections. See [Table Headers](../04-reference/table-headers.md).
- **Width and height per level.** New **Width** (last column level) and **Height of each group of this level** (any row level) fields: *Auto*, *Distribute equally*, *Minimal* or *Fixed (px)*. They replace the **Row height (px)** Table option. See [Size](../04-reference/table-headers.md#size-width-and-height).
- **Gap per level.** One **Gap before each group (px)** field per level, in standard mode as in Tile mode, at any column or row level. It **replaces** *Row group spacing* (Table options) and *Group gap*, *Sub-group gap* and *Row gap* (Tile mode), which no longer exist. A column separator is centered in the gap. See [Gaps between groups](../04-reference/table-headers.md#gaps-between-groups).
- **Forbid horizontal scroll.** New Table option that fits the table in the visual width; long column titles are cut as chosen by the per-level **Title cut** field. **Freeze left column** is then hidden. See [Table Options](../04-reference/formating/formatting-basics.md#forbid-horizontal-scroll).
- **Tooltip.** New **Tested & compared values** content, and the **Weighted base** and **Compared base** lines also show the *effective* bases when the *separate effective* variance method is used. See [Cell Tooltip](../04-reference/tooltip.md).
- **Native sample.** Sub-totals of a *Native* level are now also read from the measure in percentage tables (not only in mean tables), falling back to the sum of the items when the measure is BLANK. See [Sample Across Items](../04-reference/sample-across-items.md).

Existing reports that used the removed options (Row height, Row group spacing, Tile mode gaps) fall back to the defaults: re-enter the values in the editors.

---

## Version 0.1.x *(October 2026)*

First release line of SDM Xtended Table.

- **N levels of rows and columns.** Calculations (percentages, bases, significance, sorting) stay computed per sub-table, whatever the number of row levels.
- **Table Headers card.** The ⚙ **Column Headers** and **Row Headers** editors replace the Top level / Sub level / Row header format cards: one block per level, without ceiling. They hold the level's font and background, its *Logo series*, the *show* choice, the per-level *show sub-total* choice and, for rows, the layout (side column or full-width band) and a free additional CSS field. See [Table Headers](../04-reference/table-headers.md).
- **Additional Series role and Header Logos lookup.** They replace the Logo Lv1–Lv3 / Row Logo Lv1–Lv2 roles. See [Logos in Headers](../04-reference/logos.md).
- **Per-level sub-totals.** *Show sub-total* is chosen per column level and is on by default at every level. See [Totals & Subtotals](../04-reference/totals.md).
- **Sample across items.** A per-level property (Disjoint / Shared / Native) replaces *Multiple answer* and *Rows are repeated items*, which no longer exist. See [Sample Across Items](../04-reference/sample-across-items.md).
- **Cell Rules** accept `rowN` / `colN` identifiers for any N.
- **Carried over from CrossTable:** percentage and mean tables, Cell Percentage, significance tests (including the *separate effective* variance method), Ranking, Tile Mode, thresholds and masking, Global Threshold panel, cell Tooltip, transparent background, Excel export.
- **Not included:** Data Bar, Data Line and Gap Mode (see [CrossTable InCell Charts](../../05-crosstable-charts/overview.md)).

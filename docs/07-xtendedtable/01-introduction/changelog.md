---
sidebar_position: 3
---

# Changelog

History of SDM Xtended Table. The visual is new (first builds in **October 2026**) and is **independent** from CrossTable: it has its own identifier, its own versioning and is not a drop-in replacement for it.

---

## Version 0.1.x *(October 2026)*

First release line of SDM Xtended Table.

- **N levels of rows and columns.** Calculations (percentages, bases, significance, sorting) stay computed per sub-table, whatever the number of row levels.
- **Table Headers card.** The ⚙ **Column Headers** and **Row Headers** editors replace the Top level / Sub level / Row header format cards: one block per level, without ceiling. They hold the level's font and background, its *Logo series*, the *show* choice, the per-level *show sub-total* choice and, for rows, the layout (side column or full-width band) and a free additional CSS field. See [Table Headers](../04-reference/table-headers.md).
- **Additional Series role and Header Logos lookup.** They replace the Logo Lv1–Lv3 / Row Logo Lv1–Lv2 roles. See [Logos in Headers](../04-reference/logos.md).
- **Per-level sub-totals.** *Show sub-total* is chosen per column level and is on by default at every level. See [Totals & Subtotals](../04-reference/totals.md).
- **Sample across items.** A per-level property (Disjoint / Shared / Native) replaces *Multiple answer* and *Rows are repeated items*, which no longer exist. See [Sample Across Items](../04-reference/sample-across-items.md).
- **Cell Rules** accept `rowN` / `colN` identifiers for any N.
- **Carried over from CrossTable:** percentage and mean tables, Cell Percentage, significance tests (including the *separate effective* variance method), Ranking, Tile Mode, thresholds and masking, Global Threshold panel, cell Tooltip, row group spacing, transparent background, Excel export.
- **Not included:** Data Bar, Data Line and Gap Mode (see [CrossTable InCell Charts](../../05-crosstable-charts/overview.md)).

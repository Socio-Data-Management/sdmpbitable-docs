---
sidebar_position: 11.6
title: "Tutorial: Header Logos from a DAX Measure"
---

# Tutorial: Header Logos from a DAX Measure

This walks through the recommended way to put a logo (country flag, brand mark, product photo…) into your column or row headers: a **DAX measure that builds the whole label → logo JSON list**, bound once to the [Header logos lookup](table-headers.md#header-logos--the-lookup-editor). It's the cheapest of the two mechanisms — resolved once per render, not once per cell — see [Table Headers → Logos on a header](table-headers.md#logos-on-a-header) for why that matters on a large table.

:::note[The other mechanism]
If your logo genuinely needs to be *computed* rather than looked up by category name, use **Logo series** instead — see [Table Headers → Logo series](table-headers.md#logo-series). This tutorial covers the lookup path, which should be your default.
:::

---

## What we're building

Column headers (at any level of your column hierarchy) for a set of countries, each showing its flag above the country name:

```
┌──────────┬──────────┬──────────┐
│  🇫🇷      │  🇩🇪      │  🇪🇸      │
│  France  │ Germany  │  Spain   │
├──────────┼──────────┼──────────┤
```

📸 **Screenshot** `tutorial-headerlogos-result.png` — the finished column headers, flag above label. Insert here as the "end goal" preview.

---

## Step 1 — Get your logos into the data model as base64

The **Header logos** field expects a base64-encoded image string per label (a data URI, e.g. `data:image/png;base64,iVBORw0KG...`). Two common ways to get there:

1. **A lookup table already carrying it** — if your data model has (or can have) a `Country` table with a `Logo_Country` column storing the base64 string per row, you're done; skip to Step 2.
2. **Convert existing image files once**, then load the resulting table (Country label + base64 text) via Power Query — a one-time conversion, not something computed at report-render time.

📸 **Screenshot** `tutorial-headerlogos-step1-table.png` — the `Country` lookup table in the Power BI model view, showing the `Label_country` and `Logo_Country` (base64 text) columns.

:::tip[Keep images small]
A base64 PNG/SVG is roughly 33% larger than the original file. Header logos render at a modest pixel size (8–100px, see [Logo size](table-headers.md#fields-per-level)) — there's no benefit to embedding a multi-megabyte source image. Resize/compress before encoding.
:::

---

## Step 2 — Write the DAX measure

This measure concatenates every distinct country into one JSON array, in the exact shape the **Header logos** editor expects: `[{"label": "...", "logo": "..."}, ...]`.

```dax
Header Logos JSON =
"[" &
CONCATENATEX(
    VALUES( Country[Label_country] ),
    "{""label"":""" & Country[Label_country] & """,""logo"":""" & MAX( Country[Logo_Country] ) & """}",
    ","
) & "]"
```

Create it as a new measure in your `Country` table (or wherever fits your model).

📸 **Screenshot** `tutorial-headerlogos-step2-daxeditor.png` — the DAX formula bar / measure editor with this measure typed in, before hitting Enter.

:::note[Why CONCATENATEX + VALUES, not a per-row measure]
`VALUES(Country[Label_country])` iterates **distinct labels** once — not once per matrix cell — which is exactly the "resolved once, in memory" cost profile that makes the lookup cheaper than [Logo series](table-headers.md#logo-series). `MAX(...)` inside the row context just picks that row's single logo value.
:::

Validate the measure on its own first — drop it into a card visual or a table visual and confirm it returns a syntactically valid JSON string (matching brackets, no stray quotes) before wiring it into the visual.

📸 **Screenshot** `tutorial-headerlogos-step2-validate.png` — the measure's raw text output shown in a Power BI table/card visual, to eyeball the JSON before binding it.

---

## Step 3 — Bind the measure to Header logos

On your SDM Xtended Table visual, open the **Header Logos** icon (Format pane → **Table Headers** card → **Header logos lookup**) to open the lookup editor.

📸 **Screenshot** `tutorial-headerlogos-step3-icon.png` — the Header Logos icon's location at the top-right of the visual, in Edit view.

Click the **fx** button next to the field and bind it to `Header Logos JSON`.

📸 **Screenshot** `tutorial-headerlogos-step3-fxbind.png` — the fx binding dialog, measure selected.

The editor immediately reflects the resolved list — one row per distinct country label, with a logo preview.

📸 **Screenshot** `tutorial-headerlogos-step3-editorrows.png` — the Header logos editor, populated rows with label + logo thumbnail, generated entirely from the DAX measure.

---

## Step 4 — Confirm it renders

Close the editor. Column headers whose displayed label matches an entry's **label** exactly now show that logo.

📸 **Screenshot** `tutorial-headerlogos-step4-final.png` — same as the "what we're building" shot, but captured live from the report, confirming the end-to-end result.

If a logo is missing for one header but present for others, see [Troubleshooting → Logo doesn't show for one header](table-headers.md#troubleshooting) — it's almost always a label mismatch (extra whitespace, different casing, a renamed category upstream).

---

## Optional — logos on row headers, or a specific level only

The same **Header logos** list is shared across both column and row headers, and across **all levels** of each hierarchy — a label match is a label match, regardless of which axis or level it appears on. If two unrelated sets of logos need to stay apart (e.g. country flags at one level, brand marks at another, both produced into the same JSON array), tag entries with a **`table`** field and pick the named table from that level's **Logo series** dropdown — see [Table Headers → Named logo tables](table-headers.md#named-logo-tables--more-than-one-lookup-in-the-same-field).

For the common case — one logo per label, used everywhere that label appears — the single measure from Step 2 is all you need.

---

## Full recap

| Step | Where | What |
|---|---|---|
| 1 | Data model | Lookup table with label + base64 logo columns |
| 2 | DAX measure | `CONCATENATEX(VALUES(...), ...)` building the JSON array |
| 3 | Format pane → Table Headers → Header Logos icon | Bind the measure via **fx** |
| 4 | Report canvas | Confirm headers render their logo |

See [Table Headers reference](table-headers.md) for every field these editors expose, and note the base64-only, no-external-network policy that applies to every image field in the visual.

---
sidebar_position: 5
title: Cell Rules
---

# Cell Rules Reference

## Overview

Cell Rules let you decorate individual cells (color, label, or full CSS) based on **conditions you write directly in the visual** — no DAX measure required.

You type a list of rules in the **Cell rules** text box (Format pane → Cell Rules). Each rule is a `condition : output` pair. For every cell, the visual evaluates the rules **top to bottom** on the values it has already computed (percentages, index, base, mean, significance) and on the **row/column header labels**, and applies the output of the **first rule that matches**.

:::info Why not a DAX measure anymore?
The previous version relied on a `Cell Rules` DAX measure that had to reproduce the visual's own calculations (vertical %, side-by-side recomputations, per-scale means…). That is impossible to replicate faithfully in DAX. The engine now runs **inside the visual**, directly on the numbers it displays, so a rule always sees exactly what the user sees. The old `Cell Rules` data-role field has been **removed**.
:::

---

## Writing rules

### Syntax

```
condition : output
condition : output
default   : output
```

- **One rule per line.**
- Everything left of the first `:` is the **condition**; everything to the right is the **output**.
- The **first matching rule wins** (evaluation stops there).
- `default` matches everything — use it as a catch-all (put it last).
- Blank lines and lines starting with `//` are ignored (comments).

```
// Frequency traffic light
pctV < 0.10 : #FF4444;Low
pctV < 0.20 : #FF8888;Mid
pctV < 0.30 : #8888FF;Good
default     : #4488FF;Excellent
```

A compilation status is shown under the box:
`✅ 4 rule(s) applied`, or `❌ Line 3: <message>` if a rule is malformed.

---

## Conditions

A condition is a boolean expression combining comparisons with `AND`, `OR`, `NOT` and parentheses.

### Numeric variables

These come straight from the visual's own calculations:

| Variable | Meaning | Scale |
|---|---|---|
| `pctV` | Vertical percentage (share of the column) | **fraction 0–1** (`0.33` = 33 %) |
| `pctH` | Horizontal percentage (share of the row) | **fraction 0–1** |
| `indice` | Index vs. the level subtotal | base **100** (100 = average) |
| `value` | Cell value: count (frequency tables) or mean (mean tables) | raw |
| `base` | Weighted base | raw |
| `avg` | Mean (mean tables only) | raw |
| `signif1` | First significance test | `1` = higher, `-1` = lower, `0` = not significant |
| `signif2` | Second significance test | `1` / `-1` / `0` |

**Operators**: `=`, `!=`, `<`, `>`, `<=`, `>=`.

:::warning Percentages are fractions
`pctV` and `pctH` are stored as **fractions**, not percentages. Write `pctV < 0.10` for "below 10 %", **not** `pctV < 10`. (`indice` on the other hand is on a base-100 scale.)
:::

```
value > 100 AND signif1 = -1 AND pctV < 0.333 : #E63946;Rare & low
indice >= 120 : #2E86AB;Over-represented
```

### Header (text) variables

Test the **label** of the row/column header at a given level. Level numbering is **outermost = 1**.

| Variable | Refers to |
|---|---|
| `col1`, `col2`, `col3` | Column header at level 1 / 2 / 3 (top → down) |
| `colX` | **Any** column level (matches if at least one level matches) |
| `row1`, `row2` | Row header at level 1 / 2 (outer → inner) |
| `rowX` | **Any** row level |

In tables with **sub-tables** (two row levels), `row1` is the sub-table name and `row2` is the row label. In a simple table, `row1` is the visible row label.

**Operators** (all **case-insensitive**):

| Operator | Meaning |
|---|---|
| `CONTAINS "x"` | Label contains the substring `x` |
| `IN ("a","b","c")` | Label equals one of the listed values |
| `=` / `!=` | Label equals / differs from a value |

:::warning Quote text with special characters
String literals that contain spaces or parentheses **must be quoted**: `row1 CONTAINS "(4)"`. Without quotes, the parentheses break parsing. Also, the substring must appear **literally** — `CONTAINS "(10)"` does **not** match `note sur 10)` (there is no `(` right before `10`); use `CONTAINS "sur 10)"` instead.
:::

```
col1 = "Total" : #eeeeee;Total column
colX CONTAINS "Framatome" : color:#0a7
row1 IN ("BRAND1","BRAND2","BRAND99") : #0088FF;Target
```

:::note Numeric vs. text operators
A numeric operator (`<`, `>`, …) on a header variable, or `CONTAINS` on a numeric variable, simply evaluates to `false` (no error). On `colX`/`rowX`, a condition is true if **at least one** level satisfies it (OR semantics).
:::

---

## Output & display modes

The **Measure content** dropdown (Format pane → Cell Rules settings) decides how each rule's output string is interpreted.

For every mode **except Custom CSS**, the output is `#color;label`, split on the **first** `;`:

| Output | Interpretation |
|---|---|
| `#RRGGBB` or `#RGB` or `rgb(...)` | A color |
| `Any text` | A label |
| `#RRGGBB;Label text` | Color **and** label (label may contain more `;`) |

| Mode | Uses | Effect |
|---|---|---|
| `Cell background color` | color | Fills the cell background |
| `Text color` | color | Colors the cell text |
| `Label only` | label | Prepends a label to the cell |
| `Label + cell background` | color + label | Background + label |
| `Label + text color` | color + label | Text color + label |
| `Label + badge` | color + label | Colored badge (shape set by **Badge shape**) + value |
| `Custom CSS` | free CSS (+ optional label) | See below |

```
// Mode: Label + badge
avg >= 8 : #27AE60;Excellent
avg >= 6 : #F39C12;Good
avg >= 4 : #E74C3C;Poor
```

---

## Custom CSS mode

In **Custom CSS** mode, the output is a **raw CSS declaration block**, optionally followed by ` | label`. This gives full control: text color that adapts to the background, bold/underline, alignment, gradients, shadows…

```
// Mode: Custom CSS
avg < 2.6 AND row1 CONTAINS "sur 4)"  : background:#E50158;color:#fff;font-weight:bold | Alert
avg < 5.5 AND row1 CONTAINS "sur 10)" : background:#E50158;color:#fff;font-weight:bold | Alert
default : background:#EEE;color:#333;text-align:right
```

- CSS uses `;` as its separator, so in this mode the `;` no longer splits color/label — the **label** (if any) goes **after a `|`**.
- Every declaration is applied with `!important`, so a rule reliably overrides the default cell/row styling (alternating rows, cell format…).

### Security & certification

User CSS is **sanitized** before being applied, and applied only through the CSSOM (`style.setProperty`), never as HTML — so it **cannot execute JavaScript** and **cannot load external resources**. The sanitizer rejects any declaration whose value contains `url(...)`, `image-set(...)`, `expression(...)`, backslash escapes, at-rules (`@…`), `<`/`>`, braces or comments.

:::tip What still works
Gradients (`linear-gradient(...)`), `calc()`, `rgb()`/`hsl()`, vendor prefixes, text decoration, alignment, shadows — none of these need `url()`, so they all pass. Only external-resource and code-execution vectors are blocked, keeping the visual certification-safe.
:::

---

## Enable Cell Rules

**Setting**: Activate Cell Rules — **Type**: Toggle — **Default**: Off

Master switch. When off, no rule is evaluated and no decoration is applied.

**Setting**: Badge shape — visible when mode is `Label + badge`

| Shape | Appearance |
|---|---|
| Circle | Fully rounded pill |
| Square | Sharp rectangular badge |
| Rounded Square | Rectangle with slightly rounded corners |

:::note Compatibility with Ranking badges
Cell Rules badges and Ranking badges are **cumulative** — both can appear in the same cell (the Cell Rules badge is placed first).
:::

---

## Evaluation order & scope

- Rules are evaluated **at the very end of the pipeline**, after all calculations **and after masking**: a masked cell is never rendered, so no rule runs on it.
- If a **threshold** empties a cell's displayed content, rules **still apply** (the underlying numbers are still available).
- Rules apply to data cells **and to subtotal / total columns** (they all go through the same render path). `colX` on a grand-total column is empty, but numeric conditions and `rowN` still work there.
- The **Base / Total rows** (Base, Unweighted base…) are **out of scope** — they bypass the rule engine.

---

## Compatibility and Conflicts

Some modes are mutually exclusive because they write the same visual property. On conflict, the grid is **not rendered** and an error is shown.

| Conflict | Reason |
|---|---|
| Cell Rules (background) + Ranking (color mode) | Both write cell background |
| Cell Rules (background) + Significance (background mode) | Both write cell background |
| Cell Rules (text color) + Significance (font color mode) | Both write cell text color |
| Ranking (color mode) + Significance (background mode) | Both write cell background |

**To resolve**: disable one feature or switch to a non-overlapping mode. Significance shown as **icons** or **borders** never conflicts.

:::note Custom CSS is not conflict-checked
Because Custom CSS can set any property, it is not part of the automatic conflict detection — you are responsible for avoiding clashes with Ranking/Significance colors.
:::

---

## Practical Examples

### Heterogeneous means (per-scale thresholds)

Same table, some rows scored **/4** and others **/10** (marker in the row label). Thresholds depend on the scale:

```
// Mode: Custom CSS
(avg < 2.6 AND row1 CONTAINS "sur 4)")  OR (avg < 5.5 AND row1 CONTAINS "sur 10)") : background:#E50158;color:#fff;font-weight:bold
(avg < 2.8 AND row1 CONTAINS "sur 4)")  OR (avg < 6.5 AND row1 CONTAINS "sur 10)") : background:#FFC79F
(avg < 3.0 AND row1 CONTAINS "sur 4)")  OR (avg < 7.0 AND row1 CONTAINS "sur 10)") : background:#96EEEC
default : background:#7CE0A3
```

### Frequency traffic light (background only)

```
// Mode: Cell background color
pctV >= 0.30 : #27AE60
pctV >= 0.15 : #F39C12
default      : #E74C3C
```

### Highlight significant results

```
// Mode: Text color
signif1 = 1  : #1B7F3B
signif1 = -1 : #C0392B
```

### Target specific columns

```
// Mode: Label + cell background
col1 IN ("Framatome","EDF") AND indice >= 120 : #2E86AB;Key account
```

---

## Troubleshooting

**The status shows `❌ Line N: Expected ')' found '…'`**
A value or operand is missing on that line (e.g. `avg <  AND …` — no number after `<`). The parser consumed the next keyword as the missing value. Complete the condition.

**A header rule never matches**
The searched text must appear **literally** in the label and be **quoted** if it contains spaces/parentheses. Remember `CONTAINS "(10)"` ≠ `note sur 10)`.

**A percentage rule never matches**
`pctV`/`pctH` are fractions (0–1). Use `pctV < 0.10`, not `pctV < 10`.

**Custom CSS: background doesn't change (normal mode)**
Already handled — every Custom CSS declaration is applied with `!important`, so it overrides the default background. If you edited rules, reload the visual to pick up the change.

**A `url(...)` in my CSS is ignored**
That is intentional: external resources are stripped for certification safety. Use gradients or inline colors instead.

**Decoration appears on some cells but not others**
Expected — a cell where no rule matches (and no `default` is set) is left undecorated.

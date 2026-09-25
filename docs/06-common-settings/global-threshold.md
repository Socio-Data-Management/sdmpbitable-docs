---
sidebar_position: 1
title: Global Threshold
---

# Global Threshold Reference

## Overview

The **Global Threshold** card decides what the visual shows when the table **should not be drawn at all**. It covers two situations, each with its own message:

1. **An empty dataset** — a page, report or slicer filter leaves the matrix without a single data row.
2. **A test you define** — typically *"the base is below 30 respondents, do not publish these figures"*.

In both cases the table is replaced by a **panel you control**: message, alignment, font, text color, background and transparency.

:::info[Not to be confused with the *Thresholds* card]
[Thresholds](../04-reference/thresholds.md) works **cell by cell** — it warns on, or masks, individual values whose base is too small, and the table is still drawn. Global Threshold works on the **whole visual**: nothing is drawn at all, only the panel. Hence the name.
:::

:::note[Replaces *Clear on Empty dataset*]
This card supersedes the old **Clear on Empty dataset** toggle of the [Table Contents](../04-reference/table-content.md) card, which could only choose between a hard-coded *"No data to display"* message and a blank screen. See [Coming from *Clear on Empty dataset*](#coming-from-clear-on-empty-dataset).
:::

---

## Scope

Global Threshold is available on **CrossTable** and **CrossTable InCell Charts** — same card, same properties, same behavior, same defaults. It is documented once here rather than twice; nothing on this page is specific to one of the two visuals.

**Location**: Format pane → **Global Threshold** card.

---

## Properties

### The empty-dataset message

| Property | Description | Default |
|----------|-------------|---------|
| **Empty Panel** | Draws the panel when the dataset is empty. Switch it off to render **strictly nothing** in that case. | On |
| **Message** | Text drawn on the panel for an empty dataset. Leave it empty for a completely blank panel. Supports conditional formatting (fx). | `No Data to display` |

### The conditional message

| Property | Description | Default |
|----------|-------------|---------|
| **Conditional Message** | Text drawn instead of the table when the test below is met. Leave it empty for a completely blank panel. Supports conditional formatting (fx). | `Not enough data to display` |
| **Test if** | Left operand — normally a **measure bound through fx** (a base, a count of respondents). | 0 |
| **Is** | The comparison: `>`, `=` or `<`. | `<` |
| **To** | Right operand — a constant, or a measure through fx. | 0 |

### Panel presentation (shared by both messages)

| Property | Description | Default |
|----------|-------------|---------|
| **Horizontal Alignment** | Left, center or right. | Center |
| **Vertical Alignment** | Top, middle or bottom. | Middle |
| **Font** | Font family, size, and bold / italic / underline. The size supports conditional formatting (fx). | Segoe UI, 14 pt |
| **Text Color** | Message color. Supports conditional formatting (fx). | #333333 |
| **Background Color** | Fill painted behind the message. Supports conditional formatting (fx). | #FFFFFF |
| **Transparency** | Background transparency, 0 % (opaque) to 100 % (invisible). Supports conditional formatting (fx). | 100 % |

:::note Why the background looks like nothing at first
**Transparency** defaults to **100 %**, so the panel is transparent out of the box and the report page shows through behind the message. Lower it to make **Background Color** visible.
:::

---

## Case 1 — An empty dataset

An **empty dataset** means the matrix reaches the visual with **no data rows at all**: a filter — page level, report level, a slicer, a cross-highlight — excludes every respondent or every category.

It is *not*:

- **blank or zero cells** inside an otherwise populated table (that is [Thresholds](../04-reference/thresholds.md) or [Masking](../04-reference/table-content.md));
- a missing field binding — that case still shows the usual *"Please check that you have at least one Row and one column variable"* message.

Whatever the card says, the table is **never drawn** on an empty dataset — no empty "shell" made of a column header and a `Base` row at 0 — and the **Excel export button is never shown**, since there would be nothing to export. Power BI is also told that rendering has completed, so the page does not stay stuck in a loading state and *Export to PDF* or *Print* does not wait on a visual that will never draw.

From there, **Empty Panel** decides:

- **On (default)** — the panel is drawn: the background fill first, then **Message** at the chosen alignment, in the chosen font and color.
- **Off** — nothing is drawn at all. The visual's frame stays in place, empty.

---

## Case 2 — Your own test

The conditional message answers a different need: **there is data, but it must not be published**. A base of 12 respondents, a period still being collected, a segment too narrow to be significant — the figures exist, they simply should not be read.

The test reads as one sentence:

> **Test if** *(a measure)* **Is** `<` **To** *(a value)*

When it holds, the table is not drawn — exactly as for an empty dataset — and **Conditional Message** is displayed on the panel instead.

### Setting it up

1. Write the measure that carries the number to test, for instance the unweighted base of the table:

   ```dax
   Respondents = COUNTROWS ( Answers )
   ```

2. In the **Global Threshold** card, click the **fx** button of **Test if** and bind it to that measure.
3. Set **Is** to `<` and **To** to your publication threshold, for example `30`.
4. Type the text in **Conditional Message**:

   ```
   Sample too small to be published
   ```

Below 30 respondents, the table disappears behind the message; at 30 or above, it renders normally.

:::tip[The message can carry the figure]
**Conditional Message** also carries an **fx** button, so it can come from a measure and quote the number that triggered it:

```dax
Threshold Message =
"Sample too small to be published (" & [Respondents] & " respondents)"
```
:::

### There is no toggle — the test is the switch

The conditional message has no on/off property: it applies whenever the test is met. With the shipped defaults — **Test if** `0`, **Is** `<`, **To** `0` — the test is false (0 is not below 0), so the feature stays off until you bind or change something.

Keep that in mind when choosing the operator: `=` with both operands left at `0` would be **true**, and the visual would show the conditional message on every page.

### Which message wins

The two cases never compete: the test is only evaluated when the dataset **has rows**. An empty dataset always shows **Message** (or nothing, if **Empty Panel** is off), never the conditional one.

This also removes an awkward edge: on an empty dataset a measure normally returns `BLANK()`, so a test built on a base measure could not be trusted there anyway.

---

## Translated messages

Left untouched, **Message** shows `No Data to display` and **Conditional Message** shows `Not enough data to display`. In both cases the visual replaces the text at render time with the **translation matching the report's language** — the same ten languages the visuals ship with (English, French, German, Spanish, Italian, Portuguese, Romanian, Arabic, Hebrew, Chinese).

As soon as you type your own text, that text is used **verbatim**, exactly as typed, in every language. A multilingual report therefore either keeps the default messages, or drives them with a measure:

```dax
Empty Message =
VAR ReportLanguage = SELECTEDVALUE ( Languages[Code], "en" )
RETURN
    SWITCH (
        ReportLanguage,
        "fr", "Aucune donnée pour cette sélection",
        "de", "Keine Daten für diese Auswahl",
        "No data for this selection"
    )
```

:::caution A measure often returns BLANK on an empty dataset
An **fx** rule is evaluated in the visual's own filter context — the very context that has just been emptied. A measure built on the fact table (a count of respondents, a base) typically returns `BLANK()` there, and **Message** then falls back to the typed constant. Build it on a table the filter does *not* empty (a language or parameter table, a disconnected table), or wrap it in `COALESCE` / `IF ( ISBLANK ( … ) , … )`. **Conditional Message** is not affected: it is only ever shown while the table has rows.
:::

**Text Color**, **Background Color**, **Transparency** and the font size accept rules as well, so the panel can change appearance with the situation — a neutral gray for "no collection this month", a warning color for a base below the publication threshold.

---

## Coming from *Clear on Empty dataset*

The old toggle lived on the **Table Contents** card and had the opposite polarity. The mapping is:

| Old — *Clear on Empty dataset* | New — *Empty Panel* | Result |
|--------------------------------|---------------------|--------|
| Off (default) | **On** (default) | The localized *"No data to display"* message — same as before, now stylable |
| On | **Off** | Nothing at all — same as before |

:::warning The old value is not carried over
The removed setting is a clean cut: reports that had **Clear on Empty dataset** switched **on** now fall back to the new default, which *shows* the message. Switch **Empty Panel** off in those reports to get the blank screen back.
:::

---

## Notes

- The panel never intercepts clicks: pointer events pass through, so the report page keeps behaving normally underneath.
- The **About** icon, the ⚙ gear icons of the editor-only editors, and the *Powered by Socio Data Management* watermark of the Free edition remain visible above the panel. See [Editions](../01-introduction/editions.md).
- Messages accept line breaks and wrap on the width of the visual; text that exceeds the available height is clipped rather than overflowing.
- The panel is cleared at the start of every render, so it can never linger over a table that has data again.
- Data fields stay bound in both cases, and the visual keeps its position and size on the page: as soon as the filters let rows through, or the test stops holding, the table comes straight back — nothing is lost.

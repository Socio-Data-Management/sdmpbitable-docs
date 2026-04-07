---
sidebar_position: 10
title: Filtering & Selection
---

# Filtering & Selection Reference

## Overview

Enable users to interact with your table by selecting rows or columns headers. This feature allows end-users to filter other page visuals using the SDM Cross Table Tool visualization.

:::info Edition Availability
Row and column selection is available in **Pro** and **Premium** editions.
:::

<video autoPlay loop muted playsInline style={{ maxWidth: "100%", border: "1px solid #ccc", borderRadius: "4px" }}>
  <source src="/sdmpbitable-docs/videos/sdmPbiTable-selection.webm" type="video/webm" />
</video>
[Selection in SDM Cross Table Tool](/videos/sdmPbiTable-selection.webm)

---

## Enabling/Disabling Selection
There is two available options to enable or disable selection feature:
- Right click on the table → **Enable Selection**
- In the formatting pane, under **Table Format** section, toggle on or off **Enable Selection**.

## Multiple Selection
Power BI does not permit filtering multiple variables at the same time. However, users can select multiple rows or columns within the same variable by holding the Ctrl (or Cmd on Mac) key while clicking on the headers.

## Clearing Selection
To clear the current selection:
- Click on the top left corner cell.
- Or click again on the selected row/column while holding the Ctrl (or Cmd) key.
- Right click on the table → **Clear Selection**.
- Disable selection (see previous section).

## Selection Behavior

### Visual Feedback

When a row or column is selected:
- The selected header highlights with a distinct cell border color
- Other visuals in your report respond to the selection
- Create interactive dashboards where users control what data displays
- Combine with slicers and other Power BI features

---

## Limitations & Considerations

- **Data Size**: Very large tables (1000+ rows) may have performance impact
- **Nested Hierarchies**: Selection on multi-level hierarchies may behave differently
- **Performance**: Complex cross-filtering with many connected visuals may be slow

---

## Troubleshooting

**Q: Selection doesn't trigger other visuals to update**  
A: Check Power BI cross-filtering settings. Ensure other visuals have cross-filter enabled.

**Q: Users can't multi-select rows/columns**  
A: Multi-select depends on browser and Power BI version. Single selection always works.

**Q: Selected row/column doesn't highlight**  
A: Check that Enable Selection is turned on in formatting panel

**Q: Selection performance is slow**  
A: Large tables (1000+ rows) may be slow. Consider data aggregation or pagination.

**Q: Selection is grayed out/unavailable**  
A: Row and Column Selection requires Pro or Premium edition

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md).

---
sidebar_position: 10
title: Filtering & Selection
---

# Filtering & Selection Reference

## Overview

Enable users to interact with your table by selecting rows and columns. This feature allows end-users to filter and highlight specific data within the SDM Cross Table Tool visualization.

:::info Edition Availability
Row and column selection is available in **Pro** and **Premium** editions.
:::

---

## Enable Selection

### Enable Row Selection
**Setting**: Enable row selection  
**Type**: Toggle  
**Default**: Off  
**Available in**: Pro, Premium

When enabled, users can click on row headers to select/deselect rows in the table.

**Use Case**: Allow stakeholders to focus on specific demographic segments or product categories

**Example**:
```
User clicks on "Product A" row header
→ Row highlights
→ Can be used for filtering in Power BI interactions
```

### Enable Column Selection
**Setting**: Enable column selection  
**Type**: Toggle  
**Default**: Off  
**Available in**: Pro, Premium

When enabled, users can click on column headers to select/deselect columns in the table.

**Use Case**: Allow focus on specific time periods, regions, or response categories

**Example**:
```
User clicks on "Q4 2024" column header
→ Column highlights
→ Can be used with Power BI cross-filtering
```

---

## Selection Behavior

### Visual Feedback

When a row or column is selected:
- The selected element highlights with a distinct background color
- Other elements may dim slightly for contrast
- Multiple selections are cumulative (hold Ctrl/Cmd to multi-select on supported browsers)

### Power BI Integration

Selected rows/columns trigger Power BI cross-filtering:
- Other visuals in your report respond to the selection
- Create interactive dashboards where users control what data displays
- Combine with slicers and other Power BI features

---

## Practical Examples

### Example 1: Regional Performance Dashboard (Pro Edition)
```
Configuration:
- Enable Row Selection: Yes
- Enable Column Selection: Yes

User Workflow:
1. User clicks "North Region" row
2. All other visuals filter to show North data
3. User clicks "2024" column
4. All visuals update to show 2024 data for North
5. Combined view: North 2024 performance
```

### Example 2: Survey Response Analysis
```
Configuration:
- Enable Row Selection: Yes
- Table Type: Percentage

User Workflow:
1. User wants to focus on "Very Satisfied" respondents
2. Clicks the "Very Satisfied" row
3. Other charts/tables respond to show data for that segment
4. Drill-down analysis becomes possible
```

### Example 3: Product Comparison
```
Configuration:
- Enable Row Selection: Yes
- Enable Column Selection: Yes

User Workflow:
1. Select multiple products (Ctrl+Click)
2. Select specific markets (Ctrl+Click on columns)
3. Compare selected products in selected markets
4. Dynamically shows relevant KPIs for chosen filters
```

---

## Technical Details

### Selection Types

**Row Selection**: User selects one or more rows
- Affects Power BI row-level filters
- Useful for segment analysis
- Can be single or multiple (depends on browser/Power BI version)

**Column Selection**: User selects one or more columns  
- Affects Power BI column-level filters
- Useful for time period or region focus
- Works with hierarchical columns

### Cross-Filter Behavior

When a selection is made:
1. SDM Cross Table Tool sends the selected value(s) to Power BI
2. Power BI applies cross-filtering to all connected visuals
3. Other visuals update to reflect the selection
4. Users can clear selection to return to full view

---

## Best Practices

1. **Label Clearly**: Make sure row/column labels are clear so users understand what they're selecting
2. **Combine with Slicers**: Use Power BI slicers alongside selection for more control
3. **Test Interactions**: Verify cross-filtering works as expected with other visuals
4. **Mobile Consideration**: On mobile devices, selection may work differently
5. **Data Volume**: Selections work best with moderate data volumes (under 1000 rows/columns)

---

## Limitations & Considerations

- **Data Size**: Very large tables (1000+ rows) may have performance impact
- **Browser Support**: Selection behavior varies by browser
- **Mobile**: Touch devices may require different interaction patterns
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

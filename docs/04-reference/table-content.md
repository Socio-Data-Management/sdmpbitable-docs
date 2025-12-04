---
sidebar_position: 1
title: Table Contents
---

# Table Contents Reference

## Overview

The **Table Contents** section controls what data is displayed in your table and how it's aggregated.

## Table Type

**Setting**: Table type (Percentage or Mean)  
**Default**: Percentage

### Percentage Tables

Used to analyze distributions, proportions, and response rates.

**Available Displays**:
- **Values**: Raw count or sum
- **Vertical Percentage (%)**: Percentage within each column
- **Horizontal Percentage (%)**: Percentage within each row
- **Indice**: Index value (typically 100 = average)

**Example**: In a survey of 100 respondents:
```
            Very Satisfied    Satisfied    Neutral
North       45 (60%)         30 (40%)     25 (33%)
South       35 (47%)         45 (60%)     45 (60%)
Total       80 (53%)         75 (50%)     70 (47%)
```

### Mean Tables

Used to analyze averages and their statistical properties.

**Available Displays**:
- **Mean Values**: Average of the metric
- **Count**: Number of observations used in calculation
- **Standard Deviation**: Measure of variability
- **Indice**: Index based on mean values

**Example**: Average customer satisfaction score:
```
            Mean Score    Count    Std Dev
Product A   4.2          1250     0.8
Product B   4.5          980      0.7
```

---

## Display Options

### Values
**Label**: Show values  
**Type**: Toggle  
**Default**: Off

When enabled, displays the raw count or sum in each cell.

### Vertical Percentage
**Label**: Vertical percentage  
**Type**: Toggle  
**Default**: On

Shows each cell's value as a percentage of its column total. Useful for comparing across categories within groups.

### Horizontal Percentage
**Label**: Horizontal percentage  
**Type**: Toggle  
**Default**: Off

Shows each cell's value as a percentage of its row total. Useful for comparing category distribution within segments.

### Indice
**Label**: Show indice  
**Type**: Toggle  
**Default**: Off

Displays index values (typically with 100 as base). Useful for comparing relative performance against an average.

**Calculation**: `(Cell Value / Average) × 100`

---

## Masking

### Mask Pattern
**Label**: Mask Pattern  
**Type**: Text area  
**Default**: Empty  
**Available in**: Pro, Premium editions

Allows you to mask (hide) data from specific rows or columns using regular expressions.

**Examples**:
- `Total|Subtotal` — Hides rows matching "Total" or "Subtotal"
- `^Other` — Hides rows starting with "Other"
- `Confidential` — Hides exact matches

**Use Cases**:
- Hide sensitive data in shared reports
- Remove subtotals or intermediate calculations
- Filter out "Other" or "Not answered" categories

---

## Series Configuration

For detailed series configuration options (Value Series, Base Series, Mean Series, etc.), see:
- **[Percentage Series Usage](percentage-series.md)** — For percentage tables
- **[Mean Series Usage](mean-series.md)** — For mean tables

---

## Display Format

### Show % Symbol
**Label**: Show % symbol  
**Type**: Toggle  
**Default**: On

Controls whether the "%" character appears after percentage values.

### Percent Precision
**Label**: Percent precision  
**Type**: Number (0-5)  
**Default**: 1

Specifies number of decimal places for percentage display.

**Examples**:
- Precision 0: `45%`
- Precision 1: `45.2%`
- Precision 2: `45.23%`

---

## Best Practices

1. **Choose Table Type First**: Percentage vs Mean fundamentally changes how data is displayed
2. **Limit Display Fields**: Use 2-3 display options maximum for clarity
3. **Use Masking Sparingly**: Masked data is still calculated but hidden
4. **Precision for Business**: Use 0-1 decimal places for most business reporting
5. **Totals Context**: Show totals to help readers understand the base size

---

## Related Settings

- [Totals Settings](totals.md) — Configure total rows and columns
- [Series Configuration](percentage-series.md) — Detailed data mapping
- [Sorting Options](sorting.md) — Arrange rows and columns

---

## Troubleshooting

**Q: Values appear as "0%" or very small numbers**  
A: Check that your base series is correctly mapped in percentage series settings.

**Q: Indice values don't look right**  
A: Ensure you've configured both values and base series correctly.

**Q: Mask pattern isn't working**  
A: Check your regular expression syntax. Use simple patterns like `Total` before complex regex.

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md).

---
sidebar_position: 4
title: Significance Testing
---

# Significance Testing Reference

## Overview

Identify statistically significant differences between groups in your data.

:::info Edition Availability
- **Basic significance**: Available in **Pro** edition
- **Advanced significance**: Available in **Premium** edition
:::

---

## Test Configuration

### Significance Test 1
**Setting**: Significance 1  
**Options**: None, All columns, Item vs other question item, Item versus Total (Base), Regular expression  
**Default**: None

### Significance Test 2
**Setting**: Significance 2  
**Options**: Same as above  
**Default**: None

Each test compares different aspects of your data.

---

## Test Types Explained

### None
No significance testing is performed.

### All Columns
Compares each column against all others in the table.

**Use Case**: Determine which regions have significantly different satisfaction scores

**Example**:
```
If comparing satisfaction:
- North: 68% vs South: 52% → SIGNIFICANT (if p < 0.05)
- North: 68% vs East: 65% → NOT significant
```

### Item vs Other Question Item
Compares one response option against all others.

**Use Case**: Highlight if one product preference is significantly different

**Example**:
```
"Prefer Product A" vs "Prefer Product B + Prefer Product C"
```

Available in **Pro** and **Premium** editions.

### Item versus Total (Base)
Compares each item to the overall average.

**Use Case**: Identify which regions over/under-perform vs company average

**Example**:
```
If overall satisfaction = 60%
- North: 68% → SIGNIFICANT (above average)
- South: 52% → SIGNIFICANT (below average)
```

Available in **Pro** and **Premium** editions.

### Regular Expression
Uses a regex pattern to identify columns to compare.

**Use Case**: Compare all regions starting with "North"

**Example Pattern**: `^North` matches North1, North2, NorthEast

Available in **Premium** edition only.

---

## Confidence Level

### Significance Level
**Setting**: Significance level  
**Options**: 90%, 95%, 99%  
**Default**: 95%

The confidence threshold for determining significance.

- **90%**: More lenient (flags more differences)
- **95%**: Standard business level
- **99%**: Strict scientific standard

### Variance Method (Percentage Tables Only)

**Setting**: Signif. Var. Method  
**Options**: Pooled proportion, Separate proportion  
**Default**: Pooled  
**Available in**: Pro, Premium

How variance is calculated when comparing percentages.

- **Pooled**: Treats all groups as one population (more conservative)
- **Separate**: Treats groups separately (more sensitive to differences)

---

## Display Options

### View Option
**Setting**: Significance view option  
**Options**: Icon, Font Color, Background Color, Cell border Color  
**Default**: Icon

How significant values are marked:

**Icon**: Small symbol/marker appears in cell  
**Font Color**: Text color changes to highlight significance  
**Background Color**: Cell background changes  
**Border Color**: Cell border changes to highlight

---

## Advanced Testing (Premium Only)

### Multiple Test Configuration

In Premium edition, you can configure each test independently:
- Different display methods for each test
- Different test types simultaneously
- Regex patterns for flexible comparison

### Hide First Variable
Hides the first variable in comparative displays for cleaner visuals.

---

## Statistical Background (For Reference)

### What Tests Are Used?

For percentage tables: **Chi-square test** of independence  
For mean tables: **T-tests** or **ANOVA** (depending on number of groups)

### Interpretation

A cell marked as significant means:
- The difference between groups is unlikely due to chance
- At the chosen confidence level
- Given the sample sizes

### Important Notes

- Significance depends on sample size (large samples show more differences)
- Practical significance ≠ statistical significance (a 1% difference might be statistically significant but not practically important)
- Always consider context, not just statistics

---

## Practical Examples

### Example 1: Regional Satisfaction (Pro Edition)
```
Configuration:
- Significance Test 1: All columns
- Significance Level: 95%
- View Option: Background Color

Result: Cells show which regions differ
        significantly from others
```

### Example 2: Product Performance vs Average (Pro Edition)
```
Configuration:
- Significance Test 1: Item versus Total
- Variance Method: Pooled proportion
- View Option: Font Color
- Display: Red text for significant differences

Result: Products performing above/below
        company average are highlighted
```

### Example 3: Complex Analysis (Premium Edition)
```
Configuration:
- Test 1: All columns (with icon)
- Test 2: Item vs Total (with color)
- Level: 99% (strict)

Result: Can see both column-to-column
        differences AND vs-average differences
```

---

## Series Configuration for Testing

Significance tests require special data series:

### For Percentage Tables:
- **Significance Series**: The counts/values used for testing
- **Base Series**: The total base for calculating proportions

### For Mean Tables:
- **Mean Series**: The mean values to test
- **Standard Deviation Series**: Measure of variability
- **Count Series**: Sample size

Configure these in data settings under:
- "Significance Series" (percentage tables)
- "Mean Series for Significance" (mean tables)

---

## Best Practices

1. **Choose Appropriate Test**: Match test type to your question (all columns vs vs-total)
2. **Clear Display**: Use one view option per test for clarity
3. **Document Level**: Note which significance level you're using in reports
4. **Consider Sample Size**: Small sample sizes can miss real differences
5. **Practical Significance**: Don't rely solely on statistics; consider business context

---

## Troubleshooting

**Q: Significance markers don't appear**  
A: Ensure you've configured significance series in data settings

**Q: All cells are marked significant**  
A: Your significance level might be too lenient (90%); try 99%

**Q: No cells marked significant**  
A: Check sample sizes; very small groups won't show significance

**Q: Significance test types are grayed out**  
A: Significance testing requires Pro or Premium edition

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md) or contact support.

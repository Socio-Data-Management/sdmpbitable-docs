---
sidebar_position: 5
title: Formatting & Styling
---

# Formatting & Styling Reference

## Overview

Customize the appearance of your table with fonts, colors, and layouts.

---

## Table Display Options
![Table Display Options](../images/table-display-options.png)

### Highlight Row on Hover
**Setting**: Highlight row on hover  
**Type**: Toggle  
**Default**: On

Highlights the entire row when your cursor moves over it.

### Zebra Rows
**Setting**: Zebra rows  
**Type**: Toggle  
**Default**: On

Alternates row background colors for easier reading.

### Show % Symbol
**Setting**: Show % symbol  
**Type**: Toggle  
**Default**: On

Displays "%" after percentage values.

### Percent Precision
**Setting**: Percent precision  
**Type**: Number (0-5)  
**Default**: 1

Specifies number of decimal places for percentage display.

> **Examples**:
> - Precision 0: `45%`
> - Precision 1: `45.2%`
> - Precision 2: `45.23%`

### Freeze Left Column
**Setting**: Freeze left column  
**Type**: Toggle  
**Default**: On

Keeps the row labels visible while scrolling horizontally.

### Freeze Top Row
**Setting**: Freeze top row  
**Type**: Toggle  
**Default**: On

Keeps column headers visible while scrolling vertically.

### Row Title Fixed Width
**Setting**: Row title fixed width  
**Type**: Text input  
**Examples**: `200px`, `20%`, `15em`  
**Default**: Auto

Set a fixed width for the row labels column. Leave empty for automatic sizing.
:::tip When using a row label fixed width ?
This option is useful if you intend to have a consistent layout across multiple tables or reports. Especially when you have the same column variables but different variables in rows.
:::

### Show Column Header
**Setting**: Show column header  
**Type**: Toggle  
**Default**: On

Show or hide column headers.

:::tip When to hide column headers?
Hiding column headers can be useful in scenarios where the table is part of a larger dashboard with clear context, or when space is limited and the headers are redundant.
:::

---

## Element Formatting

You can customize fonts, colors, and backgrounds for different table elements:

### Top Level Column Header
Formatting for the primary level of column headers.

**Customizable Properties**:
- Font family
- Font size
- Bold, Italic, Underline
- Font color
- Background color

**Default**: Arial, bold, 11pt

### Sub Level Column Header
Formatting for hierarchical sub-headers (if using multi-level columns).

**Customizable Properties**: Same as top level

**Default**: Arial, bold, 11pt

### Cell Format
Formatting for data cells.

**Customizable Properties**:
- Font family
- Font size
- Bold, Italic, Underline
- Font color
- Background color

**Default**: Consolas, 11pt

---

## Font Settings

For each element, you can customize:

### Font Family
**Options**: System fonts (Arial, Verdana, Consolas, etc.)

Common choices:
- **Arial**: Professional, clean
- **Calibri**: Modern, readable
- **Times New Roman**: Traditional, formal
- **Consolas**: Technical, monospace

### Font Size
**Range**: 8pt - 28pt  
**Default**: 11pt

### Text Styles
- **Bold**: Strong emphasis
- **Italic**: Subtle emphasis
- **Underline**: Attention, links

---

## Color Customization

### Font Color
The text color in each element.

**Format**: Hex color code or color picker  
**Examples**: `#000000` (black), `#FFFFFF` (white)

### Background Color
The background color behind text.

**Format**: Hex color code or color picker  
**Examples**: `#FFFFFF` (white), `#F5F5F5` (light gray)

### Recommended Combinations

| Look | Header BG | Header Text | Cell BG | Cell Text |
|------|-----------|-------------|---------|-----------|
| Professional | #2E5090 | #FFFFFF | #FFFFFF | #000000 |
| Modern | #F0F0F0 | #333333 | #FFFFFF | #333333 |
| Academic | #CCCCCC | #000000 | #FFFFFF | #000000 |
| Bright | #FF6B35 | #FFFFFF | #FFFBF0 | #333333 |

---

## Layout Customization

### Responsive Sizing

By default, SDM Cross Table Tool is responsive and adapts to available space. Use "Row Title Fixed Width" if you want consistent layout.

### Scrolling Behavior

- **Horizontal Scroll**: Scroll to see more columns
- **Vertical Scroll**: Scroll to see more rows
- **Frozen Areas**: Top and left stay in place when scrolling

---

## Practical Styling Examples

### Professional Report Style
```
Table Display:
- Hover highlight: On
- Zebra rows: On
- Freeze: On

Headers:
- Font: Arial
- Size: 11pt
- Bold: Yes
- Background: #2E5090 (Navy)
- Text: #FFFFFF (White)

Cells:
- Font: Calibri
- Size: 10pt
- Background: #FFFFFF
- Text: #000000
```

### High-Contrast Accessibility
```
Headers:
- Font: Arial Black
- Size: 12pt
- Bold: Yes
- Background: #000000
- Text: #FFFF00 (Yellow)

Cells:
- Font: Verdana
- Size: 11pt
- Background: #FFFFFF
- Text: #000000
- Zebra: On (adds gray alternating)
```

### Corporate Branded
```
Headers:
- Font: Your brand font
- Size: 12pt
- Background: Your brand color
- Text: White or brand complementary

Cells:
- Font: Arial
- Size: 10pt
- Background: Light version of brand color
- Text: Dark gray
```

---

## Accessibility Considerations

1. **Color Contrast**: Ensure text is readable against background
   - Minimum 4.5:1 contrast ratio recommended
   - Use online contrast checkers

2. **Font Choices**: Sans-serif fonts (Arial, Verdana) are more readable
   - Avoid script or decorative fonts for data

3. **Font Size**: Minimum 10pt for comfortable reading
   - Consider your audience

4. **Color Coding Alone**: Don't rely only on color to convey information
   - Use text, icons, or patterns too

5. **Zebra Rows**: Helps dyslexic readers follow rows

---

## Best Practices

1. **Consistency**: Use same fonts/colors across all your reports
2. **Readability First**: Prioritize readability over aesthetics
3. **Test Printing**: Colors may change when printed
4. **Dark Mode**: If users have dark mode enabled, consider impact
5. **Mobile**: Frozen columns help with smaller screens

---

## Common Configurations

### Standard Business Report
- Zebra on, Hover on, Freeze on
- Arial headers, Calibri cells
- Professional blue/white color scheme
- 10-11pt font sizes

### Data-Dense Table
- Zebra on (helps tracking)
- Smaller fonts (9pt)
- Freeze left and top (navigation)
- Minimal colors (white, light gray)

### Executive Dashboard
- Clean, modern look
- Larger font (12-14pt headers)
- Brand colors
- Hover highlights
- Reduced decimals for simplicity

---

## Troubleshooting

**Q: Colors don't display in Power BI Service**  
A: Clear cache; ensure you're using web-safe colors

**Q: Font looks different when exported**  
A: Not all fonts are available in Excel; use standard fonts

**Q: Text overlaps with numbers**  
A: Increase font size or reduce column width

**Q: Background color makes text hard to read**  
A: Check contrast; try lighter background or darker text

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md).

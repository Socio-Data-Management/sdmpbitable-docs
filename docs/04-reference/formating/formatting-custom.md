---
sidebar_position: 5.3
title: Custom Element Formatting (Advanced)
---

# Custom Element Formatting Reference

Fine-tune fonts, colors, and backgrounds for specific table elements to create highly customized designs or match brand guidelines exactly.

:::info Settings Location
These settings correspond to **`topLevelHeaderSettings`**, **`subLevelHeaderSettings`**, and **`cellSettings`** in the configuration model.
:::

---

## Overview

Custom Element Formatting allows you to control individual elements independently:

- **Top-Level Column Headers**: The primary column header row
- **Sub-Level Column Headers**: Secondary headers (for hierarchical columns)
- **Cell Format**: Data cells containing values

Each element can have its own font, size, weight, and color settings.

---

## Element Reference

### Top-Level Column Header

The first (primary) row of column headers.

**Default styling**:
- Font: Arial
- Size: 11pt
- Bold: Yes
- Background: Inherited from theme
- Text Color: Inherited from theme

**Use cases for customization**:
- Make headers more prominent (larger, bolder)
- Match brand colors
- Distinguish from sub-headers
- Improve hierarchy visibility

### Sub-Level Column Header

Additional header rows (when using hierarchical column structures).

**Default styling**:
- Font: Arial
- Size: 11pt
- Bold: Yes
- Background: Slightly lighter than top level
- Text Color: Inherited from theme

**Use cases for customization**:
- Make sub-headers less prominent than top-level
- Add visual distinction for hierarchy
- Smaller font to show secondary importance

### Cell Format

Data cells containing actual values (numbers, percentages, etc.).

**Default styling**:
- Font: Consolas (monospace for alignment)
- Size: 11pt
- Bold: No
- Background: Inherited from theme
- Text Color: Inherited from theme

**Use cases for customization**:
- Change to more readable font (Arial, Calibri)
- Make certain values stand out
- Match data cell styling to headers

---

## Font Customization

### Font Family

**Setting**: Font family  
**Type**: Dropdown selection  
**Common options**: Arial, Calibri, Verdana, Consolas, Times New Roman, Georgia

#### Recommendations by Use Case

| Font | Style | Use Case |
|------|-------|----------|
| **Arial** | Clean, modern, sans-serif | Professional reports, most uses |
| **Calibri** | Modern, readable, sans-serif | Business documents, modern look |
| **Verdana** | Large x-height, readable, sans-serif | Web, accessibility, easy reading |
| **Consolas** | Monospace, aligned numbers | Technical data, precise alignment |
| **Times New Roman** | Traditional, serif | Formal, academic, traditional |
| **Georgia** | Serif, readable, elegant | Formal, elegant, book-like |

**Accessibility notes**:
- Sans-serif fonts (Arial, Calibri) are more readable for data
- Avoid decorative/script fonts
- Serif fonts acceptable for formal headers only

### Font Size

**Setting**: Font size  
**Type**: Number  
**Range**: 8pt - 28pt  
**Defaults**: 
- Headers: 11pt
- Cells: 11pt

**Recommended hierarchy**:
```
Top-level header:    12-14pt (largest, most prominent)
Sub-level header:    11-12pt (medium)
Cell data:          10-11pt (smallest, main focus on data)
```

**Tips for sizing**:
- Headers 1-2pt larger than cells
- Smaller fonts = more data visible, less readable
- Larger fonts = cleaner look, less data visible
- Consider your audience (executives prefer larger)
- Match your brand guidelines

### Text Styles

#### Bold
Makes text heavier/darker.

**Recommended usage**:
- ✅ Headers (always bold for prominence)
- ✅ Important values or totals
- ❌ Regular data cells (reduces readability)

#### Italic
Slightly slanted text.

**Recommended usage**:
- ✅ Subtotals or secondary values
- ✅ Footnotes or notes
- ❌ Main data cells (harder to read)

#### Underline
Line under text.

**Recommended usage**:
- ✅ Totals row (visual separator)
- ✅ Important headers
- ❌ Regular data (unnecessary decoration)

**Best practices**:
- Use sparingly for emphasis
- Don't combine more than 2 styles
- Ensure sufficient contrast with background

---

## Color Customization

### Font Color

The color of the text itself.

**Format**: Hex color code or color picker  
**Examples**:
- `#000000` = Black
- `#FFFFFF` = White
- `#333333` = Dark gray
- `#2E5090` = Navy blue
- `#006633` = Dark green

### Background Color

The color behind the text.

**Format**: Hex color code or color picker  
**Examples**:
- `#FFFFFF` = White
- `#F5F5F5` = Light gray
- `#E8F4F8` = Light blue
- `#2E5090` = Navy blue

---

## Color Contrast & Accessibility

### Contrast Requirements

Ensure text is readable against its background:

**WCAG Guidelines**:
- **Level AA** (standard): 4.5:1 contrast ratio
- **Level AAA** (enhanced): 7:1 contrast ratio

### High-Contrast Combinations

| Use | Font Color | Background | Contrast | Example |
|-----|-----------|-----------|----------|---------|
| **Headers** | #FFFFFF | #2E5090 | 9:1 | White on navy |
| **Headers** | #000000 | #F5F5F5 | 11:1 | Black on light gray |
| **Data** | #000000 | #FFFFFF | 21:1 | Black on white |
| **Data** | #FFFFFF | #333333 | 8:1 | White on dark gray |

### Low-Contrast (Avoid)

These combinations are hard to read:
- Yellow on white (0.9:1) ❌
- Light gray on white (1.5:1) ❌
- Purple on blue (3:1) ❌

### Testing Contrast

Use online contrast checkers:
- WebAIM Contrast Checker
- Accessible Colors
- WAVE Tool

---

## Practical Configuration Examples

### Professional Business Report

**Top-Level Header**:
- Font: Arial
- Size: 12pt
- Bold: Yes
- Font Color: #FFFFFF
- Background: #2E5090

**Sub-Level Header** (if used):
- Font: Arial
- Size: 11pt
- Bold: Yes
- Font Color: #FFFFFF
- Background: #4472C4

**Cell**:
- Font: Calibri
- Size: 10pt
- Bold: No
- Font Color: #000000
- Background: #FFFFFF

**Result**: Classic, professional, formal

---

### Modern/Minimalist Report

**Top-Level Header**:
- Font: Arial
- Size: 11pt
- Bold: Yes
- Font Color: #333333
- Background: #F0F0F0

**Sub-Level Header**:
- Font: Arial
- Size: 10pt
- Bold: No
- Font Color: #666666
- Background: #FAFAFA

**Cell**:
- Font: Arial
- Size: 10pt
- Bold: No
- Font Color: #000000
- Background: #FFFFFF

**Result**: Clean, contemporary, minimal

---

### High-Contrast Accessibility

**Top-Level Header**:
- Font: Arial (sans-serif)
- Size: 13pt (larger)
- Bold: Yes
- Font Color: #FFFF00 (yellow)
- Background: #000000 (black)

**Sub-Level Header**:
- Font: Arial
- Size: 12pt
- Bold: Yes
- Font Color: #000000
- Background: #FFFFFF

**Cell**:
- Font: Verdana (highly readable)
- Size: 11pt
- Bold: No
- Font Color: #000000
- Background: #FFFFFF

**Result**: Maximum accessibility for low-vision users

---

### Brand-Matched Corporate

**Top-Level Header**:
- Font: Arial
- Size: 12pt
- Bold: Yes
- Font Color: #FFFFFF
- Background: #CC0000 (brand red)

**Sub-Level Header**:
- Font: Arial
- Size: 11pt
- Bold: Yes
- Font Color: #FFFFFF
- Background: #FF6666 (light red)

**Cell**:
- Font: Calibri
- Size: 10pt
- Bold: No
- Font Color: #333333
- Background: #FFFFFF

**Result**: Branded, professional, recognizable

---

### Technical/Scientific Report

**Top-Level Header**:
- Font: Consolas (monospace)
- Size: 11pt
- Bold: Yes
- Font Color: #FFFFFF
- Background: #404040

**Sub-Level Header**:
- Font: Consolas
- Size: 10pt
- Bold: Yes
- Font Color: #000000
- Background: #D3D3D3

**Cell**:
- Font: Consolas (numbers align)
- Size: 10pt
- Bold: No
- Font Color: #000000
- Background: #FFFFFF

**Result**: Technical, precise, data-focused

---

## Layering with Style Themes

Custom Element Formatting works with Style Themes:

1. **Style Theme** sets base appearance
2. **Color Theme** applies palette
3. **Custom Element Formatting** overrides both

**Example workflow**:
```
Start with: Modern theme + Blue color
↓
Then customize: Change header to bold italic
↓
Result: Modern blue styling + your custom emphasis
```

---

## Hierarchy Best Practices

Create visual hierarchy to guide readers:

### Recommended Hierarchy

```
PROMINENCE SCALE:

Top-Level Header    ← Most prominent
  └─ Larger
  └─ Bold
  └─ Contrasting color

Sub-Level Header    ← Medium prominence
  └─ Slightly smaller
  └─ Bold (but less than top)
  └─ Slightly less contrast

Data Cell           ← Least prominent
  └─ Smallest size
  └─ Regular weight
  └─ High contrast for readability
```

### Visual Hierarchy Example

```
┌────────────────────────────────────┐
│ PRODUCT SALES (14pt, bold, navy)   │
├────────────────────────────────────┤
│ 2024 Q1  │ 2024 Q2  │ 2024 Q3      │ ← Sub-header (12pt, bold)
├──────────┼──────────┼──────────────┤
│  45,000  │  52,000  │  48,500      │ ← Data (10pt, regular)
│  38,200  │  41,300  │  39,800      │
│  61,500  │  58,900  │  64,200      │
└──────────┴──────────┴──────────────┘
```

---

## Accessibility Considerations

### Color Contrast

1. **Test your colors** using contrast checkers
2. **Aim for 7:1** if possible (WCAG AAA)
3. **Minimum 4.5:1** for text (WCAG AA)
4. **Avoid color alone** to convey meaning

### Font Choices

1. **Sans-serif preferred** (Arial, Verdana, Calibri)
2. **Avoid decorative** fonts
3. **Minimum 10pt** for readability
4. **Higher readability** for presentations/web

### Dyslexia-Friendly

- Use sans-serif fonts
- Increase letter spacing (use larger fonts)
- Avoid italic/underline in data cells
- Use zebra rows (alternating row colors)
- Ensure good contrast

---

## Export Considerations

### Excel Export

Some formatting may change:
- Fonts: All fonts are available in Excel
- Colors: Most colors export correctly
- Sizes: Slightly different rendering possible
- Weights: Bold/italic should export correctly

**Tip**: Test export before finalizing design

### PDF Export

- Fonts: Use standard fonts for compatibility
- Colors: Print to PDF may look different
- Resolution: Higher DPI available in PDF
- Sizing: May shrink on smaller pages

---

## Troubleshooting

**Q: Text is hard to read on my background color**  
A: Check contrast ratio (aim for 4.5:1 minimum). Use a contrast checker tool.

**Q: Font looks wrong in Power BI Service**  
A: Use standard system fonts (Arial, Calibri). Some fonts may not be available.

**Q: Headers are too big**  
A: Reduce font size 1-2pt or turn off Bold

**Q: Exported table looks different**  
A: Test print/export with your exact setup. Some color rendering varies.

**Q: Text overlaps with numbers**  
A: The font might not fit. Try a more compact font (Consolas) or reduce size.

---

## Common Color Palettes

### Professional Blue
```
Header BG:    #2E5090 (Navy)
Header Text:  #FFFFFF (White)
Sub-Header:   #4472C4 (Medium blue)
Cell BG:      #FFFFFF (White)
Cell Text:    #000000 (Black)
```

### Modern Minimal
```
Header BG:    #F0F0F0 (Light gray)
Header Text:  #333333 (Dark gray)
Sub-Header:   #FAFAFA (Very light gray)
Cell BG:      #FFFFFF (White)
Cell Text:    #000000 (Black)
```

### Warm Corporate
```
Header BG:    #CC6633 (Warm brown)
Header Text:  #FFFFFF (White)
Sub-Header:   #FF9966 (Light orange)
Cell BG:      #FFFBF5 (Off-white)
Cell Text:    #333333 (Dark gray)
```

### High Contrast
```
Header BG:    #000000 (Black)
Header Text:  #FFFF00 (Yellow)
Sub-Header:   #333333 (Dark gray)
Cell BG:      #FFFFFF (White)
Cell Text:    #000000 (Black)
```

---

## Related Topics

- [Table Options](formatting-basics.md) - Display behavior
- [Table Styles](formatting-styles.md) - Predefined themes
- [Formatting Overview](formatting.md) - All formatting options

---
sidebar_position: 8
title: Mean Series Configuration
---

# Mean Series Configuration

## Overview

Configure which data series (measures) are used for mean (average) calculations, statistical properties, and significance testing in mean tables.

:::info Edition Availability
- Mean tables: Available in **Pro** and **Premium** editions
- All series configuration available in both Pro and Premium
:::

---

## Understanding Mean Tables

Mean tables display **average values** rather than percentages or counts. They're used for:

- Customer satisfaction scores
- Performance metrics (ratings, scores, times)
- Financial averages (revenue per customer, average order value)
- Measurement data (temperature, weight, distance)

**Example Mean Table**:
```
                Mean Score    Count    Std Dev
Product A       4.2          1250     0.8
Product B       4.5          980      0.7
Product C       3.9          1100     0.9
```

---

## Core Series Configuration

### Mean Series
**Setting**: Mean Series  
**Required**: Yes  
**Type**: Dropdown (lists available measures)

The primary data series containing the values to be averaged.

**What It Contains**:
- Individual measurements or scores
- Pre-calculated means (if aggregated in data model)
- Weighted values (if using weights)

**Calculation**:
```
Mean = Sum(Values) / Count(Records)
or
Mean = Pre-calculated average measure
```

**Examples**:

**Example 1: Satisfaction Scores**
```DAX
Mean Series = AVERAGE(Survey[SatisfactionScore])

Data:
- Respondent A: 5
- Respondent B: 4
- Respondent C: 5
Mean = (5 + 4 + 5) / 3 = 4.67
```

**Example 2: Revenue per Customer**
```DAX
Mean Series = DIVIDE(SUM(Sales[Revenue]), DISTINCTCOUNT(Sales[CustomerID]))

Calculates: Average revenue per unique customer
```

**Example 3: Pre-aggregated Data**
```DAX
Mean Series = SUM(Data[PreCalculatedMean])

Use when: Your data already contains mean values
```

**Common Sources**:
- `AVERAGE(Table[Metric])`
- `DIVIDE(SUM(Values), COUNT(Records))`
- Pre-calculated mean field
- Weighted mean calculation

---

### Count Series
**Setting**: Count Series  
**Required**: For displaying sample size  
**Type**: Dropdown (lists available measures)

The number of observations used to calculate each mean.

**What It Shows**:
- Sample size (n)
- Number of respondents/records
- Reliability indicator

**Why It Matters**:
```
Product A: Mean = 4.2, Count = 1000  ✓ Reliable
Product B: Mean = 4.8, Count = 5     ✗ Unreliable

Same difference (0.6), but Product B has tiny sample
```

**Examples**:

**Example 1: Simple Count**
```DAX
Count Series = COUNTROWS(Survey)

Counts: All rows in the table
```

**Example 2: Respondent Count**
```DAX
Count Series = DISTINCTCOUNT(Survey[RespondentID])

Counts: Unique respondents (not duplicate responses)
```

**Example 3: Non-Missing Values**
```DAX
Count Series = COUNTROWS(FILTER(Survey, NOT(ISBLANK(Survey[Score]))))

Counts: Only records with actual scores
```

**Display in Table**:
```
                Mean    Count    
Product A       4.2     1250     ← Large sample
Product B       4.5     980
Product C       3.9     45       ← Small sample (less reliable)
```

---

### Standard Deviation Series
**Setting**: Standard Deviation Series  
**Required**: For significance testing and variability analysis  
**Type**: Dropdown (lists available measures)

The measure of variability/spread in the data.

**What It Shows**:
- How much values vary around the mean
- Data consistency
- Required for t-tests and ANOVA

**Interpretation**:
```
Product A: Mean = 4.2, StdDev = 0.5  → Consistent ratings
Product B: Mean = 4.2, StdDev = 1.5  → Highly variable ratings

Both have same mean but different consistency
```

**Calculation**:
```
StdDev = √[Σ(x - mean)² / (n - 1)]

Measures: Average distance from mean
```

**Examples**:

**Example 1: Standard Calculation**
```DAX
StdDev Series = STDEV.S(Survey[Score])

Calculates: Sample standard deviation
```

**Example 2: Pre-calculated**
```DAX
StdDev Series = SUM(Data[PreCalcStdDev])

Use when: Data already contains standard deviations
```

**Example 3: Weighted Standard Deviation**
```DAX
StdDev Series = [CustomWeightedStdDev]

Use when: Need weighted variability measure
```

**Display in Table**:
```
                Mean    Count    StdDev
Product A       4.2     1250     0.8    ← Low variability
Product B       4.5     980      0.7    ← Lower variability
Product C       3.9     1100     1.2    ← High variability
```

**Low StdDev**: Consistent, reliable, narrow range
**High StdDev**: Variable, scattered, wide range

---

## Significance Testing Series

### Significance Mean Series
**Setting**: Significance Mean Series  
**Required**: Only if using significance tests  
**Type**: Dropdown (lists available measures)  
**Available in**: Pro, Premium

The mean values used for statistical significance testing.

**When It Differs from Mean Series**:
- Display uses weighted means
- Testing uses unweighted means
- Different aggregation rules for testing

**Common Scenarios**:

**Scenario 1: Same as Mean Series (Most Common)**
```
Mean Series: AVERAGE(Survey[Score])
Significance Mean Series: AVERAGE(Survey[Score])

Use when: Testing and display use same data
```

**Scenario 2: Different Series**
```
Mean Series: [WeightedMean]
Significance Mean Series: AVERAGE(Survey[Score])

Use when: Display weighted but test unweighted
```

**Why Separate?**:
- Research protocols may require unweighted testing
- Different statistical requirements
- Regulatory or methodological standards

---

### Unweighted Base Series
**Setting**: Unweighted Base Series  
**Required**: Only when using weighted data  
**Type**: Dropdown (lists available measures)

The raw count of observations before weighting adjustments.

**What It Shows**:
```
                Mean    Count    Unweighted
Product A       4.2     1250     1180       ← Actual respondents
Product B       4.5     980      1050       ← Actual respondents
Product C       3.9     1100     1090       ← Actual respondents
```

**When to Use**:
- Your mean calculations use weights
- For research transparency
- To show actual sample sizes

**Example**:
```DAX
Unweighted Base Series = DISTINCTCOUNT(Survey[RespondentID])

Shows: Actual number of people, ignoring weights
```

**Why It Matters**:
- **Count (weighted)**: May be 1250 (adjusted for demographics)
- **Unweighted**: Actual 1180 people responded
- Difference indicates weighting impact

---

## Data Model Requirements

### Required Measures for Mean Tables

#### 1. Mean Calculation
```DAX
// Simple average
MeanScore = AVERAGE(Survey[Score])

// Or weighted average
WeightedMean = 
    DIVIDE(
        SUM(Survey[Score] * Survey[Weight]),
        SUM(Survey[Weight])
    )

// Or pre-calculated
MeanValue = SUM(Data[PreCalcMean])
```

#### 2. Count/Sample Size
```DAX
// Simple count
SampleSize = COUNTROWS(Survey)

// Or unique respondents
RespondentCount = DISTINCTCOUNT(Survey[RespondentID])

// Or non-blank count
ValidResponses = COUNTROWS(FILTER(Survey, NOT(ISBLANK(Survey[Score]))))
```

#### 3. Standard Deviation
```DAX
// Sample standard deviation
StdDeviation = STDEV.S(Survey[Score])

// Or population standard deviation
PopStdDev = STDEV.P(Survey[Score])
```

#### 4. Unweighted Base (if weighted)
```DAX
UnweightedCount = DISTINCTCOUNT(Survey[RespondentID])
```

---

## Series Mapping Strategies

### Strategy 1: Simple Mean Analysis
**Best for**: Basic averages, no weighting, no testing

```
Mean Series: AVERAGE(Metric)
Count Series: COUNTROWS(Table)
StdDev Series: Not configured
Significance Mean: Not configured
Unweighted Base: Not configured
```

### Strategy 2: Mean with Sample Size
**Best for**: Showing reliability, basic reporting

```
Mean Series: AVERAGE(Score)
Count Series: DISTINCTCOUNT(RespondentID)
StdDev Series: STDEV.S(Score)
Significance Mean: Not configured
Unweighted Base: Not configured
```

### Strategy 3: Weighted Mean Analysis
**Best for**: Demographic weighting, population estimates

```
Mean Series: [WeightedMean]
Count Series: SUM(Weight)
StdDev Series: [WeightedStdDev]
Significance Mean: Not configured
Unweighted Base: DISTINCTCOUNT(RespondentID)
```

### Strategy 4: Full Statistical Analysis
**Best for**: Research studies, significance testing

```
Mean Series: [WeightedMean]
Count Series: SUM(Weight)
StdDev Series: STDEV.S(Score)
Significance Mean: AVERAGE(Score)
Unweighted Base: DISTINCTCOUNT(RespondentID)
```

---

## Practical Examples

### Example 1: Customer Satisfaction Scores
```
Question: "Rate your satisfaction (1-5)"

Configuration:
- Mean Series: "Average Satisfaction Score"
- Count Series: "Count of Respondents"
- StdDev Series: Not shown

Result:
                Mean    Count
Product A       4.2     1250
Product B       4.5     980
Product C       3.9     1100
Overall         4.2     3330
```

### Example 2: Performance Analysis with Variability
```
Metric: Employee performance ratings

Configuration:
- Mean Series: "Average Rating"
- Count Series: "Employee Count"
- StdDev Series: "Rating Std Dev"

Result:
                Mean    Count    StdDev
Department A    4.2     45       0.6    ← Consistent
Department B    4.5     38       1.2    ← Variable
Department C    3.8     52       0.5    ← Consistent
```

### Example 3: Weighted Research Study
```
Survey: National satisfaction study (weighted)

Configuration:
- Mean Series: "Weighted Mean Satisfaction"
- Count Series: "Sum of Weights"
- StdDev Series: "Satisfaction Std Dev"
- Unweighted Base: "Count of Respondents"
- Significance Mean: "Unweighted Mean"

Result:
                Mean    Count    Unweighted    StdDev
Urban           4.2     650      520           0.8
Suburban        4.3     250      310           0.7
Rural           4.0     100      170           0.9
Total           4.2     1000     1000          0.8
```

### Example 4: Revenue Analysis
```
Metric: Average revenue per customer

Configuration:
- Mean Series: "Revenue per Customer"
- Count Series: "Customer Count"

Result:
                Mean Rev    Customers
Region North    $1,245      2,500
Region South    $1,180      3,200
Region East     $1,320      1,800
Region West     $1,290      2,100
```

---

## Statistical Context

### When to Use Mean Tables

**Good for**:
- Continuous measurements (temperature, time, money)
- Rating scales (1-5, 1-10)
- Satisfaction scores (NPS, CSAT)
- Performance metrics
- Financial averages

**Not Good for**:
- Categorical data (Yes/No, Male/Female)
- Count data (number of purchases)
- Percentages/proportions
- Binary outcomes

**Use percentage tables instead for**: Frequency distributions, category breakdowns

---

### Interpreting Standard Deviation

**Rule of Thumb**:
- **Low StdDev** (< 1.0 for 1-5 scale): Consistent, agreement
- **Medium StdDev** (1.0-1.5): Moderate variability
- **High StdDev** (> 1.5): High variability, disagreement

**Example**:
```
Product A: Mean = 4.0, StdDev = 0.5
→ Most ratings between 3.5 and 4.5 (tight cluster)

Product B: Mean = 4.0, StdDev = 1.5
→ Ratings spread from 2.5 to 5.5 (wide range)
→ Some love it (5), some hate it (2-3)
```

---

### Sample Size Considerations

**Minimum Sample Sizes**:
- **n < 30**: Means unreliable, use caution
- **n = 30-100**: Acceptable for most purposes
- **n > 100**: Reliable means
- **n > 1000**: Very stable estimates

**Impact on Significance**:
- Large samples detect small differences
- Small samples miss real differences
- Always consider practical significance

---

## Common Patterns

### Pattern 1: Simple Mean Report
```
Basic average calculation
Show sample size for context

→ Mean Series: Average
→ Count Series: Count
```

### Pattern 2: Quality Analysis
```
Mean with variability
Identify consistency issues

→ Mean Series: Average
→ Count Series: Count
→ StdDev Series: Standard Deviation
```

### Pattern 3: Weighted Survey
```
Population-weighted results
Show actual vs weighted

→ Mean Series: Weighted average
→ Count Series: Weighted count
→ Unweighted Base: Raw count
```

### Pattern 4: Statistical Testing
```
Compare groups statistically
Test for significant differences

→ Mean Series: Weighted average
→ Count Series: Weighted count
→ StdDev Series: Standard deviation
→ Significance Mean: For testing
→ Unweighted Base: Actual sample
```

---

## Troubleshooting

### Q: Mean values look incorrect
**A**: 
- Verify Mean Series calculation in a simple visual first
- Check for filter context issues in DAX
- Ensure measure aggregates correctly across dimensions

### Q: Count doesn't match expectations
**A**:
- Check if counting rows vs distinct IDs
- Verify weighted vs unweighted count
- Look for filter context in measure definition

### Q: Standard deviation shows as blank
**A**:
- Ensure StdDev Series is mapped
- Check that measure returns values
- Verify sufficient data points (need n ≥ 2)

### Q: Unweighted base same as count
**A**: Your data likely isn't weighted; you can hide unweighted row

### Q: Mean tables not available
**A**: Mean tables require Pro or Premium edition

### Q: Significance tests don't work with means
**A**:
- Verify all three series: Mean, Count, StdDev
- Check Significance Mean Series is configured
- Ensure adequate sample sizes (n ≥ 30 recommended)

---

## Best Practices

1. **Always Show Count**: Sample size is critical for interpreting means
2. **Consider StdDev**: Helps understand data consistency
3. **Test Measures First**: Validate in simple visuals before using in cross-tab
4. **Document Calculations**: Note whether means are weighted/unweighted
5. **Check for Outliers**: Extreme values can skew means
6. **Minimum Samples**: Use thresholds to mask small sample means
7. **Weighted Data**: Always show both weighted and unweighted counts
8. **Practical Significance**: A statistically significant 0.1 difference may not matter

---

## Related Settings

- [Table Contents](table-content.md) — Set table type to "Mean"
- [Percentage Series](percentage-series.md) — For percentage table configuration
- [Significance Testing](significance.md) — Configure t-tests for means
- [Thresholds](thresholds.md) — Mask means with small samples
- [Totals & Subtotals](totals.md) — How counts display

---

For more help, see the [Quick Start Guide](../02-getting-started/quick-start.md) or contact support.

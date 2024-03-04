---
title: "Insights into King County, WA Housing Market: Trends, Views, and Considerations"
date: 2024-02-23T03:44:25-05:00
draft: false
tags: ["tableau", "dashboard"]
categories: ["blog", "data visualization"]
---


{{< tableau "viz1708816279420" "Ki" "Kings-County-Housing-Sales" "HousingSalesDash" >}}

## King County, WA Housing Insights

The line chart displays daily prices from May 1, 2014, to May 1, 2015, illustrating a general upward trend over the year with some fluctuations. Housing prices rise from an average of $0.5M to $1M by November 2014, peaking at $1.3M in May 2015. The zip codes with the highest average price, ranging from $0.9M to $1M, include 98109, 98105, 98004, and 98040. These zip codes, situated close to Lake Union, the only water body within city limits, are still connected to the mainland, possibly making them desirable locations for homes. This observation is supported by the fact that Vashon Island, despite being surrounded by water, is one of the cheapest places to own a home, likely due to its isolation from the mainland and possibly poorer infrastructure.

**Histogram:**

Now turning to the right-skewed[^1] histogram, we observe that few homes were either very cheap or very expensive, with most observations falling between 300K and 500K. The tail on the right pulls the mean slightly to the right, making the median (center point) less than the mean. This means the data has a higher frequency of lower values, with a relatively small number of high-priced homes pulling up the mean. Most houses have 3-4 bedrooms and between 1-2 bathrooms, indicating a right-skewed distribution.

**View vs. Condition Heatmap:**

In May 2014, the darkest shaded areas on the heatmap, representing homes with the highest average real estate prices, are those in very good condition with a fair view. By May 2015, homes in average condition with excellent views fetched the highest average prices. Homebuyers were more willing to pay top dollar for a home with a good or excellent view, regardless of renovation costs. Unsurprisingly, houses in poor condition with no view had the lowest average prices.

**Additional Considerations:**

_Location:_ The heat map doesn't account for location, which can significantly impact a house's value. A house in excellent condition with a decent view might be more expensive in a desirable location compared to a house with a breathtaking view in a less sought-after area.

_Market Trends:_ Real estate market trends can influence pricing. Depending on the market, a specific view (e.g., waterfront) might be more or less valuable to buyers, affecting the price of a house regardless of its physical condition.

[^1]: <small>Why do I say the histogram is right-skewed? Aren't most of the data points clustered to the left? In a left-skewed distribution (negative skew), there are more data points on the right side, making it tilt to the left with a longer tail. Imagine the midpoint of a seesaw with data points on either side representing their frequency (number of observations). When there are more data points on the left side, that side weighs the seesaw down, making it tilt to the right with a longer tail. This is called a right-skewed distribution.</small>

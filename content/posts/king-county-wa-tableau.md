---
title: "King's County Housing Sales Dashboard"
date: 2024-02-23T03:44:25-05:00
draft: false
tags: ["tableau", "dashboard"]
categories: ["blog", "data visualization"]
---


{{< tableau "viz1708816279420" "Ki" "Kings-County-Housing-Sales" "HousingSalesDash" >}}

## King County, WA Housing Insights

**Line Chart:**

The line chart shows daily prices from May 1, 2014, to May 1, 2015, with a general upward trend over the year with some fluctuations. 

Housing prices climb from an average of $0.5M to $1M by November 2014, before peaking at $1.3M in May 2015. The zip codes with the highest average price are 98109, 98105, 98004, and 98040, all between $0.9M to $1M. These zip codes lie close to the only water body within city limits, Lake Union. These zip codes are still being connected to the mainland, probably making it an enviable location for a home. This hypothesis seems borne out by the fact that interestingly, Vashon Island, a location totally surrounded by water is one of the cheapest places to have a home, probably because it is totally cut off from the mainland and may have poorer infrastructure. Seattlelites want to live close to the water but not "on" the water. Understandably so! Further from the city limits (and Lake Union), housing is much cheaper, ranging from 300K to 600K.

**Histogram:**

The **right-skewed**[^1] histogram shows the distribution of housing prices in King County, WA. Right off the bat, we can see that few homes were either very cheap or very expensive and most observations fell between 300K and 500K. In this histogram, the tail on the right pulls the mean slightly to the right, making the median (center point) less than the mean. This means the data is has a higher frequency of lower values, and a relatively small number of high-priced homes are pulling up the mean.

Most houses have 3-4 bedrooms and between 1-2 bathrooms, again indicating a right-skewed distribution.

**View vs. Condition Heatmap:**

In May 2014, the darkest shaded areas on the heatmap (those with the highest average real estate prices) are those homes that are in very good condition with a fair view. We can still see that highly desirable views increased the average price of homes however.

However, by May 2015, when average prices hurdle past $1M, homes in average condition with excellent views fetched the highest average prices, followed by homes with a good view in average condition. As a result, based on homebuyer trends, we can see that homebuyers were more willing to pay top-dollar for a home if it had a good or excellent view. Stunning views can be a major selling point, even if buyers need to factor in renovation costs.

Unsurprisingly, houses in poor condition with no view had the lowest average prices.

**Additional Considerations:**

_Location:_ The heat map doesn't account for location, which can significantly impact a house's value. A house in excellent condition with a decent view might be more expensive in a desirable location compared to a house with a breathtaking view in a less sought-after area.

_Market Trends:_ Real estate market trends can influence pricing. Depending on the market, a specific view (e.g., waterfront) might be more or less valuable to buyers, affecting the price of a house regardless of its physical condition.

[^1]: <small>Why do I say the histogram is right-skewed? Aren't most data points clustered to the left? Doesn't that make it **left-skewed**?

> Imagine the midpoint of a seesaw with data points on either side representing their frequency (number of observations). 
> 
> When there are more data points on the left side, that side weighs the seesaw down, making it tilt to the right with a longer tail. This is called a right-skewed distribution. 
> 
> In a left-skewed distribution (negative skew), there are more data points on the right side, making it tilt to the left with a longer tail.</small>

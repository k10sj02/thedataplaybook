---
title: "COVID-Era Employment Trends Across Canada in R"
date: 2024-05-02 12:18:35 -0400
draft: false
tags: ["R", "tidyverse", "dplyr"]
categories: ["blog", "data science"]
---

As part of an analytics project for a client, I used R and various libraries to import, clean, and analyze datasets related to labor market statistics in British Columbia. This project involves reading data from CSV files, performing data cleansing operations, merging datasets, and generating visualizations such as box plots and a bar chart showing the monthly change in employment across Canadian provinces. 

The analysis focuses on specific sectors, including accommodation and food services, wholesale and retail trade, and other services, providing valuable insights into the labor market dynamics. In this post, we'll walk through the steps to analyze employment data across various sectors and provinces in Canada using R.

### Step 1: Load Required Packages

First, we need to load the necessary R packages for data manipulation and analysis.

```r
library(readr)
library(tidyverse)
library(dplyr)
##install.packages("lubridate")
library(lubridate)
```

### Step 2: Load the Dataset

Next, we load the dataset containing employment data.

```r
lmic_dataset <- read.csv("example_data_bia.csv")
```

### Step 3: Explore the Dataset

We then view the dataset structure and summary statistics to understand its content.

```r
view(lmic_dataset)
str(lmic_dataset)
summary(lmic_dataset)
```

### Step 4: Check for Duplicates

We ensure that variables are coded without duplicates.

```r
str_sort(unique(lmic_dataset$month))
str_sort(unique(lmic_dataset$naics))
str_sort(unique(lmic_dataset$geo))
```

### Step 5: Clean Sector Names

We tidy up the sector names for consistency.

```r
lmic_renamed <- lmic_dataset %>%
  mutate(naics = recode(naics, 
                        "Accommodation_and_food_services_[72]" = "Accommodation and food services [72]",
                        "Wholesale_and_retail_trade_[41,_44-45]" = "Wholesale and retail trade [41, 44-45]",
                        "Other_services_(except_public_administration)_[81]" = "Other services (except public administration) [81]"
                        )
        )
```

### Step 6: Create Unique IDs

We assign unique IDs to each row based on the month, sector, and geographic location.

```r
lmic_renamed$unique_id <- paste0(as.character(lmic_renamed$month), 
                                as.character(lmic_renamed$naics),
                                as.character(lmic_renamed$geo))
```

### Step 7: Reorder Columns

We reorder the columns so that the unique ID is the first column.

```r
lmic_renamed <- lmic_renamed[, c(5, 1, 2, 3, 4)]
```

### Step 8: Find Missing Values

We identify any missing values in the dataset.

```r
lmic_renamed[is.na(lmic_renamed$employment_1000s),]
```

### Step 9: Import and Clean Additional Data

We import an additional dataset to fill in missing values and clean it accordingly.

```r
laborstatsBC <- read.csv("missing_BC_data.csv", skip=11)
laborstatsBC <- laborstatsBC[-1,]

laborstatsBC_new <- laborstatsBC %>%
  rename("naics"="North.American.Industry.Classification.System..NAICS..5",
         "employment_1000s"="Mar.20") %>%                                    
  mutate(naics=case_when(naics=="Wholesale and retail trade" ~ "Wholesale and retail trade [41, 44-45]",
                         naics=="Accommodation and food services" ~ "Accommodation and food services [72]",
                         naics=="Other services (except public administration)" ~ "Other services (except public administration) [81]",
                         TRUE ~ naics)) %>%
  select(naics, employment_1000s) %>%
  mutate(month="Mar-20",
         geo="British Columbia")

laborstatsBC_new <- laborstatsBC_new[2:19,]
```

### Step 10: Merge Datasets

We merge the original dataset with the new dataset to fill in the missing values.

```r
lmic_renamed_new <- lmic_renamed %>%
  left_join(laborstatsBC_new, by=c("naics","month","geo")) %>%
  mutate(employment_1000s.y = as.numeric(employment_1000s.y),
         employment_1000s = coalesce(employment_1000s.x, employment_1000s.y)) %>%
  select(-employment_1000s.x, -employment_1000s.y)
```

### Step 11: Visualize Data with a Boxplot

We create a boxplot to visualize the data and spot any anomalies.

```r
lmic_renamed_new %>%
  filter(geo != "Canada") %>%
  ggplot(aes(x = employment_1000s)) +
  geom_boxplot() +
  labs(title = "title here") +
  coord_flip() +
  scale_x_log10()
```

### Step 12: Calculate and Visualize Percent Change in Employment

We calculate the percent change in employment by province and create a bar plot to visualize the changes.

```r
lmic_renamed_new %>%
  group_by(geo, month, naics) %>%
  mutate(month = dmy(paste0("01", month))) %>%
  summarise_at(vars(employment_1000s), list(mean = mean)) %>%
  ungroup() %>%
  filter(month >= "2020-01-01", month <= "2020-09-01",
         naics %in% c("Accommodation and food services [72]",
                      "Wholesale and retail trade [41, 44-45]", 
                      "Other services (except public administration) [81]"),
         geo != "Canada") %>%
  mutate(naics = case_when(naics == "Accommodation and food services [72]" ~ "Accommodation and food services",
                           naics == "Wholesale and retail trade [41, 44-45]" ~ "Wholesale and retail trade",
                           naics == "Other services (except public administration) [81]" ~ "Other services (except public administration)",
                           TRUE ~ naics)) %>%
  group_by(geo, naics) %>%
  mutate(change = (mean - lag(mean)) / lag(mean) * 100) %>%
  ggplot(aes(x = month, y = change, fill = naics)) +
  geom_col(position = "dodge") +
  theme(legend.position = "bottom") +
  facet_wrap(~ geo, scales = "free_y", nrow = 2) +
  labs(title = "Monthly change in employment across Canadian provinces",
       x = "Months",
       y = "Percent Change in Employment",
       fill = "Sectors") + 
  scale_x_date(labels = date_format("%b"), breaks = "1 month")

ggsave("Monthly_per_cent_change_in_employment_across_Canadian_provinces.png", width = 50, height = 30, units = "cm")
```
----- 

### Final Report (English)

Here are my insights regarding nationwide jobs numbers across Canadian provinces from Jan 2020 to Sep 2020 across the wholesale and retail trade, accommodation and food services, as well as other services (public administration) sectors.

As you can see, there is pronounced job loss across all provinces in the starting months of the COVID-19 pandemic (from Jan to April of 2020), with most provinces registering their first months of net positive jobs added starting in May 2020. This recovery took even longer to materialize in Quebec (i.e., June 2020) where the effect of the pandemic was especially marked with high rates of mortality and resultantly strict lockdown protocols. Despite all sectors being negatively affected by the COVID-19 pandemic, job loss was predictably substantial in the accommodation and food services sectors due to a decrease in public spending on leisure activities (Airbnb rentals, vacations, social outings, etc.). In general, this pattern of job loss was demonstrated across the wholesale and retail trade as well as other service sectors. However, these losses were less substantial than the ones exhibited across accommodation and food services.

![Picture1](https://github.com/k10sj02/lmic-data/assets/35823259/823751d2-23f4-47ac-abf4-d9cf26647814)

With the tightening of regulations starting in the summer of 2020, the recovery of jobs held throughout the rest of the year despite growth being weaker in the last three months of the fiscal year when pandemic regulations once more tightened as the cold weather season set in. Interestingly enough, despite considerable job losses in the accommodation and food services sector, this sector rebounded more strongly than the other observed sectors when COVID-19 regulations were loosened. This return to form was probably due to pent-up demand for leisure among Canadians who endured the strictest lockdown protocol in all of North America. In addition, accommodation and food service were defined by job freezes and temporary layoffs with many workers returning to their jobs once demand rebounded.

----- 

### Rapport Final (Français)

Voici mes observations sur le nombre d'emplois à l'échelle nationale dans les provinces canadiennes de janvier 2020 à septembre 2020 dans les secteurs du commerce de gros et de détail, de l'hébergement et de la restauration, ainsi que d'autres services (administration publique).

Comme vous pouvez le voir, il y a une perte d'emploi prononcée dans toutes les provinces au cours des premiers mois de la pandémie de COVID-19 (de janvier à avril 2020), la plupart des provinces enregistrant leurs premiers mois d'emplois nets positifs ajoutés à partir de mai 2020. Cette reprise a mis encore plus de temps à se matérialiser au Québec (c'est-à-dire juin 2020) où l'effet de la pandémie a été particulièrement marqué avec des taux de mortalité élevés et des protocoles de confinement stricts en conséquence. Bien que tous les secteurs aient été négativement affectés par la pandémie de COVID-19, les pertes d'emplois ont été, comme on pouvait s'y attendre, importantes dans les secteurs de l'hébergement et de la restauration en raison d'une baisse des dépenses publiques consacrées aux activités de loisirs (locations Airbnb, vacances, sorties sociales, etc.). En général, cette tendance à la perte d'emplois s'est manifestée dans le commerce de gros et de détail ainsi que dans d'autres secteurs de services. Cependant, ces pertes étaient moins importantes que celles enregistrées dans les services d'hébergement et de restauration.

![Picture1](https://github.com/k10sj02/lmic-data/assets/35823259/823751d2-23f4-47ac-abf4-d9cf26647814)

Avec le resserrement des réglementations à partir de l'été 2020, la reprise des emplois occupés tout au long de l'année malgré une croissance plus faible au cours des trois derniers mois de l'exercice lorsque les réglementations pandémiques se sont à nouveau resserrées à mesure que la saison froide s'installait. Fait intéressant, malgré des pertes d'emplois considérables dans le secteur de l'hébergement et de la restauration, ce secteur a rebondi plus fortement que les autres secteurs observés lors de l'assouplissement de la réglementation liée à la COVID-19. Ce retour en forme était probablement dû à la demande refoulée de loisirs chez les Canadiens qui ont enduré le protocole de confinement le plus strict de toute l'Amérique du Nord. De plus, l'hébergement et la restauration ont été marqués par des gels d'emplois et des mises à pied temporaires, de nombreux travailleurs retournant à leur emploi une fois que la demande a rebondi.

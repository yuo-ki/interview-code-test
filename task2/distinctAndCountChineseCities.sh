#!/bin/bash

# Input file
input_file="geoloc-Microsoft.csv"

# Output file
output_file="distinct_and_count_chinese_cities.txt"

# Read file and extract cities in China
chinese_cities=$(awk -F',' '{if($2=="CN") print $4}' $input_file | sort | uniq)

# Count occurrences of each city in China
city_counts=$(awk -F',' '{if($2=="CN") print $4}' $input_file | sort | uniq -c | awk '{print $1, $2}')

# Write results to the output file
echo "$city_counts" > $output_file
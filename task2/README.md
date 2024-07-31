## Step1: Observe data structure of the input file  
52.98.23.160/27,ZA,,JOHANNESBURG,

## Step2: Summarize the rules of data
1. The strings are separated by commas.  
2. The second field in string is country.  
3. The fourth field in string is city.  

## Step3: Gradually implement the functions 
1. `awk -F','` means using comma as the field delimiter when awk processes text.  
2. Filter all data where the second field is "CN". `$2=="CN"`
3. Output the fourth field of the corresponding data, then get all Chinese cities. `print $4`
4. Call the `sort` command for sorting. `sort` command without adding parameters, so it will be sorted in alphabetical order.   
5. Call the `uniq` command for deduplication. The `uniq` command only deletes adjacent duplicate lines, so the `sort` command needs to be called first. 
6. Call the `uniq -c` command for deduplication and counting, then add the number of occurrences of each unique line before the line.  
7. Call the `awk '{print $1, $2}'` command. Output the first field and the second field, separated by a space.  
8. The input processed by the `awk` command is the output of the `uniq -c` command, that is, output the data like `count city` format.  
9. After running the command `bash distinctAndCountChineseCities.sh`, the result file `distinct_and_count_chinese_cities.txt` is obtained.  


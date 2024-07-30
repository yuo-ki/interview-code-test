观察输入文件的数据结构 52.98.23.160/27,ZA,,JOHANNESBURG,
字段以 , 分隔
过滤第2个字段为"CN"的所有数据，$2=="CN"，输出对应数据的第4个字段，print $4，即得到所有的中国城市。
调用 sort 命令进行排序
调用 uniq 命令进行去重
调用 uniq -c 命令，去重且统计，在每个唯一行的前面加上该行出现的次数
调用 awk '{print $2, $1}' 命令，将每一行输入记录分成多个字段，输出第二个字段和第一个字段，中间用空格分隔。
awk命令处理的输入是uniq -c命令的输出，即把 [次数 城市] 这样的数据转换为 [城市 次数] 后输出。
运行命令 bash distinctAndCountChineseCities.sh 后得到结果文件 distinct_and_count_chinese_cities.txt


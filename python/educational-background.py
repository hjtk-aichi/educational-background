from dateutil.relativedelta import relativedelta
from datetime import datetime, date, timedelta
import unicodedata

# 標準入力
str = input('\n生年月日を8桁で入力してください (例:2005年1月23日の場合「20050123」と入力)\n→')
# 20050123

# 全角→半角の正規化処理
normalize = unicodedata.normalize("NFKC", str)    # ２００５０１２３ >> 20050123

try:
  # 生年月日
  birthday = datetime.strptime(normalize, '%Y%m%d') # 20050123 >> 2005-01-23 00:00:00
  
  # 誕生年 (1/1-4/1の早生まれの場合便宜上前年生まれとして計算)
  # 生年月日から3か月と1日前の日付を求め、年のみ取り出す
  b_fiscalyear = int(datetime.strftime(birthday - relativedelta(months=3) - timedelta(days=1), '%Y'))
  # 2005-01-23 >> 2004
  
  # 一行空ける
  print()
  
  # 学年
  grade = ['小学１年', '　　２年', '　　３年', '　　４年', '　　５年', '　　６年', '中学１年', '　　２年', '　　３年', '高校１年', '　　２年', '　　３年', '大学１年', '　　２年', '　　３年', '　　４年']
  
  print('学年一覧')
  print('---------------------------------')
  for i in range(len(grade)):
    # 年度開始日
    s_date = f'{b_fiscalyear + i + 7}/04/01'   # 2005/01/23生まれの小学１年 >> 2011/04/01
    # 年度終了日
    l_date = f'{b_fiscalyear + i + 8}/03/31'   # 2005/01/23生まれの小学１年 >> 2012/03/31
    print(f'{grade[i]}　{s_date}～{l_date}')
  print('---------------------------------')
  
  # 学歴
  eb = [
    ['中学卒業', 16, '03'],
    ['高校入学', 16, '04'],
    ['高校卒業', 19, '03'],
    ['大学入学', 19, '04'],
    ['短大卒業', 21, '03'],
    ['大学卒業', 23, '03']
  ]
  
  print('\n学歴一覧')
  print('------------------')
  for j in range(len(eb)):
    print(f'{eb[j][0]}　{b_fiscalyear + eb[j][1]}/{eb[j][2]}')
    # 2005/01/23生まれの中学卒業 >> 2020/03
  print('------------------')
  
  print('\n※浪人や留年等は考慮しておりません\n')


except:
  print('\n入力された値が正しくありません\n')

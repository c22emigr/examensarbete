import pandas as pd

df = pd.read_csv("dataMängder/aktiedata.csv")

row_counts = df.groupby("stock_name").size().reset_index(name="row_count")

# 900 = lite, 900-1300 = mellan, över 1300 = mycket
def classify_stock(row_count):
    if row_count < 900:
        return "small"
    elif 900 <= row_count <= 1300:
        return "medium"
    else:
        return "large"

row_counts["category"] = row_counts["row_count"].apply(classify_stock)

# Aktienamnen för de olika mängderna
small_stocks = row_counts[row_counts["category"] == "small"]["stock_name"]
medium_stocks = row_counts[row_counts["category"] == "medium"]["stock_name"]
large_stocks = row_counts[row_counts["category"] == "large"]["stock_name"]

# Filtrera i grupper
df_small = df[df["stock_name"].isin(small_stocks)]
df_medium = df[df["stock_name"].isin(medium_stocks)]
df_large = df[df["stock_name"].isin(large_stocks)]

# Exportera till egna filer
df_small.to_csv("dataMängder/stocks_liten.csv", index=False)
df_medium.to_csv("dataMängder/stocks_mellan.csv", index=False)
df_large.to_csv("dataMängder/stocks_mycket.csv", index=False)

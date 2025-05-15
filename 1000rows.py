import pandas as pd

df = pd.read_csv("dataMängder/aktiedata.csv")

# Rensa .00, konvertera till float
for col in ["open", "high", "low", "close"]:
    df[col] = df[col].apply(lambda x: str(x).replace('.00', '') if str(x).endswith('.00') else x)
    df[col] = df[col].astype(float)

# datetime format
df['datetime'] = pd.to_datetime(df['datetime'])

row_counts = df['stock_name'].value_counts()

valid_stocks = row_counts[row_counts >= 1000].index

filtered = []

# 1000 senaste rader
for stock in valid_stocks:
    stock_data = df[df['stock_name'] == stock].sort_values("datetime")
    trimmed = stock_data.tail(1000)
    filtered.append(trimmed)

final_df = pd.concat(filtered)
final_df.to_csv("dataMängder/stocks1000.csv", index=False)

print(f"{len(valid_stocks)} Klar")

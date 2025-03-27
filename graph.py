import pandas as pd
import matplotlib.pyplot as plt
import os

# Hämta data
file_path = r"C:\Users\emilg\Downloads\aktiedata.csv"
df = pd.read_csv(file_path)

# Ta bort .00 decimaler
def clean_close_column(value):
    if isinstance(value, str):
        if value.endswith('.00'):
            return float(value[:-3]) # .00 tas bort om de hittas
        else: 
            return round(float(value), 2) # Om 2 decimaler hittas behålls de
        return value

# Funktionen körs på dataframe med aktiedata
df['close'] = df['close'].apply(clean_close_column)

# Hämta alla unika aktienamn
data = df["stock_name"].unique()

# Graf för varje aktie
for row in data:
    stock_data = df[]
    plt.plot(stock_data)
    plt.xlabel('Date')
    plt.ylabel('Close')
    plt.title('Close price development for {stock_name}')   


print(data) 


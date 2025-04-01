import pandas as pd
import matplotlib.pyplot as plt
import os
import numpy as np

low_memory = False
# Hämta data
file_path = r"C:\Users\emilg\Downloads\aktiedata.csv"
df = pd.read_csv(file_path)

outputDir = "aktieGrafer" # Outputmapp  

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
for stock_name in data:
    plt.figure(figsize=(12.8, 7.2)) # Storlek på grafen
    plt.grid(False)

    stock_data = df[df['stock_name'] == stock_name] # Data från stock_name
    plt.plot(stock_data['datetime'], stock_data['close'], linestyle='-', color='#50f396', label='Close') # Datetime och close skrivs ut

    # Datetime skrivs ut var 10e datapoint
    step = 50
    tick_positions = range(0, len(stock_data), step)
    tick_labels = stock_data['datetime'].iloc[tick_positions]

    plt.xticks(tick_positions, tick_labels, rotation=45)

    # Titlar
    plt.xlabel('Date')
    plt.ylabel('Close $USD')
    plt.title(f'$USD Close price development for {stock_name}')   


    # Spara i outputDir (PNG)
    plotPath = os.path.join(outputDir, f'{stock_name.replace(" ", "_").replace(",", "")}.png')
    plt.savefig(plotPath)
    plt.close()

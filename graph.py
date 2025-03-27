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
    plt.figure(figsize=(10, 10)) # Storlek på grafen
    plt.grid(False)
    plt.tight_layout() # Kompakt storlek

    stock_data = df[df['stock_name'] == stock_name] # Data från stock_name
    plt.plot(stock_data['datetime'], stock_data['close'], marker='o', linestyle='-', color='b', label='Close') # Datetime och close skrivs ut

    # Titlar
    plt.xlabel('Date')
    plt.ylabel('Close')
    plt.title('Close price development for {stock_name}')   


    # Spara i outputDir (PNG)
    plotPath = os.path.join(outputDir, f'{stock_name.replace(" ", "_").replace(",", "")}.png')
    plt.savefig(plotPath)
    plt.close()

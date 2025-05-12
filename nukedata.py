import pandas as pd
import os
# Hämta data
file_path = r"C:\Users\emilg\Downloads\aktiedatanuke.csv"
df = pd.read_csv(file_path)

outputDir = "dataMängder" # Outputmapp  

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
df['low'] = df['low'].apply(clean_close_column)
df['high'] = df['high'].apply(clean_close_column)
df['open'] = df['open'].apply(clean_close_column)

# Hämta alla unika aktienamn
data = df['stock_name'].unique()
data = df.groupby('stock_name').apply(lambda x: x.sample(frac=1, random_state=69)).reset_index(drop=True)

output_file_path = os.path.join(outputDir, '100procentdata.csv')
data.to_csv(output_file_path, index = False)
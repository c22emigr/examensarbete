import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import ace_tools as tools

# Path where files are stored
folder_path = os.path.join(os.path.dirname(__file__), 'BoxplotMedBild')

# List all csv files in the directory
csv_files = [f for f in os.listdir(folder_path) if f.endswith('.csv')]

# Prepare a list to hold all data
all_data = []

# Read each file and extract columns A and E (0-indexed: 0 and 4)
for file_name in csv_files:
    file_path = os.path.join(folder_path, file_name)
    try:
        df = pd.read_csv(file_path, usecols=[0, 4])
        df.columns = ['MariaDB', 'MongoDB']
        df_melted = df.melt(var_name='Database', value_name='Response Time (ms)')
        df_melted['Test File'] = file_name
        all_data.append(df_melted)
    except Exception as e:
        print(f"Failed to process {file_name}: {e}")

# Concatenate all dataframes into a single one
combined_df = pd.concat(all_data, ignore_index=True)

# Create a boxplot
plt.figure(figsize=(12, 6))
sns.boxplot(x='Database', y='Response Time (ms)', data=combined_df)
plt.title('Boxplot of Response Times for MariaDB and MongoDB (All Tests)')
plt.grid(True)
plt.tight_layout()
plt.show()

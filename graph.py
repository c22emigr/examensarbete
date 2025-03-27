import pandas as pd
import matplotlib.pyplot as plt
import os

file_path = r"C:\Users\emilg\Downloads\aktiedata.csv"
df = pd.read_csv(file_path)

data = df["stock_name"].unique()

print(data)


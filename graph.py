import pandas as pd
import matplotlib.pyplot as plt
import os

df = pd.read_csv("aktiedata.csv")

data = df["stock_name"].unique()

print(data)


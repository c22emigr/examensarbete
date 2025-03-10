import pandas as pd
from pymongo import MongoClient

# Kopplar till MongoDB-databas
client = MongoClient("mongodb://localhost:27017")
db = client["examensarbete"]
collection = db["examensarbete"]

# Importerar csv-fil med data
file_path = r"C:\Users\emilg\Downloads\archive\W1\A.US_W1.csv"
df = pd.read_csv(file_path)

# Lägg till namn för aktien
stock_name = "Agilent Technologies, Inc. (A)"
df["stock_name"] = stock_name  # För alla rader

# Inserta till MongoDB
data = df.to_dict(orient="records")
collection.insert_many(data)

print("Data inserted successfully!")

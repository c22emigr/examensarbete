import pandas as pd
from pymongo import MongoClient
import gridfs
import os

# Kopplar till MongoDB-databas
client = MongoClient("mongodb://localhost:27017")
db = client["examensarbete"]
collection = db["bilder"]
fs = gridfs.GridFS(db) # skapar instans av gridfs

# Importerar bilderna
file_path = r"C:\xampp\htdocs\examensarbete\aktieGrafer"
df = pd.read_csv(file_path)

# Lägg 
for image_name in os.listdir(file_path):
    image_path = os.path.join(file_path, image_name)

with open(image_path, "rb") as image_file:
    image_data = image_file.read()

    file_id = fs.put(image_data, filename=image_name)

print(f"Image '{image_name}' saved with file ID: {file_id}")
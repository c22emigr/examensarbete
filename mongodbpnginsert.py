import os
from pymongo import MongoClient
from bson.binary import Binary 

# Anslut till MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.examensarbete
collection = db.bilder

# Sökväg till mappen med bilder
image_folder = r"C:\Users\emilg\Desktop\aktieGrafer"

# Loopa igenom alla PNG-filer och spara dem
for filename in os.listdir(image_folder):
    if filename.endswith(".png"):
        filepath = os.path.join(image_folder, filename)
        with open(filepath, "rb") as image_file:
            image_data = image_file.read()
            document = {
                "filename": filename,
                "image": Binary(image_data)
            }
            collection.insert_one(document)
            print(f"Inserted: {filename}")

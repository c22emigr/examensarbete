from pymongo import MongoClient

# Anslut till din MongoDB-instans
client = MongoClient("mongodb://localhost:27017")
db = client.examensarbete
collection = db.bilder

# Hitta alla dokument där filename slutar med '..png'
docs_to_update = collection.find({ "filename": { "$regex": r"\.\.png$" } })

for doc in docs_to_update:
    old_name = doc["filename"]
    new_name = old_name.replace("..png", ".png")
    
    result = collection.update_one(
        { "_id": doc["_id"] },
        { "$set": { "filename": new_name } }
    )
    
    print(f"Renamed: {old_name} ➜ {new_name}")

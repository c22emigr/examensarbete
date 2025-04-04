import mysql.connector.locales
import pandas as pd
import mysql.connector
import os

# Kopplar till MongoDB-databas
conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "examensarbete"
)
cursor = conn.cursor()

# Importerar bilderna
folder_path = r"C:\Users\emilg\Desktop\aktieGrafer"

# Lägg 
for image_name in os.listdir(folder_path):
    image_path = os.path.join(folder_path, image_name)

    with open(image_path, "rb") as image_file:
        image_data = image_file.read()

        cursor.execute(
            """INSERT  INTO bilder (filename, image_data) VALUES (%s, %s) """, (image_name, image_data))
        
        print(f"Image '{image_name}'")

conn.commit()
cursor.close()
conn.close()

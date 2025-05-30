import os

# Sökväg till mappen med CSV-filer
folder_path = "dataMängder"

# Unicode minus (U+2212) och korrekt ASCII minus (U+002D)
wrong_minus = "−"
correct_minus = "-"

# Gå igenom alla filer i mappen
for filename in os.listdir(folder_path):
    if filename.endswith(".csv"):
        full_path = os.path.join(folder_path, filename)

        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Ersätt felaktigt minustecken med korrekt
        if wrong_minus in content:
            cleaned = content.replace(wrong_minus, correct_minus)

            with open(full_path, "w", encoding="utf-8") as f:
                f.write(cleaned)

            print(f"Fixade minustecken i: {filename}")
        else:
            print(f"Inga felaktiga minus hittades i: {filename}")

import requests
import time
import csv

# Requests skickas till följande URL
url = "http://localhost/examensarbete/mongodbconnect.php"

search_term = "Boeing Co"


# Tiden mäts
start_time = time.time()

# POST request skickas
response = requests.post(url, params={"name": search_term})

# Tiden mäts
elapsed_time = time.time() - start_time

print(f"elapsed time: {elapsed_time}")


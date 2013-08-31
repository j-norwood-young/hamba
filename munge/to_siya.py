import json
import csv
import sys
from datetime import datetime

writer = csv.writer(sys.stdout)
search_entity = sys.argv[1]
headers = ["entity", "date", "lat", "long"]

writer.writerow(headers)

for line in sys.stdin:
    js = json.loads(line)
    if js["_id"] == search_entity:
        for doc in js["value"]["docs"]:
            dt = datetime.fromtimestamp(doc["time"])
            sdt = datetime.strftime(dt, "%Y-%m-%d")

            for city in doc["cities"]:
                if city["latitude"] and city["longitude"]:
                    writer.writerow([search_entity, sdt, city["latitude"], city["longitude"]])

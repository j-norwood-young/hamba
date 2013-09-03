import json
import csv
import sys
from datetime import datetime

writer = csv.writer(sys.stdout)
search_entity = sys.argv[1]
headers = ["entity", "date", "lat", "long"]

writer.writerow(headers)

count = 0
for line in sys.stdin:
    count += 1
    sys.stdout.write("\r%d" % count) 
    js = json.loads(line)
    if js["_id"] == search_entity:
        for doc in js["value"]["docs"]:
            dt = datetime.fromtimestamp(doc["time"])
            sdt = datetime.strftime(dt, "%Y-%m-%d")

            for city in doc["cities"]:
                if city["latitude"] and city["longitude"]:
                    writer.writerow([search_entity, sdt, city["latitude"], city["longitude"]])

import json
import sys
from datetime import datetime
from collections import defaultdict

search_entity = sys.argv[1]

citiesbymonth = defaultdict(set)
places = []

for line in sys.stdin:
    js = json.loads(line)
    if js["_id"] == search_entity:
        for doc in js["value"]["docs"]:
            dt = datetime.fromtimestamp(doc["time"])
            yearmonth = datetime.strftime(dt, "%Y/%m")

            for city in doc["cities"]:
                citiesbymonth[yearmonth].add(city["name"])

for yearmonth in citiesbymonth:
    places.append({ "date" : yearmonth, "places" : list(citiesbymonth[yearmonth])})

print json.dumps(places)
    


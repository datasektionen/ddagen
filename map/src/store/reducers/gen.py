import csv
import json

# opportunities = []

companies = {}
categories = {}

with open("./categories.csv", 'r', encoding="utf8") as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        #companies[row[0]] = {"description": row[2], "name": row[0], "img": ""}
        #print(row[0])
        categories[row[0]] = row[1] 

tot = 0

with open('companies_input.js') as f:
    f = open('companies_input.js')
    data = json.load(f)
    for i in data:
        #print(i["name"])
        name = i["name"]
        if name in categories.keys():
            i["opportunities"] = categories[name]
        else:
            i["opportunities"] = ""

print(data)

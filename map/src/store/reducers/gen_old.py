import csv
import json

companies = {}

with open("./lista.csv", 'r', encoding="utf8") as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        companies[row[0]] = {"description": row[2], "name": row[0], "img": ""}

with open("./nummer.csv", 'r', encoding="utf8") as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        if row[0] in companies.keys():
            companies[row[0]]["position"] = int(row[1])
        else:
            print("error!", row[0])

def sortFunc(x):
    temp = x["name"].lower()
    temp = temp.replace("å", "a")
    temp = temp.replace("ä", "a")
    temp = temp.replace("ö", "o")
    return temp

companies_list = list(companies.values())
companies_list.sort(key=sortFunc)

with open('logos_sorted.txt', 'r', encoding="utf8") as file:
    i = 0
    for line in file.readlines():
        line = line.replace("\"", "")
        vals = line.split(",")
        img = vals[0].strip()
        url = vals[1].strip()

        thisI = i

        companies_list[thisI]["img"] = {"default": img, "placeholder": img}
        companies_list[thisI]["website"] = url
        #companies_list[thisI]["name"] = companies_list[thisI]["name"] + str(i)
        i += 1

txt = json.dumps(companies_list, ensure_ascii=False)

txt = "const companies = " + txt + ";export default companies;"

f = open("/home/gustav/programmering/ddagen/map/ddagen/map/src/store/reducers/companies.js", "w")
f.write(txt)
f.close()

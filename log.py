import json
import random

simvols = 'QWERTYUIOPLKJHGFDSAZXCVBNM1234567890'

d = {}

def getToken(l=3):
    while 1:
        t = ""
        for i in range(l):
            t += random.choice(simvols)
        if not t in d:
            return t

primerUserInfo = {"name":"","enterToken":"","kolder":0,"penaltyday":0,"Datalastder":"","Ascores":0,"Mscores":0,"role":"user"} #admin

while 1:
    name = input("name:  ")
    if name == "0":
        break

    nuser = primerUserInfo.copy()

    nuser["name"] = name
    nuser["enterToken"] = getToken(10)

    d[getToken()] = nuser

print(d)
input()
with open("data//__usersID.json","w") as f :
    json.dump(d,f,indent=2,ensure_ascii=False)
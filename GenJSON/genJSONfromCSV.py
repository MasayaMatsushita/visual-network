import json
import pandas as pd

csv_df = pd.read_csv('./qK.csv', header=None, names=('unix時刻','時刻','バージョン','teachId','teachName','learnId','learnName','label'))

node = []
edge = []
for tId, lId in zip(csv_df['teachId'], csv_df['learnId']):
    if not tId in node:
        node.append(tId)
    if not lId in node:
        node.append(lId)
    if not [tId, lId] in edge:
        edge.append([tId, lId])

json_dat = []
for dat in node:
    dat = str(dat)
    json_str = { 'group': 'nodes', 'data': { 'id': 's'+dat, 'name': 's'+dat, 'group': 1} }
    json_dat.append(json_str)

var_num = 1
for dat in edge:
    json_str = { 'group': 'edges', 'data': { 'id': 'e'+str(var_num), 'name': '', 'source': 's'+str(dat[0]),  'target': 's'+str(dat[1]), 'weight': 2} }
    json_dat.append(json_str)
    var_num += 1

# print(json_dat)

with open('./test.json', 'w') as f:
    json.dump(json_dat, f, indent=4)
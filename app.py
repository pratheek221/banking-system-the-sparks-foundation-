# -*- coding: utf-8 -*-
"""
Created on Thu Oct  8 17:22:25 2020

@author: HEMA
"""
from flask import Flask,render_template,request
import json
import pandas as pd


app =Flask(__name__)

def get_data():
    return pd.read_excel("amount.xlsx")
@app.route("/")
def home():
    return render_template("banking system.html")

@app.route("/transfer")
def transfer_page():
    return render_template("transfer.html")


@app.route("/get_accountbalance",methods=["POST"])
def get_accountbalance():
    selected = request.json['selected']
    print(selected)
    database = get_data()
    df1 = database[database["Name"].str.contains(selected)]["AMOUNT"].iloc[0]
    print(df1)
    return {'balance':str(df1)}

@app.route("/money_transfer",methods=["POST"])
def money_transfer():
    data = request.json
    sender = data['sender']
    receiver = data['receiver']
    amount = data['amount']
    database = get_data()
    print(database.columns)
    database.loc[database["Name"].str.contains(receiver),["AMOUNT"]]+=int(amount)
    database.loc[database["Name"].str.contains(sender),["AMOUNT"]]-=int(amount)
    sender_amount = database[database["Name"].str.contains(sender)]["AMOUNT"].iloc[0]
    print(sender_amount)
    receiver_amount = database[database["Name"].str.contains(receiver)]["AMOUNT"].iloc[0]
    database.to_excel("amount.xlsx",index=False)
    return {"status":"success",'sender_amount':str(sender_amount),"receiver_amount":str(receiver_amount)}

if __name__=="__main__":
    app.run(debug=True,port=8000)
import requests
import json
 
APP_KEY = "PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8"
APP_SECRET = "eyTd2RBOAr654UMW0qMbpMVW5vEq3hAFlz2hHN5wYoZ0fo31jGKvWCd8m0oD8aWNnRyLwRyZYfGe++eyt6/azuxJSnIbO1Fb/rilVfvjQA+/AaGDPCjkmTf/IzrjWqpP8gWc2LKl3EMrsCYBSvA1MU/tYUyoaQvdAQywZ4OCHXZ2nsZmONI="
ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjMzMDViYTRlLTU1ZTAtNDY5MC1iNzQ5LWMzYzgxNDI3MTYxMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNDUzMjkyOSwiaWF0IjoxNzE0NDQ2NTI5LCJqdGkiOiJQU0g4ZU5IaDlET0VHUVpnT2hpUHZ1VmdLb1ViNnFyQmdPczgifQ.mSAJISlicRNEBQdhOoHH64yVXVaQ77OXh6EVBPfZpyLFJehfv4pxdJd70KBlIh_RURqkiLVpzEH3q6FuyVhItQ"
URL_BASE = "https://openapi.koreainvestment.com:9443" #실전투자

# Auth
def auth():
    headers = {"content-type":"application/json"}
    body = {
        "grant_type":"client_credentials",
        "appkey":APP_KEY, 
        "appsecret":APP_SECRET
        }
    PATH = "oauth2/tokenP"
    URL = f"{URL_BASE}/{PATH}"
    res = requests.post(URL, headers=headers, data=json.dumps(body))
    
    global ACCESS_TOKEN
    ACCESS_TOKEN = res.json()["access_token"]

# 주식현재가 시세
def get_current_price(stock_no):
    PATH = "uapi/domestic-stock/v1/quotations/inquire-price"
    URL = f"{URL_BASE}/{PATH}"

    # 헤더 설정
    headers = {"Content-Type":"application/json", 
            "authorization": f"Bearer {ACCESS_TOKEN}",
            "appKey":APP_KEY,
            "appSecret":APP_SECRET,

            "tr_id":"FHKST01010100"}

    params = {
        "fid_cond_mrkt_div_code":"J",
        "fid_input_iscd": stock_no
    }

    # 호출
    res = requests.get(URL, headers=headers, params=params)

    if res.status_code == 200 and res.json()["rt_cd"] == "0" :
        return(res.json())
    # 토큰 만료 시
    elif res.status_code == 200 and res.json()["msg_cd"] == "EGW00123" :
        auth()
        get_current_price(stock_no)
    else:
        print("Error Code : " + str(res.status_code) + " | " + res.text)
        return None

get_current_price("005930")


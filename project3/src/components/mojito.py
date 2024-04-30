import mojito
import pprint

key = "PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8"
secret = "eyTd2RBOAr654UMW0qMbpMVW5vEq3hAFlz2hHN5wYoZ0fo31jGKvWCd8m0oD8aWNnRyLwRyZYfGe++eyt6/azuxJSnIbO1Fb/rilVfvjQA+/AaGDPCjkmTf/IzrjWqpP8gWc2LKl3EMrsCYBSvA1MU/tYUyoaQvdAQywZ4OCHXZ2nsZmONI="
acc_no = "64242252-01"

broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no
)

resp = broker.fetch_price("00530")
pprint.pprint(resp)
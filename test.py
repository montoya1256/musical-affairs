import requests
from random import randint


# res = requests.get(
#     f"http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json&page={2}"
# )
# print(len(res.json()["artists"]["artist"]))
# ed = res.json()["artists"]["artist"][49]["name"]

# ed.split()
# s = "+"
# edS = s.join(ed.split())

# resp = requests.get(f"https://www.theaudiodb.com/api/v1/json/1/search.php?s={edS}")
# print(resp.json()["artists"][0]["idArtist"])

# i = 2
# while i <= 4:
#     res = requests.get(
#         f"http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json&page={4}"
#     )
#     j = 0
#     while j < len(res.json()["artists"]["artist"]):
#         # print(len(res.json()["artists"]["artist"]))  # 100

#         artist_name = res.json()["artists"]["artist"][j]["name"]
#         # print(artist_name)
#         p = "+"
#         if "+" in artist_name:
#             artist_name = artist_name.replace("+", "and")
#         print(artist_name)
#         artistName = p.join(artist_name.split())
#         resp = requests.get(
#             f"https://www.theaudiodb.com/api/v1/json/1/search.php?s={artistName}"
#         )
#         # print(len(resp.json()["artists"][0]))   # 49
#         if resp.json()["artists"] is not None:
#             print(artist_name, i, j, "---", resp.json()["artists"][0]["strArtistThumb"])
#         j += 1
#     i += 2


mylist = [(randint(1, 431), randint(1, 151)) for k in range(10)]
tupleList = list(set(mylist))
uniqueList = list(zip(*tupleList))

for ar in tupleList:
    print(ar)
# print(uniqueList)

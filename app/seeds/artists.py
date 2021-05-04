from app.models import db, Artist
import requests


def seed_artists():
    i = 2
    while i <= 10:
        res = requests.get(
            f"http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json&page={i}"
        )
        j = 0
        while j < len(res.json()["artists"]["artist"]):
            artist_name = res.json()["artists"]["artist"][j]["name"]
            # print(artist_name)
            p = "+"
            artistName = p.join(artist_name.split())
            resp = requests.get(
                f"https://www.theaudiodb.com/api/v1/json/1/search.php?s={artistName}"
            )
            if resp.json()["artists"] is not None:
                demo = Artist(
                    name=artist_name,
                    profile_pic=resp.json()["artists"][0]["strArtistThumb"],
                    apiId=resp.json()["artists"][0]["idArtist"],
                )
                db.session.add(demo)
            j += 1
        i += 2
    db.session.commit()


def undo_artists():
    db.session.execute("""TRUNCATE artists RESTART IDENTITY CASCADE;""")
    db.session.commit()

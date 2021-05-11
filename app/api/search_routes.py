from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Artist, db
import requests

search_routes = Blueprint("search", __name__)


@search_routes.route("/<term>/")
@login_required
def search_res(term):
    artist = Artist.query.filter(Artist.name.ilike(f"%{term}%")).first()
    # artdict = [art.to_dict() for art in artist]
    if artist:
        print("here______")
        return {"artist": artist.to_dict()}
    else:
        print("over here______")

        res = requests.get(
            f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={term}&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json"
        )
        artist_name = res.json()["artist"]["name"]
        resp = requests.get(
            f"https://www.theaudiodb.com/api/v1/json/1/search.php?s={artist_name}"
        )
        print("HEREEEEEEEEEE_____________")
        artist_id = resp.json()["artists"][0]["idArtist"]
        profile_pic = resp.json()["artists"][0]["strArtistThumb"]
        if profile_pic is not None:
            print(profile_pic, "--------------")
            new_artist = Artist(
                name=artist_name, profile_pic=profile_pic, apiId=artist_id
            )
            db.session.add(new_artist)
            db.session.commit()
            return {"artist": new_artist.to_dict()}
        return {"artist": {"name": artist_name}}

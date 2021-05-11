from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Artist, db
import requests

search_routes = Blueprint("search", __name__)


@search_routes.route("/<term>/")
@login_required
def search_res(term):
    artist = Artist.query.filter(Artist.name.ilike(f"%{term}%"))
    artdict = [art.to_dict() for art in artist]
    print("------------", artdict)
    if len(artdict) > 0:
        print("HERRREEEEEE \n\n\n")
        return {"artist": artdict}
    else:
        print("OVER HERE \n\n\n")
        res = requests.get(
            f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={term}&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json"
        )
        artist_name = res.json()["artist"]["name"]
        resp = requests.get(
            f"https://www.theaudiodb.com/api/v1/json/1/search.php?s={artist_name}"
        )
        artist_id = resp.json()["artists"][0]["idArtist"]
        profile_pic = resp.json()["artists"][0]["strArtistThumb"]
        print("------- name", artist_name)
        artist = Artist(name=artist_name, profile_pic=profile_pic, apiId=artist_id)
        db.session.add(artist)
        db.session.commit()
        return {"artist": artist.to_dict()}

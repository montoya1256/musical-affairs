from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Artist, db
import requests

search_routes = Blueprint("search", __name__)


@search_routes.route("/<term>/")
@login_required
def search_res(term):
    artist = Artist.query.filter(Artist.name.ilike(f"%{term}%")).first()
    if artist:
        return {"artist": artist.to_dict()}
    else:
        res = requests.get(
            f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={term}&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json"
        )
        artist_name = res.json()["artist"]["name"]
        resp = requests.get(
            f"https://www.theaudiodb.com/api/v1/json/1/search.php?s={artist_name}"
        )
        if resp.json()["artists"]:
            profile_pic = resp.json()["artists"][0]["strArtistThumb"]
        else:
            return {"artist": {"name": artist_name}}
        if profile_pic is not None:
            artist_id = resp.json()["artists"][0]["idArtist"]
            new_artist = Artist(
                name=artist_name, profile_pic=profile_pic, apiId=artist_id
            )
            db.session.add(new_artist)
            db.session.commit()
            return {"artist": new_artist.to_dict()}
        return {"artist": {"name": artist_name}}


@search_routes.route("/<term>/similar/")
@login_required
def search_similars(term):
    res = requests.get(
        f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={term}&api_key=6e04dabf1f3c8f12a80f3cdf2de0ef1c&format=json"
    )
    artist_name = res.json()["artist"]["name"]
    similar = res.json()["artist"]["similar"]["artist"]
    print(len(similar))

    i = 0
    similarArtists = []
    while i < len(similar):
        name = similar[i]["name"]
        artist = Artist.query.filter(Artist.name.ilike(f"%{name}%")).first()
        similarArtists.append(artist)
        i += 1
    return {"artist": [similarArtist.to_dict() for similarArtist in similarArtists]}

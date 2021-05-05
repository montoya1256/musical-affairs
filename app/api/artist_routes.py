from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Artist, db, favoriteArtists, User
from random import randrange
from app.forms.like_artist_form import LikeArtistForm


artist_routes = Blueprint("artists", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@artist_routes.route("/")
@login_required
def all_artist():
    artists = Artist.query.all()
    return {"artists": [artist.to_dict() for artist in artists]}


@artist_routes.route("/random/")
@login_required
def random_artist():
    id = randrange(460)
    artist = Artist.query.filter_by(id=id)
    return {"artist": [artist.to_dict() for artist in artist]}


@artist_routes.route("/favorites/")
@login_required
def get_favorites():
    user_id = current_user.id
    user = User.query.get(user_id)
    favArtist = user.favArtist
    return {"favorites": [fav.to_dict() for fav in favArtist]}


@artist_routes.route("/favorites/", methods=["POST"])
@login_required
def like_artist():
    form = LikeArtistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user_id = current_user.id
        artist_id = request.json["favArtistId"]
        user = User.query.get(user_id)
        artist = Artist.query.get(artist_id)
        user.favArtist.append(artist)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@artist_routes.route("/favorites/", methods=["DELETE"])
@login_required
def un_like_artist():
    user_id = current_user.id
    artist_id = request.json["favArtistId"]
    user = User.query.get(user_id)
    artist = Artist.query.get(artist_id)
    user.favArtist.remove(artist)
    db.session.add(user)
    db.session.commit()
    return {"message": "success"}

from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Artist, db
from random import randrange


artist_routes = Blueprint("artists", __name__)


# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f"{field} : {error}")
#     return errorMessages


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
    return {"artist": [artistt.to_dict() for artistt in artist]}

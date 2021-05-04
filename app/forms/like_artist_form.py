from flask_wtf import FlaskForm
from flask_login import current_user
from app.models import Artist
from wtforms import HiddenField
from wtforms.validators import DataRequired, ValidationError


class LikeArtistForm(FlaskForm):
    artist_id = HiddenField("artist_id")

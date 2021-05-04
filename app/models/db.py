from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    birthday = db.Column(db.DateTime, nullable=False)
    profile_pic = db.Column(db.String(100))
    zip_code = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(15), nullable=False)
    preffered_gender = db.Column(db.String(15), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # associations
    # user_favorites = db.relationship(
    #     "favoriteArtists", backref="favorite_artists", cascade="all, delete"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "profile_pic": self.profile_pic,
            "birthday": self.birthday,
            "zip_code": self.zip_code,
            "gender": self.gender,
            "preffered_gender": self.preffered_gender,
        }


class Artist(db.Model):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    profile_pic = db.Column(db.String(100), nullable=False)
    apiId = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "profile_pic": self.profile_pic,
            "apiId": self.apiId,
        }


class FavoriteArtist(db.Model):
    __tablename__ = "favoriteArtists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    artistId = db.Column(db.Integer, db.ForeignKey("artists.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "artistId": self.artistId,
        }


# favoriteArtists = db.Table(
#     "favorites",
#     db.Column("artist_id", db.Integer, db.ForeignKey("artists.id"), primary_key=True),
#     db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
# )


class Chat(db.Model):
    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    reciever_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "reciever_id": self.reciever_id,
            "message": self.message,
        }

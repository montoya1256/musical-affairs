import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from datetime import datetime

from .models import db, User, Chat
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.artist_routes import artist_routes
from .api.private_chat_routes import private_message_routes
from .api.search_routes import search_routes

from .seeds import seed_commands

from .socket import socketio

from .config import Config

app = Flask(__name__)
# socketio = SocketIO(cors_allowed_origins="*")

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://musical-affairs.herokuapp.com",
        "https://musical-affairs.herokuapp.com",
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(app, cors_allowed_origins=origins)


@socketio.on("private_message", namespace="/private")
def handlePrivateMessage(data):
    time = datetime.now()
    private_message = Chat(
        message=data["message"],
        sender_id=data["sender_id"],
        reciever_id=data["reciever_id"],
        createdAt=time,
        updatedAt=time,
    )
    db.session.add(private_message)
    db.session.commit()
    emit("private_room", data, to=data["roomId"], namespace="/private")


@socketio.on("join_room", namespace="/private")
def handlePrivateJoinRoom(roomId):
    join_room(roomId["roomId"])
    return None


@socketio.on("leave_room", namespace="/private")
def handlePrivateLeaveRoom(roomId):
    leave_room(roomId)
    return None


@socketio.on("connect", namespace="/private")
def handlePrivateConnect():
    print(request, "User has connected")


# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(artist_routes, url_prefix="/api/artists")
app.register_blueprint(private_message_routes, url_prefix="/api/chat")
app.register_blueprint(search_routes, url_prefix="/api/search")
db.init_app(app)
Migrate(app, db)
socketio.init_app(app)


# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")


# @socketio.on("private_message")
# def handlePrivateMessage(data):
#     print("hellooooooo")
#     print("----------------------------", data)
#     # time = datetime.now()
#     # msg = Chat(
#     #     message=data["message"],
#     #     sender_id=data["sender_id"],
#     #     reciever_id=data["reciever_id"],
#     #     createdAt=time,
#     #     updatedAt=time,
#     # )
#     # db.session.add(msg)
#     # db.session.commit()
#     # emit("private_room", msg, to=data["roomId"], namespace="/private")
#     emit("private_message", data, broadcast=True)

if __name__ == "__main__":
    socketio.run(app)

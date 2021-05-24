from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from app.models import db, Chat
from flask_login import current_user
from datetime import datetime
from app.forms import chat_form
from flask import request

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://musical-affairs.herokuapp.com",
        "https://musical-affairs.herokuapp.com",
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# inlcude an on connect event to log the users request.sid

# include a disconnect event to disconnect the user when they log out


@socketio.on("private_message", namespace="/private")
def handlePrivateMessage(data):
    time = datetime.now()
    msg = Chat(
        message=data["message"],
        sender_id=data["sender_id"],
        reciever_id=data["reciever_id"],
        createdAt=time,
        updatedAt=time,
    )
    db.session.add(msg)
    db.session.commit()
    emit("private_room", data, to=data["roomId"], namespace="/private")


@socketio.on("join_room", namespace="/private")
def handlePrivateJoinRoom(roomId):
    print("JOINED**********\n\n")
    join_room(roomId["roomId"])
    return None


@socketio.on("leave_room", namespace="/private")
def handlePrivateLeaveRoom(roomId):
    print("LEFT---------------\n\n")
    leave_room(roomId)
    return None


@socketio.on("connect", namespace="/private")
def handlePrivateConnect():
    print(request, "I have connected")

from flask_socketio import SocketIO, join_room, leave_room, send, emit
import os
from app.models import db, Chat
import datetime


@socketio.on("new_message")
def handle_new_message(data):
    message = request.json["message"]
    sender_id = request.json["sender_id"]
    reciever_id = request.json["reciever_id"]
    message = Chat(
        message=data["message"],
        sender_id=data["sender_id"],
        reciever_id=data["reciever_id"],
    )
    db.session.add(message)
    db.session.commit()
    emit("chat", message, to=1)

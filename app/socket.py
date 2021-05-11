from flask_socketio import SocketIO, send, emit
import os
from app.models import db, Chat
from flask_login import current_user
from datetime import datetime
from app.forms import chat_form

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com",
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


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
    room = data["roomId"]
    emit("private_room", data, to=room, namespace="/private")


# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f"{field} : {error}")
#     return errorMessages


# @socketio.on("new_message")
# def handle_new_msg(data):
#     reciever_id = request.json["reciever_id"]
#     createdAt = datetime.now()
#     updatedAt = datetime.now()
#     form = chat_form()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         msg = Chat(
#             message=form.message.data,
#             sender_id=current_user.id,
#             reciever_id=reciever_id,
#             createdAt=createdAt,
#             updatedAt=updatedAt,
#         )
#         db.session.add(msg)
#         db.session.commit()
#         return msg.to_dict()
#     return {"errors": validation_errors_to_error_messages(form.errors)}, 401

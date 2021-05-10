from flask import Blueprint, session, request
from flask_login import current_user
from app.models import User, db, Chat

private_message_routes = Blueprint("private_messages", __name__)


@private_message_routes.route("/<sender_id>/<reciever_id>/")
def get_private_messages(sender_id, reciever_id):
    sender_id = int(sender_id)
    reciever_id = int(reciever_id)
    print(sender_id, " sender_id", reciever_id, " reciever_id")
    msgs = Chat.query.filter(Chat.sender_id == sender_id)
    return {"messages": [msg.to_dict() for msg in msgs]}

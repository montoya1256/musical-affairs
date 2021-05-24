from flask import Blueprint, session, request
from flask_login import current_user
from app.models import User, db, Chat
from sqlalchemy import or_, and_

private_message_routes = Blueprint("private_messages", __name__)


@private_message_routes.route("/<sender_id>/<reciever_id>/")
def get_private_messages(sender_id, reciever_id):
    sender_id = int(sender_id)
    reciever_id = int(reciever_id)
    print("---------\n\n", reciever_id, sender_id)
    msgs = (
        Chat.query.filter(
            or_(
                and_(
                    Chat.sender_id == sender_id,
                    Chat.reciever_id == reciever_id,
                ),
                and_(
                    Chat.sender_id == reciever_id,
                    Chat.reciever_id == sender_id,
                ),
            )
        )
        .order_by(Chat.createdAt.desc())
        .all()
    )
    return {"messages": [msg.to_dict() for msg in msgs]}

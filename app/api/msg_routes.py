from flask import Blueprint
from app.models import db, Chat
from flask_login import current_user, login_required

message_routes = Blueprint("messages", __name__)


@message_routes.route("/")
@login_required
def get_messages():
    user_id = current_user.id
    messages = Chat.query.filter_by(sender_id=user_id).all()
    return {"messages": [message.to_dict() for message in messages]}

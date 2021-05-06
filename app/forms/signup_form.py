from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FileField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    first_name = StringField("First name", validators=[DataRequired()])
    username = StringField("username", validators=[DataRequired()])
    email = StringField("email", validators=[DataRequired(), user_exists])
    birthday = DateField("Birthday", validators=[DataRequired()])
    profile_pic = FileField("Profile Picture")
    zip_code = IntegerField("Zip Code", validators=[DataRequired()])
    gender = StringField("Gender", validators=[DataRequired()])
    preffered_gender = StringField("Gender", validators=[DataRequired()])
    password = StringField(
        "Password",
        validators=[
            DataRequired(),
            Length(min=8, message="password must be at least 8 characters"),
        ],
    )

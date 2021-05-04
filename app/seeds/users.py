# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, User

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():

    demoUser = User(
        username="Demo",
        email="demo@user.io",
        password="password",
        first_name="demo",
        birthday="1997-07-02",
        profile_pic="na",
        zip_code="60101",
        gender="M",
        preffered_gender="F",
    )
    db.session.add(demoUser)
    for i in range(150):

        demo = User(
            username=faker.simple_profile()["username"],
            email=faker.email(),
            password="password",
            first_name=faker.first_name(),
            birthday=faker.date_between(start_date="-50y", end_date="-21y"),
            profile_pic=faker.image_url(),
            zip_code=faker.postcode(),
            gender=faker.simple_profile()["sex"],
            preffered_gender=faker.simple_profile()["sex"],
        )
        db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

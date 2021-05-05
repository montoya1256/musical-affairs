from app.models import db, favoriteArtists
from random import randint


def seed_favorites():

    mylist = [(randint(1, 431), randint(1, 151)) for k in range(1000)]
    tupleList = list(set(mylist))

    for tup in tupleList:
        db.session.execute(
            f"""INSERT INTO favorites (artist_id, user_id)
                VALUES {tup};"""
        )

    db.session.commit()


def undo_favorites():
    db.session.execute("""TRUNCATE TABLE favorites;""")
    db.session.commit()

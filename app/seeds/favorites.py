from app.models import db, favoriteArtists
from random import randint


def seed_favorites():

    mylist = [(randint(2, 431), randint(2, 151)) for k in range(2000)]
    tupleList = list(set(mylist))
    print(tupleList)

    demolist = [(randint(1, 431), 1) for k in range(10)]
    dtupleList = list(set(demolist))

    for tup in tupleList:
        db.session.execute(
            f"""INSERT INTO favorites (artist_id, user_id)
                VALUES {tup};"""
        )

    for dtup in dtupleList:
        db.session.execute(
            f"""INSERT INTO favorites (artist_id, user_id)
                VALUES {dtup};"""
        )

    db.session.commit()


def undo_favorites():
    db.session.execute("""TRUNCATE TABLE favorites;""")
    db.session.commit()

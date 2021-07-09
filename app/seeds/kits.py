from app.models import db, Kit


def seed_kits():
    test_kit = Kit(name="Techno Kit", user_id=1, genre_id=10,
                   cover_img_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/Techno.png")
    test_kit_2 = Kit(name="Lofi Kit", user_id=1, genre_id=12,
                     cover_img_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/Lofi.jpeg")
    test_kit_3 = Kit(name="Ominous Ambience", user_id=2, genre_id=1,
                     cover_img_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/Cave.jpeg")

    db.session.add(test_kit)
    db.session.add(test_kit_2)
    db.session.add(test_kit_3)
    db.session.commit()


def undo_kits():
    db.session.execute('TRUNCATE kits RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Kit


def seed_kits():
    test_kit = Kit(name="Test", user_id=1, genre_id=2,
                   cover_img_url="https://www.dictionary.com/e/wp-content/uploads/2016/01/paris-green-color-paint-code-swatch-chart-rgb-html-hex.png")
    test_kit_2 = Kit(name="Test 2", user_id=1, genre_id=4,
                     cover_img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/1200px-Red.svg.png")
    test_kit_3 = Kit(name="Test 3 User 2", user_id=2, genre_id=3,
                     cover_img_url="https://static.onecms.io/wp-content/uploads/sites/28/2017/05/blue0517.jpg")

    db.session.add(test_kit)
    db.session.add(test_kit_2)
    db.session.add(test_kit_3)
    db.session.commit()


def undo_kits():
    db.session.execute('TRUNCATE kits RESTART IDENTITY CASCADE;')
    db.session.commit()

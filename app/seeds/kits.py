from app.models import db, Kit


def seed_kits():
    test_kit = Kit(name="Test", user_id=1, genre_id=2,
                   cover_img_url="https://www.dictionary.com/e/wp-content/uploads/2016/01/paris-green-color-paint-code-swatch-chart-rgb-html-hex.png")

    db.session.add(test_kit)
    db.session.commit()


def undo_kits():
    db.session.execute('TRUNCATE kits RESTART IDENTITY CASCADE;')
    db.session.commit()

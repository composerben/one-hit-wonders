from app.models import db, Genre


def seed_genres():
    ambient = Genre(name="Ambient")
    chiptune = Genre(name="Chiptune")
    dubstep = Genre(name="Dubstep")
    edm = Genre(name="EDM")
    house = Genre(name="House")
    jazz = Genre(name="Jazz")
    metal = Genre(name="Metal")
    reggae = Genre(name="Reggae")
    rock = Genre(name="Rock")
    techno = Genre(name="Techno")
    trap = Genre(name="Trap")

    db.session.add(ambient)
    db.session.add(chiptune)
    db.session.add(dubstep)
    db.session.add(edm)
    db.session.add(house)
    db.session.add(jazz)
    db.session.add(metal)
    db.session.add(reggae)
    db.session.add(rock)
    db.session.add(techno)
    db.session.add(trap)

    db.session.commit()


def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Drum_Type


def seed_drum_types():
    kick = Drum_Type(name="Kick")
    click = Drum_Type(name="Click")
    snare = Drum_Type(name="Snare")
    clap = Drum_Type(name="Clap")
    high_tom = Drum_Type(name="High Tom")
    low_tom = Drum_Type(name="Low Tom")
    hi_hat = Drum_Type(name="Hi-hat")
    beep = Drum_Type(name="Beep")
    ride = Drum_Type(name="Ride")
    vocal = Drum_Type(name="Vocal")
    crash = Drum_Type(name="Crash")
    sub = Drum_Type(name="Sub")

    db.session.add(kick)
    db.session.add(click)
    db.session.add(snare)
    db.session.add(clap)
    db.session.add(high_tom)
    db.session.add(low_tom)
    db.session.add(hi_hat)
    db.session.add(beep)
    db.session.add(ride)
    db.session.add(vocal)
    db.session.add(crash)
    db.session.add(sub)

    db.session.commit()


def undo_drum_types():
    db.session.execute('TRUNCATE drum_types RESTART IDENTITY CASCADE;')
    db.session.commit()

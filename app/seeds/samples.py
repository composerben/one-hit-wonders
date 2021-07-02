from app.models import db, Sample


def seed_samples():
    thud_kick = Sample(name="Thud Kick", drum_type_id=1, kit_id=1,
                       audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/techno_seeders/techno_kick.mp3")
    techno_snare = Sample(name="Long Snare", drum_type_id=3, kit_id=1,
                          audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/techno_seeders/techno_snare.mp3")
    techno_clap = Sample(name="Electric Clap", drum_type_id=4, kit_id=1,
                         audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/techno_seeders/techno_clap.mp3")
    techno_ride = Sample(name="Buzzy Ride", drum_type_id=9, kit_id=1,
                         audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/techno_seeders/techno_ride.mp3")
    techno_crash = Sample(name="Sizzle Crash", drum_type_id=11, kit_id=1,
                          audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/techno_seeders/techno_crash.mp3")
    techno_sub = Sample(name="Sub Drop", drum_type_id=12, kit_id=1,
                        audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/techno_seeders/techno_sub.mp3")
    lofi_kick = Sample(name="Acoustic Kick", drum_type_id=1, kit_id=2,
                       audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_kick.mp3")
    lofi_click = Sample(name="Snare Rim", drum_type_id=2, kit_id=2,
                        audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_snare_click.mp3")
    lofi_snare = Sample(name="Acoustic Snare", drum_type_id=3, kit_id=2,
                        audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_snare.mp3")
    lofi_high_tom = Sample(name="Acoustic High Tom", drum_type_id=5, kit_id=2,
                           audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_tom_high.mp3")
    lofi_low_tom = Sample(name="Acoustic Low Tom", drum_type_id=6, kit_id=2,
                          audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_tom_low.mp3")
    lofi_hihat = Sample(name="Closed Hat", drum_type_id=7, kit_id=2,
                        audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_hihat.mp3")
    lofi_crash = Sample(name="Shimmer Crash", drum_type_id=11, kit_id=2,
                        audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/lofi_seeders/lofi_crash.mp3")
    ambient_boom = Sample(name="Deep Boom", drum_type_id=1, kit_id=3,
                          audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/ambient_seeders/ambient_boom.mp3")
    ambient_kick = Sample(name="'Verbed Kick", drum_type_id=1, kit_id=3,
                          audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/ambient_seeders/ambient_kick.mp3")
    ambient_big_drum = Sample(name="Big Boy", drum_type_id=1, kit_id=3,
                              audio_url="https://one-hit-wonders.s3.us-west-2.amazonaws.com/ambient_seeders/ambient_drum_big.mp3")

    db.session.add(thud_kick)
    db.session.add(techno_snare)
    db.session.add(techno_clap)
    db.session.add(techno_ride)
    db.session.add(techno_crash)
    db.session.add(techno_sub)
    db.session.add(lofi_kick)
    db.session.add(lofi_click)
    db.session.add(lofi_snare)
    db.session.add(lofi_high_tom)
    db.session.add(lofi_low_tom)
    db.session.add(lofi_hihat)
    db.session.add(lofi_crash)
    db.session.add(ambient_boom)
    db.session.add(ambient_kick)
    db.session.add(ambient_big_drum)
    db.session.commit()


def undo_samples():
    db.session.execute('TRUNCATE samples RESTART IDENTITY CASCADE;')
    db.session.commit()

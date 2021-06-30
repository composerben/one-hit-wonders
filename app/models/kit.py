from .db import db


class Kit(db.Model):
    __tablename__ = "kits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(
        "genres.id"), nullable=False)
    cover_img_url = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="kits")
    genre = db.relationship("Genre", back_populates="kits")

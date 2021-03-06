from .db import db


class Drum_Type(db.Model):
    __tablename__ = "drum_types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)

    samples = db.relationship("Sample", back_populates="drum_type")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "samples": [sample.to_dict() for sample in self.samples]
        }

    def simple_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }

from .db import db


class Sample(db.Model):
    __tablename__ = "samples"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    drum_type_id = db.Column(db.Integer, db.ForeignKey(
        "drum_types.id"), nullable=False)
    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), nullable=False)
    audio_url = db.Column(db.String, nullable=False)

    drum_type = db.relationship("Drum_Type", back_populates="samples")
    kit = db.relationship("Kit", back_populates="samples")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "drum_type_id": self.drum_type_id,
            "kit_id": self.kit_id,
            "audio_url": self.audio_url,
            "drum_type": self.drum_type.name,
        }

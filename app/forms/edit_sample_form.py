from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class EditSampleForm(FlaskForm):
    name = StringField("Edit Sample")
    drum_type_id = IntegerField("Edit Drum Type")
    audio_url = StringField("Edit Audio File")
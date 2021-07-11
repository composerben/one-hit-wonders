from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class KitForm(FlaskForm):
    name = StringField("Kit Name", validators=[DataRequired()])
    genre_id = IntegerField("Select a genre", validators=[DataRequired()])
    cover_img = StringField("Kit Cover", validators=[DataRequired()])
    samples = StringField("Samples")

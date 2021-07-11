from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField


class EditKitForm(FlaskForm):
    name = StringField("Edit Name")
    genre_id = IntegerField("Edit Genre")
    cover_img_url = StringField("Edit Cover Image")

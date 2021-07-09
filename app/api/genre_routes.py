from flask import Blueprint
from app.models import Genre, db

genre_routes = Blueprint("genres", __name__)


@genre_routes.route("")
def all_genres():
    genres = Genre.query.all()
    return {"genres": [genre.to_dict() for genre in genres]}

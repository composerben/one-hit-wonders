from flask import Blueprint
from app.models import Drum_Type, db

drum_type_routes = Blueprint("drum_types", __name__)


# GET /api/drum_types
@drum_type_routes.route("")
def all_drum_types():
    drum_types = Drum_Type.query.all()
    return {"drum_types": [drum_type.to_dict() for drum_type in drum_types]}

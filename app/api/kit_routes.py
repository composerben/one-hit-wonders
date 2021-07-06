from flask import Blueprint, jsonify
from app.models import Kit

kit_routes = Blueprint("kits", __name__)


#GET /api/kits
@kit_routes.route("")
def all_kits():
    kits = Kit.query.all()
    return {"kits": [kit.to_dict() for kit in kits]}


# GET /api/kits/<int:user_id>
@kit_routes.route("/users/<int:user_id>")
def user_kits(user_id):
    kits = Kit.query.filter(Kit.user_id == user_id).all()
    return {"kits": [kit.to_dict() for kit in kits]}

# GET /api/kits/<int:id>
@kit_routes.route("/<int:id>")
def current_kit(id):
    kit = Kit.query.get(id)
    print (kit)
    return {"kit": kit.to_dict()}

from flask import Blueprint, request
from app.models import Kit, db
from app.aws import(upload_file_to_s3, allowed_file, get_unique_filename)
from flask_login import login_required, current_user

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
    print(kit)
    return {"kit": kit.to_dict()}


@kit_routes.route("", methods=["POST"])
@login_required
def upload_cover_img():
    if "cover_img" not in request.files:
        return {"errors": "image required"}, 400

    cover_img = request.files["cover_img"]

    if not allowed_file(cover_img.filename):
        return {"errors: file type not supported: must be a pdf, png, jpg, jpeg, or gif"}, 400

    cover_img.filename = get_unique_filename(cover_img.filename)

    upload = upload_file_to_s3(cover_img)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    new_kit = Kit(cover_img_url=url)
    db.session.add(new_kit)
    db.session.commit()

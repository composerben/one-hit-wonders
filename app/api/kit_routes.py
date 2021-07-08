from flask import Blueprint, request
from app.models import Kit, db, Sample
from app.aws import(upload_file_to_s3, allowed_file, get_unique_filename)
from flask_login import login_required, current_user
from app.forms import KitForm

kit_routes = Blueprint("kits", __name__)


# GET /api/kits
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
    return {"kit": kit.to_dict()}


# POST /api/kits
@kit_routes.route("", methods=["POST"])
@login_required
def upload_cover_img():
    if "cover_img_url" not in request.files:
        return {"errors": "image required"}, 400
    if "audio_url" not in request.files:
        return {"errors": "audio file required"}, 400

    cover_img_url = request.files["cover_img_url"]
    audio_url = request.files["audio_url"]

    if not allowed_file(cover_img_url.filename):
        return {"errors: file type not supported: must be a pdf, png, jpg, jpeg, or gif"}, 400
    if not allowed_file(audio_url.filename):
        return {"errors: file type not supported: must be a wav, mp3, or aiff"}, 400

    cover_img_url.filename = get_unique_filename(cover_img_url.filename)
    audio_url.filename = get_unique_filename(audio_url.filename)

    upload = upload_file_to_s3(cover_img_url)
    upload_audio = upload_file_to_s3(audio_url)

    if "url" not in upload:
        return upload, 400
    if "url" not in upload_audio:
        return upload_audio, 400

    url = upload["url"]
    url_audio = upload_audio["url"]

    form = KitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    new_kit = Kit(
        name=form.data["name"],
        user_id=current_user.id,
        genre_id=form.data["genre_id"],
        cover_img_url=url
    )
    

    db.session.add(new_kit)
    db.session.commit()
    return new_kit.to_dict()

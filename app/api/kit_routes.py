from flask import Blueprint, request
from app.models import Kit, db, Sample
from app.aws import(upload_file_to_s3, allowed_file, get_unique_filename)
from flask_login import login_required, current_user
from app.forms import KitForm
import json

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
    print("*******REQUEST OBJECT*******", request.files)
    print("*******REQUEST DATA*******", request.data)
    print("*******REPR*******", request.__repr__)

    if "cover_img_url" not in request.files:
        return {"errors": "image required"}, 400
    if "audio_url" not in request.files:
        return {"errors": "audio file required"}, 400

    cover_img_url = request.files["cover_img_url"]
    audio_urls = request.files.getlist("audio_url")
    print("AUDIO URLS", audio_urls)
    if not allowed_file(cover_img_url.filename):
        return {"errors": "file type not supported: must be a pdf, png, jpg, jpeg, or gif"}, 400

    audio_uploads = []

    for audio_url in audio_urls:
        if not allowed_file(audio_url.filename):
            return {"errors": "file type not supported: must be a wav, mp3, or aiff"}, 400
        print("AUDIO FILENAME", audio_url.filename)
        audio_url.filename = get_unique_filename(audio_url.filename)
        audio_uploads.append(upload_file_to_s3(audio_url))
    print("UPLOADED TO S3")
    cover_img_url.filename = get_unique_filename(cover_img_url.filename)
    # audio_urls.filename = get_unique_filename(audio_urls.filename)

    print("AUDIO UPLOADS", audio_uploads)

    upload = upload_file_to_s3(cover_img_url)

    if "url" not in upload:
        return upload, 400
    for audio_upload in audio_uploads:
        if "url" not in audio_upload:
            return audio_upload, 400
    print("DATA PROBABLY RETURNED")
    url = upload["url"]

    form = KitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("SAMPLE FORM DATA", form.data)
    # if form.validate_on_submit():
    new_kit = Kit(
        name=form.data["name"],
        user_id=current_user.id,
        genre_id=form.data["genre_id"],
        cover_img_url=url
    )
    db.session.add(new_kit)
    db.session.commit()

    sample_list = json.loads(form.data["samples"])
    print("SAMPLE LIST", sample_list)
    for i in range(len(sample_list)):
        sample = Sample(
            name=sample_list[i]["name"],
            drum_type_id=sample_list[i]["drum_type_id"],
            kit_id=new_kit.id,
            audio_url=audio_uploads[i]["url"]
        )
        print("SAMPLE", sample)

        db.session.add(sample)

    db.session.commit()
    return new_kit.to_dict()

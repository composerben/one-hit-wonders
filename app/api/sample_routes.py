from flask import Blueprint, request
from app.models import Sample, db
from app.aws import(upload_file_to_s3, allowed_file, get_unique_filename)
from flask_login import login_required
from app.forms import EditSampleForm

sample_routes = Blueprint("samples", __name__)


# GET /api/samples/kit/<int:kit_id>
@sample_routes.route("/kit/<int:kit_id>")
def kit_samples(kit_id):
    samples = Sample.query.filter(Sample.kit_id == kit_id).all()
    return {"samples": [sample.to_dict() for sample in samples]}


# DELETE /api/samples/<int:id>
@sample_routes.route("/<int:id>", methods=["DELETE"])
def delete_sample(id):
    sample = Sample.query.get(id)
    db.session.delete(sample)
    db.session.commit()
    return {"message": "success"}


# PATCH /api/samples/<int:id>
@sample_routes.route("/<int:id>", methods=["PATCh"])
@login_required
def edit_sample(id):
    form = EditSampleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    audio_url = request.files["audio_url"]
    if not allowed_file(audio_url.filename):
        return {"errors": "file type not supported: must be a wav, mp3 or aiff"}
    audio_url.filename = get_unique_filename(audio_url.filename)
    upload = upload_file_to_s3(audio_url)
    if "url" not in upload:
        return upload, 400
    url = upload["url"]

    sample = Sample.query.get(id)

    sample.name = form.data["name"]
    sample.drum_type_id = form.data["drum_type_id"]
    sample.audio_url = url
    db.session.commit()
    return {"sample": sample.to_dict()}

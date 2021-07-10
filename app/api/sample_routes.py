from flask import Blueprint
from app.models import Sample, db

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

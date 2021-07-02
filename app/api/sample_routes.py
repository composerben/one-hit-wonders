from flask import Blueprint
from app.models import Sample

sample_routes = Blueprint("samples", __name__)


@sample_routes.route("/<int:kit_id>")
def kit_samples(kit_id):
    samples = Sample.query.filter(Sample.kit_id == kit_id).all()
    return {"samples": [sample.to_dict() for sample in samples]}

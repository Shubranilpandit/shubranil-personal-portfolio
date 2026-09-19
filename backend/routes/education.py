from flask import Blueprint, jsonify
from backend.models import Education

education_bp = Blueprint("education", __name__, url_prefix="/api/education")


@education_bp.route("", methods=["GET"])
def get_education():
    """Retrieve education timeline."""
    records = Education.query.order_by(Education.sort_order.asc(), Education.id.asc()).all()
    return jsonify({
        "status": "success",
        "data": [e.to_dict() for e in records],
        "total": len(records),
    })

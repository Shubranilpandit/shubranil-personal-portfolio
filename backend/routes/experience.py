from flask import Blueprint, jsonify
from backend.models import Experience

experience_bp = Blueprint("experience", __name__, url_prefix="/api/experience")


@experience_bp.route("", methods=["GET"])
def get_experience():
    """Retrieve experience, research, and technical activity entries."""
    records = Experience.query.order_by(Experience.sort_order.asc(), Experience.id.asc()).all()
    return jsonify({
        "status": "success",
        "data": [e.to_dict() for e in records],
        "total": len(records),
    })

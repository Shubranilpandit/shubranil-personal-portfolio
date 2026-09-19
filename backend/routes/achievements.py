from flask import Blueprint, jsonify
from backend.models import Achievement

achievements_bp = Blueprint("achievements", __name__, url_prefix="/api/achievements")


@achievements_bp.route("", methods=["GET"])
def get_achievements():
    """Retrieve achievements database."""
    records = Achievement.query.order_by(Achievement.sort_order.asc(), Achievement.id.asc()).all()
    return jsonify({
        "status": "success",
        "data": [a.to_dict() for a in records],
        "total": len(records),
    })

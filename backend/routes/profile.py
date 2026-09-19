from flask import Blueprint, jsonify
from backend.models import Profile

profile_bp = Blueprint("profile", __name__, url_prefix="/api/profile")


@profile_bp.route("", methods=["GET"])
def get_profile():
    """Retrieve personal digital identity profile."""
    profile = Profile.query.first()
    if not profile:
        return jsonify({"error": "Profile not initialized", "code": "PROFILE_NOT_FOUND"}), 404
    return jsonify({"status": "success", "data": profile.to_dict()})

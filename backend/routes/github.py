from flask import Blueprint, jsonify
from backend.services.github_service import get_github_repositories

github_bp = Blueprint("github", __name__, url_prefix="/api/github")


@github_bp.route("", methods=["GET"])
def get_repos():
    """Retrieve public repositories with cached GitHub integration and resilient fallback."""
    result = get_github_repositories()
    return jsonify({
        "status": "success",
        "data": result,
    })

from flask import Blueprint, jsonify, request
from backend.models import Project

projects_bp = Blueprint("projects", __name__, url_prefix="/api/projects")


@projects_bp.route("", methods=["GET"])
def get_projects():
    """Retrieve all projects with optional category and featured filters."""
    category = request.args.get("category")
    featured_only = request.args.get("featured", "").lower() in ("true", "1")

    query = Project.query

    if category and category.lower() != "all":
        query = query.filter(Project.category.ilike(category))

    if featured_only:
        query = query.filter_by(featured=True)

    projects = query.order_by(Project.sort_order.asc(), Project.id.asc()).all()

    # Get distinct categories for UI filter pills
    all_categories = [c[0] for c in Project.query.with_entities(Project.category).distinct().all()]

    return jsonify({
        "status": "success",
        "data": [p.to_dict() for p in projects],
        "categories": ["All"] + all_categories,
        "total": len(projects),
    })


@projects_bp.route("/<int:project_id>", methods=["GET"])
def get_project_detail(project_id: int):
    """Retrieve a single project by ID."""
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project node not found", "code": "PROJECT_NOT_FOUND"}), 404

    return jsonify({"status": "success", "data": project.to_dict()})

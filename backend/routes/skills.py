from collections import defaultdict
from flask import Blueprint, jsonify
from backend.models import Skill

skills_bp = Blueprint("skills", __name__, url_prefix="/api/skills")


@skills_bp.route("", methods=["GET"])
def get_skills():
    """Retrieve all technical skills grouped by category."""
    skills = Skill.query.order_by(Skill.sort_order.asc(), Skill.name.asc()).all()

    grouped = defaultdict(list)
    for s in skills:
        grouped[s.category].append(s.to_dict())

    # Standard category ordering matching specifications
    category_order = [
        "Programming",
        "Data Science / ML",
        "Backend",
        "Databases",
        "Tools",
        "Big Data",
        "AI / GenAI",
    ]

    ordered_categories = []
    for cat in category_order:
        if cat in grouped:
            ordered_categories.append({
                "category": cat,
                "skills": grouped[cat],
            })

    # Include any extra categories added via admin
    for cat, items in grouped.items():
        if cat not in category_order:
            ordered_categories.append({
                "category": cat,
                "skills": items,
            })

    return jsonify({
        "status": "success",
        "categories": ordered_categories,
        "all_skills": [s.to_dict() for s in skills],
        "total": len(skills),
    })

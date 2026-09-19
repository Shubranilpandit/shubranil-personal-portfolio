from flask import Blueprint, jsonify, request
from backend.models import (
    db,
    Profile,
    Project,
    ProjectTechnology,
    Skill,
    Education,
    Experience,
    Achievement,
    ContactMessage,
)
from backend.utils.auth import token_required

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")


# ==========================================
# 0. Overview / Dashboard Statistics
# ==========================================
@admin_bp.route("/overview", methods=["GET"])
@token_required
def get_overview():
    """Retrieve system aggregate metrics for admin command center."""
    return jsonify({
        "status": "success",
        "counts": {
            "projects": Project.query.count(),
            "skills": Skill.query.count(),
            "education": Education.query.count(),
            "experience": Experience.query.count(),
            "achievements": Achievement.query.count(),
            "messages_total": ContactMessage.query.count(),
            "messages_unread": ContactMessage.query.filter_by(status="unread").count(),
        },
    })


# ==========================================
# 1. Profile Management
# ==========================================
@admin_bp.route("/profile", methods=["PUT"])
@token_required
def update_profile():
    """Update personal digital identity profile."""
    profile = Profile.query.first()
    if not profile:
        profile = Profile(full_name="SHUBRANIL PANDIT", title="MCA Student | Data Science", bio="Bio")
        db.session.add(profile)

    data = request.get_json(silent=True) or {}
    for field in [
        "full_name", "title", "tagline", "bio", "avatar_url",
        "status", "location", "email", "github_url", "linkedin_url",
        "resume_url", "current_focus", "system_version"
    ]:
        if field in data:
            setattr(profile, field, data[field])

    db.session.commit()
    return jsonify({"status": "success", "data": profile.to_dict()})


# ==========================================
# 2. Projects Management
# ==========================================
@admin_bp.route("/projects", methods=["POST"])
@token_required
def create_project():
    """Add a new project to the command center."""
    data = request.get_json(silent=True) or {}
    if not data.get("title") or not data.get("category"):
        return jsonify({"error": "Title and category are required fields."}), 400

    project = Project(
        title=data.get("title"),
        subtitle=data.get("subtitle"),
        category=data.get("category"),
        description=data.get("description", ""),
        problem_solved=data.get("problem_solved"),
        key_contribution=data.get("key_contribution"),
        status=data.get("status", "Completed"),
        repo_url=data.get("repo_url"),
        demo_url=data.get("demo_url"),
        image_url=data.get("image_url"),
        architecture_flow=data.get("architecture_flow"),
        featured=data.get("featured", False),
        sort_order=data.get("sort_order", 0),
    )
    db.session.add(project)
    db.session.flush()

    technologies = data.get("technologies", [])
    for tech in technologies:
        if isinstance(tech, str) and tech.strip():
            db.session.add(ProjectTechnology(project_id=project.id, technology_name=tech.strip()))

    db.session.commit()
    return jsonify({"status": "success", "data": project.to_dict()}), 201


@admin_bp.route("/projects/<int:project_id>", methods=["PUT"])
@token_required
def update_project(project_id: int):
    """Update existing project record."""
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    data = request.get_json(silent=True) or {}
    for field in [
        "title", "subtitle", "category", "description", "problem_solved",
        "key_contribution", "status", "repo_url", "demo_url", "image_url",
        "architecture_flow", "featured", "sort_order"
    ]:
        if field in data:
            setattr(project, field, data[field])

    if "technologies" in data:
        # Replace technologies
        ProjectTechnology.query.filter_by(project_id=project.id).delete()
        for tech in data["technologies"]:
            if isinstance(tech, str) and tech.strip():
                db.session.add(ProjectTechnology(project_id=project.id, technology_name=tech.strip()))

    db.session.commit()
    return jsonify({"status": "success", "data": project.to_dict()})


@admin_bp.route("/projects/<int:project_id>", methods=["DELETE"])
@token_required
def delete_project(project_id: int):
    """Remove a project from the database."""
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    db.session.delete(project)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Project {project_id} deleted."})


# ==========================================
# 3. Skills Management
# ==========================================
@admin_bp.route("/skills", methods=["POST"])
@token_required
def create_skill():
    """Add a new technical skill."""
    data = request.get_json(silent=True) or {}
    if not data.get("name") or not data.get("category"):
        return jsonify({"error": "Name and category are required."}), 400

    skill = Skill(
        name=data.get("name").strip(),
        category=data.get("category").strip(),
        proficiency_level=data.get("proficiency_level", "Working Knowledge"),
        icon=data.get("icon", "code"),
        sort_order=data.get("sort_order", 0),
    )
    db.session.add(skill)
    db.session.commit()
    return jsonify({"status": "success", "data": skill.to_dict()}), 201


@admin_bp.route("/skills/<int:skill_id>", methods=["PUT"])
@token_required
def update_skill(skill_id: int):
    """Update an existing skill."""
    skill = Skill.query.get(skill_id)
    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    data = request.get_json(silent=True) or {}
    for field in ["name", "category", "proficiency_level", "icon", "sort_order"]:
        if field in data:
            setattr(skill, field, data[field])

    db.session.commit()
    return jsonify({"status": "success", "data": skill.to_dict()})


@admin_bp.route("/skills/<int:skill_id>", methods=["DELETE"])
@token_required
def delete_skill(skill_id: int):
    """Delete a skill."""
    skill = Skill.query.get(skill_id)
    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    db.session.delete(skill)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Skill {skill_id} deleted."})


# ==========================================
# 4. Education Management
# ==========================================
@admin_bp.route("/education", methods=["POST"])
@token_required
def create_education():
    """Add an education timeline node."""
    data = request.get_json(silent=True) or {}
    edu = Education(
        degree=data.get("degree", "").strip(),
        field_of_study=data.get("field_of_study", "").strip(),
        institution=data.get("institution", "").strip(),
        duration=data.get("duration", "").strip(),
        current_status=data.get("current_status", "In Progress"),
        grade=data.get("grade"),
        coursework=data.get("coursework"),
        sort_order=data.get("sort_order", 0),
    )
    db.session.add(edu)
    db.session.commit()
    return jsonify({"status": "success", "data": edu.to_dict()}), 201


@admin_bp.route("/education/<int:edu_id>", methods=["PUT"])
@token_required
def update_education(edu_id: int):
    """Update education entry."""
    edu = Education.query.get(edu_id)
    if not edu:
        return jsonify({"error": "Education entry not found"}), 404

    data = request.get_json(silent=True) or {}
    for field in ["degree", "field_of_study", "institution", "duration", "current_status", "grade", "coursework", "sort_order"]:
        if field in data:
            setattr(edu, field, data[field])

    db.session.commit()
    return jsonify({"status": "success", "data": edu.to_dict()})


@admin_bp.route("/education/<int:edu_id>", methods=["DELETE"])
@token_required
def delete_education(edu_id: int):
    """Delete education entry."""
    edu = Education.query.get(edu_id)
    if not edu:
        return jsonify({"error": "Education not found"}), 404

    db.session.delete(edu)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Education entry {edu_id} deleted."})


# ==========================================
# 5. Experience Management
# ==========================================
@admin_bp.route("/experience", methods=["POST"])
@token_required
def create_experience():
    """Add an experience / activity timeline node."""
    data = request.get_json(silent=True) or {}
    exp = Experience(
        role=data.get("role", "").strip(),
        organization=data.get("organization", "").strip(),
        duration=data.get("duration", "").strip(),
        type=data.get("type", "Internship"),
        responsibilities=data.get("responsibilities", ""),
        achievements=data.get("achievements"),
        technologies=data.get("technologies"),
        sort_order=data.get("sort_order", 0),
    )
    db.session.add(exp)
    db.session.commit()
    return jsonify({"status": "success", "data": exp.to_dict()}), 201


@admin_bp.route("/experience/<int:exp_id>", methods=["PUT"])
@token_required
def update_experience(exp_id: int):
    """Update experience entry."""
    exp = Experience.query.get(exp_id)
    if not exp:
        return jsonify({"error": "Experience entry not found"}), 404

    data = request.get_json(silent=True) or {}
    for field in ["role", "organization", "duration", "type", "responsibilities", "achievements", "technologies", "sort_order"]:
        if field in data:
            setattr(exp, field, data[field])

    db.session.commit()
    return jsonify({"status": "success", "data": exp.to_dict()})


@admin_bp.route("/experience/<int:exp_id>", methods=["DELETE"])
@token_required
def delete_experience(exp_id: int):
    """Delete experience entry."""
    exp = Experience.query.get(exp_id)
    if not exp:
        return jsonify({"error": "Experience entry not found"}), 404

    db.session.delete(exp)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Experience entry {exp_id} deleted."})


# ==========================================
# 6. Achievements Management
# ==========================================
@admin_bp.route("/achievements", methods=["POST"])
@token_required
def create_achievement():
    """Add an achievement node."""
    data = request.get_json(silent=True) or {}
    ach = Achievement(
        title=data.get("title", "").strip(),
        category=data.get("category", "Certification"),
        organization=data.get("organization"),
        issue_date=data.get("issue_date"),
        description=data.get("description"),
        credential_url=data.get("credential_url"),
        sort_order=data.get("sort_order", 0),
    )
    db.session.add(ach)
    db.session.commit()
    return jsonify({"status": "success", "data": ach.to_dict()}), 201


@admin_bp.route("/achievements/<int:ach_id>", methods=["PUT"])
@token_required
def update_achievement(ach_id: int):
    """Update achievement entry."""
    ach = Achievement.query.get(ach_id)
    if not ach:
        return jsonify({"error": "Achievement not found"}), 404

    data = request.get_json(silent=True) or {}
    for field in ["title", "category", "organization", "issue_date", "description", "credential_url", "sort_order"]:
        if field in data:
            setattr(ach, field, data[field])

    db.session.commit()
    return jsonify({"status": "success", "data": ach.to_dict()})


@admin_bp.route("/achievements/<int:ach_id>", methods=["DELETE"])
@token_required
def delete_achievement(ach_id: int):
    """Delete achievement entry."""
    ach = Achievement.query.get(ach_id)
    if not ach:
        return jsonify({"error": "Achievement not found"}), 404

    db.session.delete(ach)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Achievement {ach_id} deleted."})


# ==========================================
# 7. Contact Transmissions Log Management
# ==========================================
@admin_bp.route("/contacts", methods=["GET"])
@token_required
def list_contacts():
    """View all incoming contact messages."""
    status_filter = request.args.get("status")
    query = ContactMessage.query

    if status_filter:
        query = query.filter_by(status=status_filter)

    messages = query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({
        "status": "success",
        "data": [m.to_dict() for m in messages],
        "total": len(messages),
    })


@admin_bp.route("/contacts/<int:msg_id>", methods=["PATCH"])
@token_required
def update_contact_status(msg_id: int):
    """Update message status (e.g. read, archived, replied)."""
    msg = ContactMessage.query.get(msg_id)
    if not msg:
        return jsonify({"error": "Message not found"}), 404

    data = request.get_json(silent=True) or {}
    if "status" in data:
        msg.status = data["status"]

    db.session.commit()
    return jsonify({"status": "success", "data": msg.to_dict()})


@admin_bp.route("/contacts/<int:msg_id>", methods=["DELETE"])
@token_required
def delete_contact(msg_id: int):
    """Delete a contact message."""
    msg = ContactMessage.query.get(msg_id)
    if not msg:
        return jsonify({"error": "Message not found"}), 404

    db.session.delete(msg)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Message {msg_id} deleted."})

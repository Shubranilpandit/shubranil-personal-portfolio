import os
import sys
from pathlib import Path
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# Add root directory to python path for modular execution
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.config import config_by_name
from backend.models.base import db
from backend.utils.seeder import seed_database_if_empty

# Import Route Blueprints
from backend.routes.health import health_bp
from backend.routes.profile import profile_bp
from backend.routes.skills import skills_bp
from backend.routes.projects import projects_bp
from backend.routes.education import education_bp
from backend.routes.experience import experience_bp
from backend.routes.achievements import achievements_bp
from backend.routes.contact import contact_bp
from backend.routes.github import github_bp
from backend.routes.resume import resume_bp
from backend.routes.auth import auth_bp
from backend.routes.admin import admin_bp


def create_app(config_name=None):
    """Application factory for Flask backend."""
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    app = Flask(__name__, static_folder="static")
    app.config.from_object(config_by_name.get(config_name, config_by_name["default"]))

    # Setup Cross-Origin Resource Sharing (CORS)
    CORS(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}})

    # Initialize Database
    db.init_app(app)

    # Register API Blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(skills_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(education_bp)
    app.register_blueprint(experience_bp)
    app.register_blueprint(achievements_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(github_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)

    # Auto-seed database if empty
    with app.app_context():
        seed_database_if_empty()

    # Global Error Handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            "error": "Digital entity not found in grid space.",
            "code": "RESOURCE_NOT_FOUND",
            "status": 404,
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "error": "Internal grid processing fault. Core telemetry alert dispatched.",
            "code": "SYSTEM_CORE_ERROR",
            "status": 500,
        }), 500

    @app.route("/assets/<path:path>")
    def send_asset(path):
        return send_from_directory("static", path)

    @app.route("/")
    def index():
        return jsonify({
            "system": "TRON: LEGACY PERSONAL DIGITAL IDENTITY CORE",
            "user": "Shubranil Pandit",
            "specialization": "MCA - Data Science & AI",
            "status": "● ONLINE",
            "docs": "/api/health",
        })

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

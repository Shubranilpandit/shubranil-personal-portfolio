from flask import Blueprint, jsonify, request
from backend.models import User
from backend.utils.auth import generate_token, token_required

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/login", methods=["POST"])
def login():
    """Authenticate administrator and issue JWT access token."""
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({
            "error": "Username identity and authentication passkey are required.",
            "code": "CREDENTIALS_MISSING",
        }), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({
            "error": "Access denied. Invalid credentials or user not recognized.",
            "code": "INVALID_CREDENTIALS",
        }), 401

    if not user.is_active:
        return jsonify({
            "error": "Account is inactive. Contact system administrator.",
            "code": "ACCOUNT_INACTIVE",
        }), 403

    token = generate_token(user)

    return jsonify({
        "status": "success",
        "message": "Identity verified. Cyber access granted.",
        "token": token,
        "user": user.to_dict(),
    })


@auth_bp.route("/me", methods=["GET"])
@token_required
def get_current_user():
    """Verify session token and retrieve current admin user."""
    return jsonify({
        "status": "success",
        "user": request.current_user.to_dict(),
    })

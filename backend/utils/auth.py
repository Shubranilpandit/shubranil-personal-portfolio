from functools import wraps
from datetime import datetime, timedelta, timezone
import jwt
from flask import request, jsonify, current_app
from backend.models import User, db


def generate_token(user: User) -> str:
    """Generate JWT access token for authenticated user."""
    payload = {
        "sub": str(user.id),
        "username": user.username,
        "role": user.role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=current_app.config.get("JWT_ACCESS_TOKEN_EXPIRES_HOURS", 24)),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, current_app.config["JWT_SECRET_KEY"], algorithm="HS256")


def decode_token(token: str):
    """Decode and validate a JWT access token."""
    try:
        return jwt.decode(token, current_app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def token_required(f):
    """Decorator to enforce valid JWT authentication on protected routes."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Authorization header missing", "code": "AUTH_REQUIRED"}), 401

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Invalid Authorization header format. Expected 'Bearer <token>'", "code": "INVALID_HEADER"}), 401

        token = parts[1]
        payload = decode_token(token)
        if not payload:
            return jsonify({"error": "Session token invalid or expired", "code": "TOKEN_EXPIRED"}), 401

        user_id = payload.get("sub")
        try:
            user_id = int(user_id)
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid token subject", "code": "INVALID_SUBJECT"}), 401

        user = db.session.get(User, user_id)
        if not user or not user.is_active:
            return jsonify({"error": "User inactive or not found", "code": "USER_NOT_FOUND"}), 401

        request.current_user = user
        return f(*args, **kwargs)

    return decorated

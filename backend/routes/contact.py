from flask import Blueprint, jsonify, request, current_app
from backend.models import db, ContactMessage
from backend.utils.validators import validate_email, check_rate_limit

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contact")


@contact_bp.route("", methods=["POST"])
def transmit_message():
    """Receive and securely store contact transmission with validation and rate limiting."""
    # Rate limit check
    max_rate = current_app.config.get("RATELIMIT_CONTACT_PER_HOUR", 5)
    if not check_rate_limit(max_requests=max_rate, window_seconds=3600):
        return jsonify({
            "error": "Transmission rate limit reached. Please wait before broadcasting another signal.",
            "code": "RATE_LIMIT_EXCEEDED",
        }), 429

    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    # Input validation
    errors = {}
    if not name:
        errors["name"] = "Identity / Name designation is required."
    elif len(name) > 150:
        errors["name"] = "Name designation exceeds maximum length (150 chars)."

    if not email:
        errors["email"] = "Return frequency / Email address is required."
    elif not validate_email(email):
        errors["email"] = "Invalid transmission address format."

    if not subject:
        errors["subject"] = "Transmission subject protocol is required."
    elif len(subject) > 255:
        errors["subject"] = "Subject length exceeds limit (255 chars)."

    if not message:
        errors["message"] = "Transmission payload / Message content cannot be empty."
    elif len(message) < 10:
        errors["message"] = "Payload minimum length is 10 characters."
    elif len(message) > 5000:
        errors["message"] = "Payload length exceeds maximum allowable threshold (5000 chars)."

    if errors:
        return jsonify({
            "error": "Transmission validation failed",
            "code": "VALIDATION_FAILED",
            "details": errors,
        }), 400

    # Extract sender IP
    sender_ip = request.headers.get("X-Forwarded-For", request.remote_addr) or "127.0.0.1"
    sender_ip = sender_ip.split(",")[0].strip()

    # Persist message
    msg = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message,
        sender_ip=sender_ip,
        status="unread",
    )
    db.session.add(msg)
    db.session.commit()

    return jsonify({
        "status": "success",
        "transmission_code": f"TRX-{msg.id:05d}",
        "message": "Transmission successfully decoded and logged in the digital core.",
        "timestamp": msg.created_at.isoformat(),
    }), 201

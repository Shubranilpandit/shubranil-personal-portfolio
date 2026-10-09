import os
import requests
from flask import Blueprint, jsonify, request, current_app
from backend.models import db, ContactMessage
from backend.utils.validators import validate_email, check_rate_limit

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contact")


def send_email_notification(name, email, subject, message):
    """Securely dispatch email notification via server-side transactional email service."""
    api_key = os.getenv("RESEND_API_KEY") or os.getenv("EMAIL_API_KEY")
    contact_email = os.getenv("CONTACT_EMAIL", "shubranilp@gmail.com")
    if not api_key:
        return False

    try:
        from_email = os.getenv("EMAIL_FROM", "Portfolio Transmission <onboarding@resend.dev>")
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": from_email,
                "to": [contact_email],
                "reply_to": email,
                "subject": f"[Portfolio Contact] {subject}",
                "text": f"New transmission from {name} <{email}>:\n\nSubject: {subject}\n\nMessage:\n{message}",
                "html": f"<p><strong>From:</strong> {name} ({email})</p><p><strong>Subject:</strong> {subject}</p><p><strong>Message:</strong></p><p>{message}</p>",
            },
            timeout=8,
        )
        return resp.status_code in (200, 201)
    except Exception as exc:
        current_app.logger.warning(f"Email dispatch error: {exc}")
        return False


@contact_bp.route("", methods=["POST"])
def transmit_message():
    """Receive, securely store, and dispatch contact transmission."""
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

    # Server-side email notification
    email_dispatched = send_email_notification(name, email, subject, message)

    return jsonify({
        "status": "success",
        "transmission_code": f"TRX-{msg.id:05d}",
        "message": "Transmission successfully decoded and logged in the digital core.",
        "email_dispatched": email_dispatched,
        "timestamp": msg.created_at.isoformat(),
    }), 201

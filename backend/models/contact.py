from datetime import datetime, timezone
from backend.models.base import db


class ContactMessage(db.Model):
    __tablename__ = "contact_messages"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    sender_ip = db.Column(db.String(50))
    status = db.Column(db.String(50), default="unread")  # 'unread', 'read', 'archived', 'replied'
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message,
            "sender_ip": self.sender_ip,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

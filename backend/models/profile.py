from datetime import datetime, timezone
from backend.models.base import db


class Profile(db.Model):
    __tablename__ = "profile"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    tagline = db.Column(db.String(300))
    bio = db.Column(db.Text, nullable=False)
    avatar_url = db.Column(db.String(500))
    status = db.Column(db.String(100), default="● SYSTEM ONLINE")
    location = db.Column(db.String(150))
    email = db.Column(db.String(255))
    github_url = db.Column(db.String(255))
    linkedin_url = db.Column(db.String(255))
    resume_url = db.Column(db.String(255))
    current_focus = db.Column(db.Text)
    system_version = db.Column(db.String(50), default="TRON-OS v2.5.0")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "title": self.title,
            "tagline": self.tagline,
            "bio": self.bio,
            "avatar_url": self.avatar_url,
            "status": self.status,
            "location": self.location,
            "email": self.email,
            "github_url": self.github_url,
            "linkedin_url": self.linkedin_url,
            "resume_url": self.resume_url,
            "current_focus": self.current_focus,
            "system_version": self.system_version,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

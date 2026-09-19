from datetime import datetime, timezone
from backend.models.base import db


class Experience(db.Model):
    __tablename__ = "experience"

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(150), nullable=False)
    organization = db.Column(db.String(200), nullable=False)
    duration = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), default="Internship")  # 'Internship', 'Academic Research', 'Technical Activity', 'Hackathon'
    responsibilities = db.Column(db.Text, nullable=False)
    achievements = db.Column(db.Text)
    technologies = db.Column(db.String(300))
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "role": self.role,
            "organization": self.organization,
            "duration": self.duration,
            "type": self.type,
            "responsibilities": self.responsibilities,
            "achievements": self.achievements,
            "technologies": [t.strip() for t in self.technologies.split(",")] if self.technologies else [],
            "raw_technologies": self.technologies,
            "sort_order": self.sort_order,
        }

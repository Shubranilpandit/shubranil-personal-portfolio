from datetime import datetime, timezone
from backend.models.base import db


class Achievement(db.Model):
    __tablename__ = "achievements"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100), nullable=False)  # 'Certification', 'Hackathon', 'Academic', 'Technical Competition', 'Research', 'Workshop'
    organization = db.Column(db.String(200))
    issue_date = db.Column(db.String(100))
    description = db.Column(db.Text)
    credential_url = db.Column(db.String(500))
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "organization": self.organization,
            "issue_date": self.issue_date,
            "description": self.description,
            "credential_url": self.credential_url,
            "sort_order": self.sort_order,
        }

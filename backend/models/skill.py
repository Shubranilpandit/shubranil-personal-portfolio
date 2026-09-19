from datetime import datetime, timezone
from backend.models.base import db


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    proficiency_level = db.Column(db.String(50), nullable=False)  # 'Learning', 'Familiar', 'Working Knowledge', 'Project Experience'
    icon = db.Column(db.String(100))
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "name": self.name,
            "proficiency_level": self.proficiency_level,
            "icon": self.icon,
            "sort_order": self.sort_order,
        }

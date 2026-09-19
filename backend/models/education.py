from datetime import datetime, timezone
from backend.models.base import db


class Education(db.Model):
    __tablename__ = "education"

    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(150), nullable=False)
    field_of_study = db.Column(db.String(150), nullable=False)
    institution = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.String(100), nullable=False)
    current_status = db.Column(db.String(100), default="In Progress")
    grade = db.Column(db.String(50))
    coursework = db.Column(db.Text)
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "degree": self.degree,
            "field_of_study": self.field_of_study,
            "institution": self.institution,
            "duration": self.duration,
            "current_status": self.current_status,
            "grade": self.grade,
            "coursework": [c.strip() for c in self.coursework.split(",") if c.strip()] if self.coursework else [],
            "raw_coursework": self.coursework,
            "sort_order": self.sort_order,
        }

from datetime import datetime, timezone
from backend.models.base import db


class ProjectTechnology(db.Model):
    __tablename__ = "project_technologies"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    technology_name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return self.technology_name


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    subtitle = db.Column(db.String(255))
    category = db.Column(db.String(100), nullable=False)  # 'AI / ML', 'Data Science', 'Full-Stack', 'Embedded / IoT'
    description = db.Column(db.Text, nullable=False)
    problem_solved = db.Column(db.Text)
    key_contribution = db.Column(db.Text)
    status = db.Column(db.String(50), default="Completed")
    repo_url = db.Column(db.String(500))
    demo_url = db.Column(db.String(500))
    image_url = db.Column(db.String(500))
    architecture_flow = db.Column(db.Text)
    featured = db.Column(db.Boolean, default=False)
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    technologies = db.relationship("ProjectTechnology", backref="project", cascade="all, delete-orphan", lazy="joined")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "category": self.category,
            "description": self.description,
            "problem_solved": self.problem_solved,
            "key_contribution": self.key_contribution,
            "status": self.status,
            "repo_url": self.repo_url,
            "demo_url": self.demo_url,
            "image_url": self.image_url,
            "architecture_flow": self.architecture_flow,
            "featured": self.featured,
            "sort_order": self.sort_order,
            "technologies": [t.technology_name for t in self.technologies],
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

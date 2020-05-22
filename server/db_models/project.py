import re
from app import db
from app import bcrypt
from sqlalchemy.orm import validates


class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True, nullable=False)
    plUser_id = db.Column(db.Integer, db.ForeignKey(
        "plUser.id"), nullable=False)
    subtitle = db.Column(db.Text)
    # Indsutry needs to be searchable -> N:N relationshop [A project has many industries, an industry has many projects]
    industry = db.Column(db.Text)
    location = db.Column(db.Text)
    # Array of items?
    # photos = db.relationship("Photo", backref="project", lazy=True)
    photos = db.Column(db.Text)
    funding_goal = db.Column(db.Float)

    def __repr__(self):
        return "{0} by {1}".format(self.title, self.plUser_id)

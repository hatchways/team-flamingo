import re
from app import db
from sqlalchemy.orm import validates


class Industry(db.Model):
    __tablename__ = "industry"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))

    # name = db.Column(db.String(32), unique=True)

    def __repr__(self):
        return "The {0} industry".format(self.name)

    @property
    def serialize(self):
        return {
            'name': self.name,
        }

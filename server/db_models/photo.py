import re
from app import db
from app import bcrypt
from sqlalchemy.orm import validates


class Photo(db.Model):
    __tablename__ = "photo"

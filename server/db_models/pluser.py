import re
from app import db
from app import bcrypt
from sqlalchemy.orm import validates

# Mock User class for testing.
class plUser(db.Model):
    __tablename__ = "plUser" # use CamelCase for table names
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    login_email = db.Column(db.String(64), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(64), nullable=True)

    def __repr__(self):
        return '<plUser {}>'.format(self.username)
    
    def set_password(self, password):
        if not password:
            raise AssertionError('No password provided')
        if len(password) < 6 or len(password) > 64:
            raise AssertionError('Password must be between 6 and 64 characters')

        hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self.password_hash = hash.decode('utf-8')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 64:
            raise AssertionError('Username must be between 5 and 20 characters')

        return username

    @validates('login_email')
    def validate_email(self, key, login_email):
        if len(login_email) > 64:
            raise AssertionError('Email must be under 64 characters')
        if not re.match(r'[^@]+@[^@]+\.[^@]+', login_email):
            raise AssertionError('Email is not a valid format')

        return login_email


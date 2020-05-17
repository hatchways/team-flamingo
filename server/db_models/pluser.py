from app import db

# Mock User class for testing.
class plUser(db.Model):
    __tablename__ = "plUser" # use CamelCase for table names
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    login_email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    location = db.Column(db.String(64))

    def __repr__(self):
        return '<plUser {}>'.format(self.username) 

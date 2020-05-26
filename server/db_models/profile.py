from app import db

class Profile(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('plUser.id'), primary_key=True)
    profile_pics = db.Column(db.ARRAY(db.String(64)), nullable=True)
    location = db.Column(db.String(64), nullable=True)
    description = db.Column(db.Text, nullable=True)
    expertise = db.Column(db.ARRAY(db.String(64)), nullable=True)
    linkedin_profile = db.Column(db.String(64), nullable=True)
    angelco_profile = db.Column(db.String(64), nullable=True)

    # TODO: Add validators in the future as necessary.

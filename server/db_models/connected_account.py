from app import db

class ConnectedAccount(db.Model):
    project_id = db.Column(db.Integer, db.ForeignKey(
        'project.id'), primary_key=True, unique=True, nullable=False)
    stripe_connected_account_id = db.Column(db.String(64), unique=True, nullable=False)

    
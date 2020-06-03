from app import db
from sqlalchemy.dialects.postgresql import MONEY

class Fund(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(
        "project.id"), nullable=False)
    payment_method_id = db.Column(db.String(64), db.ForeignKey(
        "payment_method.id"), nullable=False)
    fund_amount = db.Column(MONEY, nullable=False)
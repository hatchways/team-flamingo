from app import db

class PaymentMethod(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    stripe_payment_method_id = db.Column(db.String(64), primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    card_brand = db.Column(db.String(32), nullable=False)
    exp_month = db.Column(db.Integer, nullable=False)
    exp_year = db.Column(db.Integer, nullable=False)
    last_four = db.Column(db.String(4), nullable=False)


    @property
    def serialize(self):
        return {
            'id': self.id,
            'card_brand': self.card_brand,
            'exp_month': self.exp_month,
            'exp_year': self.exp_year,
            'last_four': self.last_four
        } 

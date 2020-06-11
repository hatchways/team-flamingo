from flask import jsonify
from app import stripe
from db_models.user import User

def process_payment(user_id, payment_id, amount):
    user = User.query.filter_by(id=user_id).first()

    customer_id = user.stripe_customer_id
    user_email = user.login_email

    payment_intent = stripe.PaymentIntent.create(
        amount=amount,
        currency='cad',
        payment_method=payment_id,
        customer=customer_id,
        receipt_email=user_email,
        confirm=True
    )

    try:
        payment_capture = stripe.PaymentIntent.capture(payment_intent.client_secret)
        return True
    except:
        return False

    
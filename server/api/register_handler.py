import json
from flask import jsonify, request, Blueprint
from db_models.user import User
from app import bcrypt
from app import db
from app import stripe
from flask_jwt_extended import create_access_token, set_access_cookies
from util.validation_decorators.validate_registration import validate_registration

register_handler = Blueprint('register_handler', __name__)


@register_handler.route('/api/v1/register', methods=['POST'])
@validate_registration
def register():
    data = request.get_json()

    customer = stripe.Customer.create(
        email=data['login_email'],
        name=data['username']
    )

    user = User(
        username=data['username'],
        login_email=data['login_email'],
        stripe_customer_id=customer.id
        profile_pics=[]
    )
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()

    # Create token to be sent to user
    token = create_access_token(user.login_email)

    # Set JWT cookies in the response
    response = jsonify({'register': True})
    set_access_cookies(response, token)

    return response, 201

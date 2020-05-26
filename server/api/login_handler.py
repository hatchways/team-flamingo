from flask import jsonify, request, Blueprint
from flask_jwt_extended import create_access_token, set_access_cookies
from util.validation_decorators.validate_login import validate_login

login_handler = Blueprint('login_handler', __name__)

@login_handler.route('/api/v1/login', methods=['POST'])
@validate_login
def login():
    data = request.get_json()
    

    # Create token to be sent to user
    token = create_access_token(data['login_email'])

    # Set JWT cookies in the response
    response = jsonify({'login': True})
    set_access_cookies(response, token)

    return response, 200
    
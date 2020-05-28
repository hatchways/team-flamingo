from flask import jsonify, request, Blueprint
from flask_jwt_extended import unset_jwt_cookies

logout_handler = Blueprint('logout_handler', __name__) 

@logout_handler.route('/api/v1/logout', methods=['POST'])
def logout():
    response = jsonify({'logout': True})
    unset_jwt_cookies(response)
    return response, 200
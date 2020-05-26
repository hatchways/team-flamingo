from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, Blueprint

me_handler = Blueprint('me_handler', __name__)

@me_handler.route('/api/v1/me')
@jwt_required
def me():
    identity = get_jwt_identity()

    return jsonify(identity), 200
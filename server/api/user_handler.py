from flask import jsonify, request, Blueprint
from app import db
from db_models.user import User
from util.validation_decorators.validate_user import validate_user
from flask_jwt_extended import jwt_required, get_jwt_identity

user_handler = Blueprint('user_handler', __name__)

@user_handler.route('/api/v1/users/<user_id>/profile', methods=['GET'])
@jwt_required
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'error': 'There is no user with this user id'}), 400
    
    return jsonify(user.serialize), 200

@user_handler.route('/api/v1/users/<user_id>/profile', methods=['PUT'])
@validate_user
@jwt_required
def edit_user(user_id):
    # Ensure that the user is editing their own user
    current_user_id = get_jwt_identity()['user_id']

    if current_user_id != int(user_id):
        return ({'error': 'You are not authorized to edit this user'}), 401
    
    # Save to user
    user = User.query.filter_by(id=user_id).first()

    user.profile_pics = request.json.get('user_pics', None)
    user.location = request.json.get('location', None)
    user.description = request.json.get('description', None)
    user.expertise = request.json.get('expertise', None)
    user.linkedin_profile = request.json.get('linkedin_profile', None)
    user.angelco_profile = request.json.get('angelco_profile', None)

    db.session.commit()

    return jsonify(user.serialize), 200 
    

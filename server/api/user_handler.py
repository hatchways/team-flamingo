from flask import jsonify, request, Blueprint
from app import db
from db_models.user import User
from util.validation_decorators.validate_user import validate_user
from flask_jwt_extended import jwt_required, get_jwt_identity

user_handler = Blueprint('user_handler', __name__)


@user_handler.route('/api/v1/users/<user_id>/profile', methods=['GET'])
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

    user_data = request.get_json()

    user.profile_pics = user_data.get('profile_pics', user.profile_pics)
    user.current_avatar = user_data.get('current_avatar', user.current_avatar)
    user.location = user_data.get('location', user.location)
    user.description = user_data.get('description', user.description)
    user.expertise = user_data.get('expertise', user.expertise)
    user.invest_in = user_data.get('invest_in', user.invest_in)
    user.linkedin_profile = user_data.get(
        'linkedin_profile', user.linkedin_profile)
    user.angelco_profile = user_data.get(
        'angelco_profile', user.angelco_profile)

    db.session.commit()

    return jsonify(user.serialize), 200

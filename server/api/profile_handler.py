from flask import jsonify, request, Blueprint
from app import db
from db_models.pluser import plUser
from db_models.profile import Profile
from util.validation_decorators.validate_profile import validate_profile
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_handler = Blueprint('profile_handler', __name__)

@profile_handler.route('/api/v1/users/<user_id>/profile', methods=['GET'])
@jwt_required
def get_profile(user_id):
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({'error': 'There is no profile with this user id'}), 400
    
    return jsonify(profile.serialize), 200

@profile_handler.route('/api/v1/users/<user_id>/profile', methods=['PUT'])
@validate_profile
@jwt_required
def edit_profile(user_id):
    # Ensure that the user is editing their own profile
    current_user_id = get_jwt_identity()['user_id']

    if current_user_id != int(user_id):
        return ({'error': 'You are not authorized to edit this profile'}), 401
    
    # Save to profile
    profile = Profile.query.filter_by(user_id=user_id).first()

    profile.profile_pics = request.json.get('profile_pics', None)
    profile.location = request.json.get('location', None)
    profile.description = request.json.get('description', None)
    profile.expertise = request.json.get('expertise', None)
    profile.linkedin_profile = request.json.get('linkedin_profile', None)
    profile.angelco_profile = request.json.get('angelco_profile', None)

    db.session.commit()

    return jsonify(profile.serialize), 200 
    

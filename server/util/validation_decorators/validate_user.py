from db_models.user import User
from flask import jsonify, request
from functools import wraps
from app import db


def validate_user(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user_id = request.view_args['user_id']

        # Ensure this user exists
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return jsonify({'error': 'No user exists with the given id'})

        # Grab all input data (They are all optional)
        profile_pics = request.json.get('profile_pics', None)
        current_avatar = request.json.get('current_avatar', None)
        location = request.json.get('location', None)
        description = request.json.get('description', None)
        expertise = request.json.get('expertise', [])
        invest_in = request.json.get('invest_in', [])
        linkedin_profile = request.json.get('linkedin_profile', None)
        angelco_profile = request.json.get('angelco_profile', None)

        # Profile pics should be an array (list), and each pic path should be less than 64 characters
        if profile_pics:
            if type(profile_pics) is not list:
                return jsonify({'error': 'Profile pics must be an array of paths'}), 400

            for pic in profile_pics:
                if type(pic) is not str:
                    return jsonify({'error': 'Profile pic paths must be valid strings'}), 400
                if len(pic) > 64:
                    return jsonify({'error': 'Profile pic paths must be 64 characters or less'}), 400

        if current_avatar:
            if type(current_avatar) is not int:
                return jsonify({'error': 'Current avatar must be an integer'}), 400

        # Location should be a string, and 64 characters or less
        if location:
            if type(location) is not str:
                return jsonify({'error': 'Location must be a valid string'}), 400
            if len(location) > 64:
                return jsonify({'error': 'Location must be 64 characters or less'}), 400

        # Description should be a string
        if description:
            if type(description) is not str:
                return jsonify({'error': 'Description must be a valid string'}), 400

        # Expertise should be an array(list), and each item should be 64 characters or less
        if expertise:
            if type(expertise) is not list:
                return jsonify({'error': 'Expertise must be an array of items'}), 400
            for item in expertise:
                if type(item) is not str:
                    return jsonify({'error': 'Each expertise item must be a valid string'}), 400
                if len(item) > 64:
                    return jsonify({'error': 'Each expertise item must be 64 characters or less'}), 400

        # Expertise should be an array(list), and each item should be 64 characters or less
        if invest_in:
            if type(invest_in) is not list:
                return jsonify({'error': 'Invest In must be an array of items'}), 400
            for item in invest_in:
                if type(item) is not str:
                    return jsonify({'error': 'Each invest in item must be a valid string'}), 400
                if len(item) > 64:
                    return jsonify({'error': 'Each invest in item must be 64 characters or less'}), 400

        # Linkedin profile should be a valid string, and 64 characters or less
        if linkedin_profile:
            if type(linkedin_profile) is not str:
                return jsonify({'error': 'Linkedin profile must be a valid string'}), 400
            if len(linkedin_profile) > 64:
                return jsonify({'error': 'Linkedin profile must be 64 characters or less'}), 400

        # Angel.co profile should be valid string, 64 characters or less
        if angelco_profile:
            if type(angelco_profile) is not str:
                return jsonify({'error': 'Angel.co profile must be a valid string'}), 400
            if len(angelco_profile) > 64:
                return jsonify({'error': 'Angel.co profile must be 64 characters or less'}), 400

        return f(*args, **kwargs)

    return wrapper

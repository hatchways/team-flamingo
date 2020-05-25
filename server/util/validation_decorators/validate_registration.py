import re
from db_models.pluser import plUser
from flask import jsonify, request
from functools import wraps
from app import db

def validate_registration(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        username = request.json.get('username', None)
        login_email = request.json.get('login_email', None)
        password = request.json.get('password', None)
        confirm = request.json.get('confirm', None)

        if not username or not login_email or not password or not confirm:
            return jsonify({'error': 'Invalid JSON request'}), 400

        # Validate username
        if len(username) < 3 or len(username) > 64:
            return jsonify({'error': 'Username must be between 3 and 64 characters'}), 400
        if db.session.query(plUser.id).filter_by(username=username).scalar() is not None:
            return jsonify({'error': 'Username is not unique'}), 400

        # Validate login email
        if not re.fullmatch(r'\w+[.|\w]\w+@\w+[.]\w+[.|\w+]\w+', login_email):
            return jsonify({'error': 'Email is not a valid format'}), 400
        if db.session.query(plUser.id).filter_by(login_email=login_email).scalar() is not None:
            return jsonify({'error': 'Login email is not unique'}), 400

        # Validate password
        if len(password) < 6 or len(password) > 64:
            return jsonify({'error': 'Password must be between 6 and 64 characters'}), 400
        
        if not password == confirm:
            return jsonify({'error': 'Passwords must match'}), 400
        
        return f(*args, **kwargs)

    return wrapper
import re
from db_models.pluser import plUser
from flask import jsonify, request
from functools import wraps
from app import db


def validate_registration(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print(request)
        data = request.get_json()

        # Validate username
        try:
            username = data['username']
        except KeyError:
            return jsonify({'error': 'Username is required'}), 400

        if len(username) < 3 or len(username) > 64:
            return jsonify({'error': 'Username must be between 3 and 64 characters'}), 400
        if db.session.query(plUser.id).filter_by(username=username).scalar() is not None:
            return jsonify({'error': 'Username is not unique'}), 400

        # Validate login email
        try:
            login_email = data['login_email']
        except KeyError:
            return jsonify({'error': 'Login email is required'}), 400

        if not re.fullmatch(r'\w+[.|\w]\w+@\w+[.]\w+[.|\w+]\w+', login_email):
            return jsonify({'error': 'Email is not a valid format'}), 400
        if db.session.query(plUser.id).filter_by(login_email=login_email).scalar() is not None:
            return jsonify({'error': 'Login email is not unique'}), 400

        # Validate password
        try:
            password = data['password']
            confirm = data['confirm']
        except KeyError:
            return jsonify({'error': 'Password is required'}), 400

        if len(password) < 6 or len(password) > 64:
            return jsonify({'error': 'Password must be between 6 and 64 characters'}), 400

        if not password == confirm:
            return jsonify({'error': 'Passwords must match'}), 400

        return f(*args, **kwargs)

    return wrapper

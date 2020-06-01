from db_models.user import User
from flask import jsonify, request
from functools import wraps
from app import db
from app import bcrypt


def validate_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        login_email = request.json.get('login_email', None)
        password = request.json.get('password', None)

        if not login_email or not password:
            return jsonify({'error': 'Email and password is required'}), 400

        user = User.query.filter_by(login_email=login_email).first()

        if not user:
            return jsonify({'error': 'Email does not exist'}), 400

        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Password is incorrect'}), 401

        return f(*args, **kwargs)

    return wrapper

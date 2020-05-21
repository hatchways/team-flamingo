from db_models.pluser import plUser
from flask import jsonify, request
from functools import wraps
from app import db
from app import bcrypt

def validate_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        data = request.get_json()

        try:
            login_email = data['login_email']
        except KeyError:
            return jsonify({'error': 'Email is required'}), 400
        
        try:
            password = data['password']
        except KeyError:
            return jsonify({'error': 'Password is required'}), 400
        
        user = plUser.query.filter_by(login_email=login_email).first()
        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Password is incorrect'}), 401
        
        return f(*args, **kwargs)
    
    return wrapper
        
        
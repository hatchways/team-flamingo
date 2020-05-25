import re
from db_models.pluser import plUser
from flask import jsonify, request
from flask_jwt_extended import verify_fresh_jwt_in_request

from functools import wraps
from app import db


def authenticate_user(f):
    @wraps(f)
    def wrapper(*args, **kwargs):

        return jsonify({"e": "e"})
        try:
            data = request.get_json()
        except:
            return jsonify({'error': 'Nothing was sent'}), 400

        return f(*args, **kwargs)

    return wrapper

import re
from db_models.pluser import plUser
from flask import jsonify, request
from flask_jwt_extended import verify_fresh_jwt_in_request

from functools import wraps
from app import db


def authenticate_user(user_id, email):
    user = plUser.query.filter_by(id=user_id).first()
    print(user.login_email, email)
    if (user.login_email != email):
        return False
    return True

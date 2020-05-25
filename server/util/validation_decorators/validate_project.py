from db_models.pluser import plUser
from db_models.project import Project
from db_models.industries import Industry
from flask import jsonify, request
from functools import wraps
from app import db
from app import bcrypt
from sqlalchemy import or_


def validate_project(f):
    @wraps(f)
    def wrapper(*args, **kwargs):

        # Validate data exists
        try:
            data = request.get_json()
        except:
            return jsonify({'error': 'Nothing was sent'}), 400

        # Ensure Title exists
        try:
            title = data["title"]
            if len(title) > 64:
                return jsonify({'error': 'Title must be between less than 64 characters'}), 400
        except:
            return jsonify({"error": "Please enter a funding title for your project"})

        # Ensure Subtitle exists
        try:
            subtitle = data["subtitle"]
        except:
            data["subtitle"] = None

        # Ensure Location exists
        try:
            loc = data["location"]
            if len(loc) > 64:
                return jsonify({'error': 'Location must be between less than 64 characters'}), 400
        except:
            data["location"] = None

        # Ensure photos is an array
        try:
            photos = data["photos"]
            if type(photos) != list:
                data["photos"] = []
        except:
            data["photos"] = []

        # Ensure industry exists and are valid industry tags
        try:
            indus = data["industry"]
            filters = [Industry.name == i for i in indus]
            if len(db.session.query(Industry).filter(or_(*filters)).all()) != len(indus):
                return jsonify({"error": "That industry does not exist, please contact us to add an additional industry or choose one from the list"})
        except:
            data["industry"] = []

        # Ensure funding goal exists
        try:
            goal = data["funding_goal"]
        except:
            return jsonify({"error": "Please enter a funding goal"})

        try:
            deadline = data["deadline"]
        except:
            return jsonify({"error": "Please enter a deadline"})

        return f(*args, **kwargs)
    return wrapper

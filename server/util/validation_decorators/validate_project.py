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

        title = request.json.get('title', None)
        subtitle = request.json.get('subtitle', None)
        location = request.json.get('location', None)
        photos = request.json.get('photos', None)
        industry = request.json.get('industry', None)
        goal = request.json.get('funding_goal', None)
        deadline = request.json.get('deadline', None)

        if not title or not subtitle or not location:
            return jsonify({'error': 'Invalid JSON request'}), 400
        if not goal or not deadline:
            return jsonify({'error': 'Invalid JSON request'}), 400

        # Title Length
        if len(location) > 64:
            return jsonify({'error': 'Location must be between less than 64 characters'}), 400

        # Verify Industry exists
        filters = [Industry.name == i for i in industry]
        if len(db.session.query(Industry).filter(or_(*filters)).all()) != len(industry):
            return jsonify({"error": "That industry does not exist, please contact us to add an additional industry or choose one from the list"})

        # Photos and industry are correct data type
        if type(photos) is not list:
            return jsonify({'error': "Photos must be an array or list"}), 400

        for photo in photos:
            if photo is not str:
                return jsonify({'error': 'One of the photos is not a string'}), 400

        if type(industry) is not list:
            return jsonify({'error': "Industry must be an array or list"}), 400

        for indus in industry:
            if indus is not str:
                return jsonify({'error': 'One of the industries is not a string'}), 400

        return f(*args, **kwargs)
    return wrapper

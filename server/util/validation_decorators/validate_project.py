from db_models.user import User
from db_models.project import Project
from db_models.industries import Industry
from flask import jsonify, request
from functools import wraps
from app import db
from sqlalchemy import or_
import re
from flask_jwt_extended import get_jwt_identity


def validate_project(f):
    @wraps(f)
    def wrapper(*args, **kwargs):

        user_id = request.view_args['user_id']
        if (int(user_id) != get_jwt_identity()["user_id"]):
            return jsonify({"error": "not authenticated"}), 401

        title = request.json.get('title', None)
        subtitle = request.json.get('subtitle', None)
        location = request.json.get('location', None)
        photos = request.json.get('photos', None)
        industry = request.json.get('industry', None)
        goal = request.json.get('funding_goal', None)
        deadline = request.json.get('deadline', None)

        if not title or not subtitle or not location or not goal or not deadline:
            return jsonify({'error': 'Invalid JSON request'}), 400

        # Verify Length of Title
        if len(location) > 64:
            return jsonify({'error': 'Location must be between less than 64 characters'}), 400

        # Verify photos is in proper form, an array of strings
        if type(photos) is not list:
            return jsonify({'error': "Photos must be an array or list"}), 400

        for photo in photos:
            if type(photo) is not str:
                return jsonify({'error': 'One of the photos is not a string'}), 400

        # Verify industry is in proper form, an array of strings
        if type(industry) is not list:
            return jsonify({'error': "Industry must be an array or list"}), 400

        for indus in industry:
            if type(indus) is not str:
                return jsonify({'error': 'One of the industries is not a string'}), 400

        # Verify Industry exists
        # Industry should be an array of string
        filters = [Industry.name == i for i in industry]
        if len(db.session.query(Industry).filter(or_(*filters)).all()) != len(industry):
            return jsonify({"error": "That industry does not exist, please contact us to add an additional industry or choose one from the list"}), 400

        # Verify goal is a float
        try:
            float(goal)
        except:
            return jsonify({"error": "Funding goal is not a float"})

        # This deadline is ISO 8016 or a "Special Value" in Postgres for datetime
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(\+\d{1,2}:\d{2}|(Z))', deadline) and deadline not in ["epoch", "infinity", "-infinity", "now", "today", "tomorrow", "yesterday"]:
            return jsonify({"error": "Deadline is not in correct date format"})

        return f(*args, **kwargs)
    return wrapper

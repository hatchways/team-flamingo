import json
from flask import jsonify, request, Blueprint
from db_models.user import User
from db_models.project import Project, project_industries_map
from db_models.industries import Industry
from app import db, jwt
from sqlalchemy import or_
from flask_jwt_extended import jwt_required

from util.db.row2dict import row2dict
from util.validation_decorators.validate_project import validate_project

project_handler = Blueprint('project_handler', __name__)


@project_handler.route('/api/v1/users/<user_id>/projects', methods=['GET'])
@jwt_required
def get_projects(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"error": "User doesn't exist"}), 400

    projects = [p.serialize for p in user.projects]

    return jsonify(projects), 200


@project_handler.route('/api/v1/users/<user_id>/projects', methods=['POST'])
@jwt_required
@validate_project
def post_project(user_id):
    data = request.get_json()

    # since user_id claim in token is taken from currentuser's id, id must exist
    user = User.query.filter_by(id=user_id).first()

    project = Project(
        title=request.json.get('title', None),
        user_id=user_id,
        subtitle=request.json.get('subtitle', None),
        location=request.json.get('location', None),
        photos=request.json.get('photos', []),
        funding_goal=request.json.get('funding_goal', None),
        deadline=request.json.get('deadline', None),
        equity=request.json.get('equity', None),
        current_funding=0
    )

    project.industry[:] = industryList(request.json.get('industry', []))

    user.projects.append(project)
    db.session.commit()

    return jsonify({"success": "project created"}), 201


@project_handler.route('/api/v1/users/<user_id>/projects/<project_id>', methods=['PUT'])
@jwt_required
@validate_project
def update_project(user_id, project_id):
    data = request.get_json()

    project = Project.query.filter_by(id=project_id).first()
    if project is None:
        return jsonify({"error": "project does not exist"}), 400

    project.title = data["title"]
    project.subtitle = data["subtitle"]
    project.location = data["location"]
    project.photos = data["photos"]
    # Probably shouldn't be able to change funding goal
    project.funding_goal = data["funding_goal"]
    project.current_funding = data['current_funding'],
    project.industry[:] = industryList(data["industry"])
    project.deadline = data["deadline"]
    project.equity = data["equity"]

    db.session.commit()

    return jsonify({"success": "project updated"}), 200


def industryList(industries):
    '''
    Takes an array of strings signifying industries.
    Returns array of industry models
    If none given, return empty array
    '''
    if(len(industries) == 0):
        return []
    filters = [Industry.name == i for i in industries]
    return db.session.query(Industry).filter(or_(*filters)).all()

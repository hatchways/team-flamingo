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

@project_handler.route('/api/v1/projects/<project_id>', methods=['GET'])
@jwt_required
def get_project(project_id):
    project = Project.query.filter_by(id=project_id).first()

    if not project:
        return jsonify({'error': 'There is no project with the given id'}), 404

    return jsonify(project.serialize)

@project_handler.route('/api/v1/users/<user_id>/projects', methods=['GET'])
@jwt_required
def get_users_projects(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({'error': 'User doesnt exist'}), 400

    projects = [row2dict(p) for p in user.projects]

    return jsonify(projects), 200


@project_handler.route('/api/v1/users/<user_id>/projects', methods=['POST'])
@jwt_required
@validate_project
def post_project(user_id):
    data = request.get_json()

    # since user_id claim in token is taken from currentuser's id, id must exist
    user = User.query.filter_by(id=user_id).first()

    project = Project(
        title=data.get('title', None),
        user_id=user_id,
        subtitle=data.get('subtitle', None),
        description=data.get('description', None),
        location=data.get('location', None),
        photos=data.get('photos', []),
        funding_goal=data.get('funding_goal', None),
        deadline=data.get('deadline', None),
        current_funding=0,
        live=data.get('live', False)
    )

    project.industry[:] = industryList(request.json.get('industries', []))

    user.projects.append(project)
    db.session.commit()

    return jsonify({'success': 'project created', 'project_id': project.id}), 201


@project_handler.route('/api/v1/users/<user_id>/projects/<project_id>', methods=['PUT'])
@jwt_required
@validate_project
def update_project(user_id, project_id):
    data = request.get_json()

    project = Project.query.filter_by(id=project_id).first()
    if project is None:
        return jsonify({'error': 'project does not exist'}), 400

    project.title = data.get('title', project.title)
    project.subtitle = data.get('subtitle', project.subtitle)
    project.description = data.get('description', project.description)
    project.location = data.get('location', project.location)
    project.photos = data.get('photos', project.photos)

    industry = data.get('industry', False)
    if industry:
        project.industry[:] = industryList(industry)
    # Probably shouldn't be able to change funding goal

    if not project.live:
        project.funding_goal = data.get('funding_goal', project.funding_goal)
        project.deadline = data.get('deadline', project.deadline)
        project.live = data.get('live', False)

    db.session.commit()

    return jsonify({'success': 'project updated'}), 200


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

import json
from flask import jsonify, request, Blueprint
from db_models.pluser import plUser
from db_models.project import Project, project_industries_map
from db_models.industries import Industry
from app import bcrypt
from app import db
from sqlalchemy import or_
from flask_jwt_extended import create_access_token

from util.db.row2dict import row2dict

project_handler = Blueprint('project_handler', __name__)


@project_handler.route('/v1/user/<user_id>/projects', methods=['GET'])
def get_projects(user_id):
    user = plUser.query.filter_by(id=user_id).first()

    projects = [row2dict(p) for p in user.projects]

    return jsonify(projects), 200


@project_handler.route('/v1/user/<user_id>/projects', methods=['POST'])
def post_project(user_id):
    data = request.get_json()

    user = plUser.query.filter_by(id=user_id).first()

    project = Project(
        title=data["title"],
        plUser_id=user_id,
        subtitle=data["subtitle"],
        location=data["location"],
        photos=data["photos"],
        funding_goal=data["funding_goal"]
    )

    project.industry[:] = industryList(data["industry"])

    user.projects.append(project)
    db.session.commit()

    return jsonify({"success": "project created"}), 201


@project_handler.route('/v1/user/<user_id>/projects/<project_id>', methods=['PUT'])
def update_project(user_id, project_id):
    data = request.get_json()

    project = Project.query.filter_by(id=project_id).first()

    project.title = data["title"]
    project.subtitle = data["subtitle"]
    project.location = data["location"]
    project.photos = data["photos"]
    # Probably shouldn't be able to change funding goal
    project.funding_goal = data["funding_goal"]
    project.industry[:] = industryList(data["industry"])

    # Can use query().filter().update({}), but then must make two queries to db, since industry can't be updated like that

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

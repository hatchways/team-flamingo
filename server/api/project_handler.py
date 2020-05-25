import json
from flask import jsonify, request, Blueprint
from db_models.pluser import plUser
from db_models.project import Project, project_industries_map
from db_models.industries import Industry
from app import bcrypt
from app import db, jwt
from sqlalchemy import or_
from flask_jwt_extended import create_access_token, jwt_required, get_current_user

from util.db.row2dict import row2dict
from util.validation_decorators.validate_project import validate_project
from util.validation_decorators.authenticate_user import authenticate_user

project_handler = Blueprint('project_handler', __name__)


@project_handler.route('/v1/user/<user_id>/projects', methods=['GET'])
def get_projects(user_id):
    user = plUser.query.filter_by(id=user_id).first()

    projects = [row2dict(p) for p in user.projects]

    return jsonify(projects), 200


@project_handler.route('/v1/user/<user_id>/projects', methods=['POST'])
@jwt_required
@validate_project
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
@jwt_required
@validate_project
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

    return jsonify({"success": "project updated", "current_user": get_current_user().__dict__}), 200


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


class UserObject:
    def __init__(self, username):
        self.username = username


@jwt.user_loader_callback_loader
def user_loader_callback(identity):
    user = ["magilbert"]
    if identity not in user:
        return None

    print(identity)
    return UserObject(
        username=identity,
    )


@jwt.user_loader_error_loader
def custom_user_loader_error(identity):
    ret = {
        "msg": "User {} not found".format(identity)
    }
    return jsonify(ret), 404

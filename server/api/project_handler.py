import json
from flask import jsonify, request, Blueprint
from db_models.pluser import plUser
from db_models.project import Project
from app import bcrypt
from app import db
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
    user = plUser.query.filter_by(id=user_id).first()
    data = request.get_json()

    project = Project(
        title=data["title"],
        plUser_id=user_id,
        subtitle=data["subtitle"],
        industry=data["industry"],
        location=data["location"],
        photos=data["photos"],
        funding_goal=data["funding_goal"]
    )

    user.projects.append(project)
    db.session.commit()

    return jsonify({"success": "project created"}), 201


@project_handler.route('/v1/user/<user_id>/projects/<project_id>', methods=['PUT'])
def update_project(user_id, project_id):
    user = plUser.query.filter_by(id=user_id).first()
    project = Project.query.filter_by(id=project_id).first()
    data = request.get_json()

    # Best way to update?
    db.session.query(Project).filter_by(id=project_id).update({
        "title": data["title"],
        "plUser_id": user_id,
        "subtitle": data["subtitle"],
        "industry": data["industry"],
        "location": data["location"],
        "photos": data["photos"],
        "funding_goal": data["funding_goal"]
    })

    db.session.commit()

    return jsonify({"success": "project updated"}), 200

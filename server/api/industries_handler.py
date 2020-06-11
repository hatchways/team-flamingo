from flask import jsonify, request, Blueprint
from app import db
from db_models.industries import Industry
from flask_jwt_extended import jwt_required

industries_handler = Blueprint('industries_handler', __name__)


@industries_handler.route('/api/v1/industries', methods=['GET'])
def industries():
    industries = Industry.query.all()

    return jsonify([i.serialize for i in industries]), 200

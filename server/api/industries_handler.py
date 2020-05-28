from flask import jsonify, request, Blueprint
from app import db
from db_models.industries import Industry
from flask_jwt_extended import jwt_required

industries_handler = Blueprint('industries_handler', __name__)

@industries_handler.route('/api/v1/industries', methods=['GET'])
@jwt_required
def industries():
    industries = Industry.query.all()

    # Turn list of industries into serializable json (i.e dictionary)
    industriesDict = {}
    for industry in industries:
        industriesDict[industry.id] = industry.name
    
    return jsonify(industriesDict), 200

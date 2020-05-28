from flask import jsonify, request, Blueprint
from app import db
from db_models.industries import Industry
from flask_jwt_extended import jwt_required

industries_handler = Blueprint('industries_handler', __name__)

@industries_handler.route('/api/v1/industries', methods=['GET'])
@jwt_required
def industries():
    industries = Industry.query.all()

    # Turn list of industries into serializable json (i.e list of key value pairs)
    industriesList = []
    for industry in industries:
        industriesList.append({
            'id': industry.id,
            'name': industry.name
        })
    
    return jsonify(industriesList), 200

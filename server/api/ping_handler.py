import json
from flask import jsonify, request, Blueprint
from config import Config
from payments.payout_project import payout_project

ping_handler = Blueprint('ping_handler', __name__)

@ping_handler.route('/api/v1/ping', methods=['GET'])
def ping():
    funds = payout_project(3)

    return jsonify([fund.payment_method_id for fund in funds]), 200
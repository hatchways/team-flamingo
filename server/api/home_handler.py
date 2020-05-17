from flask import jsonify, Blueprint
home_handler = Blueprint('home_handler', __name__)


@home_handler.route('/v1/welcome')
def welcome():
    return jsonify({'welcomeMessage': 'Step 1: Run the server (completed!)'})

import json
from flask import jsonify, request, Blueprint
from db_models.pluser import plUser
from app import db
from util.upload_photo import *

s3_handler = Blueprint('s3_handler', __name__)


@s3_handler.route("/api/v1/s3", methods=["GET"])
def list_files():
    bk = list_files_in_bucket("plphotos")
    return jsonify({"success": bk}), 200

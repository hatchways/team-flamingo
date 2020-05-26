from flask import jsonify, request, Blueprint
import os
import boto3
from botocore.exceptions import ClientError

s3_handler = Blueprint('s3_handler', __name__)

BUCKET = "plphotos"


@s3_handler.route('/api/v1/allphotos', methods=['GET'])
def list_files(bucket="plphotos"):
    s3 = boto3.client('s3')
    contents = s3.list_objects_v2(Bucket=bucket)

    if contents is None:
        return jsonify({"error": "contents not found"})

    return jsonify({"photos": contents}), 200


@s3_handler.route("/api/v1/upload", methods=["POST"])
def upload():
    filename = request.json.get("file", None)

    if filename is None:
        return jsonify({"error": "no file specified"})

    bucket = BUCKET
    resp = upload_file(filename, bucket)
    return jsonify({"response": resp}), 200


def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. Name of the key to use in s3 If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = "project/" + file_name

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        print(e)
        return False
    return True

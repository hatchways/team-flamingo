from flask import jsonify, request, Blueprint
from werkzeug.utils import secure_filename
import os
import boto3
from botocore.exceptions import ClientError
from flask_jwt_extended import jwt_required
import imghdr

s3_handler = Blueprint('s3_handler', __name__)

BUCKET = "plphotos"


@s3_handler.route('/api/v1/allphotos', methods=['GET'])
@jwt_required
def list_files(bucket="plphotos"):
    # This route isn't actually necessary, photo urls will be stored in Profile.photos
    s3 = boto3.client('s3')
    contents = s3.list_objects_v2(Bucket=BUCKET)

    if contents is None:
        return jsonify({"error": "contents not found"})

    return jsonify({"photos": contents}), 200


@s3_handler.route("/api/v1/upload", methods=["POST"])
def upload():
    # https://flask.palletsprojects.com/en/1.1.x/patterns/fileuploads/
    # request.files is ImmutableMultiDict([('image', <FileStorage: 'example2.png' ('image/png')>)])

    # File of key image has to exist
    if 'image' not in request.files:
        return jsonify({"error": "file part not present"}), 400
    # filename has to exist
    if 'filename' not in request.files:
        return jsonify({"error": "must provide filename in form body"}), 400

    # If filename doesn't exist
    file = request.files["image"]
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Validate the file headers look like an image file
    if not verify_type(file):
        return jsonify({"error": "Error while loading image, image is not in valid format"}), 400

    # verify_type reads file
    file.seek(0)

    # Secures filename for saving to disk
    safe_filename = secure_filename(file.filename)

    bucket = BUCKET

    resp = upload_file_object(file, bucket, safe_filename)
    if not resp:
        return jsonify({"error": "something went wrong and the file was not uploaded"}), 500
    return jsonify({"success": "file uploaded"}), 200


def verify_type(file):
    if imghdr.what("ignored", h=file.read()) is None:
        return False
    return True


def upload_file_object(file_obj, bucket, object_name=None):
    '''Upload a file to an S3 bucket

    :param file_obect: Object to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. Name of the key to use in s3 If not specified then file_name is used
    :return: True if file was uploaded, else False
    '''

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        s3_client.upload_fileobj(file_obj, bucket, object_name)
    except ClientError as e:
        print(e)
        return False
    return True

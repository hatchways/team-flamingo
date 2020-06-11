from flask import jsonify, request, Blueprint
from botocore.exceptions import ClientError
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid
import boto3
from app import db


from db_models.project import Project
from db_models.user import User
from util.validation_decorators.validate_image_files import validate_files

s3_handler = Blueprint('s3_handler', __name__)

BUCKET = 'plphotos'


@s3_handler.route('/api/v1/upload', methods=['POST'])
@jwt_required
@validate_files
def upload():
    '''
    If no project id is given, client-side must call edit profile itself
    '''

    files = request.files.getlist('image')
    folder = request.form['folder']
    if folder == 'project':
        project_id = int(request.form['project_id'])
    else:
        project_id = None
    current_user_id = get_jwt_identity()['user_id']

    filenames = []

    for file in files:
        uniqueId = uuid.uuid4()
        # Construct filename, is random
        filename = '{0}/{1}.png'.format(folder, uniqueId)
        filenames.append(filename)

        resp = addImageToUser(filename, folder, current_user_id, project_id)

        if not resp:
            return jsonify({'error': 'File was not saved'}), 400

        resp = upload_file_object(file, BUCKET, filename)
        if not resp:
            return jsonify({'error': 'something went wrong and the file was not uploaded'}), 500

    return jsonify({'success': 'file uploaded', 'storedAt': filenames}), 200


def addImageToUser(uuid, location, user_id, project_id=None):
    '''
    Stores photo to appropriate location in db. Returns False if could not save

    :param uuid: filename
    :param location: folder to upload to 
    :param user_id: current user
    :param project_id: project to upload to, uploads to profile if false
    :return: True if file was uploaded, else False
    '''
    if location == 'project':
        if project_id is None:
            return False
        project = Project.query.filter_by(id=project_id).first()
        if project is None:
            return False
        project.photos.append(uuid)
        db.session.commit()
    else:
        user = User.query.filter_by(id=user_id).first()
        user.profile_pics.append(uuid)
        db.session.commit()
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

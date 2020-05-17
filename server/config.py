import os

class Config(object):
	TEAM_NAME = os.environ.get('TEAM_NAME', "default-team-name")
	SECRET_KEY = os.environ.get('SECRET_KEY', "default-secret-key")
	SQLALCHEMY_DATABASE_URI = os.environ.get('DB_CONNECTION_STRING') or \
		'postgresql://postgres:password@localhost:5432/devdb'
	SQLALCHEMY_TRACK_MODIFICATIONS = False

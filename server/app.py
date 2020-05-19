from flask import Flask 
from config import Config 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__) # ProductLaunch app
app.config.from_object(Config)

db = SQLAlchemy(app) 
migrate = Migrate(app, db)

# for flask-migrate to generate migration scripts
from db_models import pluser

# keep for now to check previous functionality still works with new config
from api.home_handler import home_handler
from api.ping_handler import ping_handler
plapp.register_blueprint(home_handler)
plapp.register_blueprint(ping_handler)

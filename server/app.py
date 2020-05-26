from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

app = Flask(__name__)  # ProductLaunch app
app.config.from_object(Config)

# Extensions
cors = CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# jwt extensions
from util.validation_decorators.flask_wrappers import *

# for flask-migrate to generate migration scripts
from db_models.pluser import plUser
from db_models.industries import Industry
from db_models.project import Project

# Route handlers
from api.home_handler import home_handler
app.register_blueprint(home_handler)

from api.ping_handler import ping_handler
app.register_blueprint(ping_handler)

from api.register_handler import register_handler
app.register_blueprint(register_handler)

from api.login_handler import login_handler
app.register_blueprint(login_handler)

from api.project_handler import project_handler
app.register_blueprint(project_handler)

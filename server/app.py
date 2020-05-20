from api.ping_handler import ping_handler
from api.home_handler import home_handler
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)  # ProductLaunch app
app.config.from_object(Config)

# Allows CORS on all routes (for development convenience). TODO: CORS config
# should be changed for production.
cors = CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# for flask-migrate to generate migration scripts
from db_models.pluser import plUser

# keep for now to check previous functionality still works with new config
app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

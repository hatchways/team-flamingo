from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import stripe

app = Flask(__name__)  # ProductLaunch app
app.config.from_object(Config)

# Extensions
cors = CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Stripe setup
stripe.api_key = Config.STRIPE_SECRET_KEY

""" stripe.WebhookEndpoint.create(
    url="http://a42d3d4cffbc.ngrok.io/api/v1/payment/payment-method",
    enabled_events=[
        "checkout.session.completed"
    ]
) """

# jwt extensions
from util.validation_decorators.flask_wrappers import *

# for flask-migrate to generate migration scripts
from db_models.user import User
from db_models.industries import Industry
from db_models.project import Project
from db_models.fund import Fund
from db_models.payment_method import PaymentMethod

# Route handlers
from api.home_handler import home_handler
app.register_blueprint(home_handler)

from api.ping_handler import ping_handler
app.register_blueprint(ping_handler)

from api.register_handler import register_handler
app.register_blueprint(register_handler)

from api.login_handler import login_handler
app.register_blueprint(login_handler)

from api.user_handler import user_handler
app.register_blueprint(user_handler)

from api.me_handler import me_handler
app.register_blueprint(me_handler)

from api.project_handler import project_handler
app.register_blueprint(project_handler)

from api.s3_handler import s3_handler
app.register_blueprint(s3_handler)

from api.logout_handler import logout_handler
app.register_blueprint(logout_handler)

from api.industries_handler import industries_handler
app.register_blueprint(industries_handler)

from api.payment_handler import payment_handler
app.register_blueprint(payment_handler)

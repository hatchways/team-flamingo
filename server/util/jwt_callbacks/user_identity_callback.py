from db_models.user import User
from app import jwt


@jwt.user_identity_loader
def current_user(identity):
    # creating access tokens will be slower in exchange for faster auth
    user = User.query.filter_by(login_email=identity).first()
    return {
        'login_email': identity,
        'user_id': user.id
    }

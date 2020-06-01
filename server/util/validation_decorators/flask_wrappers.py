from db_models.user import User
from app import jwt


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    # creating access tokens will be slower in exchange for faster auth
    user = User.query.filter_by(login_email=identity).first()
    return {
        "email": identity,
        "user_id": user.id
    }

def authenticate_user(user_id, claims):
    if (int(user_id) != claims['user_id']):
        return False
    return True

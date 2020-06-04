from flask import jsonify
from db_models.project import Project
from payments.process_payment import process_payment


def payout_project(project_id):
    project = Project.query.filter_by(id=project_id).first()

    funds_to_payout = project.funds

    for fund in funds_to_payout:
        success = process_payment(fund.user_id, fund.payment_id, fund.amount)
        if not success:
            return False

    return True

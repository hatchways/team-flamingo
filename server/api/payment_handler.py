from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import stripe
from app import db
from db_models.user import User
from db_models.project import Project
from db_models.payment_method import PaymentMethod
from db_models.fund import Fund
from util.money_to_decimal import money_to_decimal

payment_handler = Blueprint('payment_handler', __name__)

@payment_handler.route('/api/v1/payment/session', methods=['POST'])
@jwt_required
def create_session():
    # Get stripe customer id for current user
    user_id = get_jwt_identity()['user_id']
    user = User.query.filter_by(id=user_id).first()
    stripe_customer_id = user.stripe_customer_id

    data = request.get_json()
    success_url = data['success_url'] or None
    cancel_url = data['cancel_url'] or None

    if not cancel_url or not success_url:
        return jsonify({'error': 'The success and cancel urls must be provided'}), 400

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            mode='setup',
            customer=stripe_customer_id,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={ 'user_id': user_id}
        )
    except:
        return jsonify({'error': 'Unable to create a stripe session'}), 500

    return jsonify({'session_id': session.id}), 200

@payment_handler.route('/api/v1/payment/payment-method', methods=['POST'])
def create_payment_method():
    session_id = request.json.get('session_id', None)

    if not session_id:
        return jsonify({'error': 'Stripe session id must be provided'}), 400

    session = stripe.checkout.Session.retrieve(session_id)
    # return jsonify(session)
    user_id = session.metadata.user_id
    intent = stripe.SetupIntent.retrieve(session.setup_intent)
    stripe_payment_method = stripe.PaymentMethod.retrieve(intent.payment_method)

    # TODO: Create a new payment method
    payment_method = PaymentMethod(
        id=stripe_payment_method.id,
        user_id=user_id,
        card_brand=stripe_payment_method.card.brand,
        exp_month=stripe_payment_method.card.exp_month,
        exp_year=stripe_payment_method.card.exp_year,
        last_four=stripe_payment_method.card.last4
    )

    db.session.add(payment_method)
    db.session.commit()

    return jsonify(payment_method.serialize), 201

@payment_handler.route('/api/v1/payment/payment-method', methods=['GET'])
@jwt_required
def fetch_payment_methods():
    current_user_id = get_jwt_identity()['user_id']
    
    payment_methods = PaymentMethod.query.filter_by(user_id=current_user_id).all()

    if not payment_methods:
        return jsonify({'error': 'This user has no payment methods on file'}), 404
    
    return jsonify([payment_method.serialize for payment_method in payment_methods]), 200

@payment_handler.route('/api/v1/payment/fund/<project_id>', methods=['POST'])
@jwt_required
def fund_project(project_id):
    user_id = get_jwt_identity()['user_id']

    project = Project.query.filter_by(id=project_id).first()
    if not project:
        return jsonify({'error': 'There is no project with this id'}), 400

    data = request.get_json()

    fund_amount = int(data['fund_amount'])
    payment_method = data['payment_method']

    # TODO: Add fund to database
    fund = Fund(
        user_id=user_id,
        project_id=project_id,
        payment_method_id=payment_method,
        fund_amount=fund_amount
    )

    db.session.add(fund)
    
    # Add project to users funded_projects
    user = User.query.filter_by(id=user_id).first()
    user.funded_projects.append(project)

    # Add funding to project's current funding
    project = Project.query.filter_by(id=project_id).first()
    project.current_funding = money_to_decimal(project.current_funding) + fund_amount

    db.session.commit()

    return jsonify({'success': True}), 201

    
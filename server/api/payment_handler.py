from flask import jsonify, request, redirect, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid
from app import app
from app import stripe
from app import db
from db_models.user import User
from db_models.project import Project
from db_models.payment_method import PaymentMethod
from db_models.fund import Fund
from db_models.connected_account import ConnectedAccount
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
    session = request.get_json()
    user = User.query.filter_by(stripe_customer_id=session['data']['object']['customer']).first()

    setup_intent = session['data']['object']['setup_intent']
    intent = stripe.SetupIntent.retrieve(setup_intent)
    stripe_payment_method = stripe.PaymentMethod.retrieve(intent.payment_method)

    # TODO: Create a new payment method
    payment_method = PaymentMethod(
        stripe_payment_method_id=stripe_payment_method.id,
        user_id=user.id,
        card_brand=stripe_payment_method.card.brand,
        exp_month=stripe_payment_method.card.exp_month,
        exp_year=stripe_payment_method.card.exp_year,
        last_four=stripe_payment_method.card.last4
    )

    db.session.add(payment_method)
    db.session.commit()

    return '', 201

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

    if not data['fund_amount'] or not data['payment_method']:
        return jsonify({'error': 'Must provide payment method and funding amount'}), 400

    fund_amount = int(data['fund_amount'])
    payment_method = PaymentMethod.query.filter_by(id=data['payment_method']).first()


    # TODO: Add fund to database
    fund = Fund(
        user_id=user_id,
        project_id=project_id,
        payment_method_id=payment_method.stripe_payment_method_id,
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


@payment_handler.route('/api/v1/payment/generate-state/<project_id>', methods=['GET'])
@jwt_required
def generate_state_for_stripe_auth(project_id):
    project = Project.query.filter_by(id=project_id).first()

    unique_state = uuid.uuid4()

    project.stripe_state = unique_state

    db.session.commit()

    return jsonify({'state': project.stripe_state}), 200


@payment_handler.route('/api/v1/payment/connect-account', methods=['GET'])
def create_connected_account():
    state = request.args.get('state')

    project = Project.query.filter_by(stripe_state=state).first()

    if not project:
        return jsonify({'error': 'Invalid state provided'}), 403
    
    # Send the authorization code to Stripe's API
    code = request.args.get('code')
    try:
        response = stripe.OAuth.token(grant_type="authorization_code", code=code,)
    except stripe.oauth_error.OAuthError as e:
        return jsonify({"error": "Invalid authorization code: " + code}), 400
    except Exception as e:
        return jsonify({"error": "An unknown error occurred."}), 500
    
    connected_account_id = response['stripe_user_id']

    connected_account = ConnectedAccount(
        project_id=project.id,
        stripe_connected_account_id=connected_account_id
    )

    db.session.add(connected_account)
    db.session.commit()

    redirect_url = 'http://localhost:3000/profile/' + str(project.user.id) + '/projects/' + str(project.id) + '/edit?tab=Payment'

    return redirect(redirect_url)

@payment_handler.route('/api/v1/payment/payout/<project_id>', methods=['POST'])
def payout_project(project_id):
    project = Project.query.filter_by(id=project_id).first()
 
    total_funding = 0
    successful_payment = 0
    charges = []

    for fund in project.funds:
        total_funding += money_to_decimal(fund.fund_amount)
        user = User.query.filter_by(id=fund.user_id).first()

        try:
            intent = stripe.PaymentIntent.create(
                amount=int(money_to_decimal(fund.fund_amount)) * 100,
                currency="cad",
                customer=user.stripe_customer_id,
                payment_method=fund.payment_method_id,
                receipt_email=user.login_email,
                off_session=True,
                confirm=True
            )
        
            retrieve = stripe.PaymentIntent.retrieve(intent.id)

            if retrieve.status == "succeeded":
                charges.append(retrieve.id)
                successful_payment += retrieve.amount_received / 100

        except Exception as e:
            app.logger.info(e)
            return jsonify({'error': 'An unknown error has occurred'}), 500

    if total_funding == successful_payment:
        if successful_payment == 0:
            return jsonify({
            'success': 'All funds were successfully received',
            'total_funding': int(total_funding),
            'successful_payout': int(successful_payment)
            }), 200

        account = project.connected_account
        account_id = account.stripe_connected_account_id

        try:
            transfer = stripe.Transfer.create(
                amount=int(successful_payment * 100),
                currency="cad",
                destination=account_id
            )

        except Exception as e:
            app.logger.info(e)
            return jsonify({'error': 'An unknown error has occurred'}), 500

        for fund in project.funds:
            db.session.delete(fund)

        project.live = False

        db.session.commit()

        return jsonify({
            'success': 'All funds were successfully received',
            'total_funding': int(total_funding),
            'successful_payout': int(successful_payment)
            }), 200

    else:
        try:
            for charge in charges:
                stripe.Refund.create(
                    charge=charge
                )
                return jsonify({'error': 'Payout could not be successfully completed'}), 500

        except Exception as e:
            app.logger.info(e)
            return jsonify({'error': 'An unknown error has occurred'}), 500

        
    

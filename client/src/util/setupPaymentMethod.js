import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

async function setupPaymentMethod({ successRedirect, errorRedirect }) {
  const sessionId = await axios
    .post("/api/v1/payment/session", {
      success_url: successRedirect,
      cancel_url: errorRedirect,
    })
    .then((res) => res.data.session_id)
    .catch((err) => console.log(err));

  const stripe = await stripePromise;

  const { error } = await stripe.redirectToCheckout({ sessionId });

  if (error) console.log(error);
}

export default setupPaymentMethod;

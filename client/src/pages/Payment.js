import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import query from "query-string";
import { Redirect } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Payment(props) {
  const handleSetupPaymentMethod = async (event) => {
    const sessionId = await axios
      .post("/api/v1/payment/session", {
        success_url: `${window.location.origin}/payment?session_id={CHECKOUT_SESSION_ID}&redirect=/project`,
        cancel_url: `${window.location.origin}/login`,
      })
      .then((res) => res.data.session_id)
      .catch((err) => console.log(err));

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) console.log(error);
  };

  useEffect(() => {
    const { session_id: sessionId, redirect: redirectPath } = query.parse(
      props.location.search
    );

    if (sessionId) {
      axios
        .post("/api/v1/payment/payment-method", {
          session_id: sessionId,
        })
        .then((res) => {
          console.log(res);
        });

      return <Redirect to={redirectPath} />;
    }
  }, [props.location.search]);

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleSetupPaymentMethod}
    >
      Payment
    </Button>
  );
}

export default Payment;

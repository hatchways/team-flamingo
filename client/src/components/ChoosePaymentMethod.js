import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import setupPaymentMethod from "../util/setupPaymentMethod";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paymentCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  paymentIcon: {
    marginRight: "2rem",
  },
  paymentExpires: {
    marginLeft: "auto",
    marginRight: "1rem",
  },
  marginTop: {
    marginTop: "1rem",
  },
}));

function ChoosePaymentMethod({ onUpdatePayment }) {
  const classes = useStyles();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [chosenMethod, setChosenMethod] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/payment/payment-method")
      .then((res) => setPaymentMethods(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddPayment = async (event) => {
    await setupPaymentMethod({
      successRedirect: window.location.href,
      errorRedirect: window.location.href,
    });
  };

  const handleChangeMethod = (event) => {
    const method = event.target.value;

    setChosenMethod(method);
    onUpdatePayment(method);
  };

  const PaymentCard = ({ method }) => (
    <div className={classes.paymentCard}>
      <CreditCardIcon className={classes.paymentIcon} />
      <Typography>
        <b>{method.card_brand}</b> ending in {method.last_four}
      </Typography>
      <Typography className={classes.paymentExpires}>
        expires {method.exp_month}/{method.exp_year}
      </Typography>
    </div>
  );

  return (
    <>
      <FormControl fullWidth>
        <Select
          value={chosenMethod}
          onChange={handleChangeMethod}
          variant="outlined"
        >
          {paymentMethods.map((method, index) => {
            return (
              <MenuItem value={method} key={index}>
                <PaymentCard method={method} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddPayment}
        className={classes.marginTop}
      >
        Add payment method
      </Button>
    </>
  );
}

export default ChoosePaymentMethod;

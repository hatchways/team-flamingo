import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    fontWeight: 500,
    fontSize: 24,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    color: theme.bgcolor,
    margin: "2rem 0",
    minWidth: "150px",
  },
}));

function Payment(props) {
  const classes = useStyles();
  const history = useHistory();
  const project = props.project;

  const handleBack = (event) => {
    props.handleTabChange("Funding");
  };

  const handleContinue = (event) => {
    // Go to "Go Live" tab
    props.handleTabChange("Live");
  };

  const handleSetupAccount = (event) => {
    axios
      .get(`/api/v1/payment/generate-state/${project.id}`)
      .then((res) => {
        window.location.assign(
          "https://connect.stripe.com/express/oauth/authorize?" +
            "client_id=" +
            process.env.REACT_APP_STRIPE_CLIENT_ID +
            "&state=" +
            res.data.state
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container spacing={4}>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>

      <Grid item xs={12}>
        <Typography className={classes.mainTitle} gutterBottom>
          Set up an account to receive payments
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {project.connected_account ? (
          <Typography>
            Your account is set up! <CheckCircleOutlineIcon />
          </Typography>
        ) : (
          <Button variant="contained" onClick={handleSetupAccount}>
            SET UP STRIPE ACCOUNT <AccountBalanceIcon />
          </Button>
        )}
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          className={classes.primaryButton}
          onClick={handleContinue}
        >
          CONTINUE
        </Button>
      </Grid>
    </Grid>
  );
}

export default Payment;

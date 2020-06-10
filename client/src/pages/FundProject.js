import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import ChoosePaymentMethod from "../components/ChoosePaymentMethod";
import LoadingScreen from "../components/LoadingScreen";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "2rem",
  },
  divider: {
    backgroundColor: theme.primary,
    height: "2px",
    width: "10%",
    margin: "auto",
  },
  form: {
    marginTop: "2rem",
    marginBotton: "2rem",
  },
  button: {
    backgroundColor: theme.primary,
    marginTop: "4rem",
    marginBottom: "4rem",
    color: theme.bgcolor,
    height: "3rem",
    width: "60%",
  },
  subtitle: {
    padding: "2rem",
  },
}));

function FundProject(props) {
  const classes = useStyles();
  const history = useHistory();
  const projectId = props.match.params.projectId;

  // State variables
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amount, setAmount] = useState(0);
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        history.push("/404");
      });
  }, [projectId]);

  const handleFund = (event) => {
    event.preventDefault();

    axios
      .post(`/api/v1/payment/fund/${projectId}`, {
        payment_method: paymentMethod.id,
        fund_amount: amount,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleUpdatePayment = (method) => {
    setPaymentMethod(method);
  };

  const handleUpdateAmount = (event) => {
    setAmount(event.target.value);
  };

  if (loading) return <LoadingScreen />;
  else
    return (
      <>
        <Navbar />
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" className={classes.header}>
            <Box fontWeight="fontWeightMedium" fontSize={40}>
              Fund - {project.title}
            </Box>
          </Typography>

          <Divider classes={{ root: classes.divider }} />

          <Typography
            variant="subtitle1"
            align="center"
            className={classes.subtitle}
          >
            <Box fontWeight="fontWeightMedium" fontSize={16}>
              Current funding for this project: {project.current_funding}
              <br />
              Funding goal: {project.funding_goal}
            </Box>
          </Typography>

          <form autoComplete="off" onSubmit={handleFund}>
            <Grid container spacing={4} className={classes.form}>
              <Grid item xs={12}>
                <Typography>Select a method of payment</Typography>
                <ChoosePaymentMethod onUpdatePayment={handleUpdatePayment} />
              </Grid>

              <Grid item xs={12}>
                <Typography>Choose an amount to fund</Typography>
                <TextField
                  InputProps={{
                    startAdornment: "$",
                  }}
                  value={amount}
                  onChange={handleUpdateAmount}
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  className={classes.button}
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={paymentMethod && amount ? false : true}
                  onSubmit={handleFund}
                >
                  FUND PROJECT
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </>
    );
}

export default FundProject;

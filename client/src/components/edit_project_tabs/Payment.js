import React from "react";
import { Grid, IconButton, Typography, Snackbar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";

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

  const handleBack = (event) => {
    props.handleTabChange("Funding");
  };
  return (
    <Grid container>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>

      <Grid item xs={12}>
        <Typography className={classes.mainTitle} gutterBottom>
          Set up an account to receive funding
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleContinue}
          className={classes.primaryButton}
        >
          SAVE
        </Button>
      </Grid>
    </Grid>
  );
}

export default Payment;

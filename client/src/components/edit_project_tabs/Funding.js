import React, { useState, useCallback } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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

function Funding(props) {
  const classes = useStyles();
  const userId = props.userId;
  const project = props.project;

  const [fundingGoal, setFundingGoal] = useState(
    // This converts the money string provided by backend
    // to number that can be understood by TextField
    project.funding_goal
      ? Number(project.funding_goal.replace(/[^0-9.-]+/g, ""))
      : 0
  );
  const [equity, setEquity] = useState(
    project.equity ? project.equity * 100 : ""
  );
  const [deadline, setDeadline] = useState(
    project.deadline
      ? moment(project.deadline).toISOString()
      : moment(new Date()).toISOString()
  );

  const handleUpdateFundingGoal = (event) => {
    setFundingGoal(Number(event.target.value));
  };

  const handleUpdateEquity = (event) => {
    if (event.target.value > 100) setEquity(100);
    else if (event.target.value < 0) setEquity(0);
    else setEquity(Number(event.target.value));
  };

  const handleUpdateDeadline = (date) => {
    const formatted = moment(date).toISOString();
    setDeadline(formatted);
  };

  const handleContinue = (event) => {
    axios
      .put(`/api/v1/users/${userId}/projects/${project.id}`, {
        funding_goal: fundingGoal,
        equity: equity / 100,
        deadline: deadline,
      })
      .then((res) => props.handleTabChange("Payment"))
      .catch((err) => console.log(err));
  };

  const handleBack = (event) => {
    props.handleTabChange("Story");
  };

  return (
    <Grid container spacing={4}>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <Grid item xs={12}>
        <Typography className={classes.mainTitle} gutterBottom>
          How much funding are you looking to raise?
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography>Funding goal amount</Typography>
        <TextField
          type="number"
          variant="outlined"
          fullWidth
          value={fundingGoal}
          onChange={handleUpdateFundingGoal}
          InputProps={{ startAdornment: "$ " }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Equity represented by funding goal</Typography>
        <TextField
          type="number"
          min={0}
          max={100}
          variant="outlined"
          fullWidth
          value={equity}
          onChange={handleUpdateEquity}
          InputProps={{ endAdornment: "%" }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Funding deadline</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            value={deadline}
            onChange={(date) => handleUpdateDeadline(date)}
            minDate={moment(new Date()).toISOString()}
            format="dd/MM/yyyy"
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleContinue}
          className={classes.primaryButton}
        >
          CONTINUE
        </Button>
      </Grid>
    </Grid>
  );
}

export default Funding;

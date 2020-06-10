import React, { useState, useEffect } from "react";
import {
  IconButton,
  Grid,
  Typography,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
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

function Live(props) {
  const classes = useStyles();
  const project = props.project;

  const [canGoLive, setCanGoLive] = useState(false);

  useEffect(() => {
    checkIfFieldsFilled(project);
  }, [project]);

  const checkIfFieldsFilled = (project) => {
    if (
      !project.title ||
      !project.subtitle ||
      !project.description ||
      !project.location ||
      project.photos.length == 0 ||
      !project.equity ||
      project.industry.length == 0 ||
      !project.funding_goal
    ) {
      setCanGoLive(false);
    } else setCanGoLive(true);
  };

  const handleBack = (event) => {
    props.handleTabChange("Payment");
  };

  const handleGoLive = (event) => {};

  return (
    <Grid container spacing={4}>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>

      <Grid item xs={12}>
        <Typography className={classes.mainTitle} gutterBottom>
          If you're happy with your settings, you can push your project live
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Please note that the following settings cannot change once you go
          live:
          <ul>
            <li>funding goal</li>
            <li>equity offered</li>
            <li>deadline</li>
          </ul>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          className={classes.primaryButton}
          onClick={handleGoLive}
          disabled={!canGoLive}
        >
          GO LIVE
        </Button>

        <Snackbar open={!canGoLive}>
          <MuiAlert severity="warning">
            You must fill out all project fields before going live!
          </MuiAlert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}

export default Live;

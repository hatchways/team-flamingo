import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Button, Snackbar, Box } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { makeStyles } from "@material-ui/core/styles";
import BackArrow from "../arrows/BackArrow";

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
  const { userId, project } = props;

  const [canGoLive, setCanGoLive] = useState(false);
  const [isLive, setIsLive] = useState(project.live);

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

  const handleGoLive = (event) => {
    axios
      .put(`/api/v1/users/${userId}/projects/${project.id}`, {
        live: true,
      })
      .then((res) => setIsLive(true))
      .catch((err) => console.log(err));
  };

  if (isLive)
    return (
      <>
        <BackArrow handleBack={handleBack} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography>Your project is Live!</Typography>
          <DoneOutlineIcon fontSize="large" />
        </Box>
      </>
    );
  else
    return (
      <Grid container spacing={4}>
        <BackArrow handleBack={handleBack} />

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

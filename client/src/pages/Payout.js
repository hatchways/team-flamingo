import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Container, Typography, Button } from "@material-ui/core";
import LoadingScreen from "../components/LoadingScreen";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: "4rem",
  },
  primaryButton: {
    backgroundColor: theme.primary,
    color: theme.bgcolor,
    minWidth: "150px",
  },
}));

function Payout(props) {
  const classes = useStyles();
  const projectId = props.match.params.projectId;

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [totalFunding, setTotalFunding] = useState("");
  const [successfulPayout, setSuccessfulPayout] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [projectId]);

  const handlePayout = (event) => {
    axios
      .post(`/api/v1/payment/payout/${projectId}`, {})
      .then((res) => {
        setTotalFunding(res.data.total_funding);
        setSuccessfulPayout(res.data.successful_payout);
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <LoadingScreen />;
  else
    return (
      <Container maxWidth="xs">
        <Grid
          container
          spacing={4}
          justify="center"
          alignItems="center"
          className={classes.marginTop}
        >
          <Grid item xs={12}>
            <Typography>
              Payout all funds to project with id: {projectId}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={handlePayout}
              className={classes.primaryButton}
            >
              PAYOUT
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography>Funding Goal: {project.funding_goal}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>Total Funding: ${totalFunding}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>Successful Payout: ${successfulPayout}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
}

export default Payout;

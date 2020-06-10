import React, { useState } from "react";
import axios from "axios";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BackForwardArrows from "../arrows/BackForwardArrows";

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

function Story(props) {
  const classes = useStyles();
  const userId = props.userId;
  const project = props.project;

  // State variables
  const [description, setDescription] = useState(project.description);

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleContinue = (event) => {
    axios
      .put(`/api/v1/users/${userId}/projects/${project.id}`, {
        description: description,
      })
      .then((res) => props.handleTabChange("Funding"))
      .catch((err) => console.log(err));
  };

  const handleBack = (event) => {
    props.handleTabChange("Basic");
  };

  const handleForward = (event) => {
    props.handleTabChange("Funding");
  };

  return (
    <Grid container spacing={4}>
      <BackForwardArrows
        handleBack={handleBack}
        handleForward={handleForward}
      />

      <Grid item xs={12}>
        <Typography className={classes.mainTitle} gutterBottom>
          Tell your story
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleUpdateDescription}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleContinue}
          className={classes.primaryButton}
        >
          {project.live ? "SAVE" : "CONTINUE"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Story;

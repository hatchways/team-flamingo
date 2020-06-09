import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import IndustriesDropdown from "../components/IndustriesDropdown";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "2rem",
    borderBottom: "2px",
    borderBottomColor: theme.primary,
  },
  divider: {
    backgroundColor: theme.primary,
    height: "2px",
    width: "10%",
    margin: "auto",
  },
  subtitle: {
    padding: "2rem",
  },
  form: {
    width: "auto",
  },
  select: {
    padding: "2px",
  },
  marginTop: {
    marginTop: "2rem",
  },
  button: {
    backgroundColor: theme.primary,
    margin: "2rem 0",
    color: theme.bgcolor,
    height: "3rem",
    width: "60%",
  },
}));

function VerifyCheckboxes(props) {
  const [checkboxes, setCheckboxes] = useState({
    verifyAge: false,
    verifyId: false,
    verifyPayment: false,
  });

  useEffect(() => {
    if (checkboxes.verifyAge && checkboxes.verifyId && checkboxes.verifyPayment)
      props.verify();
  }, [checkboxes, props.verify]);

  const handleCheckboxes = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkboxes.verifyAge}
            onChange={handleCheckboxes}
            name="verifyAge"
            color="primary"
          />
        }
        label="I'm at least 18 years old"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={checkboxes.verifyId}
            onChange={handleCheckboxes}
            name="verifyId"
            color="primary"
          />
        }
        label="I can verify a bank account and government-issued ID"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={checkboxes.verifyPayment}
            onChange={handleCheckboxes}
            name="verifyPayment"
            color="primary"
          />
        }
        label="I have a debit and/or credit card"
      />
    </FormGroup>
  );
}

function CreateProject(props) {
  const classes = useStyles();
  const history = useHistory();
  const userId = props.match.params.id;

  // State variables
  const [industries, setIndustries] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [verified, setVerified] = useState(false);

  // Handlers
  const handleUpdateIndustries = (industries) => {
    setIndustries(industries);
  };

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleVerified = (event) => {
    setVerified(true);
  };

  const handleContinue = (event) => {
    event.preventDefault();

    axios
      .post(`/api/v1/users/${userId}/projects`, {
        description: description,
        industries: industries.map((industry) => industry.name),
        location: location,
      })
      .then((res) => {
        history.push(`/profile/${userId}/projects/${res.data.project_id}/edit`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" className={classes.header}>
          <Box fontWeight="fontWeightMedium" fontSize={40}>
            Let's get started.
          </Box>
        </Typography>

        <Divider classes={{ root: classes.divider }} />

        <form
          autocomplete="off"
          className={classes.form}
          onSubmit={handleContinue}
        >
          <Grid container direction="column" alignItems="stretch">
            <Typography
              variant="subtitle1"
              align="center"
              className={classes.subtitle}
            >
              <Box fontWeight="fontWeightMedium" fontSize={16}>
                Pick a project industry to connect with a community. <br />
                You can always update this later.
              </Box>
            </Typography>

            <Grid item>
              <IndustriesDropdown onStateChange={handleUpdateIndustries} />
            </Grid>

            <Typography
              variant="subtitle1"
              align="center"
              className={classes.subtitle}
            >
              <Box
                fontWeight="fontWeightMedium"
                fontSize={16}
                className={classes.marginTop}
              >
                Describe what you'll be creating.
              </Box>
            </Typography>

            <Grid item>
              <TextField
                placeholder="Describe your project"
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                value={description}
                onChange={handleUpdateDescription}
              />
            </Grid>

            <Typography
              variant="subtitle1"
              align="center"
              className={classes.subtitle}
            >
              <Box
                fontWeight="fontWeightMedium"
                fontSize={16}
                className={classes.marginTop}
              >
                Tell us where you're based and confirm a few other details
                before we proceed.
              </Box>
            </Typography>

            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Location"
                fullWidth
                value={location}
                onChange={handleUpdateLocation}
              />
            </Grid>

            <Grid item className={classes.marginTop}>
              <VerifyCheckboxes verify={handleVerified} />
            </Grid>

            <Grid item align="center">
              <Button
                className={classes.button}
                size="large"
                variant="contained"
                type="submit"
                disabled={!verified}
                onSubmit={handleContinue}
              >
                CONTINUE
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default CreateProject;

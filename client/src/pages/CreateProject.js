import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";

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
  inputLabel: {
    color: "#000",
    marginLeft: "2em",
    fontWeight: "bold",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
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
  chip: {
    margin: "2px",
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

  // State variables
  const [industries, setIndustries] = useState([]);
  const [validIndustries, setValidIndustries] = useState([]);
  const [verified, setVerified] = useState(false);

  // Populate valid industries
  useEffect(() => {
    axios.get("/api/v1/industries").then((res) => {
      setValidIndustries(res.data);
    });
  }, []); // Only call on initial mount

  // Handlers
  const handleAddIndustry = (event) => {
    const newIndustry = event.target.value;
    setIndustries((industries) => {
      // If the industry is already chosen, we don't want a duplicate
      if (industries.includes(newIndustry)) return [...industries];
      else return [...industries, newIndustry];
    });
  };

  const handleRemoveIndustry = (industry) => {
    setIndustries((industries) => {
      const index = industries.indexOf(industry);
      industries.splice(index, 1);
      return [...industries];
    });
  };

  const handleVerified = (event) => {
    setVerified(true);
  };

  const handleContinue = (event) => {
    event.preventDefault();
    // TODO: Create project with current data, then
    // redirect to /profile/:id/projects/edit
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
              <FormControl fullWidth>
                <InputLabel
                  id="select-industries"
                  classes={{ root: classes.inputLabel }}
                >
                  SELECT INDUSTRIES
                </InputLabel>
                <Select
                  value={industries}
                  onChange={handleAddIndustry}
                  labelId="select-industries"
                  variant="outlined"
                >
                  {validIndustries.map((industry) => {
                    return (
                      <MenuItem value={industry} key={industry.id}>
                        {industry.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item className={classes.marginTop}>
              <div>
                {industries.map((industry) => {
                  return (
                    <Chip
                      label={industry.name}
                      color="primary"
                      variant="outlined"
                      onDelete={() => handleRemoveIndustry(industry)}
                      className={classes.chip}
                      key={industry.id}
                    />
                  );
                })}
              </div>
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
              <TextField variant="outlined" placeholder="Location" fullWidth />
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

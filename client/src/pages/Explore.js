import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Typography,
  Container,
  Box,
  Button,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import ProjectCard from "../components/ProjectCard";

import toTitleCase from "../util/toTitleCase";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    marginTop: theme.spacing(15),
  },
  ySpacing: {
    margin: "2rem 0",
  },
  filterContainer: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
  },
  searchButton: {},
}));

function Filters(props) {
  const classes = useStyles();

  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [selectedDate, setSelectedDate] = useState(moment().add(1, "month"));

  const [industryList, setIndustryList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const handleUpdateIndustry = (event) => {
    setIndustry(event.target.value);
  };
  const handleUpdateLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // Initial
  useEffect(() => {
    setLocationList(["NYC", "Toronto", "San Francisco", "Boston"]);
    axios
      .get("/api/v1/industries")
      .then((res) => {
        setIndustryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Whenever Search Changes
  useEffect(() => {
    axios
      .post("/api/v1/projects", {
        industry: industry,
        location: location,
        date: selectedDate.format(),
      })
      .then((res) => {
        props.handleUpdateProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [industry, location, selectedDate]);

  return (
    <Container>
      <form autoComplete="off">
        <Box display="flex" justifyContent="center" my={5}>
          <TextField
            className={classes.formControl}
            id="industry"
            select
            variant="outlined"
            label="Industry"
            value={industry}
            onChange={handleUpdateIndustry}
            helperText="Select an industry"
          >
            <MenuItem value={"All"}>All Industries</MenuItem>
            {industryList.map((indus, step) => {
              return (
                <MenuItem key={step} value={indus.id}>
                  {toTitleCase(indus.name)}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            className={classes.formControl}
            id="location"
            select
            variant="outlined"
            label="location"
            value={location}
            onChange={handleUpdateLocation}
            helperText="Select a location"
          >
            <MenuItem value={"All"}>Anywhere</MenuItem>
            {locationList.map((loc, step) => {
              return (
                <MenuItem key={step} value={loc}>
                  {loc}
                </MenuItem>
              );
            })}
          </TextField>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              disableToolbar
              variant="inline"
              format="MM/DD/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fundraise Deadline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              helperText="Choose a date"
            />
          </MuiPickersUtilsProvider>
        </Box>
      </form>
    </Container>
  );
}

function Explore(props) {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  const handleUpdateProjects = (projects) => {
    setProjects(projects);
  };

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h2" component="h1">
        Explore Projects
      </Typography>

      <Filters handleUpdateProjects={handleUpdateProjects} />

      <Container>
        <Grid container spacing={6}>
          {projects.map((value, step) => {
            const project = { ...value.project, username: value.username };
            return (
              <Grid key={step} item xs={12} sm={6} md={4}>
                <ProjectCard key={step} project={project} showUser={true} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Explore;

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

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProjectCard from "../components/ProjectCard";

const projectStatic = [
  {
    photos: ["project/ptest3.png"],
    title: "Urban Jungle: eco-friendly coffee shop",
    current_funding: 23874,
    funding_goal: 40000,
    equity: 0.1,
    timeLeft: 44,
    author: "Alex",
    location: "NYC",
  },
  {
    photos: ["project/ptest1.png"],
    title: "Cafe Black: The Future of coffee",
    current_funding: 2647,
    funding_goal: 60000,
    equity: 0.1,
    timeLeft: 60,
    author: "George",
    location: "Toronto",
  },
  {
    photos: ["project/ptest2.png"],
    title: "Easy to use, Powerful AI Camera",
    current_funding: 34912,
    funding_goal: 55000,
    equity: 0.18,
    timeLeft: 12,
    author: "Mary",
    location: "London",
  },
  {
    photos: ["project/ptest2.png"],
    title: "Easy to use, Powerful AI Camera",
    current_funding: 34912,
    funding_goal: 55000,
    equity: 0.18,
    timeLeft: 12,
    author: "Mary",
    location: "London",
  },
  {
    photos: ["project/ptest3.png"],
    title: "Urban Jungle: eco-friendly coffee shop",
    current_funding: 23874,
    funding_goal: 40000,
    equity: 0.1,
    timeLeft: 44,
    author: "Alex",
    location: "NYC",
  },
  {
    photos: ["project/ptest1.png"],
    title: "64Characters 64Characters 64Characters 64Characters 64Characters",
    current_funding: 2647,
    funding_goal: 60000,
    equity: 0.1,
    timeLeft: 60,
    author: "George",
    location: "Toronto",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  media: {
    height: theme.spacing(35),
  },
  ySpacing: {
    margin: "2rem 0",
  },
  filterContainer: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  cardTitle: {
    fontWeight: "500",
  },
  cardInvested: {
    fontWeight: "500",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
  },
}));

function Filters(props) {
  const classes = useStyles();
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [selectedDate, setSelectedDate] = useState(moment());

  const [industryList, setIndustryList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    setIndustryList(["Coffee", "Tech", "Crafts"]);
    setLocationList(["NYC", "Toronto", "San Francisco"]);
  }, []);

  const handleUpdateIndustry = (event) => {
    setIndustry(event.target.value);
  };
  const handleUpdateLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filters = {
      industry: industry,
      location: location,
      date: selectedDate.format(),
    };
    console.log(filters);
    // TODO: post to backend
  };

  return (
    <Container>
      <form autoComplete="off" onSubmit={handleSearch}>
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
                <MenuItem key={step} value={indus}>
                  {indus}
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
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fundraise Deadline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button type="submit" style={{ marginBottom: "1rem" }}>
            Search
          </Button>
        </Box>
      </form>
    </Container>
  );
}

function Explore(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Top Navbar */}
      <Typography align="center" variant="h2" component="h1">
        Explore Projects
      </Typography>

      <Filters />

      <Container>
        <Grid container spacing={6}>
          {projectStatic.map((value, step) => {
            return (
              <Grid key={step} item xs={4}>
                <ProjectCard key={step} project={value} showUser={true} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Explore;

import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Typography,
  Container,
  Box,
  Avatar,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
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

import projectpic1 from "../staticImages/projPicture1.png";
import projectpic2 from "../staticImages/projPicture2.png";
import projectpic3 from "../staticImages/projPicture3.png";

import NavBar from "../components/Navbar";

const projectStatic = [
  {
    photo: projectpic1,
    name: "Urban Jungle: eco-friendly coffee shop",
    currentInvested: 23874,
    wantedInvestement: 40000,
    equity: 0.1,
    timeLeft: 44,
    author: "Alex",
    location: "NYC",
  },
  {
    photo: projectpic2,
    name: "Cafe Black: The Future of coffee",
    currentInvested: 2647,
    wantedInvestement: 60000,
    equity: 0.1,
    timeLeft: 60,
    author: "George",
    location: "Toronto",
  },
  {
    photo: projectpic3,
    name: "Easy to use, Powerful AI Camera",
    currentInvested: 34912,
    wantedInvestement: 55000,
    equity: 0.18,
    timeLeft: 12,
    author: "Mary",
    location: "London",
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

function ProjectCard(props) {
  const classes = useStyles();
  const projectInfo = props.project;
  return (
    <Card elevation={8}>
      <CardMedia
        className={classes.media}
        component="img"
        src={projectInfo.photo}
      ></CardMedia>
      <CardContent>
        <Typography className={classes.cardTitle} variant="h5" component="h4">
          {projectInfo.name}
        </Typography>
        <Typography className={classes.cardInvested} display="inline">
          ${projectInfo.currentInvested}
        </Typography>
        <Typography color="textSecondary" display="inline">
          {" / " + projectInfo.wantedInvestement}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Equity exchange: {projectInfo.equity * 100}% |
          {" " + projectInfo.timeLeft} days to go
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography className={classes.cardInvested}>
          By {projectInfo.author}
        </Typography>
        <Typography color="textSecondary" display="inline">
          {projectInfo.location}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Filters(props) {
  const classes = useStyles();
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment());

  const size = 2;

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
    console.log(event);
    debugger;
  };

  return (
    <Container>
      <form autoComplete="off" onSubmit={handleSearch}>
        <Box display="flex" justifyContent="center" my={5}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="industry-select-label">Industry</InputLabel>
            <Select
              labelId="industry-select-label"
              id="industry-select"
              value={industry}
              onChange={handleUpdateIndustry}
              label="Industry"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={location}
              onChange={handleUpdateLocation}
              label="Location"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button type="submit" onSubmit={handleSearch}>
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
      <NavBar />

      <Typography align="center" variant="h2" component="h1">
        Explore Projects
      </Typography>

      <Filters />

      <Container>
        <Grid container spacing={6}>
          {projectStatic.map((value, step) => {
            return (
              <Grid item xs={4}>
                <ProjectCard key={step} project={value} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Explore;

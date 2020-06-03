import React from "react";

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
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import projectpic1 from "../staticImages/projPicture1.png";
import projectpic2 from "../staticImages/projPicture2.png";
import projectpic3 from "../staticImages/projPicture3.png";
import profpic1 from "../staticImages/profpic1.png";

import NavBar from "../components/Navbar";
import EditProfileDialog from "../components/EditProfileDialog";

const userStatic = {
  name: "Alexander Faa",
  location: "New York, NY",
  description: "I just have a great passion for all things coffee",
  expertise: ["marketing", "coffee", "technology"],
  wantInvestIn: "Coffee",
};
const projectStatic = [
  {
    photo: projectpic1,
    name: "Urban Jungle: eco-friendly coffee shop",
    currentInvested: 23874,
    wantedInvestement: 40000,
    equity: 0.1,
    timeLeft: 44,
  },
  {
    photo: projectpic2,
    name: "Cafe Black: The Future of coffee",
    currentInvested: 2647,
    wantedInvestement: 60000,
    equity: 0.1,
    timeLeft: 60,
  },
  {
    photo: projectpic3,
    name: "Easy to use, Powerful AI Camera",
    currentInvested: 34912,
    wantedInvestement: 55000,
    equity: 0.18,
    timeLeft: 12,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  userInfoShadow: {
    paddingTop: theme.spacing(3),
    boxShadow: "0px 0px 17px 6px rgba(200,200,200,.3)",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  sendMessage: {
    padding: ".8rem 2rem",
  },
  roundButton: {
    borderRadius: "30px",
    padding: "0.2rem 1rem",
    fontSize: "0.7rem",
    marginRight: "0.5rem",
    fontWeight: "600",
  },
  highlightButton: {
    borderRadius: "30px",
    padding: "0.2rem 1rem",
    fontSize: "0.7rem",
    marginRight: "0.5rem",
    fontWeight: "600",
    backgroundColor: theme.primary,
    color: "white",
    border: "0px",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  media: {
    height: theme.spacing(35),
  },
  ySpacing: {
    margin: "2rem 0",
  },
  projectContainer: {
    padding: "0 4rem",
  },
  cardTitle: {
    fontWeight: "500",
  },
  cardInvested: {
    fontWeight: "500",
  },
}));

function UserInfo(props) {
  const classes = useStyles();
  const user = props.user;
  return (
    <Box height="100%" className={classes.userInfoShadow}>
      <Container align="center">
        {/* Avatar */}
        <Avatar className={classes.avatar} src={profpic1}></Avatar>
        {/* User Info */}
        <Box>
          <Typography variant="h6" component="p">
            {user.name}
          </Typography>
          <Typography color="textSecondary">{user.location}</Typography>
        </Box>

        {/* Send a message */}
        <Box className={classes.ySpacing}>
          <Button
            className={classes.sendMessage}
            size="large"
            variant="outlined"
            disableElevation
          >
            Send a Message
          </Button>
        </Box>

        <EditProfileDialog />

        {/* Description */}
        <Box className={classes.ySpacing}>
          <Typography>{user.description}</Typography>
        </Box>

        {/* Expertise */}
        <Box marginTop={2}>
          <Typography fontWeight="fontWeightMedium">Expertise</Typography>
          {user.expertise.map((value, step) => {
            return (
              <Button
                key={step}
                className={classes.roundButton}
                variant="outlined"
                size="small"
              >
                {value}
              </Button>
            );
          })}
        </Box>
      </Container>

      <Divider className={classes.ySpacing} />

      {/* Looking to Invest in */}
      <Box>
        <Container align="center">
          <Typography fontWeight="fontWeightMedium">
            Looking to invest in
          </Typography>

          <Button
            className={classes.highlightButton}
            variant="outlined"
            size="small"
          >
            {user.wantInvestIn}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

function ProjectCard(props) {
  const classes = useStyles();
  const projectInfo = props.project;
  return (
    <Grid item xs={6}>
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
      </Card>
    </Grid>
  );
}

function UserDashboard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Top Navbar */}
      <NavBar />

      <Grid container>
        {/* User Information Sidebar */}
        <Grid item xs={3}>
          <UserInfo user={userStatic} />
        </Grid>
        {/* Invested in and Personal Projects */}
        <Grid item xs={9}>
          <Container className={classes.projectContainer}>
            <Typography className={classes.ySpacing} variant="h2">
              <Box fontWeight="fontWeightMedium">Invested In: </Box>
            </Typography>
            <Grid container spacing={6}>
              {projectStatic.map((value, step) => {
                return <ProjectCard key={step} project={value} />;
              })}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDashboard;

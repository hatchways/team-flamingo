import React, { Component } from "react";
import projectpic1 from "../staticImages/projPicture1.png";
import profpic1 from "../staticImages/profpic1.png";

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
  AppBar,
  Toolbar,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  appBar: {
    background: "white",
    color: "black",
    elevation: 0,
    "&MuiPaper": {
      elevation: 0,
    },
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
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

function NavBar(props) {
  const classes = useStyles();
  return (
    <Box mb={8}>
      <Container>
        <AppBar variant="outlined" className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Product Launch
            </Typography>
            <Button color="inherit">Explore</Button>
            <Button color="inherit">Launch</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
}

function UserInfo(props) {
  const classes = useStyles();
  return (
    <Box borderRight={1} height="100%" pt={3}>
      <Container align="center">
        {/* Avatar */}
        <Avatar className={classes.avatar} src={profpic1}></Avatar>
        {/* User Info */}
        <Box>
          <Typography>Alexander Faa</Typography>
          <Typography>New York, NY</Typography>
        </Box>

        {/* Send a message */}
        <Box marginTop={2}>
          <Button variant="outlined" disableElevation>
            Send a Message
          </Button>
        </Box>

        {/* Description */}
        <Box marginTop={2}>
          <Typography>Description</Typography>
        </Box>

        {/* Expertise */}
        <Box marginTop={2}>
          <Typography fontWeight="fontWeightMedium">Expertise</Typography>
          <Button variant="outlined" size="small">
            Marketing
          </Button>
          <Button variant="outlined" size="small">
            Sales
          </Button>
          <Button variant="outlined" size="small">
            Technology
          </Button>
        </Box>
      </Container>

      <Divider className={classes.ySpacing} />

      {/* Looking to Invest in */}
      <Box>
        <Container align="center">
          <Typography fontWeight="fontWeightMedium">
            Looking to invest in
          </Typography>
          <Button variant="contained" color="primary" size="small">
            Technology
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

function ProjectCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={6}>
      <Card>
        <CardMedia
          className={classes.media}
          component="img"
          src={projectpic1}
        ></CardMedia>
        <CardContent>
          <Typography className={classes.cardTitle} variant="h5" component="h4">
            Urban Jungle: eco-friendly coffee shop
          </Typography>
          <Typography className={classes.cardInvested} display="inline">
            $23874
          </Typography>
          <Typography color="textSecondary" display="inline">
            / 40000
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Equity exchange: 10% | 44 days to go
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
          <UserInfo />
        </Grid>
        {/* Invested in and Personal Projects */}
        <Grid item xs={9}>
          <Container className={classes.projectContainer}>
            <Typography className={classes.ySpacing} variant="h2">
              <Box fontWeight="fontWeightMedium">Invested In: </Box>
            </Typography>
            <Grid container spacing={6}>
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDashboard;

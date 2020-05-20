import React, { Component } from "react";

import {
  Typography,
  Container,
  Box,
  Avatar,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  paper: {},
  avatar: {
    margin: "0 auto",
  },
}));

function UserDashboard(props) {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.root}>
        <h1> Navbar </h1>
        <hr />
        {/* Things to add to Grid: Spacing btwn items */}
        <Grid container>
          {/* User Information Sidebar */}
          <Grid item xs={3}>
            <Box borderRight={1}>
              <Container align="center">
                {/* Avatar */}
                <Avatar className={classes.avatar}>N</Avatar>
                {/* User Info */}
                <Box>
                  <Typography>Name</Typography>
                  <Typography>Location</Typography>
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

                <Box marginTop={2}>
                  <Typography>
                    <Box fontWeight="fontWeightMedium">Expertise</Box>
                  </Typography>
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

              <hr />
              <Container marginTop={2} align="center">
                <Typography>
                  <Box fontWeight="fontWeightMedium">Looking to invest in</Box>
                </Typography>
                <Button variant="contained" color="primary" size="small">
                  Technology
                </Button>
                <Box marginTop={5}>A</Box>
              </Container>
            </Box>
          </Grid>

          {/* Invested in and Personal Projects */}
          <Grid item xs={9}>
            <Container>
              <Box border={1}>
                <Typography variant="h3">
                  <Box fontWeight="fontWeightMedium">Looking to invest in</Box>
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia src="https://imgur.com/AOAhG6r" />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          This impressive paella is a perfect party dish and a
                          fun meal to cook together with your guests. Add 1 cup
                          of frozen peas along with the mussels, if you like.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>A</Card>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default UserDashboard;

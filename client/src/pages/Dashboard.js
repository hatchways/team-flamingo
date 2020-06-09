import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import moment from "moment";

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
  Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import EditProfileDialog from "../components/EditProfileDialog";

moment.updateLocale("en", { relativeTime: { future: "%s to go" } });

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    height: "100vh",
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

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/me").then((res) => {
      if (res.data.user_id == user.id) setIsOwnProfile(true);
    });
  }, [isOwnProfile]);

  return (
    <Box height="100%" className={classes.userInfoShadow}>
      <Container align="center">
        {/* Avatar */}
        {user.current_avatar > 0 || user.current_avatar === 0 ? (
          <Avatar
            className={classes.avatar}
            src={
              process.env.REACT_APP_AWS_ROOT +
              user.profile_pics[user.current_avatar]
            }
          />
        ) : (
          // Default avatar
          <Avatar className={classes.avatar} />
        )}
        {/* User Info */}
        <Box>
          <Typography variant="h6" component="p">
            {user.username}
          </Typography>
          <Typography color="textSecondary">{user.location}</Typography>
        </Box>

        {isOwnProfile ? (
          <EditProfileDialog
            user={user}
            handleUserEdited={props.handleUserEdited}
          />
        ) : (
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
        )}

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

          {user.invest_in.map((value, step) => {
            return (
              <Button
                key={step}
                className={classes.highlightButton}
                variant="outlined"
                size="small"
              >
                {value}
              </Button>
            );
          })}
        </Container>
      </Box>
    </Box>
  );
}

function ProjectCard(props) {
  const classes = useStyles();
  const projectInfo = props.project;
  const fromNow = moment(projectInfo.deadline).fromNow();

  return (
    <Grid item xs={6}>
      <Card elevation={8}>
        <CardMedia
          className={classes.media}
          component="img"
          src={
            projectInfo.photos[0]
              ? process.env.REACT_APP_AWS_ROOT + projectInfo.photos[0]
              : ""
          }
        ></CardMedia>
        <CardContent>
          <Typography className={classes.cardTitle} variant="h5" component="h4">
            {projectInfo.title}
          </Typography>
          <Typography className={classes.cardInvested} display="inline">
            {projectInfo.current_funding}
          </Typography>
          <Typography color="textSecondary" display="inline">
            {" / " + projectInfo.funding_goal}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Equity exchange: {projectInfo.equity * 100}% |{" " + fromNow}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function UserDashboard(props) {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [projects, setProjects] = useState({});

  const handleUserEdited = (user) => {
    setUser(user);
  };

  const id = props.match.params.id;

  useEffect(() => {
    async function fetchUser() {
      const userRes = await axios(`/api/v1/users/${id}/profile`);
      setUser(userRes.data);
    }
    async function fetchProject() {
      const projRes = await axios(`/api/v1/users/${id}/projects`);
      setProjects(projRes.data);
    }
    async function fetchData() {
      try {
        fetchUser();
        fetchProject();
      } catch (err) {
        console.dir(err);
        if (err.response.status === 400) {
          return <Redirect to="/404" />;
        }
      }
    }
    fetchData();
  }, [id]);

  return (
    <Grid container className={classes.root}>
      {/* User Information Sidebar */}
      <Grid item xs={3}>
        {user ? (
          <UserInfo user={user} handleUserEdited={handleUserEdited} />
        ) : (
          ""
        )}
      </Grid>
      {/* Invested in and Personal Projects */}
      <Grid item xs={9}>
        <Container className={classes.projectContainer}>
          <Typography className={classes.ySpacing} variant="h2">
            <Box fontWeight="fontWeightMedium">Invested In: </Box>
          </Typography>
          <Grid container spacing={6}>
            {projects.length
              ? projects.map((value, step) => {
                  return <ProjectCard key={step} project={value} />;
                })
              : ""}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default UserDashboard;

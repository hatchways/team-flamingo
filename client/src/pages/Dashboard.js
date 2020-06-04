import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
import { Link as RouterLink } from "react-router-dom";
import NavBar from "../components/Navbar";

moment.updateLocale("en", { relativeTime: { future: "%s to go" } });
const LinkTo = React.forwardRef((props, ref) => <RouterLink {...props} />);

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

  return (
    <Box height="100%" className={classes.userInfoShadow}>
      <Container align="center">
        {/* Avatar */}
        {user.current_avatar > 0 || user.current_avatar === 0 ? (
          <Avatar
            className={classes.avatar}
            src={
              "https://plphotos.s3.us-east-2.amazonaws.com/" +
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
              ? "https://plphotos.s3.us-east-2.amazonaws.com/" +
                projectInfo.photos[0]
              : ""
          }
        ></CardMedia>
        <CardContent>
          <Typography className={classes.cardTitle} variant="h5" component="h4">
            {projectInfo.title}
          </Typography>
          <Typography className={classes.cardInvested} display="inline">
            {projectInfo.current_invested}
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

function ErrorPage(props) {
  return (
    <div>
      <NavBar />
      <Container align="center">{props.err}</Container>
    </div>
  );
}

function UserDashboard(props) {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const [projects, setProjects] = useState({});

  const location = useLocation();
  const id = location.pathname.match(/profile\/(\d+)/);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching user data");
        const userRes = await axios(`/api/v1/users/${id[1]}/profile`);
        const projRes = await axios(`/api/v1/users/${id[1]}/projects`);
        setUser(userRes.data);
        setProjects(projRes.data);
      } catch (err) {
        console.log("error:");
        console.dir(err);
        const code = err.response.status;
        if (code === 400) {
          setErr(<p>{err.response.data.error}</p>);
        } else if (code === 401) {
          setErr(
            <div>
              <p>You must be logged in to view this page</p>
              <Button color="inherit" component={LinkTo} to="/login">
                Login
              </Button>
              <Button color="inherit" component={LinkTo} to="/signup">
                Signup
              </Button>
            </div>
          );
        } else {
          setErr("Unknown Error");
        }
      }
    }
    fetchData();
  }, [location]);

  if (err) {
    return <ErrorPage err={err} />;
  } else {
    return (
      <Grid container className={classes.root}>
        {/* User Information Sidebar */}
        <Grid item xs={3}>
          {user ? <UserInfo user={user} /> : ""}
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
}

export default UserDashboard;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Box,
} from "@material-ui/core";

moment.updateLocale("en", { relativeTime: { future: "%s to go" } });

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
  media: {
    height: theme.spacing(35),
  },
  cardTitle: {
    fontWeight: "500",
  },
  cardInvested: {
    fontWeight: "500",
  },
}));

function ProjectCard(props) {
  const project = props.project;
  const styles = useStyles();
  const classes = props.styles || styles;
  const showUser = props.showUser || false;
  const fromNow = moment(project.deadline).fromNow();

  return (
    <Card elevation={8} className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        src={
          project.photos[0]
            ? process.env.REACT_APP_AWS_ROOT + project.photos[0]
            : ""
        }
      ></CardMedia>
      <CardContent>
        <Typography className={classes.cardTitle} variant="h5" component="h4">
          {project.title.length < 50
            ? project.title
            : project.title.substring(0, 50) + "..."}
        </Typography>
        <Box mt={1} />
        <Typography className={classes.cardInvested} display="inline">
          ${project.current_funding}
        </Typography>
        <Typography color="textSecondary" display="inline">
          {" / " + project.funding_goal}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Equity exchange: {project.equity * 100}% |{" " + fromNow}
        </Typography>
      </CardContent>
      <Divider />
      {showUser && (
        <CardContent>
          <Typography className={classes.cardInvested}>
            By {project.author}
          </Typography>
          <Typography color="textSecondary" display="inline">
            {project.location}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default ProjectCard;

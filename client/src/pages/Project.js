import React, { useState } from "react";

import {
  Typography,
  Container,
  Box,
  Avatar,
  Button,
  Card,
  CardMedia,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import projectMain from "../staticImages/projMain.png";
import projectInfo from "../staticImages/projInfo.png";
import profpic1 from "../staticImages/profpic1.png";

import NavBar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  userDividerTop: {
    marginTop: theme.spacing(3),
  },
  userDividerBottom: {
    marginBottom: theme.spacing(3),
  },
}));

const userStatic = {
  name: "Alexander Faa",
  location: "New York, NY",
};
const projectStatic = {
  title: "Urban Jungle",
  subtitle: "Coffee. Community",
  currentInvested: 29000,
  wantedInvestement: 40000,
  equity: 0.1,
  timeLeft: 44,
  backers: 50,
  photos: [projectMain, projectInfo],
  about: {
    main_about:
      "Kopi-luwak cultivar, cup organic cup americano trifecta aged. Iced, frappuccino white ristretto affogato a cappuccino. Iced whipped et  decaffeinated, americano, aromatic so cultivar sugar robusta. Aged decaffeinated, siphon redeye, organic frappuccino froth crema java",
    additional_info: [
      "Kopi-luwak cultivar, cup organic cup americano trifecta aged.",
      "Iced, frappuccino white ristretto affogato a cappuccino",
      "Iced whipped et black carajillo decaffeinated, americano, aromatic so cultivar sugar robusta",
    ],
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // You want everything in here to have lots of vertical space from each other, ideally without wrapping every single component in a spacing box
        <Box p={3} textAlign="left">
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Header(props) {
  const proj = props.project;
  return (
    <div>
      <Button variant="outlined" size="large">
        Crafts
      </Button>
      <Typography variant="h2">
        <Box fontWeight="fontWeightMedium">{proj.title}</Box>
      </Typography>
      <Typography color="textSecondary">{proj.subtitle}</Typography>
    </div>
  );
}

function ProjectPanel(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  const proj = props.project;

  return (
    <Card>
      <CardMedia component="img" src={proj.photos[0]}></CardMedia>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="ABOUT" {...a11yProps(0)} />
        <Tab label="TEAM" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h4" component="h3">
          About
        </Typography>
        <Box my={3}>
          <Typography>{proj.about.main_about}</Typography>
        </Box>
        <CardMedia component="img" src={proj.photos[1]}></CardMedia>
        <Box my={3}>
          <Typography variant="h4">Additional Info</Typography>
        </Box>
        <Box my={3}>
          <List>
            <ListItem key={0}>{proj.about.additional_info[0]}</ListItem>
            <ListItem key={1}>{proj.about.additional_info[1]}</ListItem>
            <ListItem key={2}>{proj.about.additional_info[2]}</ListItem>
          </List>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        TODO
      </TabPanel>
    </Card>
  );
}

function UserInfo(props) {
  const classes = useStyles();
  const proj = props.project;
  const user = props.user;

  return (
    <Card>
      <Typography display="inline">${proj.currentInvested}</Typography>
      <Typography color="textSecondary" display="inline">
        {" / " + proj.wantedInvestement}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Equity exchange: {proj.equity * 100}%
      </Typography>

      <Divider className={classes.userDividerTop} />
      <Grid
        container
        alignItems="center"
        justify="space-evenly"
        style={{ height: "50px" }}
      >
        <Typography variant="body2" color="textSecondary">
          {proj.backers} backers
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2" color="textSecondary">
          {proj.timeLeft} days to go
        </Typography>
      </Grid>

      <Divider className={classes.userDividerBottom} />

      <Avatar src={profpic1}></Avatar>
      {/* User Info */}
      <Box>
        <Typography variant="h6" component="p">
          {user.name}
        </Typography>
        <Typography color="textSecondary">{user.location}</Typography>
      </Box>

      {/* Send a message */}
      <Box>
        <Button size="large" variant="outlined" disableElevation>
          Send a Message
        </Button>
        <Button size="large" variant="outlined" disableElevation>
          Fund This Project
        </Button>
      </Box>
    </Card>
  );
}

function Project(props) {
  const classes = useStyles();

  return (
    <div>
      <NavBar />

      <Container align="center">
        <Header project={projectStatic} />
        <Grid container spacing={5}>
          <Grid item xs={9}>
            <ProjectPanel project={projectStatic} />
          </Grid>
          <Grid item xs={3}>
            <UserInfo user={userStatic} project={projectStatic} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Project;

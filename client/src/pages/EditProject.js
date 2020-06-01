import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  List,
  ListItem,
  Button,
  Divider,
  Container,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  TextField,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  drawer: {
    borderRight: "1px solid #d3d3d3",
    boxShadow: "10px 0 5px -2px #eee",
    height: "100%",
    width: "33%",
  },
  drawerPaper: {
    width: "33%",
  },
  tab: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    paddingLeft: "2rem",
  },
  tabIconRoot: {
    width: "0.5rem",
    height: "0.5rem",
  },
  listItemIconRoot: {
    minWidth: "15px",
    color: theme.primary,
  },
  sidebarTop: {
    marginLeft: "2rem",
    marginRight: "2rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  projectTitle: {
    marginTop: "2rem",
    fontSize: "20px",
  },
  listPadding: {
    padding: "0",
  },
  previewButton: {
    backgroundColor: theme.primary,
    color: theme.bgcolor,
    margin: "2rem 0",
  },
  deleteContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5rem",
  },
  mainContent: {
    flexGrow: 1,
    height: "100%",
    padding: "5%",
    maxWidth: theme.breakpoints.values.sm,
  },
  mainTitle: {
    fontWeight: 500,
    fontSize: 24,
  },
}));

function Basics(props) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.mainTitle} gutterBottom>
        Start with basics
      </Typography>

      <div>
        <Typography>Project Title</Typography>
        <TextField variant="outlined" fullWidth />
      </div>

      <div>
        <Typography>Subtitle</Typography>
        <TextField variant="outlined" fullWidth />
      </div>
    </>
  );
}

function Rewards(props) {
  return <div>Rewards</div>;
}

function Story(props) {
  return <div>Story</div>;
}

function People(props) {
  return <div>People</div>;
}

function Payment(props) {
  return <div>Payment</div>;
}

function EditProject(props) {
  const classes = useStyles();
  const tabs = ["Basics", "Rewards", "Story", "People", "Payment"];

  const renderTab = (currentTab) => {
    switch (currentTab) {
      case "Basics":
        return <Basics />;
      case "Rewards":
        return <Rewards />;
      case "Story":
        return <Story />;
      case "People":
        return <People />;
      case "Payment":
        return <Payment />;
      default:
        return <Basics />;
    }
  };

  // State variables
  const [currentTab, setCurrentTab] = useState("Basics");

  // Handlers
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} />

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        anchor="left"
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <Grid container direction="row" alignItems="stretch">
          <Grid item xs={12} className={classes.sidebarTop}>
            <Typography className={classes.projectTitle}>
              Urban Jungle: eco-friendly coffee shop
            </Typography>
            <Button
              className={classes.previewButton}
              size="medium"
              variant="contained"
              startIcon={<VisibilityIcon />}
            >
              PREVIEW
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider light={true} classes={{ root: classes.dividerRoot }} />
          </Grid>

          <Grid item xs={12}>
            <List classes={{ padding: classes.listPadding }}>
              {tabs.map((tab, index) => (
                <ListItem
                  button
                  onClick={() => handleTabChange(tab)}
                  divider
                  className={classes.tab}
                  key={index}
                >
                  <ListItemIcon
                    children={
                      <FiberManualRecordIcon
                        fontSize="small"
                        classes={{ root: classes.tabIconRoot }}
                      />
                    }
                    classes={{ root: classes.listItemIconRoot }}
                  />
                  <ListItemText primary={tab} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} className={classes.deleteContainer}>
            <Button startIcon={<DeleteIcon />}>DELETE PROJECT</Button>
          </Grid>
        </Grid>
      </Drawer>

      {/* Main content */}
      <main className={classes.mainContent}>
        <Toolbar />
        {renderTab(currentTab)}
      </main>
    </div>
  );
}

export default EditProject;

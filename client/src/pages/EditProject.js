import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  List,
  ListItem,
  Button,
  Divider,
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
import IndustriesDropdown from "../components/IndustriesDropdown";
import DropZoneUpload from "../components/DropZoneUpload";
import LoadingScreen from "../components/LoadingScreen";

import Basics from "../components/edit_project_tabs/Basics";
import Story from "../components/edit_project_tabs/Story";
import Funding from "../components/edit_project_tabs/Funding";
import Payment from "../components/edit_project_tabs/Payment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  drawer: {
    borderRight: "1px solid #d3d3d3",
    height: "100%",
    width: "33%",
  },
  drawerPaper: {
    boxShadow: "10px 0 5px -2px #eee",
    height: "100%",
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
  primaryButton: {
    backgroundColor: theme.primary,
    color: theme.bgcolor,
    margin: "2rem 0",
    minWidth: "150px",
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
}));

function EditProject(props) {
  const classes = useStyles();
  const userId = props.match.params.profileId;
  const projectId = props.match.params.projectId;
  const tabs = ["Basics", "Story", "Funding", "Payment"];

  const renderTab = (currentTab, project) => {
    const props = {
      project: project,
      handleTabChange: handleTabChange,
      userId: userId,
    };

    // Resets scroll to top of page for each tab render
    window.scrollTo(0, 0);

    switch (currentTab) {
      case "Basics":
        return <Basics {...props} />;
      case "Story":
        return <Story {...props} />;
      case "Funding":
        return <Funding {...props} />;
      case "Payment":
        return <Payment {...props} />;
      default:
        return <Basics {...props} />;
    }
  };

  // State variables
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("Basics");

  // Get current project info to prepopulate fields
  useEffect(() => {
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [projectId]);

  // Handlers
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  if (loading) return <LoadingScreen />;
  else
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
                className={classes.primaryButton}
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
                    disabled={tab !== currentTab}
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
          {renderTab(currentTab, project)}
        </main>
      </div>
    );
}

export default EditProject;

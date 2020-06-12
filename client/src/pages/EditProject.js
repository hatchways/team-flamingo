import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import query from "query-string";
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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";

import Project from "../pages/Project";

import LoadingScreen from "../components/LoadingScreen";
import DeleteProject from "../components/DeleteProject";

import Basics from "../components/edit_project_tabs/Basics";
import Story from "../components/edit_project_tabs/Story";
import Funding from "../components/edit_project_tabs/Funding";
import Payment from "../components/edit_project_tabs/Payment";
import Live from "../components/edit_project_tabs/Live";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  drawer: {
    borderRight: "1px solid #d3d3d3",
    height: "100%",
    width: "25%",
  },
  drawerPaper: {
    boxShadow: "10px 0 5px -2px #eee",
    height: "100%",
    width: "25%",
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

function PreviewProject(props) {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = (event) => {
    setDialogOpen(true);
    props.setOpenPreview(true);
  };
  const handleCloseDialog = (event) => {
    setDialogOpen(false);
    props.setOpenPreview(false);
  };

  return (
    <div>
      <Button
        className={classes.primaryButton}
        size="medium"
        variant="contained"
        startIcon={<VisibilityIcon />}
        onClick={handleOpenDialog}
      >
        PREVIEW
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Preview</DialogTitle>
        <DialogContent>
          <Project
            preview={true}
            project={props.project}
            user={{ id: props.userId }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditProject(props) {
  const classes = useStyles();
  const history = useHistory();
  const userId = props.match.params.profileId;
  const projectId = props.match.params.projectId;
  const tabs = ["Basics", "Story", "Funding", "Payment", "Live"];
  const searchTab = query.parse(props.location.search).tab;

  // State for preview

  const renderTab = (currentTab, project) => {
    const props = {
      project: project,
      handleTabChange: handleTabChange,
      handleEditProject: handleEditProject,
      openPreview: openPreview,
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
      case "Live":
        return <Live {...props} />;
      default:
        return <Basics {...props} />;
    }
  };

  // State variables
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(
    searchTab ? searchTab : "Basics"
  );
  const [openPreview, setOpenPreview] = useState(false);

  // Get current project info to prepopulate fields
  useEffect(() => {
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => history.push("/404"));
  }, [projectId, currentTab]);

  // Handlers
  const handleTabChange = (tab) => {
    props.history.push(window.location.pathname + "?tab=" + tab);
    setCurrentTab(tab);
  };
  const handleEditProject = (project) => {
    setProject(project);
  };

  if (loading) return <LoadingScreen />;
  else
    return (
      <div className={classes.root}>
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
                {project.title}
              </Typography>
              <PreviewProject
                project={project}
                setOpenPreview={setOpenPreview}
                userId={userId}
              />
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
              <DeleteProject projectId={projectId} userId={userId} />
            </Grid>
          </Grid>
        </Drawer>

        {/* Main content */}
        <main className={classes.mainContent}>
          {renderTab(currentTab, project)}
        </main>
      </div>
    );
}

export default EditProject;

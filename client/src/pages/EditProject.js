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
  CircularProgress,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import IndustriesDropdown from "../components/IndustriesDropdown";
import DropZoneUpload from "../components/DropZoneUpload";

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
  mainTitle: {
    fontWeight: 500,
    fontSize: 24,
  },
}));

function Basics(props) {
  const classes = useStyles();
  const projectId = props.match.params.projectId;
  const project = undefined;

  // State variables
  const [loading, setLoading] = useState(true);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [industries, setIndustries] = useState([]);
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [fundingGoal, setFundingGoal] = useState(0);

  // Get current project info to prepopulate fields
  useEffect(() => {
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then((res) => {
        project = res.data;
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [projectId, project]);

  const handleUpdateTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleUpdateSubtitle = (event) => {
    setSubtitle(event.target.value);
  };

  const handleUpdateIndustries = (industries) => {
    setIndustries(industries);
  };

  const handleUpdateLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleUpdateFundingGoal = (event) => {
    setFundingGoal(event.target.value);
  };

  const handleTriggerFileUpload = (event) => {
    setUpload(true);
  };

  const handleSave = useCallback((projectPics) => {
    // axios.put()
  });

  return (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={12}>
        <Typography className={classes.mainTitle} gutterBottom>
          Start with basics
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography>Project title</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleUpdateTitle}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Subtitle</Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={subtitle}
          onChange={handleUpdateSubtitle}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Industries</Typography>
        <IndustriesDropdown onStateChange={handleUpdateIndustries} />
      </Grid>

      <Grid item xs={12}>
        <Typography>Project location</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={location}
          onChange={handleUpdateLocation}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Download images</Typography>
        <DropZoneUpload
          upload={upload}
          uploadLocation="project"
          handleUploadSuccess={handleSave}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Funding goal amount</Typography>
        <TextField
          type="number"
          variant="outlined"
          fullWidth
          value={fundingGoal}
          onChange={handleUpdateFundingGoal}
          InputProps={{ startAdornment: "$ " }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleTriggerFileUpload}
          className={classes.primaryButton}
        >
          SAVE
        </Button>
      </Grid>
    </Grid>
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
        {renderTab(currentTab)}
      </main>
    </div>
  );
}

export default EditProject;

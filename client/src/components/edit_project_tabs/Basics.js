import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IndustriesDropdown from "../IndustriesDropdown";
import DropZoneUpload from "../DropZoneUpload";
import ForwardArrow from "../arrows/ForwardArrow";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    fontWeight: 500,
    fontSize: 24,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    color: theme.bgcolor,
    margin: "2rem 0",
    minWidth: "150px",
  },
}));

function Basics(props) {
  const classes = useStyles();
  const { userId, project } = props;

  // State variables
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [subtitle, setSubtitle] = useState(project.subtitle);
  const [industries, setIndustries] = useState(project.industry);
  const [location, setLocation] = useState(project.location);
  const [photos, setPhotos] = useState(project.photos);

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

  const handleTriggerFileUpload = (event) => {
    setUpload(true);
  };

  const handleForward = (event) => {
    props.handleTabChange("Story");
  };

  const handleSave = useCallback(
    (projectPhotos) => {
      axios
        .put(`/api/v1/users/${userId}/projects/${project.id}`, {
          title: title,
          subtitle: subtitle,
          location: location,
          industry: industries.map((industry) => industry.name),
          photos: projectPhotos ? photos.concat(projectPhotos) : photos,
        })
        .then((res) => props.handleTabChange("Story"))
        .catch((err) => console.log(err));
    },
    [title, subtitle, location, industries, userId, project]
  );

  useEffect(() => {
    const update = {
      title: title,
      subtitle: subtitle,
      location: location,
      industry: industries.map((industry) => industry.name),
    };
    if (props.openPreview) {
      props.handleEditProject({ ...project, ...update });
    }
  }, [props.openPreview]);

  return (
    <Grid container direction="row" spacing={4}>
      <ForwardArrow handleForward={handleForward} />
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
          projectId={project.id}
          initialPhotos={photos}
          handleUploadSuccess={handleSave}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleTriggerFileUpload}
          className={classes.primaryButton}
        >
          {project.live ? "SAVE" : "CONTINUE"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Basics;

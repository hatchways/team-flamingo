import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";

import DropZoneUpload from "../components/DropZoneUpload";
import ExpertiseChips from "../components/ExpertiseChips";

function EditProfileDialog(props) {
  // Used for initializing values
  const user = props.user;
  let currentPhotos = user.profile_pics;

  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);

  const [location, setLocation] = useState(user.location);
  const [description, setDescription] = useState(user.description);
  const [expertise, setExpertise] = useState(user.expertise);
  const [interest, setInterest] = useState(user.invest_in);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [angelco, setAngelco] = useState(user.angelco);

  const [upload, setUpload] = useState(false);

  const handleOpenDialog = (event) => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    setDialogOpen(false);
  };

  const handleUpdateExpertise = (expertise) => {
    setExpertise(expertise);
  };

  const handleUpdateInterest = (interest) => {
    setInterest(interest);
  };

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleUpdateLinkedin = (event) => {
    setLinkedin(event.target.value);
  };

  const handleUpdateAngelco = (event) => {
    setAngelco(event.target.value);
  };

  const handleTriggerFileUpload = (event) => {
    // Trigger photo upload to s3
    setUpload(true);

    setDialogOpen(false);
  };

  const handleSave = useCallback(
    (profilePics) => {
      if (profilePics) {
        currentPhotos = currentPhotos.concat(profilePics);
      }
      axios
        .put(`/api/v1/users/${user.id}/profile`, {
          profile_pics: currentPhotos,
          current_avatar: currentPhotos.length - 1,
          location: location,
          description: description,
          expertise: expertise,
          invest_in: interest,
          linkedin_profile: linkedin,
          angelco_profile: angelco,
        })
        .then((res) => {
          setUpload(false);
          props.handleUserEdited(res.data);
        })
        .catch((err) => console.log(err));
    },
    [location, description, expertise, linkedin, angelco, user]
  );

  return (
    <div>
      <Button onClick={handleOpenDialog} variant="outlined" color="primary">
        Edit profile
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography>Profile pics</Typography>
              <DropZoneUpload
                upload={upload}
                uploadLocation="user"
                handleUploadSuccess={handleSave}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Location</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={location || ""}
                onChange={handleUpdateLocation}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Description</Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description || ""}
                onChange={handleUpdateDescription}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Expertise</Typography>
              <ExpertiseChips
                onStateChange={handleUpdateExpertise}
                expertiseList={expertise}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Interested in</Typography>
              <ExpertiseChips
                onStateChange={handleUpdateInterest}
                expertiseList={interest}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Linkedin profile</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={linkedin || ""}
                onChange={handleUpdateLinkedin}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Angel.co profile</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={angelco || ""}
                onChange={handleUpdateAngelco}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>CANCEL</Button>

          <Button onClick={handleTriggerFileUpload}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileDialog;

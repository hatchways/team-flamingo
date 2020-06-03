import React, { useState } from "react";
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

function EditProfileDialog(props) {
  // Used for initializing values
  const user = props.user;

  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);

  const [profilePics, setProfilePics] = useState(user.profilePics);
  const [location, setLocation] = useState(user.location);
  const [description, setDescription] = useState(user.description);
  const [expertise, setExpertise] = useState(user.expertise);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [angelco, setAngelco] = useState(user.angelco);

  const [submit, setSubmit] = useState(false);

  const handleOpenDialog = (event) => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    setDialogOpen(false);
  };

  const handleSaveDialog = (event) => {
    // Trigger photo upload to s3
    setSubmit(true);

    // Then we want to make PUT request to edit profile
    axios.put(`/api/v1/users/${user.userId}/profile`, {
      // TODO: all all of the fields
    });
  };

  return (
    <div>
      <Button onClick={handleOpenDialog}>Edit profile</Button>
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
              <DropZoneUpload submit={submit} uploadLocation="user" />
            </Grid>

            <Grid item xs={12}>
              <Typography>Location</Typography>
              <TextField variant="outlined" fullWidth value={location} />
            </Grid>

            <Grid item xs={12}>
              <Typography>Description</Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Expertise</Typography>
              <TextField variant="outlined" fullWidth value={expertise} />
            </Grid>

            <Grid item xs={12}>
              <Typography>Linkedin profile</Typography>
              <TextField variant="outlined" fullWidth value={linkedin} />
            </Grid>

            <Grid item xs={12}>
              <Typography>Angel.co profile</Typography>
              <TextField variant="outlined" fullWidth value={angelco} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>CANCEL</Button>

          <Button onClick={handleSaveDialog}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileDialog;

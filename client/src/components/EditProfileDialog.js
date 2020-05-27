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
} from "@material-ui/core";

function EditProfileDialog(props) {
  // Populate fields with current values of users profile

  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (event) => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    setDialogOpen(false);
  };

  const handleEditDialog = (event) => {
    // First we need to get the current user id
    let userId;

    axios.get("/api/v1/me").then((res) => (userId = res.data.user_id));

    // Then we want to make PUT request to edit profile
    axios.put(`/api/v1/users/${userId}/profile`, {
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
          <Grid>
            <Grid item>
              <TextField label="Location" fullWidth />
            </Grid>

            <Grid item>
              <TextField label="Description" fullWidth multiline />
            </Grid>

            <Grid item>
              <TextField label="Expertise" fullWidth />
            </Grid>

            <Grid item>
              <TextField label="LinkedIn profile" fullWidth />
            </Grid>

            <Grid item>
              <TextField label="Angel.co profile" fullWidth />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>CANCEL</Button>

          <Button onClick={handleEditDialog}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileDialog;

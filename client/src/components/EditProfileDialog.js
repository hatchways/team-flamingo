import React, { useState } from "react";
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
  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (event) => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    setDialogOpen(false);
  };

  const handleEditDialog = (event) => {
    // TODO: make PUT request to profile endpoint
    console.log("Edit dialog");
  };

  return (
    <div>
      <Button onClick={handleOpenDialog}>Edit profile</Button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <Grid>
            <Grid item>
              <TextField label="Location" />
            </Grid>

            <Grid item>
              <TextField label="Description" />
            </Grid>

            <Grid item>
              <TextField label="Expertise" />
            </Grid>

            <Grid item>
              <TextField label="LinkedIn profile" />
            </Grid>

            <Grid item>
              <TextField label="Angel.co profile" />
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

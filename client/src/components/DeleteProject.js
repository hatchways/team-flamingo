import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteProject(props) {
  const projectId = props.projectId;
  const userId = props.userId;

  const [open, setOpen] = useState(false);

  const handleOpen = (event) => setOpen(true);

  const handleClose = (event) => setOpen(false);

  const handleDelete = (event) => {
    axios
      .delete(`/api/v1/users/${userId}/projects/${projectId}`)
      .then((res) => handleClose())
      .catch((err) => {
        console.log(err);
        handleClose();
      });
  };

  return (
    <>
      <Button onClick={handleOpen} startIcon={<DeleteIcon />}>
        DELETE PROJECT
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>

          <Button onClick={handleDelete}>DELETE PROJECT</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProject;

import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import axios from "axios";

function DropZoneUpload({
  uploadLocation,
  projectId,
  upload,
  initialPhotos,
  handleUploadSuccess,
}) {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = (event) => {
    setOpen(false);
  };
  const handleSave = (event) => {
    //Saving files to state for further use and closing Modal.
    setOpen(false);
    setFiles(event);
  };
  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleUpload = () => {
    if (!files.length) {
      return handleUploadSuccess(false);
    }
    let formData = new FormData();
    formData.set("folder", uploadLocation);
    formData.set("project_id", projectId ? projectId : null);

    if (files.length) {
      files.forEach((image) => {
        formData.append("image", image);
      });

      axios
        .post("/api/v1/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          handleUploadSuccess(res.data.storedAt);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else handleUploadSuccess("");
  };
  useEffect(() => {
    if (upload) handleUpload();
  }, [upload]);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="primary">
        Add Image
      </Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
      {files.map((file, index) => {
        return <p key={index}>{file.name}</p>;
      })}
    </div>
  );
}

export default DropZoneUpload;

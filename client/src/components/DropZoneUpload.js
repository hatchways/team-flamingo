import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import axios from "axios";

function DropZoneUpload(props) {
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
  const handleUpload = (event) => {
    event.preventDefault();

    // Will only ever grab the first file, doesn't support multiple uploads

    // https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios
    // CORE: form data & headers necessary
    var formData = new FormData();
    //
    console.log(files);
    formData.set("folder", props.uploadLocation);
    if (props.projectId) {
      formData.set("project_id", props.projectId);
    }
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
        console.log(res);
        console.log("res");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("err");
      });
  };
  return (
    <div>
      <Button onClick={handleOpen}>Add Image</Button>
      <Button onClick={handleUpload}>Submit</Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
      {files.map((file) => {
        return <p>{file.name}</p>;
      })}
    </div>
  );
}

export default DropZoneUpload;

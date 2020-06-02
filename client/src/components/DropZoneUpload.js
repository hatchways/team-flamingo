import React, { useState, useEffect } from "react";
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
  const handleUpload = () => {
    let formData = new FormData();
    formData.set("folder", props.uploadLocation);
    formData.set("project_id", props.projectId ? props.projectId : null);

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
  useEffect(() => {
    if (props.submit) handleUpload();
  }, [props.submit]);

  return (
    <div>
      <Button onClick={handleOpen}>Add Image</Button>
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

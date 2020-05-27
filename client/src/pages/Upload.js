import React, { useState, useRef } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";

// Core is necessary, everything else is secondary
// Core Items: fileInput, handleUpload, formData, <form>, <input>
// Currently only accepting png and jpeg

export default function UploadButton() {
  // CORE: Most important, object to hold file
  const fileInput = useRef(null);

  // CORE: Validation
  const [error, setError] = useState("");

  // USEFUL: For displaying name of the file
  const [filename, setFilename] = useState(
    localStorage.getItem("filename") ? localStorage.getItem("filename") : ""
  );
  const handleUpdateFilename = (event) => {
    setFilename(event.target.value);
    setError("");
    if (event.target.value) {
      setHasFile(true);
    }
  };

  // UNNECESSARY: Determine whether to show image
  const [hasFile, setHasFile] = useState(false);

  // CORE: file upload handler
  const handleUpload = (event) => {
    event.preventDefault();

    // Will only ever grab the first file, doesn't support multiple uploads
    const file = fileInput.current.files[0];
    if (file.name.length > 20) {
      return setError("Filename too big");
    }
    if (file.size > 5e6) {
      return setError("File must be less than 5MB");
    }

    // https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios
    // CORE: form data & headers necessary
    var formData = new FormData();
    formData.append("image", file);

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
        console.log(err.response.data);
        console.log("err");
      });
  };

  return (
    <div>
      <Container>
        {/* CORE: Form and input of type file are main drivers */}
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <input
            type="file"
            accept="image/png,image/jpeg"
            id="contained-button-file"
            multiple
            style={{ display: "none" }}
            onChange={handleUpdateFilename}
            ref={fileInput}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <Button type="submit" onSubmit={handleUpload} variant="contained">
            Submit
          </Button>
        </form>

        {/* USEFUL */}
        <h1>File: {filename}</h1>
        <h2>{error ? error : ""}</h2>
        <img
          src={hasFile ? URL.createObjectURL(fileInput.current.files[0]) : null}
        />
      </Container>
    </div>
  );
}

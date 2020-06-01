import React, { useState } from "react";
import { Container, Box, Typography } from "@material-ui/core";

import NavBar from "../components/Navbar";
import DropZoneUpload from "../components/DropZoneUpload";

export default function Upload() {
  const test_project_id = 1;
  return (
    <Container>
      <NavBar />
      <Box width="25%" mx="auto" style={{ height: "30px" }}>
        <Typography>Submit to Project {test_project_id}</Typography>
        <DropZoneUpload uploadLocation="project" projectId={test_project_id} />
        <Typography>Submit as Profile Avatar</Typography>
        <DropZoneUpload uploadLocation="user" projectId={null} />
      </Box>
    </Container>
  );
}

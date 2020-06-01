import React, { useState } from "react";
import { Container, Box, Button } from "@material-ui/core";

import NavBar from "../components/Navbar";
import DropZoneUpload from "../components/DropZoneUpload";

export default function Upload() {
  return (
    <Container>
      <NavBar />
      <Box width="25%" mx="auto" style={{ height: "30px" }}>
        <DropZoneUpload uploadLocation="project" projectId="1" />
      </Box>
    </Container>
  );
}

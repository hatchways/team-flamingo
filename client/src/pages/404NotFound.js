import React from "react";
import { Box, Typography } from "@material-ui/core";

function NotFound(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography>404: Oops! This page does not exist.</Typography>
    </Box>
  );
}

export default NotFound;

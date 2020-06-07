import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

function LoadingScreen(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress size={50} />
    </Box>
  );
}

export default LoadingScreen;

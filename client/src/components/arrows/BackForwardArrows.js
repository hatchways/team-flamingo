import React from "react";
import { Box, IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BackForwardArrows(props) {
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <IconButton onClick={props.handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton onClick={props.handleForward}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

export default BackForwardArrows;

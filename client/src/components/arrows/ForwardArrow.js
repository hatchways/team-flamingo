import React from "react";
import { Box, IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function ForwardArrow(props) {
  return (
    <Box display="flex" justifyContent="flex-end" width="100%">
      <IconButton onClick={props.handleForward}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

export default ForwardArrow;

import React from "react";
import { Box, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BackArrow(props) {
  return (
    <Box display="flex" justifyContent="flex-start" width="100%">
      <IconButton onClick={props.handleBack}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
}

export default BackArrow;

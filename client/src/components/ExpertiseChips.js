import React, { useState, useEffect } from "react";
import { Chip, Typography, TextField, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: "2px",
  },
}));

function ExpertiseChips(props) {
  const classes = useStyles();

  const [chips, setChips] = useState(props.expertiseList);
  const [expertise, setExpertise] = useState("");

  useEffect(() => {
    props.onStateChange(chips);
  }, [chips]);

  const handleAddChip = (event) => {
    if (expertise) {
      setChips((chips) => {
        // If the industry is already chosen, we don't want a duplicate
        if (chips.includes(expertise)) return [...expertise];
        else return [...chips, expertise];
      });
      setExpertise("");
    }
  };

  const handleRemoveChip = (chip) => {
    setChips((chips) => {
      return chips.filter((c) => c !== chip);
    });
  };

  const handleUpdateExpertise = (event) => {
    setExpertise(event.target.value);
  };

  return (
    <>
      <TextField
        value={expertise || ""}
        fullWidth
        variant="outlined"
        onKeyPress={(event) => {
          if (event.key === "Enter") handleAddChip();
        }}
        onChange={handleUpdateExpertise}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleAddChip}>
              <Add />
            </IconButton>
          ),
        }}
      />
      {chips.map((chip, index) => (
        <Chip
          label={chip}
          color="primary"
          variant="outlined"
          key={index}
          onDelete={() => handleRemoveChip(chip)}
          className={classes.chip}
        />
      ))}
    </>
  );
}

export default ExpertiseChips;

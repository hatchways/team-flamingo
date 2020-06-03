import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: "#000",
    marginLeft: "2em",
    fontWeight: "bold",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
  },
  chip: {
    margin: "2px",
  },
  marginTop: {
    marginTop: "2rem",
  },
}));

function IndustriesDropdown(props) {
  const classes = useStyles();

  const [industries, setIndustries] = useState([]);
  const [validIndustries, setValidIndustries] = useState([]);

  // Populate valid industries
  useEffect(() => {
    axios.get("/api/v1/industries").then((res) => {
      setValidIndustries(res.data);
    });
  }, []); // Only call on initial mount

  // Any time the industries state changes, we want to let the
  // parent component hook into this and pass them the new state
  useEffect(() => {
    props.onStateChange(industries);
  }, [industries]);

  // Internal handlers
  const handleAddIndustry = (event) => {
    const newIndustry = event.target.value;
    setIndustries((industries) => {
      // If the industry is already chosen, we don't want a duplicate
      if (industries.includes(newIndustry)) return [...industries];
      else return [...industries, newIndustry];
    });
  };

  const handleRemoveIndustry = (industry) => {
    setIndustries((industries) => {
      const index = industries.indexOf(industry);
      industries.splice(index, 1);
      return [...industries];
    });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel
          id="select-industries"
          classes={{ root: classes.inputLabel }}
        >
          SELECT INDUSTRIES
        </InputLabel>
        <Select
          value={industries}
          onChange={handleAddIndustry}
          labelId="select-industries"
          variant="outlined"
        >
          {validIndustries.map((industry) => {
            return (
              <MenuItem value={industry} key={industry.id}>
                {industry.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div className={classes.marginTop}>
        {industries.map((industry) => {
          return (
            <Chip
              label={industry.name}
              color="primary"
              variant="outlined"
              onDelete={() => handleRemoveIndustry(industry)}
              className={classes.chip}
              key={industry.id}
            />
          );
        })}
      </div>
    </>
  );
}

export default IndustriesDropdown;

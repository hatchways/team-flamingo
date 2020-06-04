import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

function FundStartupDialog({ project }) {
  const classes = useStyles();

  // State variables
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleOpenDialog = (event) => {
    setDialogOpen(true);
	};
	
	const handleCloseDialog = (event) => {
		setDialogOpen(false);
	}

  return (
    <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
			Fund This Project
		</Button>
		
		<Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="dialog-title">
			<DialogTitle id="dialog-title">Fund {project.title}</DialogTitle>

			<DialogContent>
				<Grid container>

				</Grid>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleCloseDialog} color="primary">
					Cancel
      	</Button>
				
        <Button onClick={handleClose} color="primary">
          Fund
        </Button>
			</DialogActions>
		</Dialog>
  );
}

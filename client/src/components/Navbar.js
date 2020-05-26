import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../staticImages/ic-logo.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "white",
    color: "black",
    elevation: 0,
  },
  logo: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  return (
    <Box mb={8}>
      <Container>
        <AppBar variant="outlined" className={classes.appBar} position="fixed">
          <Toolbar>
            <img
              className={classes.logo}
              src={logo}
              alt="Product Launch Logo"
            ></img>
            <Typography variant="h6" className={classes.title} component="h1">
              Product Launch
            </Typography>
            <Button color="inherit">Explore</Button>
            <Button color="inherit">Launch</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
}

export default NavBar;

import React from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import NavBar from "../components/Navbar";

import { validateEmail } from "../util/validateEmail";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "2rem",
    borderBottom: "2px",
    borderBottomColor: theme.primary,
  },
  signupLink: {
    marginLeft: "2px",
  },
  subtitle: {
    padding: "2rem",
  },
  divider: {
    backgroundColor: theme.primary,
    height: "2px",
    width: "10%",
    margin: "auto",
  },
  button: {
    backgroundColor: theme.primary,
    marginTop: "4rem",
    marginBottom: "4rem",
    color: theme.bgcolor,
    height: "3rem",
    width: "60%",
  },
}));

function Login(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    invalidEmail: false,
    invalidPassword: false,
    rememberMe: false,
    email: "",
    password: "",
  });

  const handleBlurEmail = (event) => {
    if (!validateEmail(state.email)) {
      setState({ ...state, invalidEmail: true });
    } else {
      setState({ ...state, invalidEmail: false });
    }
  };

  const handleUpdateEmail = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const handleRememberMe = (event) => {
    setState({ ...state, rememberMe: !state.rememberMe });
  };

  const handleUpdatePassword = (event) => {
    setState({ ...state, password: event.target.value });
  };

  const handleLogin = (event) => {
    /* TODO: Call backend */
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" className={classes.header}>
          <Box fontWeight="fontWeightMedium" fontSize={40}>
            Member login
          </Box>
        </Typography>

        <Divider fullWidth classes={{ root: classes.divider }} />

        <Typography
          variant="subtitle1"
          align="center"
          className={classes.subtitle}
        >
          <Box fontWeight="fontWeightMedium" fontSize={16}>
            New here?
            <Link to="/signup" className={classes.signupLink}>
              Sign up
            </Link>
          </Box>
        </Typography>

        <form autoComplete="off">
          <Grid
            container
            spacing={2}
            xs={12}
            direction="column"
            alignItems="stretch"
          >
            <Grid item>
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                error={state.invalidEmail}
                helperText={
                  state.invalidEmail ? "Please enter a valid email" : ""
                }
                onBlur={handleBlurEmail}
                onChange={handleUpdateEmail}
              ></TextField>
            </Grid>

            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                error={state.invalidPassword}
                helperText={state.invalidPassword ? "Password is invalid" : ""}
                onChange={handleUpdatePassword}
              ></TextField>
            </Grid>

            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
                onClick={handleRememberMe}
              />
            </Grid>

            <Grid item align="center">
              <Button
                className={classes.button}
                size="large"
                variant="contained"
                disabled={state.invalidEmail}
                onClick={handleLogin}
              >
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default Login;

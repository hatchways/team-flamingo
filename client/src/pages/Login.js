import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  FormHelperText,
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
  const history = useHistory();

  // State variables
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") ? true : false
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") ? localStorage.getItem("password") : ""
  );

  const handleBlurEmail = (event) => {
    setInvalidEmail(!validateEmail(email));
  };

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem("rememberMe", rememberMe);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.clear();
    }
  };

  const handleUpdateRememberMe = (event) => {
    setRememberMe(!rememberMe);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("/api/v1/login", {
        login_email: email,
        password: password,
      })
      .then((res) => {
        handleRememberMe();

        // TODO: redirect to profile specific to user
        history.push("/profile");
      })
      .catch((error) => {
        setInvalidLogin(true);
      });
  };

  const invalidLoginMessage = (
    <Grid item>
      <FormHelperText error>Invalid email or password</FormHelperText>
    </Grid>
  );

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" className={classes.header}>
          <Box fontWeight="fontWeightMedium" fontSize={40}>
            Member login
          </Box>
        </Typography>

        <Divider classes={{ root: classes.divider }} />

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

        <form autoComplete="off" onSubmit={handleLogin}>
          <Grid container spacing={2} direction="column" alignItems="stretch">
            {invalidLogin ? invalidLoginMessage : ""}

            <Grid item>
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                required
                value={email}
                error={invalidEmail}
                helperText={invalidEmail ? "Please enter a valid email" : ""}
                onBlur={handleBlurEmail}
                onChange={handleUpdateEmail}
              ></TextField>
            </Grid>

            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={handleUpdatePassword}
              ></TextField>
            </Grid>

            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" checked={rememberMe} />}
                label="Remember me"
                onClick={handleUpdateRememberMe}
              />
            </Grid>

            <Grid item align="center">
              <Button
                className={classes.button}
                size="large"
                variant="contained"
                type="submit"
                disabled={invalidEmail}
                onSubmit={handleLogin}
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

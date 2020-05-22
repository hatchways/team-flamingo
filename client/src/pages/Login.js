import React from "react";
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
              ></TextField>
            </Grid>

            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
              ></TextField>
            </Grid>

            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
            </Grid>

            <Grid item align="center">
              <Button
                className={classes.button}
                size="large"
                variant="contained"
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
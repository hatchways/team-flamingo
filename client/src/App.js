import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import UserDashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/profile" component={UserDashboard} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

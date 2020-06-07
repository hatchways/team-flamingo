import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import UserDashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import FundProject from "./pages/FundProject";
import NotFound from "./pages/404NotFound";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/profile/:id/projects/create"
            component={CreateProject}
          />
          <Route
            path="/profile/:profileId/projects/:projectId/edit"
            component={EditProject}
          />
          <Route path="/profile" component={UserDashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/project/:projectId/fund" component={FundProject} />
          <Route path="/project" component={Project} />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

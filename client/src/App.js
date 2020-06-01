import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import UserDashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Upload from "./pages/Upload";

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
          <Route path="/profile" component={UserDashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/upload" component={Upload} />
          <Route path="/project" component={Project} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import UserDashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Main from "./pages/Main";
import Logout from "./pages/Logout";
import Payment from "./pages/Payment";
import EditProject from "./pages/EditProject";

import "./App.css";

function App() {
  // True: Check for user, False: Don't Check for User
  const [checkForUser, setCheckForUser] = useState(true);
  function handleUserChange(val) {
    setCheckForUser(val);
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          path="/"
          render={(props) => (
            <Main
              {...props}
              handleUserChange={handleUserChange}
              checkForUser={checkForUser}
            />
          )}
        />
        <Switch>
          <Route
            path="/profile/:profileId/projects/:projectId/edit"
            component={EditProject}
          />
          <Route
            path="/profile/:id/projects/create"
            component={CreateProject}
          />

          <Route path="/profile/:id" component={UserDashboard} />
          <Route path="/project" component={Project} />

          <Route
            path="/signup"
            // component={Login}
            render={(props) => (
              <Signup {...props} handleUserChange={handleUserChange} />
            )}
          />
          <Route
            path="/login"
            // component={Login}
            render={(props) => (
              <Login {...props} handleUserChange={handleUserChange} />
            )}
          />
          <Route
            path="/logout"
            render={(props) => (
              <Logout {...props} handleUserChange={handleUserChange} />
            )}
          />
          <Route path="/payment" component={Payment} />
          <Route path="/:404">
            <h1>404 Page Not Found</h1>
          </Route>
          <Route path="/">
            <h1>Home Page</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

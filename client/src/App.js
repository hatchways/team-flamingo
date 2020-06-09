import React, { useState, useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  // True: Check for user, False: Don't Check for User
  const [isCustomized, setIsCustomized] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuth") ? true : false
  );
  function handleUserChange({ isCustom, isAuth }) {
    setIsCustomized(isCustom);
    setIsAuthenticated(isAuth);
    localStorage.setItem("isAuth", isAuth);
  }
  useEffect(() => {
    if (isAuthenticated) {
      handleUserChange({ isCustom: false, isAuth: true });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          path="/"
          render={(props) => (
            <Main
              {...props}
              handleUserChange={handleUserChange}
              isCustomized={isCustomized}
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

          <ProtectedRoute
            path="/profile/:id"
            component={UserDashboard}
            isAuthenticated={isAuthenticated}
          />
          <Route path="/project" component={Project} />

          <Route
            path="/signup"
            render={(props) => (
              <Signup {...props} handleUserChange={handleUserChange} />
            )}
          />
          <Route
            path="/login"
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

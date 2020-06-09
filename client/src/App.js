import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import ProtectedRoute from "./components/ProtectedRoute";

import UserDashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Main from "./pages/Main";
import Logout from "./pages/Logout";
import Payment from "./pages/Payment";
import EditProject from "./pages/EditProject";
import Explore from "./pages/Explore";

import "./App.css";

function App() {
  // True: User signed in, False: User Logged Out
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuth") ? true : false
  );
  function handleUserLog(isAuth) {
    setIsAuthenticated(isAuth);
    localStorage.setItem("isAuth", isAuth);
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          path="/"
          render={(props) => (
            <Main
              {...props}
              handleUserLog={handleUserLog}
              isAuthenticated={isAuthenticated}
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
              <Signup {...props} handleUserLog={handleUserLog} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} handleUserLog={handleUserLog} />
            )}
          />
          <Route
            path="/logout"
            render={(props) => (
              <Logout {...props} handleUserLog={handleUserLog} />
            )}
          />
          <Route path="/payment" component={Payment} />
          <Route path="/:404">
            <h1>404 Page Not Found</h1>
          </Route>
          <Route path="/" component={Explore} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

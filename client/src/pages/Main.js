import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";

function Main(props) {
  const [currentUser, setCurrentUser] = useState(false);
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const checkForUser = props.checkForUser;
    const handleUserChange = props.handleUserChange;
    async function fetchData() {
      if (!checkForUser) {
        return;
      }
      try {
        console.log("fetching info for navbar");
        const res = await axios(`/api/v1/me`);
        setUserProfile(`/profile/${res.data.user_id}`);
        setCurrentUser(res.data);
      } catch (err) {
        console.log("navbar error:");
        console.dir(err.response.data.error);
        setCurrentUser(false);
      }
      handleUserChange(false);
    }
    fetchData();
  }, [props.checkForUser, props.handleUserChange]);

  return <NavBar currentUser={currentUser} userProfile={userProfile} />;
}

export default Main;

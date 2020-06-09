import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";

function Main(props) {
  const [currentUser, setCurrentUser] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const { isCustomized, handleUserChange } = props;

  useEffect(() => {
    async function fetchData() {
      if (isCustomized) {
        return;
      }
      try {
        const res = await axios(`/api/v1/me`);
        setUserProfile(`/profile/${res.data.user_id}`);
        setCurrentUser(res.data);
        handleUserChange({ isCustom: true, isAuth: true });
      } catch (err) {
        console.dir(err.response.data.error);
        setCurrentUser(false);
        handleUserChange({ isCustom: true, isAuth: false });
      }
    }
    fetchData();
  }, [isCustomized, handleUserChange]);

  return <NavBar currentUser={currentUser} userProfile={userProfile} />;
}

export default Main;

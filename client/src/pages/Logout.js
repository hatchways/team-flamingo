import axios from "axios";

import { useHistory } from "react-router-dom";

function Logout(props) {
  const history = useHistory();
  async function logout() {
    try {
      console.log("logging out");
      await axios.post(`/api/v1/logout`);
      props.handleUserChange(true);
      // TODO: snackbar with "successful logout"
      history.push("/");
    } catch (err) {
      console.log("logout error:");
      console.dir(err.response.data.error);
    }
  }
  logout();

  return null;
}

export default Logout;

import axios from "axios";

import { useHistory } from "react-router-dom";

function Logout(props) {
  const history = useHistory();
  async function logout() {
    try {
      await axios.post(`/api/v1/logout`);
      props.handleUserChange({ isCustom: false, isAuth: false });
      // TODO: snackbar with "successful logout"
      history.push("/");
    } catch (err) {
      console.dir(err.response.data.error);
    }
  }
  logout();

  return null;
}

export default Logout;

import axios from "axios";
axios.defaults.withCredentials = true;
var API_URL = "/api/user/";
import { DEBUG } from "../constants/debug";
DEBUG ? (API_URL = "http://localhost:8080" + API_URL) : API_URL;

// Services
export async function requestAllUsers() {
  const URL = API_URL + "allusers";
  return axios.get(URL).then((data) => {
    let allUsers = [];
    data.data.map((user) => {
      allUsers.push({
        value: user._id, // FullUser ID.
        label: user.firstname + " " + user.lastname,
      });
    });
    return allUsers;
  });
}

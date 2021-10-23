import axios from "axios";
axios.defaults.withCredentials = true;
let API_URL = "/api/cities";
import { DEBUG } from "../constants/debug";
DEBUG ? (API_URL = "http://localhost:8080" + API_URL) : API_URL;

export async function getCities() {
  return axios.get(API_URL);
}

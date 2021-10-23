import axios from "axios";
axios.defaults.withCredentials = true;
let API_URL = "/api/auth/";
import { DEBUG } from "../constants/debug";
DEBUG ? (API_URL = "http://localhost:8080" + API_URL) : API_URL;

export async function loginApi(user) {
  return axios.post(API_URL + "login", user);
}

export async function registerApi(userObject) {
  return axios.post(API_URL + "register", userObject);
}

export async function logoutApi() {
  return axios.post(API_URL + "logout");
}

export async function loggedApi() {
  return axios.get(API_URL + "logged");
}

export async function validatePasswordApi(password) {
  return axios.post(API_URL + "validatepass", { password });
}

export async function UpdateUserApi(user) {
  return axios.put(API_URL + "updateprofile", user);
}

export async function contactApi(messageObject) {
  return axios.post(API_URL + "contact", messageObject);
}

export async function forgotPassword_EmailApi(messageObject) {
  return axios.post(API_URL + "forgotpassword", messageObject);
}
export async function forgotPassword_CodeApi(messageObject) {
  return axios.post(API_URL + "validateforgotpassword", messageObject);
}

export async function forgotPassword_PassApi(messageObject) {
  return axios.post(API_URL + "changeforgotpassword", messageObject);
}

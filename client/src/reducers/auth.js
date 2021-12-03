import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGGED_VALIDATE_SUCCESS,
  LOGGED_VALIDATE_FAIL,
  USER_UPDATE_SUCCEED,
  FRIENDSHIP_LOADED_SUCCEED,
  FRIENDSHIP_LOADED_FAIL,
} from "../constants/authTypes";
const loggedOnStart = localStorage.logged == "true";
const initialState = { isLoggedIn: loggedOnStart, isAdmin: false }; // isLoggedIn is a bool type.

export default function authFunc(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("logged", true);
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("logged");
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("logged");
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      };
    case LOGGED_VALIDATE_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        isAdmin: payload.user.role == "admin",
      };
    case LOGGED_VALIDATE_FAIL:
      localStorage.removeItem("logged");
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      };
    case USER_UPDATE_SUCCEED:
      return {
        ...state,
        user: payload.user,
      };
    case FRIENDSHIP_LOADED_SUCCEED:
      return {
        ...state,
        friendships: payload.friendships,
      };
    default:
      return state;
  }
}

import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { eventsById } from "./calendar";
import views from "./views";
export default combineReducers({
  auth,
  message,
  eventsById,
  views,
});

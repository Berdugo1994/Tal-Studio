import axios from "axios";
axios.defaults.withCredentials = true;
var API_URL = "/api/admin/";
import { DEBUG } from "../constants/debug";
DEBUG ? (API_URL = "http://localhost:8080" + API_URL) : API_URL;
import { handleTraining, handleAvailable } from "./calendar.service";

// Services
export function requestGlobalNextEventsDates() {
  const URL = API_URL + "next_events_dates";
  return axios.get(URL).then((data) => {
    return Promise.resolve(data.data);
  });
}

export function adminRequestEventsInRange() {
  const URL = API_URL + "totalevents";
  return axios.get(URL).then((data) => {
    let events = [];
    [...data.data.trainings].map((training) => {
      events.push(handleTraining(training));
    });
    data.data.available.future.map((availableEvent) => {
      events.push(handleAvailable(availableEvent));
    });
    return Promise.resolve(events);
  });
}

export function cancelAvailable(request) {
  const URL = API_URL + "cancelavailable";
  return axios.post(URL, request).then((data) => {
    return Promise.resolve(data);
  });
}

export function adminAddEvents(eventsList) {
  const URL = API_URL + "available/add";
  return axios.post(URL, eventsList).then((data) => {
    return data;
  });
}

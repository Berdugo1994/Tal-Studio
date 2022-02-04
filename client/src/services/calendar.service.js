import axios from "axios";
axios.defaults.withCredentials = true;
var API_URL = "/api/";
import { DEBUG } from "../constants/debug";
DEBUG ? (API_URL = "http://localhost:8080" + API_URL) : API_URL;
export function requestEventsInRange() {
  const URL = API_URL + "events/personalcalendar";
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
// Reserve a training by id

export function reserveTraining(request) {
  const URL = API_URL + "user/addtraining";
  return axios.post(URL, request);
}

export function getMyNextTraining() {
  const URL = API_URL + "trainings/mynexttraining";
  return axios.get(URL).then((data) => {
    return Promise.resolve(data);
  });
}

export function getThisMonthTrainingsNumber() {
  const URL = API_URL + "events/pastdays";
  return axios.get(URL).then((data) => {
    return Promise.resolve(data);
  });
}

// Reserve a training by id

export function cancelTraining(request) {
  const URL = API_URL + "user/canceltraining";
  return axios.post(URL, request).then((data) => {
    return Promise.resolve(data);
  });
}

//Helpers
export function handleTraining(training) {
  const event = {
    participant_ids: training.participant_ids,
    participant_names: training.participant_names,
    id: training._id,
    description: training.description,
    title: training.title,
  };
  setStartEnd(event, training.date);
  event.title = "אימון";
  event.classNames = ["training-day"];
  return event;
}
export function handleAvailable(availableEvent) {
  const event = {
    title: availableEvent.title,
    id: availableEvent._id,
    description: availableEvent.description,
  };
  setStartEnd(event, availableEvent.date);
  event.classNames = ["available-day"];
  return event;
}

export function setStartEnd(event, date_str) {
  //Here cast from date(DB) to start
  let start = new Date(
    date_str.toLocaleString("en-US", {
      timeZone: "Asia/Jerusalem",
    })
  );
  let end = new Date();
  end.setDate(start.getDate() + 1);
  end.setTime(start.getTime() + 1 * 60 * 60 * 1000);
  event.start = start;
  event.end = end;
}

export function updateTraining(training) {
  const URL = API_URL + "user/updatetraining";
  return axios.put(URL, training).then((data) => {
    return Promise.resolve(data);
  });
}

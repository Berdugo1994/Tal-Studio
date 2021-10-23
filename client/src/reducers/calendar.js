import { hashById } from "../utils/calendarUtils";
// const initialState = { calendarDisplay: "month" };
export function eventsById(eventsById = {}, action) {
  switch (action.type) {
    case "RECEIVE_EVENTS":
      return hashById(action.plainEventObjects);
    default:
      return eventsById;
  }
}

import {
  requestEventsInRange,
  reserveTraining,
  cancelTraining,
  updateTraining,
} from "../services/calendar.service";
import {
  adminRequestEventsInRange,
  cancelAvailable,
} from "../services/admin.service"; // THIS IS FROM ADMIN SERVICE!
import {
  TRAINING_DELETED_SUCCESSFULLY,
  TRAINING_DELETED_FAIL,
} from "../constants/authTypes";

import { filterEvents, filterEventsAdmin } from "../utils/calendarUtils";
import { adminAddEvents } from "../services/admin.service";

export const requestEvents = () => {
  return (dispatch) => {
    return requestEventsInRange().then((plainEventObjects) => {
      const events = filterEvents(plainEventObjects);
      dispatch({
        type: "RECEIVE_EVENTS",
        plainEventObjects: events,
      });
    });
  };
};

export const reserveUserTraining = (req) => {
  return (dispatch) => {
    return reserveTraining(req)
      .then(() => {
        return requestEventsInRange().then((plainEventObjects) => {
          dispatch({
            type: "RECEIVE_EVENTS",
            plainEventObjects,
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };
};

export const updateTrainingAction = (req) => {
  return (dispatch) => {
    return updateTraining(req).then((plainEventObjects) => {
      return requestEventsInRange().then((plainEventObjects) => {
        dispatch({
          type: "RECEIVE_EVENTS",
          plainEventObjects,
        });
      });
    });
  };
};

export const cancelTrainingAction = (req) => {
  return (dispatch) => {
    return cancelTraining(req).then(
      (data) => {
        console.log("data is " + data);
        console.log("data is " + data.status);
        if (data.status === 200) {
          // dispatch({
          //   type: TRAINING_DELETED_SUCCESSFULLY,
          // });
          return Promise.resolve();
        }
      },
      (err) => {
        console.log("err is " + err);
        console.log("err is " + err.status);
        let payload = { message: "" };
        if (
          err.response &&
          (err.response.status === 410 || err.response.status === 401)
        ) {
          payload.message = err.response.data;
          dispatch({
            type: TRAINING_DELETED_FAIL,
            payload: payload,
          });
        } else {
          payload.message = "בעיה בשרת. נסו לבצע שוב מאוחר יותר";
          dispatch({
            type: TRAINING_DELETED_FAIL,
            payload: payload,
          });
        }
        return Promise.reject();
      }
    );
  };
};

//Admin Action
export const adminAddAvailableAction = (eventList) => {
  return (dispatch) => {
    const req = { events: [] };
    let eventArray = eventList.map((e) => {
      req.events.push({ date: e.toISOString() });
    });
    return adminAddEvents(req).then((data) => {
      return adminRequestEventsInRange().then(() => {
        dispatch({
          type: "AVAILABLE_SAVED",
        });
        return true;
      });
    });
  };
};

export const adminRequestEvents = () => {
  return (dispatch) => {
    return adminRequestEventsInRange().then((plainEventObjects) => {
      const events = filterEventsAdmin(plainEventObjects);
      dispatch({
        type: "RECEIVE_EVENTS",
        plainEventObjects: events,
      });
    });
  };
};

export const cancelAvailableAction = (req) => {
  return (dispatch) => {
    return cancelAvailable(req).then(
      (data) => {
        if (data.status === 200) {
          // dispatch({
          //   type: TRAINING_DELETED_SUCCESSFULLY,
          // });
          return Promise.resolve();
        }
      },
      (err) => {
        let payload = { message: "" };
        if (
          err.response &&
          (err.response.status === 410 || err.response.status === 401)
        ) {
          payload.message = err.response.data;
          dispatch({
            type: TRAINING_DELETED_FAIL,
            payload: payload,
          });
        } else {
          payload.message = "בעיה בשרת. נסו לבצע שוב מאוחר יותר";
          dispatch({
            type: TRAINING_DELETED_FAIL,
            payload: payload,
          });
        }
      }
    );
  };
};

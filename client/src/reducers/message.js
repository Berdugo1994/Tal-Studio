import { SUCCESS, INFO, WARNING, ERROR } from "../constants/materialTypes";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants/messageTypes";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGGED_VALIDATE_FAIL,
  PASSWORD_VALIDATE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCEED,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
  TRAINING_DELETED_SUCCESSFULLY,
  TRAINING_DELETED_FAIL,
} from "../constants/authTypes";
import { AVAILABLE_SAVED } from "../constants/calendar";
const initialState = {
  messageStatus: "",
  messageContent: "",
  messageCounter: 0,
};

export default function messFunc(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "ההרשמה התבצעה בהצלחה",
      };
    case REGISTER_FAIL:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: "ההרשמה נכשלה: " + payload.message,
      };
    case LOGIN_SUCCESS:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "ההתחברות התבצעה בהצלחה",
      };
    case LOGIN_FAIL:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: "ההתחברות נכשלה: " + payload.message,
      };
    case LOGOUT_SUCCESS:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "ההתנקות התבצעה בהצלחה",
      };
    case LOGOUT_FAIL:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: "ההתנתקות נכשלה: " + payload.message,
      };
    case SET_MESSAGE:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: payload.status,
        messageContent: payload.message,
      };
    case CLEAR_MESSAGE:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: "",
        messageContent: "",
      };
    case LOGGED_VALIDATE_FAIL:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: payload.message,
      };
    case PASSWORD_VALIDATE_FAIL:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: payload.message,
      };
    case USER_UPDATE_FAIL:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: payload.message,
      };
    case USER_UPDATE_SUCCEED:
      state.messageCounter++;
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "הפרופיל עודכן בהצלחה",
      };
    case AVAILABLE_SAVED:
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "האימון נשמר",
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "הפרטים נשלחו, אצור קשר בהקדם",
      };
    case CONTACT_FAIL:
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: payload.message,
      };
    case TRAINING_DELETED_SUCCESSFULLY:
      return {
        ...state,
        messageStatus: SUCCESS,
        messageContent: "האימון נמחק בהצלחה",
      };
    case TRAINING_DELETED_FAIL:
      return {
        ...state,
        messageStatus: ERROR,
        messageContent: payload.message,
      };
    default:
      return state;
  }
}

import { CLEAR_MESSAGE, SET_MESSAGE } from "../constants/messageTypes";

export const setMessageAction = (payload) => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    payload: payload,
  });
};
export const clearMessageAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};

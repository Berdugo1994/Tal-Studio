import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGGED_VALIDATE_SUCCESS,
  LOGGED_VALIDATE_FAIL,
  PASSWORD_VALIDATE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCEED,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
} from "../constants/authTypes";

//Actions
import {
  loginApi,
  registerApi,
  logoutApi,
  loggedApi,
  validatePasswordApi,
  UpdateUserApi,
  contactApi,
} from "../services/auth.service";

export const loginAction = (user) => (dispatch) => {
  return loginApi(user).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      return Promise.resolve(data);
    },
    (error) => {
      let message = "";
      if (error.response == undefined) {
        message = "תקלה בשרת";
      } else if (error.response.status === 401) {
        message = error.response.data;
      } else {
        message = "שגיאה מספר " + error.response.status;
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: { message },
      });
      return Promise.reject();
    }
  );
};

export const registerAction = (userObject) => (dispatch) => {
  return registerApi(userObject).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      return Promise.resolve(data);
    },
    (err) => {
      let payload = { message: "" };
      if (err.response.status === 409) {
        payload.message = "כתובת הדוא'ל קיימת במערכת";
      } else if (err.response.status === 408) {
        payload.message = "מספר הטל' קיים במערכת";
      } else if (err.response.status === 401) {
        payload.message = "פרטים אינם תקינים";
      } else {
        payload.message = "בעיה בשרת. אנא נסו מאוחר יותר";
      }
      dispatch({
        type: REGISTER_FAIL,
        payload: payload,
      });
      return Promise.reject(error);
    }
  );
};

export const logoutAction = () => (dispatch) => {
  return logoutApi().then(
    () => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    },
    (err) => {
      let payload = { message: "" };
      if (err.response && err.response.status === 402) {
        payload.message = "הינך כבר מנותק";
      } else {
        payload.message = "בעיה בשרת. אנא נסו מאוחר יותר";
      }
      dispatch({
        type: LOGOUT_FAIL,
        payload: payload,
      });
      return Promise.reject(err);
    }
  );
};

export const validateLoggedAction = () => (dispatch) => {
  return loggedApi().then(
    (data) => {
      dispatch({
        type: LOGGED_VALIDATE_SUCCESS,
        payload: { user: { ...data.data } },
      });
    },
    (err) => {
      let payload = { message: "" };
      if (err.response && err.response.status === 403) {
        payload.message = "עבר זמן מאז ההתחברות האחרונה.. יש להתחבר מחדש";
      } else if (err.response && err.response.status === 404) {
        payload.message = "לא היית מחובר. יש להתחבר מחדש";
      } else {
        payload.message = "בעיה בשרת. נסו להתחבר שוב מאוחר יותר";
      }
      dispatch({
        type: LOGGED_VALIDATE_FAIL,
        payload: payload,
      });
      return Promise.reject(err);
    }
  );
};

export const validatePasswordAction = (password) => (dispatch) => {
  return validatePasswordApi(password).then(
    (data) => {
      if (data.status === 200) return Promise.resolve();
    },
    (err) => {
      let payload = { message: "" };
      if (err.response && err.response.status === 401) {
        payload.message = err.response.data;
        dispatch({
          type: LOGGED_VALIDATE_FAIL,
          payload: payload,
        });
      } else if (err.response && err.response.status === 402) {
        payload.message = err.response.data;
        dispatch({
          type: PASSWORD_VALIDATE_FAIL,
          payload: payload,
        });
      } else {
        payload.message = "בעיה בשרת. נסו להתחבר שוב מאוחר יותר";
        dispatch({
          type: PASSWORD_VALIDATE_FAIL,
          payload: payload,
        });
      }
      return Promise.reject(err);
    }
  );
};

export const updateUserAction = (userObject) => (dispatch) => {
  return UpdateUserApi(userObject).then(
    (data) => {
      if (data.status === 200) {
        dispatch({
          type: USER_UPDATE_SUCCEED,
          payload: { user: { ...data.data } },
        });
        return Promise.resolve();
      }
    },
    (err) => {
      let payload = { message: "" };
      if (err.response && err.response.status === 400) {
        payload.message = err.response.data.msg;
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: payload,
        });
      } else if (err.response && err.response.status === 401) {
        payload.message = err.response.data;
        dispatch({
          type: LOGGED_VALIDATE_FAIL,
          payload: payload,
        });
      } else if (err.response && err.response.status === 409) {
        payload.message = err.response.data;
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: payload,
        });
      } else {
        payload.message = "בעיה בשרת. נסו להתחבר שוב מאוחר יותר";
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: payload,
        });
      }
      return Promise.reject(err);
    }
  );
};

export const contactAction = (messageObject) => (dispatch) => {
  return contactApi(messageObject).then(
    (data) => {
      dispatch({
        type: CONTACT_SUCCESS,
      });

      return Promise.resolve(data);
    },
    (err) => {
      let payload = { message: "" };
      if (err.response && err.response.status === 400) {
        payload.message = err.response.data.msg;
      } else if (err.response && err.response.status === 401) {
        payload.message = "פרטים אינם תקינים";
      } else {
        payload.message = "בעיה בשרת. אנא נסו מאוחר יותר";
      }
      dispatch({
        type: CONTACT_FAIL,
        payload: payload,
      });
      return Promise.reject(err);
    }
  );
};

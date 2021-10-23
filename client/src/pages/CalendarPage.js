import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarComp from "../components/containers/pageComp/Calendar";
import { Redirect } from "react-router";
import { INFO } from "../constants/materialTypes";

//Actions
import { setMessageAction } from "../actions/message";

const CalendarPage = ({ isLogged, setMessageAction }) => {
  useEffect(() => {
    if (!isLogged) {
      setMessageAction({
        status: INFO,
        message: "על מנת לצפות בלוח שנה יש להתחבר",
      });
    }
  }, []);
  return <>{!isLogged ? <Redirect to='/login' /> : <CalendarComp />}</>;
};
CalendarPage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setMessageAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { setMessageAction })(CalendarPage);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminCalendarComp from "../components/containers/pageComp/AdminCalendar";
import { Redirect } from "react-router";
import { INFO } from "../constants/materialTypes";

//Actions
import { setMessageAction } from "../actions/message";

const AdminCalendarPage = ({ isLogged, setMessageAction }) => {
  useEffect(() => {
    if (!isLogged) {
      //TODO: check if admin
      setMessageAction({
        status: INFO,
        message: "על מנת לצפות בלוח שנה יש להתחבר",
      });
    }
  }, []);
  return <>{!isLogged ? <Redirect to='/login' /> : <AdminCalendarComp />}</>;
};
AdminCalendarPage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setMessageAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { setMessageAction })(
  AdminCalendarPage
);

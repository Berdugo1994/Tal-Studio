import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminCalendarComp from "../components/containers/pageComp/AdminCalendar";
import { Redirect } from "react-router";
import { INFO } from "../constants/materialTypes";
import { friendshipsLoadAction } from "../actions/auth";

//Actions
import { setMessageAction } from "../actions/message";

const AdminCalendarPage = ({
  isAdmin,
  setMessageAction,
  friendshipsLoadAction,
}) => {
  useEffect(() => {
    if (!isAdmin) {
      setMessageAction({
        status: INFO,
        message: "על מנת לצפות בלוח המנהל יש להיות מחובר כמנהל",
      });
      return;
    }
    friendshipsLoadAction();
  }, []);
  return <>{!isAdmin ? <Redirect to='/home' /> : <AdminCalendarComp />}</>;
};
AdminCalendarPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setMessageAction: PropTypes.func.isRequired,
  friendshipsLoadAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, {
  setMessageAction,
  friendshipsLoadAction,
})(AdminCalendarPage);

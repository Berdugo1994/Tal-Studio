import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminComp from "../components/containers/pageComp/Admin";
import { Redirect } from "react-router";
import { INFO } from "../constants/materialTypes";

//Actions
import { setMessageAction } from "../actions/message";

const AdminPage = ({ isAdmin, setMessageAction }) => {
  useEffect(() => {
    if (!isAdmin) {
      setMessageAction({
        status: INFO,
        message: "על מנת לצפות בלוח המנהל יש להיות מחובר כמנהל",
      });
      return;
    }
  }, []);
  return <>{!isAdmin ? <Redirect to='/home' /> : <AdminComp />}</>;
};
AdminPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setMessageAction: PropTypes.func.isRequired,
  friendshipsLoadAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, {
  setMessageAction,
})(AdminPage);

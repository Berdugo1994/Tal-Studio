import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginComp from "../components/containers/pageComp/Login";
import { Redirect } from "react-router-dom";
import { INFO } from "../constants/materialTypes";

//Actions
import { setMessageAction } from "../actions/message";

//Styles
const Login = ({ isLogged, setMessageAction }) => {
  let startedLogged = true;
  useEffect(() => {
    if (startedLogged && isLogged) {
      setMessageAction({
        status: INFO,
        message: "הינך מחובר",
      });
    } else {
      startedLogged = false;
    }
  }, []);
  return <>{isLogged ? <Redirect to='/home' /> : <LoginComp />}</>;
};

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setMessageAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { setMessageAction })(Login);

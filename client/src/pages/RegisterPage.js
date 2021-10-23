import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterComp from "../components/containers/pageComp/Register";
import { Redirect } from "react-router-dom";
import { setMessageAction } from "../actions/message";
import { INFO } from "../constants/materialTypes";
const Register = ({ isLogged, setMessageAction }) => {
  let startedregistered = true;
  useEffect(() => {
    if (startedregistered && isLogged) {
      setMessageAction({
        status: INFO,
        message: "אנא בצעו התנתקות לפני הרשמה",
      });
    } else {
      startedregistered = false;
    }
  }, []);
  return <>{isLogged ? <Redirect to='/home' /> : <RegisterComp />}</>;
};
Register.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setMessageAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { setMessageAction })(Register);

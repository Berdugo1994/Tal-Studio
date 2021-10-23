import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ForgotComp from "../components/containers/pageComp/Forgot";

const ForgotPage = ({}) => {
  return <ForgotComp />;
};
ForgotPage.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ForgotPage);

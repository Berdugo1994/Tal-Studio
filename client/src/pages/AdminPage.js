import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminComp from "../components/containers/pageComp/Admin";

const AdminPage = ({ isLogged }) => {
  return <AdminComp />;
};
AdminPage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {})(AdminPage);

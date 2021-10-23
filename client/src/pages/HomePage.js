import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomeComp from "../components/containers/pageComp/Home";

const HomePage = ({ isLogged, user }) => {
  // if (isLogged) {
  //   return <div>User</div>;
  // } else {
  //   return <div>Guest</div>;
  // }
  return <HomeComp user={user} />;
};
HomePage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(HomePage);

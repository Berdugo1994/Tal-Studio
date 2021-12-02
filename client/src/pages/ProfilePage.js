import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileComp from "../components/containers/pageComp/Profile";
import { Redirect } from "react-router-dom";
import { friendshipsLoadAction } from "../actions/auth";
import { useEffect } from "react";
const ProfilePage = ({ isLogged, user, friendshipsLoadAction }) => {
  return (
    <>
      {isLogged ? (
        <ProfileComp
          user={user}
          style={{ height: "100%", border: "10px solid white" }}
        />
      ) : (
        <Redirect to='/home' />
      )}
    </>
  );
};
ProfilePage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { friendshipsLoadAction })(ProfilePage);

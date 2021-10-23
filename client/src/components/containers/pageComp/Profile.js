import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ButtonMaterial from "../../small/ButtonMaterial";
import { logoutAction } from "../../../actions/auth";
import { UserProfile, UserProfileFull } from "../../small/UserProfile";
import { LoadingRings } from "../../small/Loading";

//Styles
import "../../../styles/components/containers/page_comp/profile.css";

function ProfileComp({ logoutAction, user }) {
  let profileDisplay = <LoadingRings />;
  if (user != undefined) {
    profileDisplay = (
      <>
        <UserProfile user={user} />
        <UserProfileFull id='profileFull' user={user} />
      </>
    );
  }
  return (
    <div className='profile-comp-user'>
      {profileDisplay}
      <div style={{ height: "10%", width: "30%", marginTop: "2%" }}>
        <ButtonMaterial
          type='submit'
          content={"התנתקות"}
          submitClicked={logoutAction}
        />
      </div>
    </div>
  );
}

ProfileComp.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
});
export default connect(mapStateToProps, { logoutAction })(ProfileComp);

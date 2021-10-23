import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAction } from "../../../actions/auth";
import HomeCarousel from "../../small/HomeCarousel";
import HomeAbout from "../../small/HomeAbout";
import HomeContact from "../../small/HomeContact";
import HomeNavigation from "../../small/HomeNavigation";
import HomeMyTrainings from "../../small/HomeMyTrainings";
import EdenBar from "../bars/Edenbar";

//Styles
import "../../../styles/components/containers/page_comp/home.css";

function HomeComp({ isLogged }) {
  return (
    <div className='home-container' id='homeCompContainer'>
      <HomeCarousel />
      {isLogged && <HomeMyTrainings />}
      <HomeAbout />
      <HomeContact />
      <HomeNavigation />
      <EdenBar />
    </div>
  );
}

HomeComp.propTypes = { isLogged: PropTypes.bool.isRequired };

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.auth.isLoggedIn,
});
export default connect(mapStateToProps, {})(HomeComp);

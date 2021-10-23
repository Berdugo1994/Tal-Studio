import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Map from "./GoogleMaps";
import MapsNavButtons from "./MapsNavButtons";
//Styles
import "../../styles/components/small/home.css";
import "../../styles/components/containers/login_comp.css";
import backgroundImgLogin from "../../res/images/homePage/room_side.png";
const HomeNavigation = (props) => {
  return (
    <div
      className='card-about-container background-img-card'
      // style={{
      //   backgroundImage: `url( ${backgroundImgLogin})`,
      // }}
    >
      <div className='card-title'>דרכי הגעה</div>
      <Map />
      <MapsNavButtons />
    </div>
  );
};

HomeNavigation.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(HomeNavigation);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Styles
import "../../styles/components/small/friend.css";
import Avatar from "react-avatar";

const TrainerSmall = ({ friend, onClick }) => {
  return (
    <div style={{ margin: "10px" }}>
      <Avatar
        name={friend.firstname + " " + friend.lastname}
        size='70'
        textSizeRatio={1.3}
        round={"20px"}
        onClick={onClick}
        // src={
        //   "https://lumiere-a.akamaihd.net/v1/images/avatar_movieposter_95e3d777.jpeg?region=0%2C0%2C1080%2C1460"
        // }
      />
      <div>
        <div style={{ display: "inline" }}> {friend.firstname}</div>
        <div style={{ display: "inline" }}> {friend.lastname}</div>
      </div>
      {friend.phone != null && (
        <div style={{ display: "inline" }}> {friend.phone}</div>
      )}
    </div>
  );
};

TrainerSmall.propTypes = {};

const mapStateToProps = (state, props) => ({
  friend: props.friend,
  onClick: props.onClick,
});

export default connect(mapStateToProps, {})(TrainerSmall);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//Styles
import "../../../../styles/components/containers/modals/modalContent/event.css";

function FriendWait({ friendId, firstname, lastname, phone }) {
  return (
    <div>
      <div>{friendId}</div>
      <div>{firstname}</div>
      <div>{lastname}</div>
      <div>{phone}</div>
    </div>
  );
}

FriendWait.propTypes = {};

const mapStateToProps = (state, props) => {
  return {
    friendId: props.friend.id,
    firstname: props.friend.firstname,
    lastname: props.friend.lastname,
    phone: props.friend.phone,
  };
};
export default connect(mapStateToProps, {})(FriendWait);

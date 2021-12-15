import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { XIcon, VIcon } from "../../../small/Icons";

//Styles
import "../../../../styles/cross.css";

function Confirm({ confirmFunc, discardFunc }) {
  return (
    <div style={{ minWidth: "30%" }}>
      <div className='text-fit-medium'>
        האם אתם בטוחים שברצונכם לבצע את הפעולה?
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5%",
        }}
      >
        <VIcon onClick={confirmFunc} />
        <XIcon onClick={discardFunc} />
      </div>
    </div>
  );
}

Confirm.propTypes = {};

const mapStateToProps = (state, props) => {
  return {
    confirmFunc: props.confirmFunc,
    discardFunc: props.discardFunc,
  };
};
export default connect(mapStateToProps, {})(Confirm);

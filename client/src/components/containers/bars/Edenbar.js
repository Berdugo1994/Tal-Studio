import React from "react";
import { connect } from "react-redux";

import "../../../styles/components/containers/bars/edenbar.css";
const EdenBar = ({}) => {
  return (
    <div className='edenbar-container'>
      <div>
        ©Crafted By <a href='https://github.com/Berdugo1994'> Eden Berdugo.</a>{" "}
        All rights reserved
      </div>
    </div>
  );
};
EdenBar.propTypes = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(EdenBar);

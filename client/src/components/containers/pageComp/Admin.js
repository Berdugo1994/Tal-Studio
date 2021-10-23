import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddAvailable from "../admin/AddAvailable";

function AdminComp({}) {
  return <AddAvailable />;
}

AdminComp.propTypes = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(AdminComp);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as COLORS from "../../styles/pallete";

const StyledButton = withStyles({
  root: {
    fontFamily: `"Assistant", sans-serif`,
    fontWeight: 300,
    background: COLORS.C0,
    borderRadius: 3,
    border: 0,
    color: "black",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    width: "100%",
    height: "100%",
    "&:hover": {
      background: `${COLORS.C3}`,
      boxShadow: `0 3px 5px 2px ${COLORS.C3}`,
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

function ButtonMaterial({ submitClicked, content, isDisabled }) {
  return (
    <StyledButton
      disabled={isDisabled}
      onClick={() => {
        submitClicked();
      }}
    >
      {content}
    </StyledButton>
  );
}

ButtonMaterial.propTypes = {
  content: PropTypes.string.isRequired,
};

const mapStateToProps = (state, Props) => ({
  submitClicked: Props.submitClicked,
  content: Props.content,
  isDisabled: Props.isDisabled,
});
export default connect(mapStateToProps, {})(ButtonMaterial);

import { connect } from "react-redux";
import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

//Actions
import { clearMessageAction } from "../../../actions/message";

//Styles
import "../../../styles/components/containers/bars/message_bar.css";
const useStyles = makeStyles({
  messageStyle: {
    fontFamily: `"Assistant", sans-serif`,
    fontWeight: 600,
  },
});

function MessageBar({
  messageStatus,
  messageContent,
  messageCounter,
  clearMessageAction,
}) {
  const classes = useStyles();
  useEffect(() => {
    const delay = 5;
    let timer1 = setTimeout(() => clearMessageAction(), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [messageCounter]);
  return (
    <div key={messageCounter} className='message-bar-container'>
      <Alert className={classes.messageStyle} severity={messageStatus}>
        {messageContent}
      </Alert>
    </div>
  );
}

MessageBar.propTypes = {
  messageStatus: PropTypes.string,
  messageContent: PropTypes.string,
  messageCounter: PropTypes.number.isRequired,
  clearMessageAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  messageStatus: state.message.messageStatus,
  messageContent: state.message.messageContent,
  messageCounter: state.message.messageCounter,
});
export default connect(mapStateToProps, { clearMessageAction })(MessageBar);

import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dates } from "../../../../constants/dates";

import { LoadingRings } from "../../../small/Loading";
import SuccessAnimation from "../../../small/SuccessAnimation";
import { HiBadgeCheck } from "react-icons/hi";
import { SUCCESS, ERROR } from "../../../../constants/materialTypes";
import UsersAutoComplete from "../../../small/UsersAutoComplete";
import InputText from "../../../small/InputText";

//Actions
import { updateTrainingAction } from "../../../../actions/calendar";

import { setMessageAction } from "../../../../actions/message";
import { getDefaultEventField } from "../../../../utils/userUtils";

//Styles
import "../../../../styles/components/containers/modals/modalContent/event.css";
import "../../../../styles/cross.css";

function ModalEditEvent({
  id,
  startStr,
  updateTrainingAction,
  setMessageAction,
  handleClose,
  isAdmin,
  users,
  defaultDescription,
}) {
  const [display, setDisplay] = useState("event");
  const [successMessage, setSuccessMessage] = useState("האימון נשמר בהצלחה");
  const [first, setFirst] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [second, setSecond] = useState(null);
  const [secondName, setSecondName] = useState(null);
  const [third, setThird] = useState(null);
  const [thirdName, setThirdName] = useState(null);
  const [description, setDescription] = useState("");
  const [notesHelper, setNotesHelper] = useState("");
  return (
    <div className='modal-event-container'>
      {display == "loading" ? (
        <LoadingRings />
      ) : display == "success" ? (
        <>
          <SuccessAnimation />
          <div>{successMessage}</div>
        </>
      ) : (
        <div className='modal-event'>
          <div>עריכת אימון</div>
          <div>
            יום <b>{dates[startStr.getDay()]}</b>
          </div>
          <div>
            שעה{" "}
            <b>
              {startStr.getHours()}:
              {startStr.getMinutes() < 10
                ? "0" + startStr.getMinutes()
                : startStr.getMinutes()}
            </b>
          </div>
          <div className='modal-event-friend'>
            <UsersAutoComplete
              label={"חבר 1"}
              helper={
                isAdmin && first == null && second == null && third == null
                  ? "בתור מנהל חובה להכניס חבר 1 לפחות"
                  : ""
              }
              onChange={(change) => {
                setFirst(change ? change.value : null);
                setFirstName(change ? change.label : null);
              }}
              defaultValue={users.length > 0 ? users[0] : null}
            />
          </div>
          <div className='modal-event-friend'>
            <UsersAutoComplete
              label={"חבר 2"}
              helper={second != null && second == first ? "הזנה כפולה" : ""}
              onChange={(change) => {
                setSecond(change ? change.value : null);
                setSecondName(change ? change.label : null);
              }}
              defaultValue={users.length > 1 ? users[1] : null}
            />
          </div>

          <div className='modal-event-friend'>
            <UsersAutoComplete
              label={"חבר 3"}
              helper={""}
              onChange={(change) => {
                setThird(change ? change.value : null);
                setThirdName(change ? change.label : null);
              }}
              defaultValue={users.length > 2 ? users[2] : null}
            />
          </div>

          <div className='modal-event-friend'>
            <InputText
              label='הערה'
              helper={notesHelper}
              onChange={(change) => {
                change ? setDescription(change) : setDescription("");
                if (change.length > 20) {
                  setNotesHelper("אורך מקסימלי 20");
                } else {
                  setNotesHelper("");
                }
              }}
              defaultValue={defaultDescription}
            />
          </div>
          <div
            style={{ marginTop: "20px", color: "#f28482" }}
            onClick={() => {
              if (
                (first == null && second == null && third == null) ||
                (second != null && second == first)
              ) {
                setMessageAction({
                  status: ERROR,
                  message: "שמות המשתתפים אינם תקינים",
                });
                return;
              }
              if (notesHelper.length > 0) {
                setMessageAction({
                  status: ERROR,
                  message: "אורך מקסימלי של הערה הוא 20",
                });
                return;
              }
              let participant_ids = [];
              let participant_names = [];
              if (first) participant_ids.push(first);
              if (firstName) participant_names.push(firstName);
              if (second) participant_ids.push(second);
              if (secondName) participant_names.push(secondName);
              if (third) participant_ids.push(third);
              if (thirdName) participant_names.push(thirdName);
              setDisplay("loading");
              updateTrainingAction({
                id,
                participant_ids,
                participant_names,
                description,
              })
                .then(() => {
                  setDisplay("success");
                  setSuccessMessage("האימון עודכן בהצלחה");
                  // setMessageAction({
                  //   status: SUCCESS,
                  //   message: "האימון נשמר בהצלחה",
                  // });
                })
                .catch((err) => {
                  setDisplay("event");
                  handleClose();
                  setMessageAction({
                    status: ERROR,
                    message: "עדכון האימון נכשל",
                  });
                });
            }}
          >
            <HiBadgeCheck
              size={50}
              color={
                (isAdmin && first == null && second == null && third == null) ||
                (second != null && second == first)
                  ? "grey"
                  : "green"
              }
              onMouseOver={({ target }) => {
                target.style.cursor = "pointer";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ModalEditEvent.propTypes = {
  updateTrainingAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  defaultDescription: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  return {
    id: props.event.id,
    start: props.event.start,
    startStr: new Date(props.event.startStr),
    handleClose: props.handleClose,
    isAdmin: state.auth.isAdmin,
    userId: state.auth.user._id,
    username: state.auth.user.firstname + " " + state.auth.user.lastname,
    defaultDescription: props.event.extendedProps.description,
    users: getDefaultEventField(
      props.event.extendedProps.participant_ids,
      props.event.extendedProps.participant_names
    ),
  };
};
export default connect(mapStateToProps, {
  updateTrainingAction,
  setMessageAction,
})(ModalEditEvent);

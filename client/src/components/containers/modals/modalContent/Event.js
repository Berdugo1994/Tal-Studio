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
import ButtonMaterial from "../../../small/ButtonMaterial";

//Actions
import {
  reserveUserTraining,
  cancelAvailableAction,
} from "../../../../actions/calendar";

import { setMessageAction } from "../../../../actions/message";

//Styles
import "../../../../styles/components/containers/modals/modalContent/event.css";
import "../../../../styles/cross.css";

function ModalReserveTraining({
  id,
  startStr,
  reserveUserTraining,
  cancelAvailableAction,
  setMessageAction,
  handleClose,
  isAdmin,
  userId,
  username,
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
          <div>קביעת אימון</div>
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
            />
          </div>
          {isAdmin && (
            <div className='modal-event-friend'>
              <UsersAutoComplete
                label={"חבר 3"}
                helper={""}
                onChange={(change) => {
                  setThird(change ? change.value : null);
                  setThirdName(change ? change.label : null);
                }}
              />
            </div>
          )}
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
            />
          </div>
          <div
            style={{ marginTop: "20px", color: "#f28482" }}
            onClick={() => {
              if (
                (isAdmin && first == null && second == null && third == null) ||
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
              if (!isAdmin) participant_ids.push(userId);
              if (!isAdmin) participant_names.push(username);
              if (first) participant_ids.push(first);
              if (firstName) participant_names.push(firstName);
              if (second) participant_ids.push(second);
              if (secondName) participant_names.push(secondName);
              if (third) participant_ids.push(third);
              if (thirdName) participant_names.push(thirdName);
              setDisplay("loading");
              reserveUserTraining({
                id,
                participant_ids,
                participant_names,
                description,
              })
                .then(() => {
                  setDisplay("success");
                  setSuccessMessage("האימון נשמר בהצלחה");
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
                    message: "שמירת האימון נכשלה",
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
          {isAdmin && (
            <div
              style={{
                height: "5%",
                width: "90%",
                textAlign: "center",
              }}
            >
              <hr className='rounded' style={{ marginTop: "1px" }}></hr>
              <div className='flex-single-comp-container'>
                <div style={{ width: "60%" }}>
                  <ButtonMaterial
                    type='submit'
                    content={"מחק אימון"}
                    submitClicked={() => {
                      setDisplay("loading");
                      cancelAvailableAction({ id })
                        .then(() => {
                          setDisplay("success");
                          setSuccessMessage("האימון נמחק בהצלחה");
                        })
                        .catch((err) => {
                          setDisplay("event");
                          handleClose();
                        });
                    }}
                    isDisabled={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ModalReserveTraining.propTypes = {
  reserveUserTraining: PropTypes.func.isRequired,
  cancelAvailableAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
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
  };
};
export default connect(mapStateToProps, {
  reserveUserTraining,
  cancelAvailableAction,
  setMessageAction,
})(ModalReserveTraining);

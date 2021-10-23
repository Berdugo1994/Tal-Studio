import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dates } from "../../../../constants/dates";
import ButtonMaterial from "../../../small/ButtonMaterial";
import { cancelTrainingAction } from "../../../../actions/calendar";
import { LoadingRings } from "../../../small/Loading";
import SuccessAnimation from "../../../small/SuccessAnimation";

//Styles
import "../../../../styles/components/containers/modals/modalContent/event.css";

function ModalCreatedTraining({
  id,
  startStr,
  participantNames,
  description,
  cancelTrainingAction,
  isAdmin,
  event,
  changeToEditMode,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  let trainers = [];
  trainers.push(<hr className='rounded' key={1} />);
  trainers.push(<div key={2}>משתתפים:</div>);
  participantNames.map((friend, i) => {
    trainers.push(<div key={3 + i}>{friend}</div>);
  });

  let notes;
  if (description.length > 0) {
    notes = [
      <hr key={10} className='rounded' />,
      <div key={11}>הערות:{description}</div>,
    ];
  }

  return (
    <div className='modal-event-container'>
      {loading ? (
        <LoadingRings />
      ) : success ? (
        <>
          <SuccessAnimation />
          <div>האימון נמחק בהצלחה</div>
        </>
      ) : (
        <div className='modal-event'>
          <div>אימון</div>
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
          {trainers}
          {notes}
          <div
            style={{
              height: "10%",
              width: "90%",
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <div className='created-event-button-container'>
              <ButtonMaterial
                type='submit'
                content={"מחק אימון"}
                submitClicked={() => {
                  setLoading(true);
                  cancelTrainingAction({ id })
                    .then(() => {
                      setLoading(false);
                      setSuccess(true);
                    })
                    .catch((err) => {
                      setLoading(false);
                      handleClose();
                    });
                }}
                isDisabled={startStr < new Date() && !isAdmin}
              />
            </div>
            <div className='created-event-button-container'>
              <ButtonMaterial
                type='submit'
                content={"ערוך משתתפים"}
                submitClicked={() => {
                  changeToEditMode(true);
                }}
                isDisabled={startStr < new Date() && !isAdmin}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ModalCreatedTraining.propTypes = {
  id: PropTypes.string.isRequired,
  startStr: PropTypes.object.isRequired,
  participantNames: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  cancelTrainingAction: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  changeToEditMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    id: props.event.id,
    start: props.event.start,
    startStr: new Date(props.event.startStr),
    handleClose: props.handleClose,
    participantNames: props.event.extendedProps.participant_names,
    description: props.event.extendedProps.description,
    isAdmin: state.auth.isAdmin,
    event: props.event,
    changeToEditMode: props.changeToEditMode,
  };
};
export default connect(mapStateToProps, { cancelTrainingAction })(
  ModalCreatedTraining
);

import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createSelector } from "reselect";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getHashValues } from "../../../../utils/calendarUtils";
import ModalEvent from "../ModalEvent";
import ModalTraining from "../ModalTraining";

import { adminRequestEvents } from "../../../../actions/calendar";

//Styles
import "../../../../styles/components/containers/modals/modalContent/day.css";

function ModalCalendarDay({ events, day, updateData }) {
  const [eventContent, setEventContent] = useState(undefined);
  const [modalSingleEvent, setModalSingleEvent] = useState(false);
  const [modalSingleTraining, setModalSingleTraining] = useState(false);
  const closeEvent = () => {
    setModalSingleEvent(false);
    setModalSingleTraining(false);
    updateData();
  };
  // handlers for user actions
  // ------------------------------------------------------------------------------------------
  function handleDateSelect(selectInfo) {
    let calendarApi = selectInfo.view.calendar;
    let title = prompt("Please enter a new title for your event");

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent(
        {
          // will render immediately. will call handleEventAdd
          title,
          date: selectInfo.dateStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        },
        true
      ); // temporary=true, will get overwritten when reducer gives new events
    }
  }
  function getRange(day) {
    let end = new Date();
    end.setDate(day.getDate() + 1);
    return {
      date: formatDate(day),
      end: formatDate(end),
    };
  }

  function handleEventClick(clickInfo) {
    setEventContent(clickInfo.event);
    if (clickInfo.event.title === "פנוי") {
      setModalSingleEvent(true);
    }
    if (clickInfo.event.title === "אימון") {
      setModalSingleTraining(true);
    }
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  function handleEventAdd(addInfo) {
    // console.log("event add");
  }

  function handleEventChange(changeInfo) {
    // console.log("event change");
  }

  function handleEventRemove(removeInfo) {
    // console.log("remove");
  }

  function reportNetworkError() {
    alert("This action could not be completed");
  }
  function renderEventContent(eventInfo) {
    return (
      <div className='modal-day-event-day-custom'>
        <b>{eventInfo.timeText}</b>
        {eventInfo.event.extendedProps.participant_names &&
        eventInfo.event.extendedProps.participant_names.length > 0 ? (
          <div>
            {eventInfo.event.extendedProps.participant_names.toString()}
          </div>
        ) : (
          <div>-</div>
        )}
        <div>{eventInfo.event.title}</div>
      </div>
    );
  }

  return (
    <>
      <div className='modal-day-container'>
        <FullCalendar
          locale={"he"}
          direction={"rtl"}
          height={"90%"}
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: "",
            center: "title",
            right: "",
          }}
          editable={true}
          selectable={true}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange} // called for drag-n-drop/resize
          eventRemove={handleEventRemove}
          events={events}
          dayMaxEventRows={16}
          initialView={"dayGridDay"}
          initialDate={day}
          visibleRange={() => {
            return getRange(day);
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
            hour12: false,
          }}
        />
      </div>
      <ModalEvent
        event={eventContent}
        open={modalSingleEvent}
        close={closeEvent}
      />
      <ModalTraining
        event={eventContent}
        open={modalSingleTraining}
        close={closeEvent}
      />
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  );

  return {
    events: getEventArray(state),
    day: ownProps.day,
    closeDayOpenEvent: ownProps.closeDayOpenEvent,
    updateData: ownProps.updateData,
  };
};

ModalCalendarDay.propTypes = {
  adminRequestEvents: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { adminRequestEvents })(
  ModalCalendarDay
);

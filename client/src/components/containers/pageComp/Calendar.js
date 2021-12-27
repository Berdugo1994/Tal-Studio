import React, { useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalDay from "../modals/ModalDay";
import ModalEvent from "../modals/ModalEvent";
import ModalTraining from "../modals/ModalTraining";

//Actions
import { requestEvents } from "../../../actions/calendar";

//Utils
import { getHashValues } from "../../../utils/calendarUtils";

//Styles
import "../../../styles/components/containers/modals/modalComp.css";
import "../../../styles/components/containers/calendar/calendar_comp.css";
import "../../../styles/components/containers/calendar/override.css";

function CalendarComp({ requestEvents, events }) {
  const [dateContent, setDateContent] = useState(undefined);
  const [eventContent, setEventContent] = useState(undefined);

  //Training Modal
  const [modalSingleTraining, setModalSingleTraining] = useState(false);
  const [displayTraining, setDisplayTraining] = useState(false);

  //Even Modal
  const [modalSingleEvent, setModalSingleEvent] = useState(false);
  const [displayEvent, setDisplayEvent] = useState(false);

  //Day Modal
  const [modalDay, setModalDay] = useState(false);
  const [displayDay, setDisplayDay] = useState(false);

  async function updateData() {
    return requestEvents();
  }
  const closeDay = () => {
    setModalDay(false);
    setTimeout(() => {
      setDisplayDay(false);
    }, 300);
    updateData();
  };
  const closeEvent = () => {
    setModalSingleEvent(false);
    setModalSingleTraining(false);
    updateData();
    setTimeout(() => {
      setDisplayTraining(false);
      setDisplayEvent(false);
    }, 300);
  };
  const closeDayOpenEvent = (event) => {
    setModalDay(false);
    setEventContent(event);
    setModalSingleEvent(true);
    setDisplayEvent(true);
  };
  // handlers for user actions
  // ----------------------------------------------------------------------------------------

  function handleEventClick(clickInfo) {
    setEventContent(clickInfo.event);
    if (clickInfo.event.title === "פנוי") {
      setModalSingleEvent(true);
      setDisplayEvent(true);
    }
    if (clickInfo.event.title === "אימון") {
      setModalSingleTraining(true);
      setDisplayTraining(true);
    }
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  function handleDates(rangeInfo) {
    updateData().catch(() => {
      console.log("Fail to request events");
    });
  }

  function handleEventAdd(addInfo) {
    // console.log("event add");
  }

  function handleEventChange(changeInfo) {
    // console.log("event change");
  }

  function handleEventRemove(removeInfo) {
    // console.log("event delete");
  }
  function handleDateClick(event) {
    event.date.setHours(12);
    setDateContent(event.date);
    setModalDay(true);
    setDisplayDay(true);
  }

  function renderEventContent(eventInfo) {
    if (eventInfo.event.title == "אימון") {
      return (
        <div className='event-day-custom'>
          <div className='event-day-train'>{eventInfo.event.title}</div>
          <div className='event-day-train'>
            <b>{eventInfo.timeText}</b>
          </div>
        </div>
      );
    } else {
      return (
        <div className='event-day-custom'>
          <div className='event-day-reg'>
            <b>{eventInfo.timeText}</b>
          </div>
          {/* <div className='event-day-reg'>{eventInfo.event.title}</div> */}
        </div>
      );
    }
  }

  return (
    <div>
      <FullCalendar
        locale={"he"}
        direction={"rtl"}
        dayMaxEvents={5}
        contentHeight='auto'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        slotMinTime='06:00:00'
        slotMaxTime='23:00:00'
        initialView='dayGridMonth'
        allDaySlot={true}
        selectMirror={true}
        datesSet={handleDates}
        events={events}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventAdd={handleEventAdd}
        eventChange={handleEventChange} // called for drag-n-drop/resize
        eventRemove={handleEventRemove}
        dateClick={handleDateClick}
        buttonText={{
          today: "היום",
          month: "חודש",
          week: "שבוע",
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
      />
      {displayDay && (
        <ModalDay
          day={dateContent}
          open={modalDay}
          close={closeDay}
          closeDayOpenEvent={closeDayOpenEvent}
          updateData={updateData}
        />
      )}
      {displayEvent && (
        <ModalEvent
          event={eventContent}
          open={modalSingleEvent}
          close={closeEvent}
        />
      )}
      {displayTraining && (
        <ModalTraining
          event={eventContent}
          open={modalSingleTraining}
          close={closeEvent}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  );

  return {
    events: getEventArray(state),
  };
};
CalendarComp.propTypes = {
  requestEvents: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  requestEvents,
})(CalendarComp);

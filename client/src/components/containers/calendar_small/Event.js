import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Styles
import "../../../styles/components/containers/modals/modalComp.css";
import "../../../styles/components/containers/calendar/calendar_comp.css";
import "../../../styles/components/containers/calendar/override.css";

export const EventForCalendar = ({ eventInfo, onClick }) => {
  return (
    <>
      {eventInfo.event.title == "אימון" && (
        <div className='event-day-custom'>
          <div className='event-day-train'>{eventInfo.event.title}</div>
          <div className='event-day-train'>
            <b>{eventInfo.timeText}</b>
          </div>
        </div>
      )}{" "}
      {eventInfo.event.title == "פנוי" && (
        <div className='event-day-custom' onClick={onClick}>
          <div className='event-day-reg'>
            <b>{eventInfo.timeText}</b>
          </div>
          {/* <div className='event-day-reg'>{eventInfo.event.title}</div> */}
        </div>
      )}
    </>
  );
};
EventForCalendar.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.auth.isLoggedIn,
  eventInfo: ownProps.eventInfo,
  onClick: ownProps.onClick,
});
connect(mapStateToProps, {})(EventForCalendar);

//
// export const EventForAdmin = ({ isLogged }) => {
//     return (
//       <>{(eventInfo.event.title == "אימון")
//           && (
//             <div className='event-day-custom'>
//               <div className='event-day-train'>{eventInfo.event.title}</div>
//               <div className='event-day-train'>
//                 <b>{eventInfo.timeText}</b>
//               </div>
//             </div>
//           )
//         }  {eventInfo.event.title == "פנוי" &&
//           (
//             <div className='event-day-custom'>
//               <div className='event-day-reg'>
//                 <b>{eventInfo.timeText}</b>
//               </div>
//               {/* <div className='event-day-reg'>{eventInfo.event.title}</div> */}
//             </div>
//           )
//         }
//     </>)
//   };
//   EventForAdmin.propTypes = {
//     isLogged: PropTypes.bool.isRequired,
//   };

//   const mapStateToProps = (state) => ({
//     isLogged: state.auth.isLoggedIn,
//   });

// connect(mapStateToProps, {})(EventForAdmin);

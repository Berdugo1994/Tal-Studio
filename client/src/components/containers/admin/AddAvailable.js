import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DatePicker from "../../small/DatePicker";
import TimePicker from "../../small/TimePicker";
import { requestGlobalNextEventsDates } from "../../../services/admin.service";
import EventButton from "../../small/EventButton";

import { ERROR } from "../../../constants/materialTypes";
import ButtonMaterial from "../../small/ButtonMaterial";
import { adminAddAvailableAction } from "../../../actions/calendar";
const moment = require("moment");

//Actions
import { setMessageAction } from "../../../actions/message";

//Styles
import "../../../styles/components/containers/admin/add_available.css";

function AddAvailable({ setMessageAction, adminAddAvailableAction }) {
  //values
  const [date, setDate] = useState(null);
  const [dateStr, setDateStr] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [trainingList, setTrainingList] = useState(null);

  //flags
  const [helper1, setHelper1] = useState("");
  const [helper2, setHelper2] = useState("");
  const [keySaved, setKeySaved] = useState(0);

  //events left-side
  const [totalEvents, setTotalEvents] = useState({});
  const [dailyEvents, setDailyEvents] = useState(null);
  useEffect(() => {
    requestGlobalNextEventsDates().then((events) => {
      updateTotalEvents(events);
    });
  }, [keySaved]);
  //UseEffects
  useEffect(() => {
    setDateStr(null);
    let tempDate;
    if (date == null) {
      return;
    } else {
      tempDate = new Date(date);
    }
    let year = tempDate.getFullYear();
    let month =
      tempDate.getMonth() < 9
        ? "0" + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    let day =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let dateToStr = year + "-" + month + "-" + day;
    setDateStr(dateToStr);
    updateDailyEvents(dateToStr);
  }, [date, totalEvents]);

  function updateTotalEvents(events) {
    Object.keys(events).map((day) => {
      for (let i = 0; i < events[day].length; i++) {
        events[day][i].date = new Date(
          events[day][i].date.toLocaleString("en-US", {
            timeZone: "Asia/Jerusalem",
          })
        );
      }
    });
    setTotalEvents(events);
  }

  function updateStartDate(tempHour) {
    if (validateStartHour(tempHour)) {
      let startDateTemp = transmitterHourToDate(tempHour);
      setStartDate(startDateTemp);
      setHelper1("");
    }
  }

  function updateEndDate(tempHour) {
    let endObject = validateEndHour(tempHour);
    if (endObject) {
      setEndDate(endObject.endDate);
      setHelper2("");
      setTrainingList(endObject.trainings);
    }
  }

  useEffect(() => {
    if (!startDate) {
      setEndDate(null);
      return;
    }
    updateEndDate(moment(new Date(startDate.getTime() + 1 * 60 * 60 * 1000)));
  }, [startDate]);

  function updateDailyEvents(dateToStr) {
    let comp = <div className='add-available-no-events'>?????? ??????????????</div>;
    if (dateToStr != undefined && totalEvents[dateToStr] != undefined) {
      comp = [];
      let key = 0;
      totalEvents[dateToStr].map((event) => {
        key++;
        comp.push(<EventButton event={event} key={"ev_but_" + key} />);
      });
    }
    setDailyEvents(comp);
  }

  function validateStartHour(tempHour) {
    //return false if invalid.
    //return Date obj of date if valid.
    if (tempHour == null || !tempHour._isValid) {
      setHelper1("?????? ???? ??????????");
      return false;
    }
    let tempDate = transmitterHourToDate(tempHour);
    if (tempDate.getHours() > 22 || tempDate.getHours() < 6) {
      setHelper1("?????? ?????????? ?????????? ?????? 6 ??23");
      return false;
    }
    if (totalEvents[dateStr] != undefined) {
      for (let i = 0; i < totalEvents[dateStr].length; i++) {
        if (
          !validateOneHourDiff(tempDate, new Date(totalEvents[dateStr][i].date))
        ) {
          setHelper1("???????? ?????? ????????");
          setMessageAction({
            status: ERROR,
            message: "???????? ?????????? ???????? ??????????",
          });
          return false;
        }
      }
    }
    return true;
  }

  function validateEndHour(tempHour) {
    if (tempHour == null || !tempHour._isValid) {
      setHelper2("???????? ?????? ????????");
      return false;
    }
    let tempDate = transmitterHourToDate(tempHour);
    if (tempDate.getHours() > 23 || tempDate.getHours() < 6) {
      setHelper2("?????? ?????????? ?????????? ?????? 6 ??23");
      return false;
    }
    let countTrainings = validateCompleteHours(tempDate); // count of trainings if valid, false if invalid.
    if (!countTrainings) {
      setMessageAction({
        status: ERROR,
        message: "???????? ?????????????? ???? ??????",
      });
      setHelper2("???????? ?????? ????????");
      return false;
    }
    let trainingHours = splitToTrainings(countTrainings); //TODO: continue from here. To test on every training if it the offset.
    if (!validateNoConflict(trainingHours)) {
      setHelper2("???????? ?????? ????????");
      setMessageAction({
        status: ERROR,
        message: "???? ?????????? ?????????? ??????",
      });
      return false;
    }
    return {
      endDate: tempDate,
      trainings: trainingHours,
    };
  }

  function splitToTrainings(countTrainings) {
    let trainings = [];
    for (let i = 0; i < countTrainings; i++) {
      let training = new Date(date);
      training.setHours(startDate.getHours() + i, startDate.getMinutes());
      trainings.push(training);
    }
    return trainings;
  }

  function validateOneHourDiff(tempStartDate, calendarEvent) {
    let diff = Math.abs(
      (tempStartDate.getHours() - calendarEvent.getHours()) * 60 +
        (tempStartDate.getMinutes() - calendarEvent.getMinutes())
    );
    if (diff < 60) return false; // there is event too close.
    return true;
  }

  function validateNoConflict(trainings) {
    let t = 0;
    let e = 0;
    if (!totalEvents[dateStr]) return true; //no Events- no need to check.
    while ((t < trainings.length) & (e < totalEvents[dateStr].length)) {
      let training = trainings[t];
      let calendarEvent = transmitterEventToDate(totalEvents[dateStr][e].date);
      if (!validateOneHourDiff(training, calendarEvent)) {
        return false; // there is a conflict between event to training.
      }
      if (training.getTime() < calendarEvent.getTime()) t++;
      else if (training.getTime() > calendarEvent.getTime()) e++;
      else return false;
    }
    return true;
  }

  function validateCompleteHours(tempEndDate) {
    // return false - can't divide hours
    // return number - number of trainings in the diff
    let diff = Math.abs(
      (tempEndDate.getHours() - startDate.getHours()) * 60 +
        (tempEndDate.getMinutes() - startDate.getMinutes())
    );
    if (diff < 60) {
      setHelper2("?????????? ?????? ?????????? ?????????? ?????????? ??????");
      return false;
    }
    if (diff % 60 != 0) {
      setHelper2("?????????? ???????? ?????????? ???????? ????????????");
      return false;
    }
    return diff / 60;
  }

  function transmitterHourToDate(tempHour) {
    let hour = tempHour.hours();
    let minutes = tempHour.minutes();
    let tempDate = new Date(date);
    tempDate.setHours(hour, minutes);

    return tempDate;
  }
  function transmitterEventToDate(event) {
    let temp = new Date(event);
    return temp;
  }
  function updateDate(tempDate) {
    if (tempDate != null) {
      setDate(tempDate);
    } else {
      setDate(null);
      setStartDate(null);
      setEndDate(null);
    }
  }

  return (
    <div className='add-available-container'>
      <div className='add-available-right'>
        <div className='add-available-date-picker'>
          <DatePicker helper='' onChange={updateDate} value={date} />
        </div>
        <div className='add-available-time-picker'>
          <TimePicker
            id='sh'
            disabled={date == null}
            onChange={updateStartDate}
            value={startDate}
            helper={helper1}
            label={"?????? ??????????"}
          />
        </div>
        <div className='add-available-time-picker'>
          <TimePicker
            id='eh'
            disabled={date == null || startDate == undefined}
            onChange={updateEndDate}
            value={endDate}
            helper={helper2}
            label={"?????? ????????"}
          />
        </div>
      </div>
      <div className='add-available-left'>{dailyEvents}</div>
      <div className='add-available-save-button'>
        <ButtonMaterial
          type='submit'
          content={"????????"}
          submitClicked={() => {
            adminAddAvailableAction(trainingList)
              .then((res) => {
                if (res) {
                  setKeySaved(keySaved + 1);
                }
              })
              .catch(() => {
                setMessageAction({
                  status: ERROR,
                  message: "?????????? ???????????????? ??????????, ???? ?????????? ???????????? ??????",
                });
              });
          }}
          isDisabled={
            date == null ||
            startDate == null ||
            endDate == null ||
            helper1.length > 0 ||
            helper2.length > 0
          }
        />
      </div>
    </div>
  );
}

AddAvailable.propTypes = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  setMessageAction,
  adminAddAvailableAction,
})(AddAvailable);

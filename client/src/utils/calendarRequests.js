//Not In Use!

import { excludeById, getTodayStr } from "./calendarUtils";

/*
functions that simulate network requests
*/

let todayStr = getTodayStr();
let yesterdayStr = "2021-08-13";
let eventGuid = 0;
let eventDb = [
  {
    id: createEventId(),
    classNames: ["full-day"],
    title: "יום כיפור",
    allDay: true,
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "פנוי",
    start: todayStr + "T12:00:00",
    end: todayStr + "T13:00:00",
    allDay: false,
  },
  // {
  //   id: createEventId(),
  //   title: "תפוס",
  //   start: todayStr + "T14:00:00",
  //   end: todayStr + "T15:00:00",
  // },
  // {
  //   id: createEventId(),
  //   title: "תפוס",
  //   start: todayStr + "T15:00:00",
  //   end: todayStr + "T16:00:00",
  // },
  // {
  //   id: createEventId(),
  //   title: "תפוס",
  //   start: todayStr + "T16:00:00",
  //   end: todayStr + "T17:00:00",
  // },
  {
    id: createEventId(),

    title: "פנוי",
    start: todayStr + "T17:00:00",
    end: todayStr + "T18:00:00",
  },
  {
    id: createEventId(),
    classNames: ["training-day"],
    title: "אימון",
    start: "2021-08-07" + "T17:00:00",
    end: "2021-08-07" + "T18:00:00",
  },
  {
    id: createEventId(),
    classNames: ["training-day"],
    title: "פנוי",
    start: "2021-08-07" + "T20:00:00",
    end: "2021-08-07" + "T21:00:00",
  },
  {
    id: createEventId(),
    start: "2021-08-07",
    end: "2021-08-08",
    overlap: false,
    display: "background",
    color: "#f4acb7",
  },
];

const DELAY = 200;
let simulateErrors = false;

//TODO: events are now will not created.
// document.addEventListener("keypress", (ev) => {
//   if (ev.key === "e") {
//     alert('You pressed the key "e". Will begin to simulate errors.');
//     simulateErrors = true;
//   }
// });

function createEventId() {
  return String(eventGuid++);
}

export function filterEvents(events) {
  // console.log(events);
}

export function getHashValues(hash) {
  //values from object to list
  return Object.values(hash); // needs modern browser
}

export function hashById(array) {
  //from array to object
  let hash = {};

  for (let item of array) {
    hash[item.id] = item;
  }
  return hash;
}

export function excludeById(array, id) {
  return array.filter((item) => item.id !== id);
}

export function getTodayStr() {
  return new Date().toISOString().replace(/T.*$/, "");
}

export function filterEvents(events) {
  const daysWithTraining = new Set();
  events.map((event) => {
    if (event.title == "אימון") {
      // event.allDay = true;
      event.classNames = ["training-comp"];
      daysWithTraining.add(
        event.start.getFullYear().toString() +
          "/" +
          event.start.getMonth().toString() +
          "/" +
          event.start.getDate().toString()
      );
    }
  });
  const result = events.filter((event) => {
    return eventsToDisplay(event, daysWithTraining);
  });
  return result;
}
function eventsToDisplay(event, daysWithTraining) {
  if (event.title == "אימון") return true;
  if (event.title == "פנוי") {
    const day =
      event.start.getFullYear() +
      "/" +
      event.start.getMonth() +
      "/" +
      event.start.getDate();
    if (!daysWithTraining.has(day)) return true;
  }
  return false;
}

export function filterEventsAdmin(events) {
  const daysWithTraining = new Set();
  events.map((event) => {
    if (event.title == "אימון") {
      event.classNames = ["training-comp"];
    }
  });
  return events;
}

export function getEventById(events, event_id) {
  if (!events || !event_id) return undefined;
  events.map((event) => {
    if (event.id == event_id) {
      return event;
    }
  });
}

//Models
const EventAvailable = require("../models/EventAvailable");
const TrainingsUtils = require("./db.trainings");
const general = require("../utils/general");

async function getEventsOfDay(_id) {
  let event = await EventAvailable.find({
    date: { $gte: beginOfMonth, $lt: new Date() },
  });
  if (event == null) {
    throw new Error("no such event");
  }
  return event;
}

async function getEventById(_id) {
  let event = await EventAvailable.findOne({
    _id,
  });
  if (event == null) {
    throw new Error("no such event");
  }
  return event;
}

async function insertEvents(events) {
  try {
    let eventsToSave = [];
    events.map((event) => {
      const obj = {};
      obj.date = event.date;
      // obj.date = new Date(obj.date).toISOString();
      obj.date = new Date(obj.date);
      obj.title = event.title_specific || "פנוי";
      obj.description = event.description || "";
      eventsToSave.push(obj);
    });
    return EventAvailable.collection.insertMany(eventsToSave);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function insertEvent(date, session) {
  return new EventAvailable({
    date: date._doc.date,
    description: "",
    title: "פנוי",
  }).save({ session });
}

async function getNextEvents() {
  return EventAvailable.find({
    date: { $gte: new Date() },
  });
}
async function deleteEventById(_id, session) {
  return EventAvailable.deleteOne({ _id }, { session });
}
async function getAvailableBetweenRanges(start, finish) {
  let events = await EventAvailable.find({
    date: { $gte: start, $lte: finish },
  });
  return events;
}

async function validateEmptyOnTimes(events) {
  //This validates there is no conflict in between,
  //Enough one conflict to fail the whole action.
  let first_event_start = events[0].date;
  let last_event_start = events[events.length - 1].date;
  let existsAvailable = await getAvailableBetweenRanges(
    first_event_start,
    last_event_start
  );
  return existsAvailable.length == 0;
}

module.exports.insertEvents = insertEvents;
module.exports.getNextEvents = getNextEvents;
module.exports.getEventById = getEventById;
module.exports.deleteEventById = deleteEventById;
module.exports.insertEvent = insertEvent;
module.exports.validateEmptyOnTimes = validateEmptyOnTimes;

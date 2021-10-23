//Models
const EventAvailable = require("../models/EventAvailable");

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

async function insertEvent(date) {
  return new EventAvailable({
    date: date._doc.date,
    description: "",
    title: "פנוי",
  }).save();
}

async function getNextEvents() {
  return EventAvailable.find({
    date: { $gte: new Date() },
  });
}
async function deleteEventById(_id) {
  return EventAvailable.deleteOne({ _id });
}

module.exports.insertEvents = insertEvents;
module.exports.getNextEvents = getNextEvents;
module.exports.getEventById = getEventById;
module.exports.deleteEventById = deleteEventById;
module.exports.insertEvent = insertEvent;

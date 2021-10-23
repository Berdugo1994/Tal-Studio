const express = require("express");
const createError = require("http-errors");
require("dotenv").config();
const router = express.Router();
const Training = require("../models/Trainings");
const { check, validationResult } = require("express-validator");

//Utils
const AvailableUtils = require("../utils/db.available");
const TrainingsUtils = require("../utils/db.trainings");

//Helper functions
const events = require("./events");
const error = require("../errors");

function sortAndSplitDays(trainings, available) {
  let datesEventsObject = {};
  let total = [];
  total.push(...trainings);
  total.push(...available);
  total.sort(function (event1, event2) {
    let dateA = new Date(event1._doc.date);
    let dateB = new Date(event2._doc.date);
    // Compare the 2 dates
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });

  total.map((event) => {
    let date = new Date(event._doc.date).toISOString().substring(0, 10);
    datesEventsObject[date] = datesEventsObject[date] || [];
    datesEventsObject[date].push(event);
  });
  return datesEventsObject;
}

router.get("/next_events", async (req, res, next) => {
  try {
    const nextAvailable = await EventAvailable.find({
      date: { $gte: new Date() },
    });
    const nextTraining = await Training.find({
      date: { $gte: new Date() },
    });
    res.status(201).send({ trainings: nextTraining, available: nextAvailable });
    return;
  } catch (err) {
    next(createError(400, "Cannot retrieve trainings"));
    return;
  }
});

router.get("/next_events_dates", async (req, res, next) => {
  try {
    // divided by "yyyy-mm-dd" object attributes.
    const nextAvailable = await AvailableUtils.getNextEvents();
    const nextTraining = await TrainingsUtils.getNextAllTrainings();
    res.status(201).send(sortAndSplitDays(nextTraining, nextAvailable));
  } catch (err) {
    next(createError(400, "Cannot retrieve trainings"));
    return;
  }
});

router.get("/totalevents", async (req, res, next) => {
  try {
    let totalEventsObject = await events.totalEvents();
    res.status(200).send(totalEventsObject);
  } catch (err) {
    next(createError(400, "Cannot retrieve trainings"));
    return;
  }
});

router.post("/cancelavailable", async (req, res, next) => {
  const event_id = req.body.id;
  try {
    await AvailableUtils.deleteEventById(event_id).then(() => {
      res.status(200).send("Available deleted successfully");
    });
  } catch (err) {
    next(createError(401, "פעולת ביטול האימון נכשלה, נא צרו איתי קשר"));
    return;
  }
});

router.post(
  "/available/add",
  [check("events").custom((events) => Array.isArray(events) && events.length)],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      await AvailableUtils.insertEvents(req.body.events)
        .then(() => {
          res.status(201).send("האימונים הפנויים נשמרו בהצלחה");
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(error.cant_save_available_403);
      return;
    }
  }
);
module.exports = router;

const express = require("express");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const router = express.Router();
const EventAvailable = require("../models/EventAvailable");
const loggedMW = require("./middleware/mid_logged");

//Utils
const AvailableUtils = require("../utils/db.available");
const TrainingsUtils = require("../utils/db.trainings");

const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

/**
 * @method - Get
 * @param - /
 * @description - returns all the next available events.
 */
router.get("/available", async (req, res, next) => {
  try {
    const nextAvailable = await EventAvailable.find({
      date: { $gte: new Date() },
    });

    res.status(201).send({ future: nextAvailable });
    return;
  } catch (err) {
    next(createError(400, "Cannot retrieve trainings"));
    return;
  }
});

/**
 * @method - POST
 * @param - /available
 * @description - add a new event
 */
router.use(loggedMW);
router.get("/personalcalendar", async (req, res, next) => {
  try {
    let result = { trainings: {}, available: {} };
    let promises = [];
    promises.push(
      AvailableUtils.getNextEvents()
        .then((nextAvailable) => {
          result.available.future = nextAvailable;
        })
        .catch((err) => {
          next(err);
        })
    );
    promises.push(
      TrainingsUtils.getNextTrainingsById(req.user._id)
        .then((trainings) => {
          result.trainings = trainings;
        })
        .catch((err) => {
          next(err);
        })
    );
    Promise.all(promises).then(() => {
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    next(createError(400, "Cannot retrieve events"));
    return;
  }
});

router.get("/pastdays", async (req, res, next) => {
  try {
    TrainingsUtils.getPastTrainingsThisMonthById(req.user._id)
      .then((num) => {
        res.status(200).send({ count: num });
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(createError(400, "Cannot retrieve events"));
    return;
  }
});

async function totalEvents() {
  let result = { trainings: {}, available: {} };
  let promises = [];
  try {
    promises.push(
      AvailableUtils.getNextEvents()
        .then((nextAvailable) => {
          result.available.future = nextAvailable;
        })
        .catch((err) => {
          next(err);
        })
    );

    promises.push(
      TrainingsUtils.getNextAllTrainingsLastDays(60).then((trainings) => {
        result.trainings = trainings; // it is not really invited, just a place to contain and keep the same logic.
      })
    );
    await Promise.all(promises); // updates the result object
    return result;
  } catch (err) {
    next(createError(400, "Cannot retrieve events"));
    return;
  }
}

module.exports = router;
module.exports.totalEvents = totalEvents;

const express = require("express");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const router = express.Router();
const Training = require("../models/Trainings");
const loggedMW = require("./middleware/mid_logged");

//Utils
const TrainingsUtils = require("../utils/db.trainings");
const UserUtils = require("../utils/db.users");
router.use(loggedMW);

// /** //TODO: verify this is unneccesry then delete.
//  * @method - Get
//  * @param - /
//  * @description - get my trainings
//  */
// router.get("/", async (req, res, next) => {
//   try {
//     const id = req.user._id;
//     const invited = await TrainingsUtils.getNextTrainingsById(id);
//     res.status(201).send(invited);
//     return;
//   } catch (err) {
//     next(createError(400, "Cannot retrieve trainings"));
//     return;
//   }
// });

router.get("/mynexttraining", async (req, res, next) => {
  try {
    const id = req.user._id;
    const training = await TrainingsUtils.getNextTrainingByUserId(id);
    res.status(201).send(training);
    return;
  } catch (err) {
    next(createError(400, "Cannot retrieve trainings"));
    return;
  }
});

module.exports = router;

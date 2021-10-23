const express = require("express");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const router = express.Router();
//Utils
const UserUtils = require("../utils/db.users");
const AvailableUtils = require("../utils/db.available");
const TrainingsUtils = require("../utils/db.trainings");

//MIDDLEWARE
const loggedMW = require("./middleware/mid_logged");

router.use(loggedMW); // **LOGGED USER BELOW**
/**
 * @method - GET
 * @param - /
 * @description - Cities
 */
router.get("/allusers", async (req, res, next) => {
  try {
    let usersFiltered = await UserUtils.getAllUsersWithoutEmailAndFilter(
      req.user._doc.email,
      {
        _id: 1,
        firstname: 1,
        lastname: 1,
      }
    );
    res.status(200).send(usersFiltered);
    return;
  } catch (err) {
    next(err);
  }
});

/**
 * @method - POST
 * @param - /addtraining
 * @description -Trainer sets his and his friends training
 */
router.post(
  "/addtraining",
  [
    check("id", "חסר מספר מזהה של אימון").not().isEmpty(),
    check("participant_ids", "חסר מספר מזהה של משתתפים באימון").not().isEmpty(), // The user itself is part of part_ids,part_names
  ],
  //check("emails", "Please enter emails").not().isEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { id, participant_ids, participant_names, description } = req.body;
    try {
      const event = await AvailableUtils.getEventById(id);
      await TrainingsUtils.saveTraining(
        participant_ids,
        participant_names,
        description,
        event._doc.date
      )
        .then(() => {
          AvailableUtils.deleteEventById(id)
            .then(() => {
              res.status(201).send("Training created successfully");
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(createError(401, "Cannot create training"));
      return;
    }
  }
);

/**
 * @method - POST
 * @param - /canceltraining
 * @description -Trainer cancels the training, and make it available again.
 */
router.post("/canceltraining", async (req, res, next) => {
  const event_id = req.body.id;
  try {
    await TrainingsUtils.deleteTrainingById(event_id).then((date) => {
      AvailableUtils.insertEvent(date).then(() => {
        res.status(200).send("Training deleted successfully");
      });
    });
  } catch (err) {
    next(createError(401, "פעולת ביטול האימון נכשלה, נא צרו איתי קשר"));
    return;
  }
});

/**
 * @method - POST
 * @param - /canceltraining
 * @description -Trainer cancels the training, and make it available again.
 */
router.post("/canceltraining", async (req, res, next) => {
  try {
    const event_id = req.body.id;
    await TrainingsUtils.deleteTrainingById(event_id).then((date) => {
      AvailableUtils.insertEvent(date).then(() => {
        res.status(200).send("Training deleted successfully");
      });
    });
  } catch (err) {
    next(createError(401, "פעולת ביטול האימון נכשלה, נא צרו איתי קשר"));
    return;
  }
});

router.put("/updatetraining", async (req, res, next) => {
  try {
    await TrainingsUtils.updateById(req.body.id, req.body).then(() => {
      res.status(200).send("Training updated successfully");
    });
  } catch (err) {
    next();
    return;
  }
});
module.exports = router;

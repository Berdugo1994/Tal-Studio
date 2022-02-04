const express = require("express");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const router = express.Router();
//Utils
const UserUtils = require("../utils/db.users");
const AvailableUtils = require("../utils/db.available");
const TrainingsUtils = require("../utils/db.trainings");
const FriendsUtils = require("../utils/db.friends");
const error = require("../errors");

// Mongoose - for Session create
const mongoose = require("mongoose");

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
    const session = await mongoose.connection.startSession();
    try {
      session.startTransaction();
      const event = await AvailableUtils.getEventById(id);
      await TrainingsUtils.saveTraining(
        participant_ids,
        participant_names,
        description,
        event._doc.date,
        session
      );
      await AvailableUtils.deleteEventById(id, session);
      await session.commitTransaction();
      res.status(201).send("Training created successfully");
    } catch (err) {
      console.log("Abort Transaction");
      await session.abortTransaction();
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
  const session = await mongoose.connection.startSession();
  try {
    const event_id = req.body.id;
    session.startTransaction();
    const date = await TrainingsUtils.deleteTrainingById(event_id, session);
    await AvailableUtils.insertEvent(date, session);
    session.commitTransaction();
    res.status(200).send("Training deleted successfully");
  } catch (err) {
    console.log("Abort Transaction");
    await session.abortTransaction();
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

/**
 * @method - POST
 * @param - /addFriend
 * @description -Trainer cancels the training, and make it available again.
 */
router.post("/addfriend", async (req, res, next) => {
  try {
    let invited_id = await UserUtils.getUserWithPhoneAndFilter(
      req.body.invited_phone,
      {
        _id: 1,
      }
    );
    if (!invited_id) throw error.phone_not_exists_408;
    invited_id = invited_id._id;
    if (invited_id.equals(req.user._id)) throw error.cant_send_yourself_402;
    await FriendsUtils.validateFriendsStatus(req.user._id, invited_id).catch(
      (err) => {
        if (err == "already friends")
          throw error.friend_respond_already_approve_402;
        else if (err == "wait for them")
          throw error.friend_request_already_wait_for_them_402;
        else if (err == "wait for me")
          throw error.friend_request_already_wait_for_me_402;
        else throw error.friend_request_failed_402;
      }
    );
    await FriendsUtils.createNewFriendRequest(req.user._id, invited_id).then(
      () => {
        res.status(200).send("בקשת החברות נשלחה בהצלחה");
      }
    );
  } catch (err) {
    next(err);
    return;
  }
});
router.post("/respondfriend", async (req, res, next) => {
  try {
    let req_id = await FriendsUtils.validateUserReq(
      req.body.friend_id,
      req.user._id
    ).catch((reason) => {
      if (reason === "bad credentials")
        throw error.friend_respond_bad_credentials_402;
      else if (reason === "already friends")
        throw error.friend_respond_already_approve_402;
      else if (reason === "already rejected")
        throw error.friend_respond_already_rejected_402;
      else {
        throw error.friend_respond_failed;
      }
    });
    await FriendsUtils.respondToRequest(req_id, req.body.status)
      .then(() => {
        if (req.body.status == "reject")
          res.status(200).send("בקשת החברות נדחתה בהצלחה");
        else if (req.body.status == "approve")
          res.status(200).send("בקשת החברות אושרה בהצלחה");
      })
      .catch(() => {
        throw error.bad_friend_respond_402;
      });
  } catch (err) {
    next(err);
    return;
  }
});
router.get("/myfriends", async (req, res, next) => {
  try {
    let friends = await FriendsUtils.getUserFriends(req.user._id);
    let approvedNames = await UserUtils.getFilteredByIds(
      friends.friendsApprovedIds,
      {
        _id: 1,
        firstname: 1,
        lastname: 1,
      }
    );
    let waitForThemPhones = await UserUtils.getFilteredByIds(
      friends.waitForThemIds,
      {
        _id: 1,
        phone: 1,
      }
    );
    let waitForMePhones = await UserUtils.getFilteredByIds(
      friends.waitForMeIds,
      {
        _id: 1,
        phone: 1,
        firstname: 1,
        lastname: 1,
      }
    );
    res.status(200).send({
      friends_approved: approvedNames.map((fa) => {
        return { id: fa._id, firstname: fa.firstname, lastname: fa.lastname };
      }),
      friends_wait_for_me: waitForMePhones.map((wm) => {
        return {
          id: wm._id,
          phone: wm.phone,
          firstname: wm.firstname,
          lastname: wm.lastname,
        };
      }),
      friends_wait_for_them: waitForThemPhones.map((wt) => {
        return { id: wt._id, phone: wt.phone };
      }),
    });
  } catch (err) {
    next(err);
  }
});
router.delete("", async (req, res, next) => {
  try {
    await FriendsUtils.deleteFriend(req.user._id, req.body.friend_id)
      .then(() => {
        res.status(200).send("חברות בוטלה בהצלחה");
      })
      .catch((msg) => {
        if (msg == "No Friendship") {
          next(error.friend_delete_not_friends_402);
        } else {
          next(error.db_501);
        }
      });
  } catch (err) {
    next(err);
  }
});
module.exports = router;

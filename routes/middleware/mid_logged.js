//Checking that the account is logged.
const express = require("express");
const router = express.Router();

//Utils
const UserUtils = require("../../utils/db.users");

//Errors
const error = require("../../errors");

router.use(async function (req, res, next) {
  try {
    if (req.session && req.session.user_id) {
      let user = await UserUtils.getUserById(req.session.user_id);
      if (user) {
        req.user = user;
        next();
        return;
      } else {
        throw error.user_not_found_401;
      }
    } else {
      throw error.user_not_found_401;
    }
  } catch (err) {
    req.session.destroy();
    next(err);
  }
});

module.exports = router;

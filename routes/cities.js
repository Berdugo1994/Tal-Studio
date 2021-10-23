const express = require("express");
const createError = require("http-errors");
const CitiesUtils = require("../utils/cities");
require("dotenv").config();
const router = express.Router();
/**
 * @method - GET
 * @param - /
 * @description - Cities
 */
router.get("/", async (req, res, next) => {
  try {
    CitiesUtils.fetchCities()
      .then((values) => {
        return res.status(200).send(values);
      })
      .catch((err) => {
        return next(
          createError(404, "There is a problem with getting cities list.")
        );
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

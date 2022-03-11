var express = require("express");
const connectDB = require("./config/db");
var path = require("path");
require("dotenv").config();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var authRoute = require("./routes/auth");
var cityRoute = require("./routes/cities");
var trainingsRoute = require("./routes/trainings");
var eventRoute = require("./routes/events");
var adminRoute = require("./routes/admin");
var userRoute = require("./routes/user");
var fs = require("fs");
const error = require("./errors");
var http = require("http");
const https = require("https");
var cors = require("cors");
const session = require("client-sessions");
const port = process.env.PORT;
const is_production = process.env.NODE_ENV == "aws";
if (process.env.USING_INTERNET == "true") {
  connectDB();
} else {
  console.log("No Internet Dev");
}
const corsConfig = {
  origin: true,
  credentials: true,
};
var app = express();
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(
  logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);
is_production ? app.use(logger("combined")) : app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var path = require("path");
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 30 * 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: is_production,
      secure: false,
      secureProxy: is_production,
    },
  })
);
app.use(express.static("client/build"));
app.use(express.static("swagger"));
app.get("/api", (req, res) => {
  res.status(200).sendFile(__dirname + "/swagger/index.html");
});
app.use("/api/cities", cityRoute);
app.use("/api/auth", authRoute);
app.use("/api/trainings", trainingsRoute);
app.use("/api/events", eventRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// this middleware handles undefined errors. must check.
app.use(function (req, res, next) {
  next(error.general_error_410);
});
app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} Server runs on port ${port}`);
});
app.use(function (err, req, res, next) {
  if (err.message) {
    if (err.message !== "פרטי התחברות שגויים") {
      console.error("******************" + err.message + "******************");
      console.error("url: " + req.url);
      console.error("body: ");
      console.error(req.body);
    }
  }

  console.error(err);
  const msg = err[0] || err.message;
  res.status(err.status || 500).send(msg ? msg : "");
});

module.exports = app;

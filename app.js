var createError = require("http-errors");
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
const production = process.env.NODE_ENV === "production";
var sshKey, cert, ca, options;
if (production) {
  sshKey = fs.readFileSync(__dirname + "/../../ssl/tf_private.key");
  cert = fs.readFileSync(__dirname + "/../../ssl/tf_certificate.crt");
  ca = fs.readFileSync(__dirname + "/../../ssl/tf_ca_bundle.crt");
  options = {
    key: sshKey,
    cert: cert,
    ca: ca,
  };
}
var http = require("http");
const https = require("https");
var cors = require("cors");
const session = require("client-sessions");
const port = process.env.PORT;
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
app.use(logger("dev"));
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
      httpOnly: production,
      secure: production,
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
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
if (production) {
  //HTTP LISTENS ON 80
  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });
      res.end();
    })
    .listen(80);

  //HTTPS LISTENS ON 443
  https.createServer(options, app).listen(443, () => {
    console.log(`PRODUCTION HTTPS Server runs on ${process.env.PROD_IP}:443`);
  });
} else if (process.env.LAN == "true") {
  app.listen(port, process.env.MYIP, () => {
    console.log(`Server runs on LAN listen on ${process.env.MYIP}:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`DEV Server listen on port ${port}`);
  });
}
app.use(function (err, req, res, next) {
  console.error(err);
  const msg = err[0] || err.message;
  res.status(err.status || 500).send(msg ? msg : "");
});

module.exports = app;

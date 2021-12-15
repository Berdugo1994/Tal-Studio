const express = require("express");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const router = express.Router();
//Utils
const UserUtils = require("../utils/db.users");
const mailer = require("../utils/mailer");
const GeneralUtils = require("../utils/general");
const TokenUtils = require("../utils/db.tokens");

//MIDDLEWARE
const loggedMW = require("./middleware/mid_logged");

//ERRORS
const error = require("../errors");

//POST - Login
router.post(
  "/login",
  [
    check("email", "Please Enter a valid Email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(error.wrong_credentials_401);
    }
    try {
      const { email, password } = req.body;
      let user = await UserUtils.getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(error.wrong_credentials_401);
      }
      req.session.user_id = user.id;
      res.status(200).send("התחברות התבצעה בהצלחה");
    } catch (err) {
      next(err);
    }
  }
);
//POST - Register
router.post(
  "/register",
  [
    check("city", "Please enter valid city").not().isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check("fav_sport", "Please enter valid city").not().isEmpty(),
    check("firstname", "Please enter valid first name").not().isEmpty(),
    check("gender", "Please enter valid gender").not().isEmpty(),
    check("lastname", "Please enter valid lastname").not().isEmpty(),
    check("password", "Please enter valid password").isLength({
      min: 6,
      max: 12,
    }),
    check("phone", "Please enter valid phone").not().isEmpty(),
    check("sport_for_me", "Please enter valid sport for me").not().isEmpty(),
    check("training_num", "Please enter valid training num").not().isEmpty(),
    check("birthdate", "Please enter valid birthdate").isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password, phone } = req.body;
    try {
      if (await UserUtils.getUserByEmail(email)) {
        next(error.email_exists_409);
        return;
      }
      if (await UserUtils.getUserByPhone(phone)) {
        next(error.phone_exists_409);
        return;
      }
      const salt = await bcrypt.genSalt(parseInt(process.env.salt));
      const passwordEncrypted = await bcrypt.hash(password, salt);
      req.body.password = passwordEncrypted;
      req.body.createdAt = new Date();
      req.body.updatedAt = new Date();
      await UserUtils.save(req.body);
      mailer.SendUserRegisterSuccess(email, req.body.firstname);
      res.status(201).send("המשתמש נוצר בהצלחה. מייל נשלח.");
    } catch (err) {
      if (err.code == 11000) {
        if (err.keyValue.email) {
          next(createError(409, "Email already used, choose another."));
          return;
        } else if (err.keyValue.phone) {
          next(createError(408, "Phone already used, choose another."));
          return;
        } else {
          next(createError(401, "Cannot create user"));
        }
      } else next(createError(401, "Cannot create user"));
    }
  }
);
//POST - Contact
router.post(
  "/contact",
  [
    check("name", "שם אינו תקין").not().isEmpty(),
    check("phone", "מס טלפון אינו תקין").not().isEmpty(),
    check("message", "תוכן הודעה אינו תקין").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, errors.array()));
    }
    let { name, phone, message } = req.body;
    try {
      mailer
        .SendEmailContact(name, phone, message)
        .then(() => {
          res.status(201).send("Contact sent successfully");
        })
        .catch(() => {
          next(createError(402, "בעיה בשולח המיילים, נא נסה שנית מאוחר יותר"));
        });
    } catch (err) {
      next(createError(401, "שליחת טופס צור קשר נכשלה"));
    }
  }
);
router.post(
  "/forgotpassword",
  [check("email", "מייל אינו תקין").not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, errors.array()));
    }
    let { email } = req.body;
    try {
      let user = await UserUtils.getUserByEmail(email);
      if (!user) {
        next(error.email_not_exists_408);
        return;
      }
      await TokenUtils.delTokenById(user._id);
      let resetToken = await TokenUtils.createTokenById(user._id);
      mailer
        .SendEmailForgot(user, resetToken)
        .then(() => {
          res.status(201).send("Forgot mail send succesfully");
        })
        .catch((e) => {
          console.log(e);
          next(createError(402, "בעיה בשולח המיילים, נא נסה שנית מאוחר יותר"));
        });
    } catch (err) {
      next(error.forgot_failed_408);
    }
  }
);
router.post(
  "/validateforgotpassword",
  [
    check("email", "מייל אינו תקין").not().isEmpty(),
    check("code", "קוד אינו תקין").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, errors.array()));
    }
    try {
      let { email, code } = req.body;
      forgotValidateHelper(email, code)
        .then((user) => {
          res.status(201).send("הקוד נכון");
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(error.forgot_failed_408);
    }
  }
);

router.post(
  "/changeforgotpassword",
  [
    check("email", "מייל אינו תקין").not().isEmpty(),
    check("code", "קוד אינו תקין").not().isEmpty(),
    check("password", "סיסמה אינה תקין").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, errors.array()));
    }
    let { email, code, password } = req.body;
    try {
      forgotValidateHelper(email, code)
        .then((user) => {
          UserUtils.updateUserPasswordById(user._id, password).then(
            mailer
              .SendChangePasswordForgotSuccess(user)
              .then(() => {
                TokenUtils.delTokenById(user._id);
                res.status(201).send("סיסמה שונתה בהצלחה");
              })
              .catch(() => {
                next(error.forgot_failed_408);
              })
          );
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(error.forgot_failed_408);
    }
  }
);

router.use(loggedMW); // **LOGGED USER BELOW**

//GET - LOGGED
router.get("/logged", async (req, res, next) => {
  //Checking that the account is logged.
  try {
    let user = await UserUtils.getUserByEmail(req.user.email);
    if (user) {
      res.status(200).send(cleanResultUserFields(user._doc));
      return;
    }
  } catch (err) {
    req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
    req.session.destroy();
    next(err);
  }
});
//POST - Logout
router.post("/logout", function (req, res, next) {
  try {
    req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
    res.status(200).send("משתמש התנתק בהצלחה");
  } catch (err) {
    next(err);
  }
});
//POST - ValidatePassword
router.post(
  "/validatepass",
  [
    check("password", "This is not the correct password").isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(error.wrong_pass_402);
    }
    try {
      const { password } = req.body;
      if (!(await bcrypt.compare(password, req.user.password))) {
        return next(error.wrong_pass_402);
      }
      res.status(200).send("סיסמה תקינה");
    } catch (err) {
      next(err);
    }
  }
);
//PUT - UpdateProfile
router.put(
  "/updateprofile",
  [
    check("city", "עיר לא תקין").not().isEmpty(),
    check("email", "מייל לא תקין").isEmail(),
    check("fav_sport", "שדה ספורט מועדף לא תקין").not().isEmpty(),
    check("firstname", "שדה שם פרטי לא תקין").not().isEmpty(),
    check("gender", "שדה מגדר לא מוגדר").not().isEmpty(),
    check("lastname", "שדה שם משפחה לא מוגדר").not().isEmpty(),
    check("password", "שדה סיסמה").isLength({
      min: 6,
      max: 12,
    }),
    check("phone", "שדה פלאפון לא תקין").not().isEmpty(),
    check("sport_for_me", "שדה ספורט עבורי לא תקין").not().isEmpty(),
    check("training_num", "שדה מס' אימונים שבועיים לא תקין").not().isEmpty(),
    check("birthdate", "תאריך לידה לא תקין").isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, errors.array()));
    }
    const { email, password, phone } = req.body;
    try {
      let user = req.user;
      if (!user) {
        return next(error.user_not_found_401);
      }
      if (email != user.email) {
        let userWithEmail = await UserUtils.getUserByEmail(email);
        if (userWithEmail) {
          return next(error.email_exists_409);
        }
      }
      if (phone != user.phone) {
        let userWithPhone = await UserUtils.getUserByPhone(phone);
        if (userWithPhone) {
          return next(error.phone_exists_409);
        }
      }
      const salt = await bcrypt.genSalt(parseInt(process.env.salt));
      const passwordEncrypted = await bcrypt.hash(password, salt);
      req.body.password = passwordEncrypted;
      req.body.updatedAt = new Date();
      await UserUtils.updateById(req.user.id, req.body).catch((err) => {
        throw err;
      });
      UserUtils.getUserById(req.user.id).then((updatedUser) => {
        res.status(200).send(cleanResultUserFields(updatedUser._doc));
      });
    } catch (err) {
      if (err.code == 11000) {
        if (err.keyValue.email) {
          return next(error.email_exists_409);
        } else if (err.keyValue.phone) {
          return next(error.phone_exists_409);
        } else {
          return next(error.db_501);
        }
      } else next(error.server_500);
    }
  }
);
//Helpers
async function forgotValidateHelper(email, code) {
  let user = await UserUtils.getUserByEmail(email);
  if (!user) {
    next(error.email_not_exists_408);
    return;
  }
  return await TokenUtils.validateToken(user._id, code)
    .then(() => {
      return Promise.resolve(user);
    })
    .catch((errNum) => {
      if (errNum === 0) return Promise.reject(error.token_expired_408);
      else if (errNum === 1) return Promise.reject(error.token_wrong_408);
      else {
        return Promise.reject(error.forgot_failed_408);
      }
    });
}

function cleanResultUserFields(user) {
  let userReturn = GeneralUtils.objectWithoutKey(user, "password");
  userReturn = GeneralUtils.objectWithoutKey(userReturn, "createdAt");
  userReturn = GeneralUtils.objectWithoutKey(userReturn, "updatedAt");
  userReturn = GeneralUtils.objectWithoutKey(userReturn, "num");
  return userReturn;
}
module.exports = router;

const createError = require("http-errors");

// ------------------------------------------ 400+ Data Error --------------------------------------------

//401 -> Client should logout immediately
const wrong_credentials_401 = createError(401, "פרטי התחברות שגויים");
const user_not_found_401 = createError(
  401,
  "בעיה בחיבור לחשבונך. יש להתחבר שוב"
);

//402
const wrong_pass_402 = createError(402, "סיסמה שגויה");

//402 - Friend Request
const cant_send_yourself_402 = createError(
  402,
  "לא ניתן לשלוח בקשת חברות לעצמך"
);
const friend_request_failed_402 = createError(
  402,
  "נסיון בקשת החברות נכשל. יש לנסות מאוחר יותר"
);
const friend_request_already_wait_for_them_402 = createError(
  402,
  "הבקשה כבר קיימת, ממתינה לאישורו"
);
const friend_request_already_wait_for_me_402 = createError(
  402,
  "הבקשה כבר קיימת, ממתינה לאישורך"
);

//402 - Friend Respond
const friend_respond_bad_credentials_402 = createError(
  402,
  "אינך יכול להגיב לבקשת החברות"
);
const friend_respond_already_approve_402 = createError(402, "אתם כבר חברים");
const friend_respond_already_rejected_402 = createError(
  402,
  "בקשת החברות נדחתה בעבר. יש לבקש בקשת חברות חדשה"
);
const friend_respond_failed_402 = createError(
  402,
  "התגובה לבקשת החברות נכשלה. יש לנסות מאוחר יותר"
);

//402 - Friend Delete
const friend_delete_not_friends_402 = createError(
  402,
  "לא ניתן לבטל חברות אם אינכם חברים"
);

//403
const cant_save_available_403 = createError(403, "שמירת אימונים פנויים נכשלה");

//408
const email_not_exists_408 = createError(408, "לא נמצא חשבון עם המייל הזה");
const phone_not_exists_408 = createError(408, "לא נמצא חשבון עם הטלפון הזה");
const token_expired_408 = createError(
  408,
  "עברה יותר משעה, הקוד פג תוקף. יש להתחיל את תהליך השחזור מההתחלה"
);
const token_wrong_408 = createError(408, "הקוד שהוזן שגוי.");
const forgot_failed_408 = createError(408, "תהליך שחזור הקוד נכשל");

//409 already exists
const email_exists_409 = createError(409, "המייל שנבחר בשימוש. יש לבחור אחר");
const phone_exists_409 = createError(409, "הטלפון שנבחר בשימוש. יש לבחור אחר");

//410 General error
//Probably on routing, when happend - need to check the logs and findout how happend.
const general_error_410 = createError(410, "שגיאת שרת, יש לנסות מאוחר יותר");

// ------------------------------------------ 500+ Server Error --------------------------------------------

//500
const server_500 = createError(500, "שגיאה בשרת, אנא נסו שנית מאוחר יותר");

//501
const db_501 = createError(501, "שגיאה בבסיס הנתונים, אנא נסו שנית מאוחר יותר");

module.exports.user_not_found_401 = user_not_found_401;
module.exports.wrong_credentials_401 = wrong_credentials_401;
module.exports.wrong_pass_402 = wrong_pass_402;

module.exports.cant_send_yourself_402 = cant_send_yourself_402;
module.exports.friend_request_failed_402 = friend_request_failed_402;
module.exports.friend_request_already_wait_for_them_402 =
  friend_request_already_wait_for_them_402;
module.exports.friend_request_already_wait_for_me_402 =
  friend_request_already_wait_for_me_402;

module.exports.friend_respond_bad_credentials_402 =
  friend_respond_bad_credentials_402;
module.exports.friend_respond_already_approve_402 =
  friend_respond_already_approve_402;
module.exports.friend_respond_already_rejected_402 =
  friend_respond_already_rejected_402;
module.exports.friend_respond_failed_402 = friend_respond_failed_402;
module.exports.friend_delete_not_friends_402 = friend_delete_not_friends_402;

module.exports.cant_save_available_403 = cant_save_available_403;

module.exports.email_not_exists_408 = email_not_exists_408;
module.exports.phone_not_exists_408 = phone_not_exists_408;
module.exports.token_expired_408 = token_expired_408;
module.exports.token_wrong_408 = token_wrong_408;
module.exports.forgot_failed_408 = forgot_failed_408;

module.exports.email_exists_409 = email_exists_409;
module.exports.phone_exists_409 = phone_exists_409;

module.exports.general_error_410 = general_error_410;

module.exports.server_500 = server_500;
module.exports.db_501 = db_501;

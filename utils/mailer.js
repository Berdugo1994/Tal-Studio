const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "talstudio95@gmail.com",
    pass: process.env.emailPassword,
  },
});
async function SendEmailContact(name, phone, message) {
  let text =
    "שם: " + name + "\n" + "פלאפון: " + phone + "\n" + "הודעה: " + message;
  const mailOptions = {
    from: "talstudio95@gmail.com",
    to: "talfekler@gmail.com",
    // to: "talstudio95@gmail.com", // Test !!
    subject: "טל סטודיו - פנייה הושארה באתר",
    text,
  };
  return transporter.sendMail(mailOptions);
}
async function SendEmailForgot(user, forgotToken) {
  let text = `
      <p>שלום ${user.firstname},</p>
      <p>ביקשת לשחזר את סיסמתך.</p>
      <p>יש להכניס את הקוד באתר:</p>
      <h1>${forgotToken}</h1>
      <p>במידה ולא ביקשת לשחזר סיסמתך, אנא פנה אלי</p>
  `;

  const mailOptions = {
    from: "talstudio95@gmail.com",
    to: user.email,
    subject: "טל סטודיו - שחזור סיסמה",
    html: `<div dir='rtl'>${text}</div>`,
  };
  return transporter.sendMail(mailOptions);
}

async function SendChangePasswordForgotSuccess(user) {
  let text = `
      <p>שלום ${user.firstname},</p>
      <p>סיסמתך שונתה בהצלחה.</p>
      <p>במידה וזו טעות, יש ליצור איתי קשר .</p>
   `;
  const mailOptions = {
    from: "talstudio95@gmail.com",
    to: user.email,
    subject: "טל סטודיו - סיסמתך שוחזרה בהצלחה",
    html: `<div dir='rtl'>${text}</div>;`,
  };
  return transporter.sendMail(mailOptions);
}

async function SendUserRegisterSuccess(email, firstname) {
  let text = `
      <p>שלום ${firstname},</p>
      <p>ברוכים הבאים לטל סטודיו!</p>
      <p>במידה ותרצו לשנות את אחד מהשדות איתם נרשמתם,</p>
      <p>יש להתחבר ולעבור ל-פרופיל.</p>
      <p>מוזמנים ליצור איתי קשר לכל שאלה :)</p>
   `;
  const mailOptions = {
    from: "talstudio95@gmail.com",
    to: email,
    subject: "טל סטודיו - ברוכים הבאים",
    html: `<div dir='rtl'>${text}</div>`,
  };
  return transporter.sendMail(mailOptions);
}

module.exports.SendEmailContact = SendEmailContact;
module.exports.SendEmailForgot = SendEmailForgot;
module.exports.SendUserRegisterSuccess = SendUserRegisterSuccess;
module.exports.SendChangePasswordForgotSuccess =
  SendChangePasswordForgotSuccess;

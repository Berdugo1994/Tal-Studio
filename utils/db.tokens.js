const Token = require("../models/Token");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

async function delTokenById(user_id) {
  let token = await Token.findOne({ user_id });
  if (token) return token.remove();
  return Promise.resolve();
}

async function createTokenById(_id) {
  let resetToken = crypto.randomBytes(16).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(process.env.salt));
  await new Token({
    user_id: _id,
    token: hash,
    createdAt: Date.now(),
  }).save();
  return resetToken;
}

async function getTokenById(_id) {
  return Token.findOne({ user_id: _id });
}

async function validateToken(_id, resetToken) {
  const tokenFromDb = await getTokenById(_id);
  if (!tokenFromDb) return Promise.reject(0);
  const isValid = await bcrypt.compare(resetToken, tokenFromDb.token);
  if (!isValid) {
    return Promise.reject(1); //wrong
  }
  return Promise.resolve();
}

module.exports.delTokenById = delTokenById;
module.exports.createTokenById = createTokenById;
module.exports.validateToken = validateToken;

const Utils = require("./general");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
async function getUserByEmail(email) {
  const user = await Users.findOne({
    email,
  });
  return user ? user : false;
}

async function getUserById(_id) {
  const user = await Users.findOne({
    _id,
  });
  return user ? user : false;
}
async function getUserByPhone(phone) {
  const user = await Users.findOne({
    phone,
  });
  return user ? user : false;
}
async function save(user) {
  const userToSave = new Users(user);
  return userToSave.save();
}
async function getAllUsersWithoutEmailAndFilter(email, filter) {
  return Users.find({ email: { $ne: email } }, filter);
}
async function getUserWithEmailAndFilter(email, filter) {
  return Users.findOne({ email: { $eq: email } }, filter);
}

async function updateUserPasswordById(_id, password) {
  const hash = await bcrypt.hash(password, Number(process.env.salt));
  return Users.updateOne({ _id }, { $set: { password: hash } });
}
async function updateById(_id, object) {
  return Users.updateOne({ _id }, object);
}
module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserById = getUserById;
module.exports.getAllUsersWithoutEmailAndFilter =
  getAllUsersWithoutEmailAndFilter;
module.exports.getUserWithEmailAndFilter = getUserWithEmailAndFilter;
module.exports.updateById = updateById;
module.exports.save = save;
module.exports.getUserByPhone = getUserByPhone;
module.exports.updateUserPasswordById = updateUserPasswordById;

// const Utils = require("./general");
// const UsersFull = require("../models/UsersFull");

// async function getUserByPhone(phone) {
//   const user = await UsersFull.findOne({
//     phone,
//   });
//   return user ? user : false;
// }
// async function getAllUsersWithEmailAndFilter(email, filter) {
//   return UsersFull.find({ email: { $ne: email } }, filter);
// }
// async function save(user) {
//   const fullUserToSave = new UsersFull(
//     Utils.objectWithoutKey(user, "password")
//   );
//   return fullUserToSave.save();
// }

// async function updateById(_id, object) {
//   return UsersFull.updateOne(_id, Utils.objectWithoutKey(object, "password"));
// }

// module.exports.getUserByPhone = getUserByPhone;
// module.exports.updateById = updateById;
// module.exports.getAllUsersWithEmailAndFilter = getAllUsersWithEmailAndFilter;
// module.exports.save = save;

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fav_sport: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    sport_for_me: {
      type: String,
      required: true,
    },
    training_num: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "trainer",
    },
  },
  { collection: "UsersDB", versionKey: false }
);

UserSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "num" });
module.exports = User = mongoose.model("User", UserSchema);

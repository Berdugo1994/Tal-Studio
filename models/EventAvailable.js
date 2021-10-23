const mongoose = require("mongoose");
const AvailableSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { collection: "AvailableDB", versionKey: false }
);
// export model user with UserSchema
module.exports = AvailableEvent = mongoose.model(
  "AvailableEvent",
  AvailableSchema
);

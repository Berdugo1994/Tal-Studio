const mongoose = require("mongoose");
const TrainingsScehma = new mongoose.Schema(
  {
    participant_ids: [
      {
        type: String,
        required: true,
      },
    ],
    participant_names: [
      {
        type: String,
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
      default: "אימון",
    },
  },
  { collection: "TrainingsDB", versionKey: false }
);
// export model user with UserSchema
module.exports = Training = mongoose.model("Training", TrainingsScehma);

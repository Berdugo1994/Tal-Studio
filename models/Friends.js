const mongoose = require("mongoose");
const FriendsSchema = new mongoose.Schema(
  {
    inviter_id: {
      type: String,
      required: true,
    },

    invited_id: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
    date_sent: {
      type: Date,
    },
    date_respond: {
      type: Date,
    },
  },
  { collection: "FriendsDB", versionKey: false }
);
// export model user with UserSchema
module.exports = Friends = mongoose.model("Friends", FriendsSchema);

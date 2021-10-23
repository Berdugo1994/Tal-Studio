const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TokenSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // this is the expiry time in seconds
    },
  },
  { collection: "TokensDB", versionKey: false }
);
module.exports = mongoose.model("TokenForgot", TokenSchema);

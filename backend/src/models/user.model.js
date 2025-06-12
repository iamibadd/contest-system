const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["guest", "user", "vip", "admin"],
      default: "user",
    },
    prizes: [
      {
        contest: { type: objectId, ref: "Contest" },
        prize: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

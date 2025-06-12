const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;
const participationSchema = new mongoose.Schema(
  {
    user: {
      type: objectId,
      ref: "User",
      required: true,
    },
    contest: {
      type: objectId,
      ref: "Contest",
      required: true,
    },
    answers: [
      {
        question: {
          type: objectId,
          required: true,
        },
        selectedOptions: [Number],
      },
    ],
    score: { type: Number, default: 0 },
    isSubmitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participation", participationSchema);

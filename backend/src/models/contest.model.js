const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    accessLevel: {
      type: String,
      enum: ["normal", "vip"],
      default: "normal",
    },
    prize: String,
    questions: [
      {
        text: { type: String, required: true },
        type: {
          type: String,
          enum: ["single", "multi", "boolean"],
          required: true,
        },
        options: [
          {
            text: String,
            isCorrect: Boolean,
          },
        ],
        points: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", contestSchema);

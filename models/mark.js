const mongoose = require("mongoose");

const markSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      trim: true,
      required: [true, "A subject name is must"],
    },
    semester: {
      type: Number,
      trim: true,
      required: [true, "please include the semester value"],
      enum: {
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        message: "please include the semester value",
      },
    },
    studentid: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
    securedMark: {
      type: Number,
      required: [true, "A mark must not be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Mark = mongoose.model("Mark", markSchema);

module.exports = Mark;

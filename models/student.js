const mongoose = require("mongoose");
const slugify = require("slugify");
const studentSchema = mongoose.Schema({
  studentname: {
    type: String,
    required: [true, "A student must have a name"],
    trim: true,
  },
  slug: String,
  studentrollno: {
    type: Number,
    required: [true, "A student must have a RollNo"],
    unique: true,
  },
  gender: {
    type: String,
    required: [true, "A student must have a gender"],
    enum: ["male", "female"],
  },
  dob: {
    type: String,
    required: [true, "A student must have a DOB"],
  },
  class: {
    type: String,
    required: [true, "A student must have a class"],
    enum: {
      values: ["mca", "msc", "mphil"],
      message: "A student must have a Class",
    },
  },
  year: {
    type: Number,
    required: true,
    enum: {
      values: [1, 2, 3, 4, 5],
      message: "A student must have a year",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

studentSchema.pre("save", function (next) {
  this.gender = this.gender.toLowerCase();
  this.class = this.class.toLowerCase();
  this.slug = slugify(this.studentname, { lower: true });
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

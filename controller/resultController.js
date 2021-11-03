const createError = require("http-errors");
const Student = require("../models/student");
const Mark = require("../models/mark");

exports.getResult = async (req, res, next) => {
  try {
    const student = await Student.findOne({ studentrollno: req.params.regno });
    if (!student) {
      return next(
        createError(
          404,
          `No Student found on that Register Number: ${req.params.regno}`
        )
      );
    }
    const mark = await Mark.find({
      studentid: student._id,
      semester: req.params.semester,
    }).populate("studentid");
    if (!mark || mark.length <= 0) {
      return next(
        createError(
          404,
          `No marks available for semester: ${req.params.semester} `
        )
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        mark,
      },
    });
  } catch (error) {
    return next(createError(400, error));
  }
};

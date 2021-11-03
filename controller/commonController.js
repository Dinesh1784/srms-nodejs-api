const createError = require("http-errors");
const Student = require("../models/student");
const Mark = require("../models/mark");
const mongoose = require("mongoose");

//get studentCount

exports.getStudentCount = async (req, res, next) => {
  try {
    const getStudentCount = await Student.countDocuments();
    if (!getStudentCount) {
      return next(400, "No student Found");
    }
    res.status(200).json({
      status: "success",
      count: getStudentCount,
    });
  } catch (error) {
    return next(createError(404, error.message));
  }
};

//get all students
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.find();
    res.status(200).json({
      status: "success",
      results: student.length,
      data: {
        student,
      },
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// create student
exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

//get single student by id
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    if (!student) {
      return next(
        createError(400, `No student available for id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

//update student
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return next(
        createError(400, `No student available for id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

//delete student
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return next(
        createError(400, `No student available for id: ${req.params.id}`)
      );
    }
    const mark = await Mark.find({ studentid: student._id });
    if (mark) {
      await Mark.deleteMany({ studentid: student.id });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

//get mark for single student
exports.getStudentMark = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next(createError(404, "Invalid Student ID"));
    }
    const student = await Student.findOne({ _id: req.params.id });
    if (!student) {
      return next(
        createError(
          400,
          `No Student available for student with this id: ${req.params.id}`
        )
      );
    }
    const mark = await Mark.find({ studentid: student._id });
    if (!mark) {
      return next(
        createError(
          400,
          `No mark available for student with this id: ${req.params.id}`
        )
      );
    }
    res.status(200).json({
      status: "success",
      result: mark.length,
      data: {
        student,
        mark,
      },
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};
// create mark for student
exports.createStudentMark = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next(createError(404, "Invalid Student ID"));
    }
    const student = await Student.findById(req.params.id);
    if (!student) {
      return next(
        createError(
          400,
          `No Student available for student with this id: ${req.params.id}`
        )
      );
    }
    const newMark = await Mark.create(req.body);
    if (!newMark) {
      return next(createError(400, "something went wrong"));
    }
    res.status(201).json({
      status: "success",
      data: {
        newMark,
      },
    });
  } catch (error) {
    return next(createError(400, error.message));
  }
};
// update mark for student
exports.updateStudentMark = async (req, res, next) => {
  try {
    const mark = await Mark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mark) {
      return next(
        createError(400, `No mark available for id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        mark,
      },
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};
//delete mark for student
exports.deleteStudentMark = async (req, res, next) => {
  try {
    const mark = await Mark.findByIdAndDelete(req.params.id);
    if (!mark) {
      return next(
        createError(400, `No mark available for id: ${req.params.id}`)
      );
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};
//publish result for student

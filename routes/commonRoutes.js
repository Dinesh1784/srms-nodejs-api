const express = require("express");
const commonController = require("../controller/commonController");
const adminController = require("../controller/adminController");
const router = express.Router();

router.route("/student-count").get(commonController.getStudentCount);

router
  .route("/student")
  .get(commonController.getStudent)
  .post(commonController.createStudent);

router
  .route("/student/:id")
  .get(commonController.getStudentById)
  .patch(commonController.updateStudent)
  .delete(commonController.deleteStudent);

router
  .route("/student/:id/mark")
  .get(commonController.getStudentMark)
  .post(commonController.createStudentMark)
  .patch(commonController.updateStudentMark)
  .delete(commonController.deleteStudentMark);

module.exports = router;

const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

router.route("/admin/register").post(adminController.register);
router.route("/admin/login").post(adminController.login);

module.exports = router;

const express = require("express");
const resultController = require("../controller/resultController");
const router = express.Router();

router.route("/result/:regno/:semester").get(resultController.getResult);

module.exports = router;

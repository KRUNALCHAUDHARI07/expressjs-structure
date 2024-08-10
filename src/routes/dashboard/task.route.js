const express = require("express");
const router = express.Router();
const TaskController = require("../../controllers/dashboard/task.controller");

router.get("/", AuthController.create);

module.exports = router;

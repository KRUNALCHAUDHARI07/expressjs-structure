const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/dashboard/dashboard.controller");

router.get("/", AuthController.dashboard);

module.exports = router;

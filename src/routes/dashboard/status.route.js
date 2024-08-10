const express = require("express");
const router = express.Router();
const StatusController = require("../../controllers/dashboard/status.controller");

router.get("/", StatusController.get);

router.get("/add", StatusController.create);

router.post("/api/add", StatusController.createStatus);

router.post("/api/update", StatusController.updateStatus);

router.post("/api/delete/:id", StatusController.deleteStatus);
module.exports = router;

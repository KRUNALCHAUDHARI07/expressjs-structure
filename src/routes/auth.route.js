const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.get("/register", AuthController.register);

router.post("/api/auth/register", AuthController.userRegister);

router.get("/login", AuthController.login);

router.post("/api/auth/login", AuthController.userLogin);

module.exports = router;

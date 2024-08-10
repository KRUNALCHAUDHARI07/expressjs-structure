const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const validatorJs = require("validatorjs");
const path = require("path");

module.exports = {
  mongoose,
  JWT,
  Bcrypt,
  validatorJs,
  path,
};

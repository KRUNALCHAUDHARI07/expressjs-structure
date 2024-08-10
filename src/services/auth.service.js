const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { Bcrypt } = require("../configs/constants");

const register = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  //check user exist
  const user = await User.findOne({
    email,
    isDeleted: false,
  });
  if (user) {
    //redirect error page
    return {
      isError: true,
      status: 400,
      message: "User is already exist",
      data: {},
      error: "",
    };
  }

  //bcrypt password
  const bcryptPassword = await Bcrypt.hash(password, 10);
  //create data
  const createdData = await User.create({
    firstName,
    lastName,
    email,
    password: bcryptPassword,
  });
  const token = await jwt.sign({ _id: createdData._id, email }, "secret123", {
    expiresIn: "365d",
  });

  // update token
  await User.updateOne(
    { _id: createdData._id },
    { $set: { accessToken: token } }
  );
  return {
    isError: false,
    status: 200,
    message: "User is registered successfully",
    data: { token },
    error: "",
  };
};

const login = async (userData) => {
  const { email, password } = userData;
  //check user exist
  const user = await User.findOne({
    email,
    isDeleted: false,
  });
  if (!user) {
    //redirect error page
    return {
      isError: true,
      status: 400,
      message: "User not found",
      data: {},
      error: "",
    };
  }

  //check password
  const checkPassword = await Bcrypt.compare(password, user.password);

  if (!checkPassword) {
    //redirect error page
    return {
      isError: true,
      status: 400,
      message: "password not correct",
      data: {},
      error: "",
    };
  }

  //create token
  const token = await jwt.sign({ _id: user._id, email }, "secret123", {
    expiresIn: "365d",
  });
  // update token
  await User.updateOne({ _id: user._id }, { $set: { accessToken: token } });

  return {
    isError: false,
    status: 200,
    message: "successfully login",
    data: { token },
    error: "",
  };
};
module.exports = { register, login };

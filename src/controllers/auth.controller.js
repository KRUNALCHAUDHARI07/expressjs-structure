const { validatorJs, path, Bcrypt } = require("../configs/constants");

const authService = require("../services/auth.service");
const register = async (req, res) => {
  res.sendFile(path.join(__dirname, "../view/auth", "register.html"));
};

const userRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    //check validation
    const VALIDATION_RULES = {
      firstName: "required|string",
      lastName: "required|string",
      email: "required|email",
      password: "required|string",
      confirmPassword: "required|string",
    };

    const validation = new validatorJs(req.body, VALIDATION_RULES);
    if (validation.fails()) {
      //return error
      next({
        status: 400,
        message: "validation fails",
        data: {},
        error: "",
      });
    }

    //check confirm password
    if (password !== confirmPassword) {
      next({
        status: 400,
        message: "password not match",
        data: {},
        error: "",
      });
    }

    //call register service
    const userRegister = await authService.register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    });
    if (userRegister.isError) {
      return res.sendFile(
        path.join(__dirname, "../view/auth", "register.html")
      );
    }
    // Set cookies with the submitted data
    res.cookie("token", userRegister.data.token, {
      maxAge: 900000,
      httpOnly: true,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};
const login = async (req, res, next) => {
  res.sendFile(path.join(__dirname, "../view/auth", "login.html"));
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check validation
    const VALIDATION_RULES = {
      email: "required|email",
      password: "required|string",
    };

    const validation = new validatorJs(req.body, VALIDATION_RULES);
    if (validation.fails()) {
      //return error
      next({
        status: 400,
        message: "validation fails",
        data: {},
        error: "",
      });
    }

    //call user login service
    const userData = await authService.login({ email, password });

    if (userData.isError) {
      return res.sendFile(
        path.join(__dirname, "../view/auth", "register.html")
      );
    }
    // Set cookies with the submitted data
    res.cookie("token", userData.data.token, {
      maxAge: 900000,
      httpOnly: true,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

module.exports = { register, userRegister, login, userLogin };

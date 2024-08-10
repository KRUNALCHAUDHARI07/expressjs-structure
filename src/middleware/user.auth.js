const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
async function authorization(req, res, next) {
  try {
    let authorizationToken = req.headers["authorization"];
    // let authorizationToken = req.cookie.token;
    if (!authorizationToken) {
      return res.redirect("/login");

      //return error
      //   return res.status(401).json({
      //     status: 401,
      //     message: "Please enter token",
      //     data: {},
      //     error: "",
      //   });
    }

    //check bearer token
    if (authorizationToken.split(" ")[0] !== "Bearer") {
      //return error
      return res.redirect("/login");
      //   return res.status(401).json({
      //     status: 401,
      //     message: "Please enter Bearer token",
      //     data: {},
      //     error: "",
      //   });
    }

    authorizationToken = authorizationToken.split(" ")[1];
    if (authorizationToken) {
      //varify jwt token
      const tokenData = await jwt.verify(authorizationToken, "secret123");

      if (!tokenData) {
        return res.redirect("/login");
        //     return res.status(401).json({
        //       status: 401,
        //       message: "Please enter correct token",
        //       data: {},
        //       error: "",
        //     });
      }

      //get user data
      let userData = await User.findOne({
        where: {
          id: tokenData._id,
          isDeleted: false,
          accerssToken: authorizationToken,
        },
        attributes: ["id", "firstName", "lastName", "email"],
      });
      if (!userData) {
        return res.redirect("/login");
        //   return res.status(401).json({
        //       status: 401,
        //       message: "User Not Found",
        //       data: {},
        //       error: "",
        //     });
      }

      req.me = userData;
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = authorization;

const statusService = require("../../services/dashboard/status.service");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns view get status list
 */
const get = async (req, res, next) => {
  try {
    //call create status service
    const getStatusList = await statusService.create(user._id, { name });
    if (getStatusList.isError) {
      return res.sendFile(
        path.join(__dirname, "../../view/auth", "register.html")
      );
    }

    return res.render(
      path.join(__dirname, "../../view/dashboard/status", "status.html"),
      {
        data: getStatusList.data,
      }
    );
  } catch (error) {}
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return view create status page
 */
const create = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns create status api
 */
const createStatus = async (req, res, next) => {
  try {
    const user = req.me;

    const { name } = req.body;

    //check validation
    const VALIDATION_RULES = {
      name: "required|string",
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

    //call create status service
    const createStatus = await statusService.create(user._id, { name });
    if (createStatus.isError) {
      return res.sendFile(
        path.join(__dirname, "../view/auth", "register.html")
      );
    }

    return res.redirect("/status");
  } catch (error) {
    next(error);
  }
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns update status api
 */
const updateStatus = async (req, res, next) => {
  try {
    const user = req.me;

    const { id, name } = req.body;

    //check validation
    const VALIDATION_RULES = {
      id: "required|string",
      name: "required|string",
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

    //call create status service
    const updateStatus = await statusService.update(user._id, { id, name });
    if (updateStatus.isError) {
      next();
    }

    return res.redirect("/status");
  } catch (error) {
    next(error);
  }
};

const deleteStatus = async (req, res, next) => {
  try {
    const user = req.me;

    const { id } = req.params;

    //call create status service
    const deleteStatus = await statusService.deletStatus(user._id, { id });
    if (deleteStatus.isError) {
      next();
    }

    return res.redirect("/status");
  } catch (error) {
    next(error);
  }
};
module.exports = { create, createStatus, get, updateStatus, deleteStatus };

const taskService = require("../../services/dashboard/task.service");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return view task list
 */
const get = async (req, res, next) => {
  try {
    const { order, search } = req.query;

    //call service
    const getTaskList = await taskService.get(req.query);
    if (getTaskList.isError) {
      return res.sendFile(
        path.join(__dirname, "../../view/auth", "register.html")
      );
    }
    return res.render(
      path.join(__dirname, "../../view/dashboard/task", "task.html"),
      {
        data: getStatusList.data,
      }
    );
  } catch (error) {
    next(error);
  }
};

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
 * @return task create api
 */
const createTask = async (req, res, next) => {
  try {
    const user = req.me;
    const { name, description, priority, statusId } = req.body;
    //check validation
    const VALIDATION_RULES = {
      name: "required|string",
      description: "required|string",
      priority: "required|string",
      statusId: "required|string",
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

    //call create task service
    const createTask = await taskService.create(user._id, {
      name,
      description,
      priority,
      statusId,
    });
    if (createTask.isError) {
      return res.sendFile(
        path.join(__dirname, "../view/auth", "register.html")
      );
    }

    return res.redirect("/task");
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return task update api
 */
const updateTask = async (req, res, next) => {
  try {
    const user = req.me;
    const { id, name, description, priority, statusId } = req.body;
    //check validation
    const VALIDATION_RULES = {
      id: "required|string",
      name: "required|string",
      description: "required|string",
      priority: "required|string",
      statusId: "required|string",
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

    //call create task service
    const updateTask = await taskService.create(user._id, {
      name,
      description,
      priority,
      statusId,
      id,
    });
    if (updateTask.isError) {
      return res.sendFile(
        path.join(__dirname, "../view/auth", "register.html")
      );
    }

    return res.redirect("/task");
  } catch (error) {
    next(error);
  }
};
module.exports = { get, create, createTask, updateTask };

const Status = require("../../models/Status.model");
const TaskSchema = require("../../models/Task.model");

const get = async (data) => {
  let where = {
    isDeleted: false,
  };
  if (data.search && data.search.name) {
    where.name = { $search: data.search.name };
  }
  if (data.search && data.search.taskId) {
    where.taskID = data.search.taskId;
  }

  const filter = [
    {
      $match: where,
    },
    {
      sort: { $createdAt: -1 },
    },
  ];
  //get tasl list
  const taskList = await TaskSchema.aggregate(filter);

  return {
    isError: false,
    status: 200,
    message: "task retrieved",
    data: taskList,
    error: "",
  };
};

const create = async (userId, data) => {
  const { name, description, priority, statusId } = req.body;

  //check statusId
  const statusData = await Status.findOne({
    _id: data.statusId,
    isDeleted: false,
  });
  if (!statusData) {
    return {
      isError: true,
      status: 400,
      message: "status not found",
      data: {},
      error: "",
    };
  }
  //check name duplication in statusId
  const checkName = await TaskSchema.aggregate([
    {
      $match: {
        statusId: { $nin: data.statusId },
        name: data.name,
        isDeleted: false,
        userId,
      },
    },
  ]);
  if (checkName) {
    return {
      isError: true,
      status: 400,
      message: "duplicate task exist",
      data: {},
      error: "",
    };
  }

  //create task
  await TaskSchema.create({
    name,
    description,
    priority,
    statusId,
    userId,
    createdBy: userId,
    createdAt: Math.floor(Date.now() / 1000),
  });

  return {
    isError: false,
    status: 200,
    message: "task added successfully",
    data: {},
    error: "",
  };
};
const update = async (userId, data) => {
  //check status exist
  const taskData = await TaskSchema.findOne({
    _id: data.id,
    isDeleted: false,
  });
  if (!taskData) {
    return {
      isError: true,
      status: 400,
      message: "status not found",
      data: {},
      error: "",
    };
  }

  //check other status name exist
  const checkName = await TaskSchema.aggregate([
    {
      $match: {
        _id: { $nin: data.id },
        name: data.name,
        statusId: data.statusId,
        userId,
        isDeleted: false,
      },
    },
  ]);
  if (checkName) {
    return {
      isError: true,
      status: 400,
      message: "duplicate status exist",
      data: {},
      error: "",
    };
  }

  //update task
  await Status.updateOne(
    { _id: data.id },
    {
      $set: {
        ...data,
        updatedBy: userId,
        updatedAt: Math.floor(Date.now() / 1000),
      },
    }
  );

  return {
    isError: false,
    status: 200,
    message: "task updated successfully",
    data: {},
    error: "",
  };
};
module.exports = { create, get, update };

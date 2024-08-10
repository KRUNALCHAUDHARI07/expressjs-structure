const Status = require("../../models/Status.model");

const get = async () => {
  const statusList = await Status.find({
    isDeleted: false,
  });

  return {
    isError: false,
    status: 200,
    message: "status list retrieved",
    data: statusList,
    error: "",
  };
};
const create = async (userId, data) => {
  //check status exist
  const statusData = await Status.findOne({
    name: data.name,
    isDeleted: false,
  });
  if (statusData) {
    return {
      isError: true,
      status: 400,
      message: "status already exist",
      data: {},
      error: "",
    };
  }

  //create status
  await Status.create({
    name: data.name,
    createdBy: userId,
    createdAt: Math.floor(Date.now() / 1000),
  });

  return {
    isError: false,
    status: 200,
    message: "status added successfully",
    data: {},
    error: "",
  };
};

const update = async (userId, data) => {
  //check status exist
  const statusData = await Status.findOne({
    _id: data.id,
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

  //check other status name exist
  const checkName = await Status.aggregate([
    {
      $match: {
        _id: { $nin: data.id },
        name: data.name,
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
  //create status
  await Status.updateOne(
    { _id: data.id },
    {
      $set: {
        name: data.name,
        updatedBy: userId,
        updatedAt: Math.floor(Date.now() / 1000),
      },
    }
  );

  return {
    isError: false,
    status: 200,
    message: "status updated successfully",
    data: {},
    error: "",
  };
};

const deletStatus = async (userId, data) => {
  //check status exist
  const statusData = await Status.findOne({
    _id: data.id,
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

  //create status
  await Status.updateOne(
    { _id: data.id },
    {
      $set: {
        name: data.name,
        isDeleted: true,
        updatedBy: userId,
        updatedAt: Math.floor(Date.now() / 1000),
        deletedBy: userId,
        deletedAt: Math.floor(Date.now() / 1000),
      },
    }
  );

  return {
    isError: false,
    status: 200,
    message: "status updated successfully",
    data: {},
    error: "",
  };
};
module.exports = { create, get, update, deletStatus };

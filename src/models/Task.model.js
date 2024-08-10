const { mongoose } = require("../configs/constants");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  statusId: {
    type: mongoose.Schema.ObjectId,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
  },
  deletedBy: {
    type: mongoose.Schema.ObjectId,
  },
  updatedBy: {
    type: {
      type: mongoose.Schema.ObjectId,
    },
  },
});

const Task = mongoose.model("task", TaskSchema);
module.exports = TaskSchema;

const { mongoose } = require("../configs/constants");

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    type: String,
  },
  updatedBy: {
    type: {
      type: String,
    },
  },
});

const Status = mongoose.model("task_status", StatusSchema);
module.exports = Status;

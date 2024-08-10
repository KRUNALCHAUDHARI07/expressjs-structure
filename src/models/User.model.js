const { mongoose } = require("../configs/constants");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
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

const User = mongoose.model("user", UserSchema);
module.exports = User;

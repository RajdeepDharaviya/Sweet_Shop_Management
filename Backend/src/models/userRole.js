const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
});

const userRoleModel = mongoose.model("userRole", userRoleSchema);

module.exports = {
  userRoleModel,
};

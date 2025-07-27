const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user", // Default role ID for regular users
    // ref="userRole", // Assuming you have a userRole model
  },
});

// for testing purpose
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
